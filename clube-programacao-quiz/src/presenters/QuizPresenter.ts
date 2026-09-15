import { QuizModel } from '../models/QuizModel';
import { StartView } from '../views/StartView';
import { QuizView } from '../views/QuizView';
import { ResultView } from '../views/ResultView';

const QUESTION_TIME_SECONDS = 20;
const FEEDBACK_DELAY_MS = 2500;

/**
 * Único ponto que conhece tanto o Model quanto as Views. Reage a eventos
 * de UI, chama o Model para aplicar as regras e manda a View renderizar
 * o resultado — Model e View nunca se referenciam diretamente.
 */
export class QuizPresenter {
  private readonly model: QuizModel;
  private readonly container: HTMLElement;

  private startView: StartView | null = null;
  private quizView: QuizView | null = null;
  private resultView: ResultView | null = null;

  private timerId: number | null = null;
  private secondsLeft = QUESTION_TIME_SECONDS;
  private isAnswerLocked = false;

  constructor(model: QuizModel, container: HTMLElement) {
    this.model = model;
    this.container = container;
  }

  start(): void {
    this.showStartScreen();
  }

  private showStartScreen(): void {
    this.teardownActiveViews();

    this.startView = new StartView(this.container, this.model.getTotalQuestions());
    this.startView.on('start', () => this.beginQuiz());
    this.startView.mount();
  }

  private beginQuiz(): void {
    this.model.start();
    this.teardownActiveViews();

    this.quizView = new QuizView(this.container);
    this.quizView.on('selectOption', ({ optionId }) => this.handleAnswer(optionId));
    this.quizView.mount();

    this.renderCurrentQuestion();
  }

  private renderCurrentQuestion(): void {
    if (!this.quizView) return;

    this.isAnswerLocked = false;
    this.secondsLeft = QUESTION_TIME_SECONDS;

    this.quizView.renderQuestion({
      question: this.model.getCurrentQuestion(),
      index: this.model.getCurrentIndex(),
      total: this.model.getTotalQuestions(),
      score: this.model.getScore(),
    });
    this.quizView.updateTimer(this.secondsLeft, QUESTION_TIME_SECONDS);

    this.startTimer();
  }

  private startTimer(): void {
    this.clearTimer();
    this.timerId = window.setInterval(() => {
      this.secondsLeft -= 1;
      this.quizView?.updateTimer(this.secondsLeft, QUESTION_TIME_SECONDS);

      if (this.secondsLeft <= 0) {
        this.handleAnswer(null);
      }
    }, 1000);
  }

  private clearTimer(): void {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private handleAnswer(optionId: string | null): void {
    if (this.isAnswerLocked || !this.quizView) return;

    this.isAnswerLocked = true;
    this.clearTimer();

    const question = this.model.getCurrentQuestion();
    const answer = this.model.answerCurrent(optionId);

    this.quizView.renderFeedback({
      question,
      selectedOptionId: optionId,
      isCorrect: answer.isCorrect,
    });

    window.setTimeout(() => this.goToNextStep(), FEEDBACK_DELAY_MS);
  }

  private goToNextStep(): void {
    this.model.advance();

    if (this.model.getStatus() === 'finished') {
      this.showResultScreen();
    } else {
      this.renderCurrentQuestion();
    }
  }

  private showResultScreen(): void {
    this.teardownActiveViews();

    this.resultView = new ResultView(this.container);
    this.resultView.on('restart', () => this.showStartScreen());
    this.resultView.mount();
    this.resultView.render({
      score: this.model.getScore(),
      total: this.model.getTotalQuestions(),
      tier: this.model.getResultTier(),
    });
  }

  private teardownActiveViews(): void {
    this.clearTimer();

    this.startView?.unmount();
    this.quizView?.unmount();
    this.resultView?.unmount();

    this.startView = null;
    this.quizView = null;
    this.resultView = null;
  }
}
