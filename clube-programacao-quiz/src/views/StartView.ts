import { BaseView } from './BaseView';
import { EventEmitter } from '../utils/EventEmitter';
import { el } from '../utils/dom';
import { createMascot } from '../utils/mascot';

type StartViewEvents = {
  start: void;
};

export class StartView extends BaseView {
  private readonly emitter = new EventEmitter<StartViewEvents>();
  private readonly totalQuestions: number;

  constructor(root: HTMLElement, totalQuestions: number) {
    super(root);
    this.totalQuestions = totalQuestions;
  }

  on<K extends keyof StartViewEvents>(event: K, listener: (payload: StartViewEvents[K]) => void): void {
    this.emitter.on(event, listener);
  }

  mount(): void {
    const screen = el('section', { className: 'screen screen--start' });

    const title = el('h1', { className: 'title' });
    title.append('Quiz do Clube de Programação', el('span', { className: 'cursor', text: '_' }));

    const subtitle = el('p', {
      className: 'subtitle',
      text: `Você sabe como o código move o mundo? Responda ${this.totalQuestions} perguntas rápidas e descubra o seu perfil tech.`,
    });

    const startButton = el('button', {
      className: 'button button--primary',
      text: 'Começar o desafio',
      attrs: { type: 'button' },
    });
    startButton.addEventListener('click', () => this.emitter.emit('start', undefined));

    const footnote = el('p', {
      className: 'footnote',
      text: 'Um projeto do Clube de Programação da UNIFESSPA, em parceria com o IEEE Student Branch.',
    });

    screen.append(createMascot(), title, subtitle, startButton, footnote);
    this.root.appendChild(screen);
  }
}
