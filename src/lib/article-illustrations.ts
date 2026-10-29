/** Accessible descriptions for ArticleIllustration, one per post, keyed by content id (the file name). */
export const illustrationDescriptions = {
  'a-new-species-arrives-the-coding-agent': 'Field notes on the coding agent, Agentus mimicus: a small dark creature with an antenna, standing on a stack of folders. Field marks: copies what it sees, forgets every night, follows clear rules. Status: spreading fast.',
  'life-in-the-button-colony': 'Field notes on the button, Buttonus variabilis: six slightly different buttons with different corners, fills, and outlines. Field marks: fourteen variants, breeds in isolation, six shades of blue. Status: overpopulated.',
  'the-cookie-banner-a-most-persistent-species': 'Field notes on the cookie banner, Consentia insistens: a dark banner covering half a page, with a bright Accept all button and a tiny settings link. Field marks: bright Accept button, a hidden Reject option, covers the content. Status: thriving, sadly.',
  'the-great-migration-of-the-hamburger-menu': 'Field notes on the hamburger menu, Navigatus abscondus: a three-striped menu icon with little feet, migrating along a dotted path to a desktop monitor. Field marks: three horizontal stripes, hides the navigation, migrating to desktop. Status: overpopulated on desktop.',
  'the-modal-in-its-natural-habitat': 'Field notes on the modal dialog, Dialogus interruptus: a dialog sitting over a dimmed page, with a tiny close button. Field marks: strikes on page load, tiny gray close button, loses keyboard focus. Status: best when invited.',
  'amelie-poulain-ux-engineer': 'A team badge for Amélie Poulain, UX engineer, drawn with her black bob and straight fringe. Known for fixing what no one logs, warm microcopy, and hidden Easter eggs.',
  'dwight-schrute-ux-engineer': 'A team badge for Dwight Schrute, UX engineer, drawn with his centre-parted hair, rectangular glasses, and tie. Known for a 74-row WCAG audit, trapped modal focus, and strict naming rules.',
  'happy-gilmore-ux-engineer': 'A team badge for Happy Gilmore, UX engineer, drawn with shaggy hair, an intense brow, a grin, and a striped hockey jersey. Known for a running-start drive, practicing the putts, and finding his happy place.',
  'keeley-jones-ux-engineer': 'A team badge for Keeley Jones, UX engineer, drawn with long hair, a side-swept fringe, hoop earrings, and a big smile. Known for reading the room, on-brand error states, and celebrating teammates.',
  'forrest-gump-ux-engineer': 'A team badge for Forrest Gump, UX engineer, drawn with his crew cut, suit, and a floating feather. Known for building for flip phones, sensible tab order, and asking users first.',
  'ron-swanson-ux-engineer': 'A team badge for Ron Swanson, UX engineer, drawn with his thick mustache and stern brow. Known for deleting the modals, zero trackers, and one field with one button.',
  'sheldon-cooper-ux-engineer': 'A team badge for Sheldon Cooper, UX engineer, drawn with a side part, a raised eyebrow, and a lightning bolt on his T-shirt. Known for working agreements, literal microcopy, and one spot per button.',
  'snoop-dogg-ux-engineer': 'A team badge for Snoop Dogg, UX engineer, drawn with long braids, dark sunglasses, a thin mustache and goatee, and a chain. Known for keeping it calm, plain-language docs, and keyboard drag and drop.',
  'ted-lasso-ux-engineer': 'A team badge for Ted Lasso, UX engineer, drawn with his visor, mustache, and whistle. Known for kind error messages, keyboard testing, and bringing biscuits.',
  'the-people-v-placeholder-text': 'A UI Court case file: placeholder text, wearing a disguise of glasses and a mustache, sits in an email field with no label. Charged with impersonating a label, vanishing on input, and failing contrast. Verdict: guilty, out on probation.',
  'the-people-v-superfluous-scroll-animation': 'A UI Court case file: a web page whose lower sections are still faded out, waiting to slide in, with a scrollbar beside it. Charged with holding text hostage, hijacking the scroll, and ignoring reduced motion. Verdict: motion privileges revoked.',
  'the-people-v-the-band-of-tumultuous-tooltips': 'A UI Court case file: a pile of overlapping tooltips and a title-attribute bubble crowd around a password field and its info icon. Charged with hiding required info, vanishing when approached, and ignoring touch and keyboard users. Verdict: ordered to break up.',
  'the-people-v-the-carousel': 'A UI Court case file: a homepage carousel with shifty eyes, arrows, and four slide dots. Charged with rotating without consent, hiding slides 2 to 5, and resisting pause. Verdict: sentenced to stay still.',
  'the-people-v-the-clickable-div': 'A UI Court case file: a div that looks like a Submit button, while the Tab key skips right past it. Charged with impersonating a button, ignoring the Tab key, and hiding its role. Verdict: replaced by a real button.',
  'automation-work-behind-the-scenes': 'A story generator runs out of sight, so it misses out on funding, adoption, and credit, which leaves it easy to cut.',
  'design-system-rules-for-ai-agents': 'A design audit catches a default-palette-class violation and blocks the commit until the code uses a system color instead.',
  'future-proofing-front-end-dev-roles': 'The front-end role splits into two paths: design engineers focused on interface quality, and engineers who direct AI agents through review and architecture.',
  'measuring-style-guide-adoption': 'A repository scan lists references to rudi-button, rudi-dialog, and the rudi accent color token, and collects them into a baseline report.',
  'people-still-print-web-pages': 'A pizza menu on screen becomes a printed page, with the online-ordering link written out as a footnote.',
  'the-hidden-cost-of-component-inconsistency': 'Three different versions of the same Save button, each designed, built, and tested separately, add up to repeated rework.',
  'web-component-libraries-in-the-ai-era': 'A timeline of web components: the 2011 proposal, the 2014 v1 specifications, Lit in 2019, shadcn/ui in 2023, and AI coding agents from 2024.',
  'where-to-learn-modern-front-end': 'A reading list with courses and books checked off, and newsletters and podcasts still to go.',
} as const;

export type IllustratedPost = keyof typeof illustrationDescriptions;

export const hasIllustration = (id: string): id is IllustratedPost => id in illustrationDescriptions;
