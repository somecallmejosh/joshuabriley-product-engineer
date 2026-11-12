/**
 * Writing topics. The blog index renders one section per topic (anchored by
 * `id`) from each post's frontmatter `category`; the header's Writing menu
 * links to the same anchors.
 */
export const writingTopics = [
  { id: 'design-systems', category: 'Design Systems', title: 'Design', emphasis: 'systems', description: 'Architecture, adoption, and the effort behind a dependable component system.' },
  { id: 'ai-and-engineering', category: 'AI & Engineering', title: 'AI &', emphasis: 'engineering', description: 'Research and perspectives on changing tools, responsibilities, and ownership.' },
  { id: 'ui-engineering', category: 'UI Engineering', title: 'UI', emphasis: 'engineering', description: 'Interface craft beyond the component library, and the skills behind it.' },
  { id: 'wild-interfaces', category: 'Wild Interfaces', title: 'Wild', emphasis: 'Interfaces', description: 'Interface patterns described in the style of a nature documentary.' },
  { id: 'ui-court', category: 'UI Court', title: 'UI', emphasis: 'Court', description: 'Bad interface patterns stand trial. Each case has witnesses, cross-examination, and a verdict.' },
  { id: 'fictional-ux-engineers', category: 'Fictional UX Engineers', title: 'Fictional UX', emphasis: 'Engineers', description: 'Famous characters imagined as members of a product team. Each profile covers what their habits teach about interface work.' },
];
