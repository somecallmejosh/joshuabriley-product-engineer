import type { ImageMetadata } from 'astro';
import ivfcryo from '~/assets/projects/ivfcryo/teaser.png';
import logatot from '~/assets/projects/logatot/teaser.png';
import vmspark from '~/assets/projects/vmspark/teaser.png';
import rudiment from '~/assets/projects/rudiment-ui/teaser.png';

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
  '/projects/rudiment-ui/': {
    src: rudiment,
    alt: 'A Rudiment UI bar chart in the Vitrea demo: shipments this month by service, with Premium Air highest at 6 and Economy Air at 5, then Premium Ground, Will Call, Economy International, and Premium International.',
  },
};
