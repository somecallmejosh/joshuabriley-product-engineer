/** Site-wide navigation structure. Single source of truth for header + footer. */

export interface NavLink {
  href: string
  label: string
  /** Route prefixes that count as this link's section (defaults to the link's own path). */
  section?: string[]
}

const PROJECTS: NavLink = { href: '/projects/', label: 'Projects', section: ['/projects/', '/personal-projects/'] }
const BIOGRAPHY: NavLink = { href: '/about/', label: 'Biography', section: ['/about/', '/resume/', '/testimonials/'] }
const WRITING: NavLink = { href: '/blog/', label: 'Writing', section: ['/blog/'] }

const withSlash = (path: string) => (path.endsWith('/') ? path : `${path}/`)

/**
 * The link's state for the current route: 'page' when this is the exact page,
 * 'true' when the route is elsewhere in the link's section, otherwise undefined.
 * Used as the aria-current value by the header, mobile menu, and footer.
 */
export function navCurrent(pathname: string, link: NavLink): 'page' | 'true' | undefined {
  const path = withSlash(pathname)
  if (path === withSlash(link.href)) return 'page'
  if (link.href === '/') return undefined
  const prefixes = link.section ?? [link.href]
  return prefixes.some((prefix) => path.startsWith(withSlash(prefix))) ? 'true' : undefined
}

export const PRIMARY_NAV: NavLink[] = [
  { href: '/', label: 'Home' },
  PROJECTS,
  BIOGRAPHY,
  WRITING,
  { href: '/contact/', label: 'Contact' },
]

export const FOOTER_NAV: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Explore',
    links: [PROJECTS, BIOGRAPHY, WRITING],
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
