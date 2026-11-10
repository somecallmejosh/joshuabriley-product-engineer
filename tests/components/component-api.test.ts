import { describe, expect, it } from 'vitest';
import { componentApi, parseComponentApi } from '~/lib/component-api';

describe('parseComponentApi', () => {
  it('reads names, types, required flags, JSDoc, and defaults', () => {
    const props = parseComponentApi(`---
type Size = 'sm' | 'lg';
interface Props {
  /** Visible text. */
  label: string;
  size?: Size;
  class?: string;
}
const { label, size = 'sm', class: className } = Astro.props;
---
<p>{label}</p>`);
    expect(props).toEqual([
      { name: 'label', type: 'string', required: true, description: 'Visible text.' },
      { name: 'size', type: "'sm' | 'lg'", required: false, default: "'sm'" },
      { name: 'class', type: 'string', required: false },
    ]);
  });

  it('returns an empty list when a component takes no props', () => {
    expect(parseComponentApi('---\nconst x = 1;\n---\n<p />')).toEqual([]);
  });
});

describe('componentApi', () => {
  it('reads real components', () => {
    const field = componentApi('src/components/form/Field.astro');
    expect(field.find((p) => p.name === 'id')).toMatchObject({ required: false, default: '`field-${name}`', description: 'Stable id; auto-generated if omitted.' });
    expect(field.find((p) => p.name === 'label')).toMatchObject({ required: true, type: 'string' });

    const submit = componentApi('src/components/form/SubmitButton.astro');
    expect(submit.find((p) => p.name === 'loadingLabel')?.default).toBe("'Sending…'");

    const heading = componentApi('src/components/primitives/Heading.astro');
    expect(heading.find((p) => p.name === 'level')?.type).toBe('1 | 2 | 3 | 4 | 5 | 6');
    expect(heading.find((p) => p.name === 'tone')?.default).toBe("'ink'");
  });

  it('throws for an unknown path', () => {
    expect(() => componentApi('src/components/Nope.astro')).toThrow(/no component/);
  });
});

describe('local types', () => {
  it('inlines local interfaces used as array element types', () => {
    const [items] = parseComponentApi(`---
interface Item {
  /** Shown first. */
  name: string;
  href?: string;
}
interface Props { items: Item[]; }
---`);
    expect(items.type).toBe('{ name: string; href?: string; }[]');
  });
});

describe('componentApiWithPolicy', () => {
  it('attaches the audited value policy from rules.json', async () => {
    const { componentApiWithPolicy } = await import('~/lib/component-api');
    const tone = componentApiWithPolicy('src/components/primitives/Heading.astro').find((p) => p.name === 'tone');
    expect(tone?.policy?.deprecated?.coral).toBe('accent');
  });
});
