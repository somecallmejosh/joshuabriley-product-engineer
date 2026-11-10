/**
 * Reads a component's public API straight from its source, so the style
 * guide's prop tables and /style-guide/system.json can't drift from the code.
 *
 * `parseComponentApi` takes the raw text of an `.astro` file, finds
 * `interface Props` (or `type Props = { … }`) in the frontmatter, and returns
 * each prop's name, type, whether it's required, its JSDoc, and the default
 * from the `const { … } = Astro.props` destructure.
 */
import ts from 'typescript';
import rules from '../../design-system/rules.json';

export interface PropDoc {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description?: string;
  /** Prop-value policy from design-system/rules.json, when the audit enforces one. */
  policy?: { canonical?: string[]; deprecated?: Record<string, string>; forbidden?: Record<string, string> };
}

const frontmatter = (source: string) => source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
const squash = (text: string) => text.replace(/\s+/g, ' ').trim();

export function parseComponentApi(source: string): PropDoc[] {
  const file = ts.createSourceFile('component.ts', frontmatter(source), ts.ScriptTarget.Latest, true);
  const aliases = new Map<string, string>();
  let members: ts.NodeArray<ts.TypeElement> | undefined;
  const defaults = new Map<string, string>();

  const visit = (node: ts.Node) => {
    if (ts.isTypeAliasDeclaration(node)) {
      if (node.name.text === 'Props' && ts.isTypeLiteralNode(node.type)) members = node.type.members;
      else aliases.set(node.name.text, squash(node.type.getText(file)));
    }
    if (ts.isInterfaceDeclaration(node)) {
      if (node.name.text === 'Props') members = node.members;
      else aliases.set(node.name.text, squash(`{ ${node.members.map((m) => m.getText(file).replace(/\/\*\*[\s\S]*?\*\/\s*/g, '')).join(' ')} }`));
    }
    if (ts.isVariableDeclaration(node) && ts.isObjectBindingPattern(node.name)
      && node.initializer?.getText(file) === 'Astro.props') {
      for (const element of node.name.elements) {
        if (!element.initializer) continue;
        const key = (element.propertyName ?? element.name).getText(file);
        defaults.set(key, squash(element.initializer.getText(file)));
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(file);

  const resolve = (type: string) => {
    const array = type.match(/^(\w+)\[\]$/);
    if (array && aliases.has(array[1])) return `${aliases.get(array[1])}[]`;
    return aliases.get(type) ?? type;
  };

  const props: PropDoc[] = [];
  const list: readonly ts.TypeElement[] = members ?? [];
  for (const member of list) {
    if (!ts.isPropertySignature(member)) continue;
    const signature: ts.PropertySignature = member;
    const name = signature.name.getText(file);
    const raw = signature.type ? squash(signature.type.getText(file)) : 'unknown';
    const docs = ts.getJSDocCommentsAndTags(signature)
      .map((doc) => (typeof doc.comment === 'string' ? doc.comment : ''))
      .filter(Boolean).join(' ');
    props.push({
      name,
      type: resolve(raw),
      required: !signature.questionToken,
      ...(defaults.has(name) && { default: defaults.get(name) }),
      ...(docs && { description: squash(docs) }),
    });
  }
  return props;
}

const sources = import.meta.glob<string>('/src/components/**/*.astro', { query: '?raw', import: 'default', eager: true });

/** Props for a component by repo path, e.g. `src/components/form/Field.astro`. */
export function componentApi(path: string): PropDoc[] {
  const source = sources[`/${path.replace(/^\//, '')}`];
  if (source === undefined) throw new Error(`componentApi: no component at ${path}`);
  return parseComponentApi(source);
}

type Policy = NonNullable<PropDoc['policy']>;
const policies = (rules as { components: Record<string, { path: string; props: Record<string, Policy> }> }).components;

/** Props for a component by repo path, plus any audited value policy from rules.json. */
export function componentApiWithPolicy(path: string): PropDoc[] {
  const entry = Object.values(policies).find((component) => component.path === path);
  return componentApi(path).map((prop) => (entry?.props[prop.name] ? { ...prop, policy: entry.props[prop.name] } : prop));
}
