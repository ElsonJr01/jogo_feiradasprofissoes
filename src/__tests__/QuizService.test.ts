import { describe, expect, it } from 'vitest';

import { QuizService } from '@/domain/services/QuizService';
import type { GameState, Question } from '@/types';

/** Perguntas fixas usadas nos testes, independentes do banco real de conteúdo. */
const MOCK_QUESTIONS: readonly Question[] = [
  {
    id: 'q1',
    category: 'algoritmos',
    prompt: 'Pergunta 1?',
    options: ['A', 'B', 'C', 'D'],
    correctOptionIndex: 1,
    funFact: 'Fato 1',
  },
  {
    id: 'q2',
    category: 'historia',
    prompt: 'Pergunta 2?',
    options: ['A', 'B', 'C', 'D'],
    correctOptionIndex: 2,
    funFact: 'Fato 2',
  },
];

function buildStartedState(): GameState {
  const initial = QuizService.createInitialState(MOCK_QUESTIONS, 2);
  return QuizService.start(initial);
}

describe('QuizService', () => {
  it('cria o estado inicial na fase "idle" com o número certo de perguntas', () => {
    const state = QuizService.createInitialState(MOCK_QUESTIONS, 2);

    expect(state.phase).toBe('idle');
    expect(state.questions).toHaveLength(2);
    expect(state.currentQuestionIndex).toBe(0);
    expect(state.answers).toHaveLength(0);
  });

  it('não sorteia mais perguntas do que as disponíveis no banco', () => {
    const state = QuizService.createInitialState(MOCK_QUESTIONS, 10);
    expect(state.questions).toHaveLength(MOCK_QUESTIONS.length);
  });

  it('start() move a fase para "playing"', () => {
    const state = QuizService.start(QuizService.createInitialState(MOCK_QUESTIONS, 2));
    expect(state.phase).toBe('playing');
  });

  it('submitAnswer() registra resposta correta e muda a fase para "answered"', () => {
    const started = buildStartedState();
    const currentQuestion = QuizService.getCurrentQuestion(started)!;

    const answered = QuizService.submitAnswer(started, currentQuestion.correctOptionIndex);

    expect(answered.phase).toBe('answered');
    expect(answered.answers).toHaveLength(1);
    expect(answered.answers[0]?.isCorrect).toBe(true);
  });

  it('submitAnswer() registra resposta incorreta corretamente', () => {
    const started = buildStartedState();
    const currentQuestion = QuizService.getCurrentQuestion(started)!;
    const wrongIndex = (currentQuestion.correctOptionIndex + 1) % currentQuestion.options.length;

    const answered = QuizService.submitAnswer(started, wrongIndex);

    expect(answered.answers[0]?.isCorrect).toBe(false);
  });

  it('submitAnswer() é uma operação no-op se o jogo não estiver em "playing"', () => {
    const idleState = QuizService.createInitialState(MOCK_QUESTIONS, 2);
    const result = QuizService.submitAnswer(idleState, 0);
    expect(result).toBe(idleState);
  });

  it('advance() avança para a próxima pergunta mantendo a fase "playing"', () => {
    const started = buildStartedState();
    const answered = QuizService.submitAnswer(started, 0);
    const advanced = QuizService.advance(answered);

    expect(advanced.phase).toBe('playing');
    expect(advanced.currentQuestionIndex).toBe(1);
    expect(advanced.selectedOptionIndex).toBeNull();
  });

  it('advance() finaliza o jogo após a última pergunta', () => {
    let state = buildStartedState();
    state = QuizService.submitAnswer(state, 0);
    state = QuizService.advance(state); // vai para a pergunta 2
    state = QuizService.submitAnswer(state, 0);
    state = QuizService.advance(state); // acabaram as perguntas

    expect(state.phase).toBe('finished');
  });

  it('getScore() conta apenas as respostas corretas', () => {
    let state = buildStartedState();
    const q1 = QuizService.getCurrentQuestion(state)!;
    state = QuizService.submitAnswer(state, q1.correctOptionIndex); // acerto
    state = QuizService.advance(state);
    const q2 = QuizService.getCurrentQuestion(state)!;
    const wrongIndex = (q2.correctOptionIndex + 1) % q2.options.length;
    state = QuizService.submitAnswer(state, wrongIndex); // erro

    expect(QuizService.getScore(state)).toBe(1);
    expect(QuizService.getScoreRatio(state)).toBe(0.5);
  });

  it('getPerformanceLevel() retorna o nível correspondente à pontuação', () => {
    const levels = [
      { minScore: 0.5, title: 'Alto', message: '', emoji: '🏆' },
      { minScore: 0, title: 'Baixo', message: '', emoji: '🐣' },
    ];

    const highState: GameState = {
      phase: 'finished',
      questions: MOCK_QUESTIONS,
      currentQuestionIndex: 1,
      selectedOptionIndex: null,
      answers: [
        { questionId: 'q1', selectedOptionIndex: 1, isCorrect: true },
        { questionId: 'q2', selectedOptionIndex: 2, isCorrect: true },
      ],
    };

    expect(QuizService.getPerformanceLevel(highState, levels).title).toBe('Alto');
  });

  it('restart() gera um novo estado limpo na fase "idle"', () => {
    const state = QuizService.restart(MOCK_QUESTIONS);
    expect(state.phase).toBe('idle');
    expect(state.answers).toHaveLength(0);
  });
});
