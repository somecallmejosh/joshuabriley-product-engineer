import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    role: z.string(),
    company: z.string(),
    quote: z.string(),
    initials: z.string(),
    /** Optional photograph shown with the attribution. */
    image: z.string().optional(),
    /** Use the larger featured recommendation layout. */
    featured: z.boolean().optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    /** Plain-text category shown above the post title (e.g. "Design Systems"). */
    category: z.string(),
    /** Editorial topic metadata. */
    tags: z.array(z.string()).default([]),
    /** Read time in minutes (computed by hand for now). */
    readMinutes: z.number(),
    /** Hide from listings — useful for drafts. */
    draft: z.boolean().default(false),

  }),
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tools' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    /** Which island renders above the essay. Must be a key of ISLANDS in ToolPage.astro. */
    tool: z.enum(['ScorecardEngine', 'RoiCalculator', 'TokenPlayground', 'Diagnostic']),
    /** Shown in the hero mono-label ("Tools / Self-assessment") and on index rows. */
    kind: z.string(),
    /** Ordering on the /tools/ index. Lower runs first. */
    order: z.number(),
    /** One line describing what you get out of it. Index rows + home band. */
    takeaway: z.string(),
    /** Link text on the index. Verb-first and specific to this tool, so the
     *  four links stay distinguishable when read on their own. */
    action: z.string(),
    /** Hero pill list: the tool's properties, not topics ("No signup", "Nothing saved"). */
    props: z.array(z.string()).default([]),
    /** How to drive the tool. Renders directly above it, so it never says "below". */
    instructions: z.string(),
    /* No `icon` field: the tool's illustration is the <ToolIllustration> keyed to
       `tool` above, so the home band, the index and the tool page all draw the
       same mark from one place rather than from a per-file icon name. */
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { testimonials, posts, tools };
