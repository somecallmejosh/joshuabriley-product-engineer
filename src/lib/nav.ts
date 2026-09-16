/** Site-wide navigation structure. Single source of truth for header + footer. */

export interface NavLink {
  href: string
  label: string
}

export const PRIMARY_NAV: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/projects/', label: 'Projects' },
  { href: '/resume/', label: 'Résumé' },
  { href: '/contact/', label: 'Contact' },
]

export const FOOTER_NAV: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Site',
    links: [
      { href: '/about/', label: 'About' },
      { href: '/projects/', label: 'Projects' },
      { href: '/resume/', label: 'Résumé' },
      { href: '/contact/', label: 'Contact' },
    ],
  },
  {
    heading: 'More',
    links: [
      { href: '/personal-projects/', label: 'Personal Projects' },
      { href: '/testimonials/', label: 'Testimonials' },
      { href: '/blog/', label: 'Blog' },
      { href: '/tools/', label: 'Tools' },
      { href: '/style-guide/', label: 'Style Guide' },
    ],
  },
]
