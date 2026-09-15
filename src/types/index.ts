/**
 * Tipos centrais do domínio do Quiz.
 *
 * Mantidos separados de componentes de UI para que a camada de
 * Model/Domínio não dependa de React nem de nenhum framework de
 * interface — um dos princípios da arquitetura MVP adotada no projeto.
 */

/** Categoria temática da pergunta, usada para variar o ícone/contexto na UI. */
export type QuestionCategory =
  | 'algoritmos'
  | 'historia'
  | 'mercado'
  | 'areas'
  | 'clube';

/** Uma pergunta de múltipla escolha do quiz. */
export interface Question {
  /** Identificador único e estável da pergunta. */
  readonly id: string;
  readonly category: QuestionCategory;
  readonly prompt: string;
  /** Lista de alternativas (sempre 4, para manter a UI previsível). */
  readonly options: readonly string[];
  /** Índice (0-based) da alternativa correta dentro de `options`. */
  readonly correctOptionIndex: number;
  /** Curiosidade exibida após a resposta, reforçando o aprendizado. */
  readonly funFact: string;
}

/** Fases possíveis do jogo, controladas pelo Presenter. */
export type GamePhase = 'idle' | 'playing' | 'answered' | 'finished';

/** Registro do que o jogador respondeu em cada pergunta. */
export interface AnsweredQuestion {
  readonly questionId: string;
  readonly selectedOptionIndex: number;
  readonly isCorrect: boolean;
}

/** Estado imutável do jogo em um dado instante. */
export interface GameState {
  readonly phase: GamePhase;
  readonly questions: readonly Question[];
  readonly currentQuestionIndex: number;
  readonly answers: readonly AnsweredQuestion[];
  readonly selectedOptionIndex: number | null;
}

/** Nível de desempenho calculado ao final do quiz. */
export interface PerformanceLevel {
  readonly minScore: number;
  readonly title: string;
  readonly message: string;
  readonly emoji: string;
}
