/** /style-guide/system.json: the design system in one file for coding agents. */
import type { APIRoute } from 'astro';
import { buildDesignContext } from '~/lib/design-context';

export const prerender = true;

export const GET: APIRoute = ({ site }) =>
  new Response(JSON.stringify(buildDesignContext(site?.origin ?? ''), null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
