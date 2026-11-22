/**
 * Code for the Rudiment UI case study's Engineering section. Every snippet is
 * copied verbatim from the rudiment-ui repo (react/rudiment-ui), including the
 * "before" versions, which come from git history (commit noted per snippet).
 * `…` marks a trim; indentation is shifted left only.
 */
import type { Snippet } from '~/lib/case-code';

export type { Snippet };

/** Themes are token values: one property traced from the semantic tier (which names the
 * primitive, color.neutral.500) to the stylesheet, and what it replaced. */
export const themes = {
  before: [
    {
      file: 'src/components/Checkbox/checkbox.css (before, removed in 7882c9e)',
      lang: 'css',
      code: `[data-theme='teal'] .rudi-checkbox__input:focus-visible + .rudi-checkbox__control,
[data-theme='teal-dark'] .rudi-checkbox__input:focus-visible + .rudi-checkbox__control {
  outline: none;
}

[data-theme='teal'] .rudi-checkbox__input:focus-visible + .rudi-checkbox__control {
  box-shadow:
    0 0 0 2px var(--rudi-color-neutral-0),
    0 0 0 4px var(--rudi-color-border-focus),
    …;
}
…`,
    },
  ] satisfies Snippet[],
  after: [
    {
      file: 'tokens/semantic.json (semantic)',
      lang: 'json',
      code: `"border": {
  "default": { "$value": "{color.neutral.200}" },
  "control": { "$value": "{color.neutral.500}" },
  …`,
    },
    {
      file: 'tokens/components.json (component)',
      lang: 'json',
      code: `"checkbox": {
  "control-size": { "$value": "1rem" },
  "control-border": { "$value": "{color.border.control}" },
  …`,
    },
    {
      file: 'src/components/Checkbox/checkbox.css',
      lang: 'css',
      code: `width: var(--rudi-component-checkbox-control-size);
height: var(--rudi-component-checkbox-control-size);
border: 1px solid var(--rudi-component-checkbox-control-border);
border-radius: var(--rudi-component-checkbox-control-radius);
background-color: var(--rudi-component-checkbox-control-bg);`,
    },
  ] satisfies Snippet[],
};

/** One control height: a component token every field and medium button reads. */
export const controlHeight: Snippet[] = [
  {
    file: 'tokens/components.json',
    lang: 'json',
    code: `"button": {
  …
  "height-md": { "$value": "{component.input.height}" },
  …
"input": {
  …
  "height": { "$value": "2.375rem" },`,
  },
  {
    file: 'src/components/Input/input.css · src/components/Button/button.css',
    lang: 'css',
    code: `/* input.css */
min-block-size: var(--rudi-component-input-height);

/* button.css */
min-block-size: var(--rudi-component-button-height-md);`,
  },
];

/** React Aria supplies the behavior; Rudiment supplies the API and the look. */
export const behavior: Snippet[] = [
  {
    file: 'src/components/Checkbox/CheckboxGroup.tsx',
    lang: 'tsx',
    code: `import { useCheckboxGroup } from 'react-aria'
import { useCheckboxGroupState } from 'react-stately'
…
  /** Called with the full array of checked values (not an event) whenever one changes. */
  onChange?: (value: string[]) => void
…
export function RudiCheckboxGroup(props: RudiCheckboxGroupProps) {
  // isInvalid links the error message to the group and marks it invalid for assistive tech.
  const ariaProps = { ...props, isInvalid: !!props.errorMessage }
  const state = useCheckboxGroupState(ariaProps)
  const { groupProps, labelProps, descriptionProps, errorMessageProps } =
    useCheckboxGroup(ariaProps, state)
  …
    <CheckboxGroupContext.Provider value={state}>
    <div
      {...groupProps}
      className={cn('rudi-checkbox-group', props.className)}`,
  },
  {
    file: 'src/components/Checkbox/CheckboxGroup.test.tsx',
    lang: 'tsx',
    code: `render(<Tissues />)
expect(screen.getByRole('checkbox', { name: 'Embryos' })).toBeChecked()
expect(screen.getByRole('checkbox', { name: 'Eggs' })).not.toBeChecked()
await userEvent.click(screen.getByText('Eggs'))
expect(onChange).toHaveBeenLastCalledWith(['embryos', 'eggs'])
expect(screen.getByRole('checkbox', { name: 'Eggs' })).toBeChecked()`,
  },
];

