import './style.css';
import { QuizModel } from './models/QuizModel';
import { QuizPresenter } from './presenters/QuizPresenter';

function bootstrap(): void {
  const container = document.getElementById('app');
  if (!container) {
    throw new Error('Elemento #app não encontrado em index.html.');
  }

  const model = new QuizModel();
  const presenter = new QuizPresenter(model, container);
  presenter.start();
}

bootstrap();
