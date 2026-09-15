import { BaseView } from './BaseView';
import { EventEmitter } from '../utils/EventEmitter';
import { el, clear } from '../utils/dom';
import type { QuizQuestion } from '../models/types';

type QuizViewEvents = {
  selectOption: { optionId: string };
};

export interface QuestionRenderPayload {
  question: QuizQuestion;
  index: number;
  total: number;
  score: number;
}

export interface FeedbackRenderPayload {
  question: QuizQuestion;
  selectedOptionId: string | null;
  isCorrect: boolean;
}

/**
 * Renderiza a tela de perguntas e captura os cliques nas alternativas.
 * Toda decisão (qual é a resposta certa, quando trocar de pergunta,
 * quanto tempo falta) vem de fora, através dos payloads recebidos —
 * a view apenas desenha o que o presenter mandar.
 */
export class QuizView extends BaseView {
  private readonly emitter = new EventEmitter<QuizViewEvents>();

  private progressFill!: HTMLElement;
  private questionLabel!: HTMLElement;
  private scoreLabel!: HTMLElement;
  private timerRing!: HTMLElement;
  private timerLabel!: HTMLElement;
  private promptEl!: HTMLElement;
  private optionsContainer!: HTMLElement;
  private feedbackBanner!: HTMLElement;
  private optionButtons = new Map<string, HTMLButtonElement>();

  on<K extends keyof QuizViewEvents>(event: K, listener: (payload: QuizViewEvents[K]) => void): void {
    this.emitter.on(event, listener);
  }

  mount(): void {
    const screen = el('section', { className: 'screen screen--quiz' });

    const hud = el('div', { className: 'quiz-hud' });
    const meta = el('div', { className: 'quiz-hud__meta' });
    this.questionLabel = el('span', { className: 'quiz-hud__question' });
    this.scoreLabel = el('span', { className: 'quiz-hud__score' });
    meta.append(this.questionLabel, this.scoreLabel);

    this.timerRing = el('div', { className: 'timer-ring', attrs: { role: 'timer', 'aria-live': 'polite' } });
    this.timerLabel = el('span', { className: 'timer-label' });
    this.timerRing.appendChild(this.timerLabel);

    hud.append(meta, this.timerRing);

    const progressTrack = el('div', { className: 'progress-track' });
    this.progressFill = el('div', { className: 'progress-fill' });
    progressTrack.appendChild(this.progressFill);

    this.promptEl = el('h2', { className: 'prompt' });
    this.optionsContainer = el('div', { className: 'options', attrs: { role: 'group' } });
    this.feedbackBanner = el('p', { className: 'feedback-banner', attrs: { 'aria-live': 'polite' } });

    screen.append(hud, progressTrack, this.promptEl, this.optionsContainer, this.feedbackBanner);
    this.root.appendChild(screen);
  }

  renderQuestion(payload: QuestionRenderPayload): void {
    const { question, index, total, score } = payload;

    this.progressFill.style.width = `${(index / total) * 100}%`;
    this.questionLabel.textContent = `Pergunta ${index + 1} de ${total}`;
    this.scoreLabel.textContent = `Pontos ${score}`;
    this.promptEl.textContent = question.prompt;

    this.feedbackBanner.textContent = '';
    this.feedbackBanner.className = 'feedback-banner';

    clear(this.optionsContainer);
    this.optionButtons.clear();

    question.options.forEach((option) => {
      const button = el('button', { className: 'option', attrs: { type: 'button' } });
      const badge = el('span', { className: 'option__badge', text: option.id.toUpperCase() });
      const text = el('span', { className: 'option__text', text: option.text });
      button.append(badge, text);
      button.addEventListener('click', () => this.emitter.emit('selectOption', { optionId: option.id }));

      this.optionButtons.set(option.id, button);
      this.optionsContainer.appendChild(button);
    });
  }

  updateTimer(secondsLeft: number, totalSeconds: number): void {
    const clamped = Math.max(secondsLeft, 0);
    const progress = clamped / totalSeconds;

    this.timerRing.style.setProperty('--progress', String(progress));
    this.timerRing.classList.toggle('timer-ring--warning', clamped <= 5);
    this.timerLabel.textContent = String(clamped);
  }

  renderFeedback(payload: FeedbackRenderPayload): void {
    const { question, selectedOptionId, isCorrect } = payload;

    this.optionButtons.forEach((button, optionId) => {
      button.disabled = true;
      if (optionId === question.correctOptionId) {
        button.classList.add('option--correct');
      } else if (optionId === selectedOptionId) {
        button.classList.add('option--incorrect');
      }
    });

    const intro = isCorrect ? 'Certinho!' : selectedOptionId === null ? 'Tempo esgotado.' : 'Quase.';
    this.feedbackBanner.textContent = `${intro} ${question.explanation}`;
    this.feedbackBanner.classList.add(isCorrect ? 'feedback-banner--correct' : 'feedback-banner--incorrect');
  }
}
