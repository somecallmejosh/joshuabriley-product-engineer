import { readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { illustrationDescriptions } from '~/lib/article-illustrations';

const postIds = readdirSync('src/content/posts')
  .filter((file) => /\.mdx?$/.test(file))
  .map((file) => file.replace(/\.mdx?$/, ''));

describe('article illustrations', () => {
  it('gives every post an illustration', () => {
    expect(postIds.filter((id) => !(id in illustrationDescriptions))).toEqual([]);
  });

  it('has no illustrations for posts that no longer exist', () => {
    expect(Object.keys(illustrationDescriptions).filter((id) => !postIds.includes(id))).toEqual([]);
  });
});
