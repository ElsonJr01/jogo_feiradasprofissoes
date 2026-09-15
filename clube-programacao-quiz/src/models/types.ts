/** Uma alternativa de resposta para uma pergunta. */
export interface QuizOption {
  id: string;
  text: string;
}

/** Uma pergunta do quiz, com sua explicação exibida após a resposta. */
export interface QuizQuestion {
  id: number;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

/** Registro de uma resposta já dada pelo jogador. */
export interface QuizAnswer {
  questionId: number;
  selectedOptionId: string | null;
  isCorrect: boolean;
  timedOut: boolean;
}
