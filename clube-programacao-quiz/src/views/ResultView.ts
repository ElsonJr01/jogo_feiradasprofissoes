import { BaseView } from './BaseView';
import { EventEmitter } from '../utils/EventEmitter';
import { el, clear } from '../utils/dom';
import type { ResultTier } from '../models/QuizModel';

type ResultViewEvents = {
  restart: void;
};

export interface ResultRenderPayload {
  score: number;
  total: number;
  tier: ResultTier;
}

export class ResultView extends BaseView {
  private readonly emitter = new EventEmitter<ResultViewEvents>();
  private screen!: HTMLElement;

  on<K extends keyof ResultViewEvents>(event: K, listener: (payload: ResultViewEvents[K]) => void): void {
    this.emitter.on(event, listener);
  }

  mount(): void {
    this.screen = el('section', { className: 'screen screen--result' });
    this.root.appendChild(this.screen);
  }

  render(payload: ResultRenderPayload): void {
    const { score, total, tier } = payload;
    clear(this.screen);

    const emoji = el('div', { className: 'result-emoji', text: tier.emoji });
    const title = el('h1', { className: 'title', text: tier.label });
    const scoreLine = el('p', { className: 'result-score', text: `${score} de ${total} acertos` });
    const message = el('p', { className: 'result-message', text: tier.message });

    const restartButton = el('button', {
      className: 'button button--primary',
      text: 'Jogar novamente',
      attrs: { type: 'button' },
    });
    restartButton.addEventListener('click', () => this.emitter.emit('restart', undefined));

    const footnote = el('p', {
      className: 'footnote',
      text: 'Quer aprender mais? Entre no Discord do Clube de Programação e acompanhe as novidades no YouTube @clubedeprogramacao.',
    });

    this.screen.append(emoji, title, scoreLine, message, restartButton, footnote);
  }
}