/** The package stays out of the host app's way. */
export const packaging: Snippet[] = [
  {
    file: 'vite.config.ts',
    lang: 'ts',
    code: `rollupOptions: {
  // Externalize every bare specifier. All runtime imports are declared in
  // \`dependencies\`, so consumers resolve their own copies — critical for
  // react-aria-components, whose React context breaks across duplicates.
  // \`@/\` is our own source alias and must stay bundled.
  external: (id) =>
    !id.startsWith('.') && !id.startsWith('@/') && !path.isAbsolute(id),
  output: {
    // Single ES output, so one directive at the top marks every export as a
    // client component for the Next.js App Router.
    banner: "'use client';",
  },
},`,
  },
  {
    file: 'src/styles.css',
    lang: 'css',
    code: `/*
 * Deliberately does NOT import Tailwind. Components use plain BEM classes and
 * custom properties only, so pulling in Tailwind would ship a preflight reset
 * that clobbers consumer styles for no benefit. …
 */`,
  },
];

/** The API reference agents read is generated from the TypeScript source. */
export const agentDocs: Snippet[] = [
  {
    file: 'scripts/component-docs.mjs',
    lang: 'js',
    code: `const api = buildManifest()
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'components.json'), JSON.stringify(api, null, 2) + '\\n')
fs.writeFileSync(path.join(outDir, 'llms.txt'), renderMarkdown(api, { full: false }))
fs.writeFileSync(path.join(outDir, 'llms-full.txt'), renderMarkdown(api))`,
  },
  {
    file: 'dist/llms-full.txt (generated)',
    lang: 'md',
    code: `### RudiCheckboxGroup

A labelled set of \`RudiCheckbox\` options whose selection is a string array. \`label\` is required. Each child
checkbox must have a \`value\`.
…
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| \`label\` *(required)* | \`string\` |  | Group legend and accessible name. Required. |
| \`children\` *(required)* | \`React.ReactNode\` |  | The \`RudiCheckbox\` elements. Each needs a \`value\`. |
| \`description\` | \`string\` |  | Help text under the group. Hidden while \`errorMessage\` is shown. |
…`,
  },
];

/** Internal parts stopped leaking into app code (commit a999bc3). */
export const menu = {
  before: [
    {
      file: 'src/components/Menu/Menu.stories.tsx (before)',
      lang: 'tsx',
      code: `import { Separator, SubmenuTrigger, Text } from 'react-aria-components'
…
<RudiMenuItem id="rename" textValue="Rename">
  <RudiIcon icon="lucide:pencil" className="rudi-menu__item-icon" />
  <Text slot="label">Rename</Text>
</RudiMenuItem>
…
<Separator className="rudi-menu__separator" />`,
    },
  ] satisfies Snippet[],
  after: [
    {
      file: 'src/components/Menu/Menu.stories.tsx (after)',
      lang: 'tsx',
      code: `import { RudiMenuSeparator } from './MenuSeparator'
…
<RudiMenuItem id="rename" icon="lucide:pencil" label="Rename" />
…
<RudiMenuSeparator />`,
    },
  ] satisfies Snippet[],
};

/** A bug only a real screen found: text fields in table cells lost their arrow keys (commit 843ef85). */
export const tableCell: Snippet[] = [
  {
    file: 'src/components/Table/TableCell.tsx',
    lang: 'tsx',
    code: `// While a text field in this cell has focus, switch the grid into React Aria's
// edit mode (the one column resizing uses): arrow keys, Home/End and type-to-select
// stay with the field instead of moving focus between cells and rows. Tab still leaves.
const setEditing = (e: FocusEvent, editing: boolean) => {
  if (isTextEntry(e.target)) state?.setKeyboardNavigationDisabled(editing)
}
return (
  <div
    className="rudi-table__cell-content"
    data-align={resolved ?? 'start'}
    onFocus={(e) => setEditing(e, true)}
    onBlur={(e) => setEditing(e, false)}
  >`,
  },
];
