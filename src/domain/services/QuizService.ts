import { QUESTIONS } from '@/domain/data/questions';
import { GAME_CONFIG, PERFORMANCE_LEVELS } from '@/lib/constants';
import { pickRandomSubset } from '@/lib/shuffle';
import type {
  AnsweredQuestion,
  GameState,
  PerformanceLevel,
  Question,
} from '@/types';

/**
 * QuizService — camada de "Model" da arquitetura MVP.
 *
 * Concentra todas as regras de negócio do quiz (seleção de perguntas,
 * cálculo de pontuação, condição de término, avaliação de desempenho).
 * É composta apenas por funções puras e não importa nada de React,
 * o que permite testá-la isoladamente (veja `QuizService.test.ts`)
 * e reaproveitá-la em qualquer camada de apresentação no futuro.
 */
export const QuizService = {
  /** Monta uma nova rodada, sorteando um subconjunto de perguntas. */
  createInitialState(
    allQuestions: readonly Question[] = QUESTIONS,
    questionCount: number = GAME_CONFIG.QUESTIONS_PER_ROUND,
  ): GameState {
    return {
      phase: 'idle',
      questions: pickRandomSubset(allQuestions, questionCount),
      currentQuestionIndex: 0,
      answers: [],
      selectedOptionIndex: null,
    };
  },

  /** Inicia a partida, movendo o estado de "idle" para "playing". */
  start(state: GameState): GameState {
    return { ...state, phase: 'playing' };
  },

  /** Retorna a pergunta atualmente exibida, ou `null` se não houver. */
  getCurrentQuestion(state: GameState): Question | null {
    return state.questions[state.currentQuestionIndex] ?? null;
  },

  /**
   * Registra a resposta escolhida pelo jogador para a pergunta atual
   * e move a fase do jogo para "answered".
   */
  submitAnswer(state: GameState, optionIndex: number): GameState {
    const currentQuestion = QuizService.getCurrentQuestion(state);
    if (!currentQuestion || state.phase !== 'playing') return state;

    const answer: AnsweredQuestion = {
      questionId: currentQuestion.id,
      selectedOptionIndex: optionIndex,
      isCorrect: optionIndex === currentQuestion.correctOptionIndex,
    };

    return {
      ...state,
      phase: 'answered',
      selectedOptionIndex: optionIndex,
      answers: [...state.answers, answer],
    };
  },

  /**
   * Avança para a próxima pergunta ou, se já for a última, finaliza o jogo.
   */
  advance(state: GameState): GameState {
    const isLastQuestion = state.currentQuestionIndex >= state.questions.length - 1;

    if (isLastQuestion) {
      return { ...state, phase: 'finished' };
    }

    return {
      ...state,
      phase: 'playing',
      currentQuestionIndex: state.currentQuestionIndex + 1,
      selectedOptionIndex: null,
    };
  },

  /** Reinicia o jogo com um novo sorteio de perguntas. */
  restart(allQuestions: readonly Question[] = QUESTIONS): GameState {
    return QuizService.createInitialState(allQuestions);
  },

  /** Quantidade de respostas corretas até o momento. */
  getScore(state: GameState): number {
    return state.answers.filter((answer) => answer.isCorrect).length;
  },

  /** Proporção de acertos (0 a 1), útil para calcular o nível de desempenho. */
  getScoreRatio(state: GameState): number {
    if (state.questions.length === 0) return 0;
    return QuizService.getScore(state) / state.questions.length;
  },

  /** Retorna o nível de desempenho (título, mensagem, emoji) para o placar atual. */
  getPerformanceLevel(
    state: GameState,
    levels: readonly PerformanceLevel[] = PERFORMANCE_LEVELS,
  ): PerformanceLevel {
    const ratio = QuizService.getScoreRatio(state);
    const matched = levels.find((level) => ratio >= level.minScore);
    // O último nível da lista tem minScore = 0, então sempre há um match.
    return matched ?? levels[levels.length - 1]!;
  },
} as const;
