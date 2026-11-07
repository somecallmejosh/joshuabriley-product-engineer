import type { ImageMetadata } from 'astro';
import ivfcryo from '~/assets/projects/ivfcryo/teaser.png';
import logatot from '~/assets/projects/logatot/teaser.png';
import vmspark from '~/assets/projects/vmspark/teaser.png';
import rudiment from '~/assets/projects/rudiment-ui/teaser.png';
import tokenGalaga from '~/assets/projects/token-galaga/teaser.png';
import beckit from '~/assets/projects/beckit/teaser.png';
import clempo from '~/assets/projects/clempo/teaser.png';

/**
 * Close-up teaser images for project lists, keyed by project URL. Each is one
 * signature detail of the real app (seed data only), cropped 4:3 and centered
 * on its subject from a 2x light-mode capture. Projects without an entry keep
 * their ProjectIllustration drawing.
 */
export const projectTeasers: Record<string, { src: ImageMetadata; alt: string }> = {
  '/projects/ivfcryo/': {
    src: ivfcryo,
    alt: 'IVFCRYO shipment tracking: a probe temperature of −192.9 °C, the coldest and warmest readings, “All 12 below set-point,” and the start of the temperature chart under its −150 °C set-point line.',
  },
  '/projects/logatot/': {
    src: logatot,
    alt: 'The Logatot Voiceboard on a phone: a microphone card reading “Ready to listen. Say Logatot to record a moment,” with the example “Logatot, Ava woke up,” above the day picker.',
  },
  '/projects/vmspark/': {
    src: vmspark,
    alt: 'VMSpark custom rules: a table of numbered rules with drag handles, up and down buttons, Active switches, and conditions such as “Job: Profession contains RN” and “Job: Status is Open.”',
  },
  '/personal-projects/rudiment-ui/': {
    src: rudiment,
    alt: 'Rudiment UI components side by side: buttons, a success alert, status tags, an email input, a checkbox group, switches, circular progress rings, a revenue stat card, a progress bar, and a donut chart.',
  },
  '/personal-projects/beckit/': {
    src: beckit,
    alt: 'beckit Insights: a heatmap of when journal entries happen by day and time of day, in shades of teal, busiest on Friday afternoons.',
  },
  '/personal-projects/clempo/': {
    src: clempo,
    alt: 'The Clempo Budget card: $571.50 left to spend, a green ring at 63 percent, and $978.50 spent of a $1,550.00 budget.',
  },
  '/personal-projects/token-galaga/': {
    src: tokenGalaga,
    alt: 'The Token Adventure Game Clear screen: a neon pink card over a sunburst, reading “Game Clear, the Token Belt, Ace Pilot,” with 20 sectors cleared and +3520 total XP.',
  },
};
