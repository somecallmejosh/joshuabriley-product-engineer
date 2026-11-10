/** Components reached by public pages, excluding style-guide-only examples. */
export const componentCatalogue = [
  {
    "name": "LiveEmbed",
    "path": "src/components/patterns/LiveEmbed.astro",
    "group": "patterns",
    "note": "An optional, explicitly loaded live website preview.",
    "href": "/personal-projects/rudiment-ui/"
  },
  {
    "name": "ScrapPiece",
    "path": "src/components/patterns/scrapbook/ScrapPiece.astro",
    "group": "patterns",
    "note": "One or more screenshots in a hairline panel on personal project pages.",
    "href": "/personal-projects/beckit/"
  },
  {
    "name": "ScrapMosaic",
    "path": "src/components/patterns/scrapbook/ScrapMosaic.astro",
    "group": "patterns",
    "note": "A tidy grid of details cut from a personal project's real screens.",
    "href": "/personal-projects/"
  },
  {
    "name": "Analytics",
    "path": "src/components/chrome/Analytics.astro",
    "group": "chrome",
    "note": "The site analytics snippet in the document head.",
    "href": "/"
  },
  {
    "name": "DesktopNav",
    "path": "src/components/chrome/DesktopNav.astro",
    "group": "chrome",
    "note": "Desktop primary navigation: Work and About disclosure panels on one shared surface that resizes between them.",
    "href": "/"
  },
  {
    "name": "Footer",
    "path": "src/components/chrome/Footer.astro",
    "group": "chrome",
    "note": "Site navigation, contact information, and supporting links.",
    "href": "/"
  },
  {
    "name": "Header",
    "path": "src/components/chrome/Header.astro",
    "group": "chrome",
    "note": "The shared wordmark, primary navigation, and contact link.",
    "href": "/"
  },
  {
    "name": "MobileNav",
    "path": "src/components/chrome/MobileNav.astro",
    "group": "chrome",
    "note": "The mobile navigation modal with outside-click and Escape dismissal, focus containment, and scroll locking.",
    "href": "/"
  },
  {
    "name": "SkipLink",
    "path": "src/components/chrome/SkipLink.astro",
    "group": "chrome",
    "note": "The first keyboard stop, taking readers directly to main content.",
    "href": "/"
  },
  {
    "name": "Field",
    "path": "src/components/form/Field.astro",
    "group": "form",
    "note": "A visible label with optional hint, required marker, and error text.",
    "href": "/contact/"
  },
  {
    "name": "FormAlert",
    "path": "src/components/form/FormAlert.astro",
    "group": "form",
    "note": "Polite success status or assertive error feedback.",
    "href": "/contact/"
  },
  {
    "name": "Input",
    "path": "src/components/form/Input.astro",
    "group": "form",
    "note": "Text, email, and phone inputs used by the contact form.",
    "href": "/contact/"
  },
  {
    "name": "SubmitButton",
    "path": "src/components/form/SubmitButton.astro",
    "group": "form",
    "note": "Primary action with ready, busy, and disabled states.",
    "href": "/contact/"
  },
  {
    "name": "Textarea",
    "path": "src/components/form/Textarea.astro",
    "group": "form",
    "note": "Multiline input with explicit label and description references.",
    "href": "/contact/"
  },
  {
    "name": "ContactForm",
    "path": "src/components/islands/ContactForm.astro",
    "group": "islands",
    "note": "Client-side validation, submission, and status handling for contact messages.",
    "href": "/contact/"
  },
  {
    "name": "ContrastGame",
    "path": "src/components/islands/ContrastGame.astro",
    "group": "islands",
    "note": "A ten-round WCAG contrast guessing game built from faded site tokens.",
    "href": "/404/"
  },
  {
    "name": "CopyButton",
    "path": "src/components/islands/CopyButton.astro",
    "group": "islands",
    "note": "A clipboard action with visible and announced feedback.",
    "href": "/projects/ivfcryo/"
  },
  {
    "name": "Diagnostic",
    "path": "src/components/islands/Diagnostic.astro",
    "group": "islands",
    "note": "An interactive sample audit with review findings and proposed fixes.",
    "href": "/tools/audit-findings/"
  },
  {
    "name": "InspectorMode",
    "path": "src/components/islands/InspectorMode.astro",
    "group": "islands",
    "note": "A keyboard-activated layout overlay for inspecting the site.",
    "href": "/"
  },
  {
    "name": "DriftGame",
    "path": "src/components/islands/DriftGame.astro",
    "group": "islands",
    "note": "Compare two copies of a component and pick the properties that drifted.",
    "href": "/play/spot-the-drift/"
  },
  {
    "name": "JustEnoughGame",
    "path": "src/components/islands/JustEnoughGame.astro",
    "group": "islands",
    "note": "Slide faded text down to the edge of WCAG AA and score how close you land.",
    "href": "/play/just-enough-contrast/"
  },
  {
    "name": "OutlineGame",
    "path": "src/components/islands/OutlineGame.astro",
    "group": "islands",
    "note": "Raise and lower heading levels with a live outline check.",
    "href": "/play/fix-the-outline/"
  },
  {
    "name": "QuizGame",
    "path": "src/components/islands/QuizGame.astro",
    "group": "islands",
    "note": "A multiple-choice game with explanations, used by the /play/ games.",
    "href": "/play/alt-or-not/"
  },
  {
    "name": "RoiCalculator",
    "path": "src/components/islands/RoiCalculator.astro",
    "group": "islands",
    "note": "A rework estimate that recalculates from the reader’s inputs.",
    "href": "/tools/roi-calculator/"
  },
  {
    "name": "ScorecardEngine",
    "path": "src/components/islands/ScorecardEngine.astro",
    "group": "islands",
    "note": "A design-system self-assessment with local progress and report output.",
    "href": "/tools/scorecard/"
  },
  {
    "name": "SnapGridGame",
    "path": "src/components/islands/SnapGridGame.astro",
    "group": "islands",
    "note": "Nudge pieces onto an 8px grid with buttons, arrow keys or dragging.",
    "href": "/play/snap-to-grid/"
  },
  {
    "name": "TabOrderGame",
    "path": "src/components/islands/TabOrderGame.astro",
    "group": "islands",
    "note": "Reorder form controls and replay the focus order across the layout.",
    "href": "/play/tab-order/"
  },
  {
    "name": "ToolBench",
    "path": "src/components/islands/ToolBench.astro",
    "group": "islands",
    "note": "The tools page's list: a small working piece of each tool on tiles that share radius and spacing values.",
    "href": "/tools/"
  },
  {
    "name": "TokenPlayground",
    "path": "src/components/islands/TokenPlayground.astro",
    "group": "islands",
    "note": "Live controls showing how shared tokens change several UI elements.",
    "href": "/tools/token-playground/"
  },
  {
    "name": "ViewSource",
    "path": "src/components/islands/ViewSource.astro",
    "group": "islands",
    "note": "An optional Alt/Option-hover overlay for elements carrying source metadata.",
    "href": "/projects/ivfcryo/"
  },
  {
    "name": "Container",
    "path": "src/components/layout/Container.astro",
    "group": "layout",
    "note": "Content widths with a shared 24px horizontal gutter.",
    "href": "/"
  },
  {
    "name": "Section",
    "path": "src/components/layout/Section.astro",
    "group": "layout",
    "note": "Surface and spacing wrapper used by case studies and supporting pages.",
    "href": "/privacy/"
  },
  {
    "name": "CaseReview",
    "path": "src/components/patterns/CaseReview.astro",
    "group": "patterns",
    "note": "Case-study shortcuts to the summary, interface, and outcomes.",
    "href": "/projects/ivfcryo/"
  },
  {
    "name": "CaseSection",
    "path": "src/components/patterns/case/CaseSection.astro",
    "group": "patterns",
    "note": "One case-study section: sticky heading, body column, and a media slot for full-width plates.",
    "href": "/projects/vmspark/#context"
  },
  {
    "name": "CaseProse",
    "path": "src/components/patterns/case/CaseProse.astro",
    "group": "patterns",
    "note": "Case-study body paragraphs, in the body column or continued between plates.",
    "href": "/projects/vmspark/#decision-inbox"
  },
  {
    "name": "CaseCards",
    "path": "src/components/patterns/case/CaseCards.astro",
    "group": "patterns",
    "note": "A grid of titled points with icons, with optional checklists for audience needs.",
    "href": "/projects/vmspark/#context"
  },
  {
    "name": "HeuristicScores",
    "path": "src/components/patterns/case/HeuristicScores.astro",
    "group": "patterns",
    "note": "Nielsen heuristic scores before and after, with the fix and what's still open.",
    "href": "/projects/vmspark/#research"
  },
  {
    "name": "CasePersonas",
    "path": "src/components/patterns/case/CasePersonas.astro",
    "group": "patterns",
    "note": "Personas with needs, frustrations, and a line saying what each one is based on.",
    "href": "/projects/vmspark/#research"
  },
  {
    "name": "CaseJourney",
    "path": "src/components/patterns/case/CaseJourney.astro",
    "group": "patterns",
    "note": "A journey map as live text: stages side by side on large screens, stacked on small ones.",
    "href": "/projects/vmspark/#research"
  },
  {
    "name": "CaseFor",
    "path": "src/components/patterns/case/CaseFor.astro",
    "group": "patterns",
    "note": "A line tying a design decision to its personas and journey stage, with links to both.",
    "href": "/projects/vmspark/#decisions"
  },
  {
    "name": "CaseResults",
    "path": "src/components/patterns/case/CaseResults.astro",
    "group": "patterns",
    "note": "Headline metrics and results grouped by who they changed things for.",
    "href": "/projects/vmspark/#outcomes"
  },
  {
    "name": "CaseQuote",
    "path": "src/components/patterns/case/CaseQuote.astro",
    "group": "patterns",
    "note": "A client or user testimonial with name, role, and optional photo.",
    "href": "/projects/vmspark/"
  },
  {
    "name": "CaseLimitations",
    "path": "src/components/patterns/case/CaseLimitations.astro",
    "group": "patterns",
    "note": "The closing list of limitations and next steps, with an optional later group.",
    "href": "/projects/vmspark/#edges"
  },
  {
    "name": "DriftSample",
    "path": "src/components/patterns/DriftSample.astro",
    "group": "patterns",
    "note": "A component drawn as designed or with drifted properties, for Spot the drift.",
    "href": "/play/spot-the-drift/"
  },
  {
    "name": "GameStage",
    "path": "src/components/patterns/GameStage.astro",
    "group": "patterns",
    "note": "Picks the right game island for a game page or a post embed.",
    "href": "/play/tab-order/"
  },
  {
    "name": "QuizVisual",
    "path": "src/components/patterns/QuizVisual.astro",
    "group": "patterns",
    "note": "The image or interface scene shown above a game question.",
    "href": "/play/alt-or-not/"
  },
  {
    "name": "CodeBlock",
    "path": "src/components/patterns/CodeBlock.astro",
    "group": "patterns",
    "note": "A captioned code artifact with article-matched syntax highlighting, line numbers, and a copy action. Renders fenced code in posts and tool essays."
  },
  {
    "name": "FidelityBand",
    "path": "src/components/patterns/FidelityBand.astro",
    "group": "patterns",
    "note": "A case-study comparison of design fidelity and implementation.",
    "href": "/projects/ivfcryo/"
  },
  {
    "name": "Lightbox",
    "path": "src/components/patterns/Lightbox.astro",
    "group": "patterns",
    "note": "The shared artifact viewer, with zoom and keyboard dismissal.",
    "href": "/projects/ivfcryo/"
  },
  {
    "name": "Metric",
    "path": "src/components/patterns/Metric.astro",
    "group": "patterns",
    "note": "A measured result with a label and supporting context.",
    "href": "/projects/ivfcryo/"
  },
  {
    "name": "Plate",
    "path": "src/components/patterns/Plate.astro",
    "group": "patterns",
    "note": "A full design sheet with a caption and keyboard-accessible zoom.",
    "href": "/projects/ivfcryo/"
  },
  {
    "name": "Portrait",
    "path": "src/components/patterns/Portrait.astro",
    "group": "patterns",
    "note": "The responsive photograph used on the home and about pages.",
    "href": "/about/"
  },
  {
    "name": "ProjectHero",
    "path": "src/components/patterns/ProjectHero.astro",
    "group": "patterns",
    "note": "A project title, ownership details, evidence, and interface preview.",
    "href": "/projects/ivfcryo/"
  },
  {
    "name": "GalleryLink",
    "path": "src/components/patterns/GalleryLink.astro",
    "group": "patterns",
    "note": "Points from a case study to its gallery of extra screens and wireframes.",
    "href": "/projects/ivfcryo/"
  },
  {
    "name": "ProjectNext",
    "path": "src/components/patterns/ProjectNext.astro",
    "group": "patterns",
    "note": "A large link to the next project, using the shared project data.",
    "href": "/projects/ivfcryo/"
  },
  {
    "name": "Recommendation",
    "path": "src/components/patterns/Recommendation.astro",
    "group": "patterns",
    "note": "A quotation attributed to a named colleague; regular and featured layouts.",
    "href": "/testimonials/"
  },
  {
    "name": "ScrollShot",
    "path": "src/components/patterns/ScrollShot.astro",
    "group": "patterns",
    "note": "A scrollable long-page screenshot with an inspection control.",
    "href": "/projects/vmspark/"
  },
  {
    "name": "SiteShot",
    "path": "src/components/patterns/SiteShot.astro",
    "group": "patterns",
    "note": "A website screenshot with a caption and optional image viewer.",
    "href": "/personal-projects/rudiment-ui/"
  },
  {
    "name": "Tldr",
    "path": "src/components/patterns/Tldr.astro",
    "group": "patterns",
    "note": "A project summary with expandable decisions, evidence, and reflection.",
    "href": "/projects/ivfcryo/#tldr"
  },
  {
    "name": "ToolIllustration",
    "path": "src/components/patterns/ToolIllustration.astro",
    "group": "patterns",
    "note": "An explanatory SVG for each of the four tools.",
    "href": "/tools/"
  },
  {
    "name": "GameIllustration",
    "path": "src/components/patterns/GameIllustration.astro",
    "group": "patterns",
    "note": "A playful explanatory SVG for each /play/ game.",
    "href": "/play/"
  },
  {
    "name": "ProjectIllustration",
    "path": "src/components/patterns/ProjectIllustration.astro",
    "group": "patterns",
    "note": "An explanatory SVG for each case-study hero, drawn in the same style as the tool illustrations.",
    "href": "/projects/ivfcryo/"
  },
  {
    "name": "ProjectScreenshot",
    "path": "src/components/patterns/ProjectScreenshot.astro",
    "group": "patterns",
    "note": "A cropped app screen for each project in WorkList, in the same mat and frame as the illustrations.",
    "href": "/projects/"
  },
  {
    "name": "ArticleIllustration",
    "path": "src/components/patterns/ArticleIllustration.astro",
    "group": "patterns",
    "note": "An explanatory SVG for each article, drawn in the same style as the tool illustrations.",
    "href": "/blog/"
  },
  {
    "name": "WorkList",
    "path": "src/components/patterns/WorkList.astro",
    "group": "patterns",
    "note": "Selected case studies with interface images, roles, and results.",
    "href": "/projects/"
  },
  {
    "name": "Heading",
    "path": "src/components/primitives/Heading.astro",
    "group": "primitives",
    "note": "Heading semantics and visual size controlled independently.",
    "href": "/projects/ivfcryo/"
  },
  {
    "name": "Icon",
    "path": "src/components/primitives/Icon.astro",
    "group": "primitives",
    "note": "Iconify icons with decorative or explicitly labelled semantics.",
    "href": "/contact/"
  },
  {
    "name": "Link",
    "path": "src/components/primitives/Link.astro",
    "group": "primitives",
    "note": "Navigation, inline, and arrow links used by the site chrome and legal pages.",
    "href": "/privacy/"
  },
  {
    "name": "Logo",
    "path": "src/components/primitives/Logo.astro",
    "group": "primitives",
    "note": "The Style Script wordmark used in the header and footer.",
    "href": "/"
  },
  {
    "name": "Text",
    "path": "src/components/primitives/Text.astro",
    "group": "primitives",
    "note": "Body, caption, and supporting text used by case studies and supporting pages.",
    "href": "/privacy/"
  },
  {
    "name": "ArticleTable",
    "path": "src/components/writing/ArticleTable.astro",
    "group": "writing",
    "note": "A labelled, keyboard-scrollable table region that preserves column headings. Renders any Markdown table in a post; no current post has one."
  }
] as const;
