/** Site-wide navigation structure. Single source of truth for header + footer. */

export interface NavLink {
  href: string
  label: string
}

export const PRIMARY_NAV: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/projects/', label: 'Projects' },
  { href: '/about/', label: 'Biography' },
  { href: '/blog/', label: 'Writing' },
  { href: '/contact/', label: 'Contact' },
]

export const FOOTER_NAV: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Explore',
    links: [
      { href: '/projects/', label: 'Projects' },
      { href: '/about/', label: 'Biography' },
      { href: '/blog/', label: 'Writing' },
    ],
  },
  {
    heading: 'More',
    links: [
      { href: '/', label: 'Home' },
      { href: '/resume/', label: 'Résumé' },
      { href: '/tools/', label: 'Tools' },
      { href: '/testimonials/', label: 'Feedback' },
      { href: '/personal-projects/', label: 'Personal projects' },
    ],
  },
]
