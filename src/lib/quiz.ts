/**
 * Shared module: multiple-choice quiz content for the /play/ games.
 * Pure data types and helpers; the QuizGame island renders and scores.
 *
 * Every visual is decoration for sighted players. The prompt must describe
 * the scenario in words, because the visual is hidden from assistive tech.
 */

export interface QuizChoice {
  id: string;
  label: string;
  /** Render the label as code (element names, attribute values). */
  code?: boolean;
}

export type QuizVisual =
  | { kind: 'bio'; src: string; name: string; role: string }
  | { kind: 'logo-link'; src: string }
  | { kind: 'figure'; src: string; position: string; text: string }
  | { kind: 'divider'; icon: string }
  | { kind: 'card'; src: string; position: string; title: string }
  | { kind: 'banner'; src: string; position: string }
  | { kind: 'icon-button'; icon: string; scene: 'file-row' | 'dialog' | 'search' | 'card' | 'toggle' | 'nav' | 'field'; context: string }
  | { kind: 'token'; sample: 'muted-text' | 'hairline' | 'accent' | 'faint' | 'surfaces' | 'serif' }
  | { kind: 'motion'; demo: 'parallax' | 'spinner' | 'slide' | 'progress' | 'carousel' | 'zoom' };

export interface QuizQuestion {
  id: string;
  prompt: string;
  visual?: QuizVisual;
  choices: QuizChoice[];
  /** `id` of the correct choice. */
  answer: string;
  explanation: string;
}

export function isCorrect(question: QuizQuestion, choiceId: string): boolean {
  return question.answer === choiceId;
}

/** Problems with a question set; empty when the set is valid. Used by tests. */
export function validateQuiz(questions: QuizQuestion[]): string[] {
  const problems: string[] = [];
  const ids = new Set<string>();
  for (const q of questions) {
    if (ids.has(q.id)) problems.push(`${q.id}: duplicate question id`);
    ids.add(q.id);
    const choiceIds = q.choices.map((c) => c.id);
    if (new Set(choiceIds).size !== choiceIds.length) problems.push(`${q.id}: duplicate choice id`);
    if (q.choices.length < 2 || q.choices.length > 4) problems.push(`${q.id}: needs 2-4 choices`);
    if (!choiceIds.includes(q.answer)) problems.push(`${q.id}: answer is not a choice`);
    if (!q.prompt.trim() || !q.explanation.trim()) problems.push(`${q.id}: missing prompt or explanation`);
    if (/[—–]/.test(q.prompt + q.explanation + q.choices.map((c) => c.label).join(''))) {
      problems.push(`${q.id}: uses an em or en dash`);
    }
  }
  return problems;
}
