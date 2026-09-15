'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { QuizService } from '@/domain/services/QuizService';
import { QUESTIONS } from '@/domain/data/questions';
import { GAME_CONFIG } from '@/lib/constants';
import type { GameState, PerformanceLevel, Question } from '@/types';

/**
 * View Model exposto pelo Presenter para as telas (View).
 *
 * A View NUNCA acessa `GameState` diretamente nem chama o `QuizService`:
 * ela só lê estes dados já prontos e chama os manipuladores (`actions`)
 * abaixo. Isso mantém os componentes 100% "burros" (apresentacionais).
 */
export interface QuizViewModel {
  readonly phase: GameState['phase'];
  readonly currentQuestion: Question | null;
  readonly questionNumber: number;
  readonly totalQuestions: number;
  readonly score: number;
  readonly selectedOptionIndex: number | null;
  readonly secondsLeft: number;
  readonly performanceLevel: PerformanceLevel | null;
  readonly actions: {
    readonly start: () => void;
    readonly selectOption: (optionIndex: number) => void;
    readonly next: () => void;
    readonly restart: () => void;
  };
}

/**
 * Presenter do Quiz — camada intermediária da arquitetura MVP.
 *
 * Responsabilidades:
 *  - Manter o estado do jogo (via `useState`), delegando toda regra de
 *    negócio ao `QuizService` (Model).
 *  - Controlar o timer de cada pergunta.
 *  - Traduzir o `GameState` bruto em um `QuizViewModel` simples e pronto
 *    para ser renderizado pela View, sem nenhuma lógica de UI aqui.
 *
 * Este hook não contém JSX: é puramente lógica de orquestração.
 */
export function useQuizPresenter(): QuizViewModel {
  const [state, setState] = useState<GameState>(() => QuizService.createInitialState(QUESTIONS));
  const [secondsLeft, setSecondsLeft] = useState<number>(GAME_CONFIG.SECONDS_PER_QUESTION);
  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuestion = useMemo(() => QuizService.getCurrentQuestion(state), [state]);

  // Reinicia o cronômetro sempre que uma nova pergunta entra em jogo.
  useEffect(() => {
    if (state.phase !== 'playing') return undefined;

    setSecondsLeft(GAME_CONFIG.SECONDS_PER_QUESTION);
    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [state.phase, state.currentQuestionIndex]);

  // Se o tempo acabar sem resposta, registra como "errada" automaticamente.
  useEffect(() => {
    if (state.phase === 'playing' && secondsLeft === 0) {
      setState((prev) => QuizService.submitAnswer(prev, -1));
    }
  }, [secondsLeft, state.phase]);

  // Avança automaticamente após o feedback, dando tempo para o aluno ler.
  useEffect(() => {
    if (state.phase !== 'answered') return undefined;

    advanceTimeoutRef.current = setTimeout(() => {
      setState((prev) => QuizService.advance(prev));
    }, GAME_CONFIG.FEEDBACK_DELAY_MS);

    return () => {
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    };
  }, [state.phase]);

  const start = useCallback(() => {
    setState((prev) => QuizService.start(prev));
  }, []);

  const selectOption = useCallback((optionIndex: number) => {
    setState((prev) => QuizService.submitAnswer(prev, optionIndex));
  }, []);

  const next = useCallback(() => {
    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    setState((prev) => QuizService.advance(prev));
  }, []);

  const restart = useCallback(() => {
    setState(QuizService.restart(QUESTIONS));
  }, []);

  const performanceLevel = useMemo(
    () => (state.phase === 'finished' ? QuizService.getPerformanceLevel(state) : null),
    [state],
  );

  return {
    phase: state.phase,
    currentQuestion,
    questionNumber: state.currentQuestionIndex + 1,
    totalQuestions: state.questions.length,
    score: QuizService.getScore(state),
    selectedOptionIndex: state.selectedOptionIndex,
    secondsLeft,
    performanceLevel,
    actions: { start, selectOption, next, restart },
  };
}
