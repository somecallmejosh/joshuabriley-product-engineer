// Rewrites fenced code in MDX into <CodeBlock code lang />, so articles use the
// same highlighted, copyable artifact as the case studies instead of Astro's
// default Shiki <pre>. Pages rendering MDX must pass CodeBlock in `components`.
export default function remarkCodeBlock() {
  const walk = (node) => {
    node.children?.forEach((child, i) => {
      if (child.type !== 'code') return walk(child);
      const attributes = [{ type: 'mdxJsxAttribute', name: 'code', value: child.value }];
      if (child.lang) attributes.push({ type: 'mdxJsxAttribute', name: 'lang', value: child.lang });
      node.children[i] = { type: 'mdxJsxFlowElement', name: 'CodeBlock', attributes, children: [], position: child.position };
    });
  };
  return walk;
}
