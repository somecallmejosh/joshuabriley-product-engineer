import { writingTopics } from './writing-topics'

/** Site-wide navigation structure. Single source of truth for header + footer. */

export interface NavLink {
  href: string
  label: string
}

export interface NavMenuLink extends NavLink {
  description: string
}

export interface NavMenu {
  id: string
  label: string
  /** Path prefixes that make this menu the current section. */
  match: string[]
  /** Lead column beside the links: featured case studies, the featured testimonial, or the latest article. */
  feature?: 'work' | 'testimonial' | 'writing'
  /** Heading over the links when a feature column sits beside them. */
  linksLabel?: string
  links: NavMenuLink[]
  /** The section's index page, linked after the menu's links in the footer. */
  overview?: NavLink
}

/** Desktop header menus, followed by the contact link. */
export const HEADER_MENUS: NavMenu[] = [
  {
    id: 'work',
    label: 'Work',
    match: ['/projects/', '/personal-projects/', '/tools/', '/play/'],
    feature: 'work',
    linksLabel: 'More',
    links: [
      { href: '/personal-projects/', label: 'Personal projects', description: 'Things I build on my own time.' },
      { href: '/tools/', label: 'Tools', description: 'Free design system tools, no signup.' },
      { href: '/play/', label: 'Play', description: 'Short games about accessible interfaces.' },
    ],
    overview: { href: '/projects/', label: 'All projects' },
  },
  {
    id: 'about',
    label: 'About',
    match: ['/about/', '/resume/', '/testimonials/'],
    feature: 'testimonial',
    linksLabel: 'About me',
    links: [
      { href: '/about/', label: 'Biography', description: '20+ years framing, designing, and building products.' },
      { href: '/resume/', label: 'Résumé', description: 'Roles, skills, and a PDF to download.' },
      { href: '/testimonials/', label: 'Testimonials', description: 'Recommendations from clients and colleagues.' },
    ],
  },
  {
    id: 'writing',
    label: 'Writing',
    match: ['/blog/'],
    feature: 'writing',
    linksLabel: 'Topics',
    links: [
      ...writingTopics.map((topic) => ({ href: `/blog/#${topic.id}`, label: topic.category, description: topic.description })),
      { href: '/blog/#books', label: 'Longer reads', description: 'Two free online books, each on a single subject.' },
    ],
    overview: { href: '/blog/', label: 'All writing' },
  },
]
