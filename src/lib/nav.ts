/** Site-wide navigation structure. Single source of truth for header + footer. */

export interface NavLink {
  href: string
  label: string
}

export const PRIMARY_NAV: NavLink[] = [
  { href: '/projects/', label: 'Work' },
  { href: '/about/', label: 'About' },
  { href: '/resume/', label: 'Résumé' },
  { href: '/contact/', label: 'Contact' },
]

export const FOOTER_NAV: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Explore',
    links: [
      { href: '/projects/', label: 'Work' },
      { href: '/blog/', label: 'Writing' },
      { href: '/tools/', label: 'Tools' },
    ],
  },
  {
    heading: 'About & experience',
    links: [
      { href: '/about/', label: 'About' },
      { href: '/resume/', label: 'Résumé' },
      { href: '/testimonials/', label: 'Recommendations' },
      { href: '/personal-projects/', label: 'Personal projects' },
    ],
  },
]
