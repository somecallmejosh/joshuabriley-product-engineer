/** A code sample on a case study: a file label, a highlighter language, and the code. */
export interface Snippet {
  file: string;
  lang: 'erb' | 'ruby' | 'js' | 'ts' | 'tsx' | 'json' | 'css' | 'md';
  code: string;
}
