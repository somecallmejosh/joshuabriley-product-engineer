import { getCollection } from 'astro:content';
import { selectedWork } from './selected-work';
import { writingTopics } from './writing-topics';

/**
 * Content behind the header menus' feature columns, shared by the desktop
 * dropdowns and the mobile sheet so both always show the same things.
 */
export async function getNavFeatures() {
  const caseStudies = selectedWork.filter((work) => work.href.startsWith('/projects/'));
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id),
  );
  const [latest, ...older] = posts;
  // The testimonials marked for the menu are pre-rendered; each menu's script
  // shows one at random. Without script, the featured one shows (or the first).
  const testimonials = (await getCollection('testimonials', ({ data }) => data.menu)).sort((a, b) => a.data.order - b.data.order);
  const defaultTestimonial = testimonials.find((entry) => entry.data.featured) ?? testimonials[0];
  // The blog index leads with the latest post and only renders a topic section
  // when older posts fill it, so link only to sections that exist.
  const filledCategories = new Set(older.map((post) => post.data.category));
  const topicHrefs = new Set(writingTopics.map((topic) => `/blog/#${topic.id}`));
  const liveTopicHrefs = new Set(writingTopics.filter((topic) => filledCategories.has(topic.category)).map((topic) => `/blog/#${topic.id}`));
  const linkExists = (href: string) => !topicHrefs.has(href) || liveTopicHrefs.has(href);
  return { caseStudies, latest, testimonials, defaultTestimonial, linkExists };
}

export const formatNavDate = (date: Date) =>
  date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** Whether `href` is the current page or a parent section of it. */
export function currentMatcher(pathname: string) {
  const current = pathname.replace(/\/$/, '') || '/';
  return (href: string) => {
    const path = href.replace(/\/$/, '') || '/';
    return current === path || (path !== '/' && current.startsWith(`${path}/`));
  };
}
