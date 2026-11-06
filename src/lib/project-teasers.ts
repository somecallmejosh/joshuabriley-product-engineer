import type { ImageMetadata } from 'astro';
import ivfcryo from '~/assets/projects/ivfcryo/teaser.png';
import logatot from '~/assets/projects/logatot/teaser.png';
import vmspark from '~/assets/projects/vmspark/teaser.png';
import rudiment from '~/assets/projects/rudiment-ui/teaser.png';
import tokenGalaga from '~/assets/projects/token-galaga/teaser.png';
import beckit from '~/assets/projects/beckit/teaser.png';

/**
 * Close-up teaser images for project lists, keyed by project URL. Each is one
 * signature detail of the real app (seed data only), cropped 4:3 and centered
 * on its subject from a 2x light-mode capture. Projects without an entry keep
 * their ProjectIllustration drawing.
 */
export const projectTeasers: Record<string, { src: ImageMetadata; alt: string }> = {
  '/projects/ivfcryo/': {
    src: ivfcryo,
    alt: 'The IVFCRYO package picker: three shipper cards, CryoPort Standard, CryoPort Plus, and Vapor Shipper Mini, each with its size, and CryoPort Plus selected.',
  },
  '/projects/logatot/': {
    src: logatot,
    alt: 'A Logatot child profile: a photo of Liam Carter, age 3, marked active, above his health details.',
  },
  '/projects/vmspark/': {
    src: vmspark,
    alt: 'The VMSpark job list columns editor: numbered column cards with drag handles and buttons to move each column up, down, or out of the table.',
  },
  '/personal-projects/rudiment-ui/': {
    src: rudiment,
    alt: 'Rudiment UI product cards in a furniture storefront: a green velvet sofa with a Bestseller badge, a favorite button, a 4.8 star rating, a sale price, and an Add to cart button.',
  },
  '/personal-projects/beckit/': {
    src: beckit,
    alt: 'From the beckit landing page: an illustration of a person lying on a rug beside an open journal, next to a card with the thought “They all think I’m not up to the job” and Mind reading selected among the thinking-trap chips.',
  },
  '/personal-projects/token-galaga/': {
    src: tokenGalaga,
    alt: 'The Token Adventure star chart: a glowing path of numbered sectors, with sectors 4 to 9 cleared and sector 10 next.',
  },
};
