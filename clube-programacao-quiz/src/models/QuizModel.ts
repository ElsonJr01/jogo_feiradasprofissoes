import type { QuizAnswer, QuizQuestion } from './types';
import { QUESTIONS } from './questions.data';

export type QuizStatus = 'idle' | 'playing' | 'finished';

export interface ResultTier {
  label: string;
  emoji: string;
  message: string;
}

/**
 * Guarda o estado do jogo e aplica as regras de negócio: avançar
 * perguntas, calcular pontuação e decidir o "perfil" final do jogador.
 * Não conhece HTML, CSS nem eventos de clique — só dados e regras,
 * o que torna essa classe fácil de testar isoladamente.
 */
export class QuizModel {
  private readonly questions: QuizQuestion[];
  private currentIndex = 0;
  private answers: QuizAnswer[] = [];
  private status: QuizStatus = 'idle';

  constructor(questions: QuizQuestion[] = QUESTIONS) {
    if (questions.length === 0) {
      throw new Error('O QuizModel precisa de ao menos uma pergunta.');
    }
    this.questions = questions;
  }

  start(): void {
    this.currentIndex = 0;
    this.answers = [];
    this.status = 'playing';
  }

  getStatus(): QuizStatus {
    return this.status;
  }

  getTotalQuestions(): number {
    return this.questions.length;
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }

  getCurrentQuestion(): QuizQuestion {
    const question = this.questions[this.currentIndex];
    if (!question) {
      throw new Error('Nenhuma pergunta disponível para o índice atual.');
    }
    return question;
  }

  /** Registra a resposta da pergunta atual. `null` representa tempo esgotado. */
  answerCurrent(optionId: string | null): QuizAnswer {
    const question = this.getCurrentQuestion();
    const isCorrect = optionId !== null && optionId === question.correctOptionId;

    const answer: QuizAnswer = {
      questionId: question.id,
      selectedOptionId: optionId,
      isCorrect,
      timedOut: optionId === null,
    };

    this.answers.push(answer);
    return answer;
  }

  hasNextQuestion(): boolean {
    return this.currentIndex < this.questions.length - 1;
  }

  /** Avança para a próxima pergunta ou marca o quiz como finalizado. */
  advance(): void {
    if (this.hasNextQuestion()) {
      this.currentIndex += 1;
    } else {
      this.status = 'finished';
    }
  }

  getScore(): number {
    return this.answers.filter((answer) => answer.isCorrect).length;
  }

  getAnswers(): ReadonlyArray<QuizAnswer> {
    return this.answers;
  }

  /** Define o "perfil tech" mostrado na tela final, com base no aproveitamento. */
  getResultTier(): ResultTier {
    const ratio = this.getScore() / this.getTotalQuestions();

    if (ratio === 1) {
      return {
        label: 'Mestre dos Algoritmos',
        emoji: '🏆',
        message: 'Nota máxima! Você já pensa como programador(a).',
      };
    }
    if (ratio >= 0.7) {
      return {
        label: 'Hacker do Bem',
        emoji: '🔐',
        message: 'Muito bom! Você manda bem em lógica e tecnologia.',
      };
    }
    if (ratio >= 0.4) {
      return {
        label: 'Programador(a) em Formação',
        emoji: '💻',
        message: 'Bom começo! Com prática você vai longe.',
      };
    }
    return {
      label: 'Explorador(a) Iniciante',
      emoji: '🚀',
      message: 'Todo mundo começa por aqui. Bora aprender mais?',
    };
  }
}
