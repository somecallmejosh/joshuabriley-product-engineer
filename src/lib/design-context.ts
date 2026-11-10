/**
 * The design system in one object, for coding agents. Shared by
 * /style-guide/system.json and `npm run design:context` (which writes
 * design-system/system.json), so the two are always the same data.
 */
import tokens from '../../design-system/tokens.json';
import rules from '../../design-system/rules.json';
import { componentCatalogue } from '~/lib/component-catalogue';
import { componentApiWithPolicy } from '~/lib/component-api';

export function buildDesignContext(origin = '') {
  return {
    $description: 'Design system for joshuabriley.com, generated from design-system/tokens.json, design-system/rules.json, src/lib/component-catalogue.ts, and each component’s Props. Do not edit by hand: run `npm run design:context`. Human-readable version: /style-guide/.',
    styleGuide: `${origin}/style-guide/`,
    workflow: [
      'Read tokens and rules (including rules.guidelines) before UI work.',
      'Build from the listed components and token utilities; a new pattern is not part of the system until it appears in /style-guide/ and src/lib/component-catalogue.ts.',
      'When an audit fails, fix the code. Adding tokens, exceptions, or baseline entries needs the site owner’s approval.',
    ],
    audits: [
      { command: 'npm run audit:design', checks: 'Hardcoded or off-palette colors, arbitrary values, literal font stacks, deprecated or forbidden prop values, token sync.' },
      { command: 'npm run audit:components', checks: 'Component reachability vs. the catalogue.' },
      { command: 'npm run audit:contrast', checks: 'WCAG contrast of token pairs.' },
      { command: 'npm run audit:style-guide', checks: 'Live WCAG audit of /style-guide/ (needs the dev server).' },
    ],
    tokens,
    rules: { rules: rules.rules, guidelines: rules.guidelines, exceptions: rules.exceptions },
    components: componentCatalogue.map((component) => ({
      ...component,
      ...('href' in component && { href: `${origin}${component.href}` }),
      props: componentApiWithPolicy(component.path),
    })),
  };
}
