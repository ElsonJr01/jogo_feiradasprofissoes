import type { PerformanceLevel } from '@/types';

/**
 * Constantes de configuração do jogo.
 * Centralizadas aqui para evitar "números mágicos" espalhados pelo código.
 */
export const GAME_CONFIG = {
  /** Quantas perguntas compõem uma partida. */
  QUESTIONS_PER_ROUND: 8,
  /** Tempo (em segundos) que o jogador tem para responder cada pergunta. */
  SECONDS_PER_QUESTION: 20,
  /** Tempo (ms) de exibição do feedback antes de avançar automaticamente. */
  FEEDBACK_DELAY_MS: 1800,
} as const;

/** Faixas de desempenho exibidas na tela final, da maior para a menor. */
export const PERFORMANCE_LEVELS: readonly PerformanceLevel[] = [
  {
    minScore: 0.875, // 7/8 ou mais
    title: 'Programador(a) Lendário(a)!',
    emoji: '🏆',
    message:
      'Impressionante! Você já pensa como alguém pronto para começar na programação. Que tal dar o próximo passo com a gente?',
  },
  {
    minScore: 0.625, // 5/8 ou mais
    title: 'Futuro(a) Dev em Ascensão',
    emoji: '🚀',
    message:
      'Muito bom! Você manja bastante sobre tecnologia. Com um pouco de prática no Clube, você vai longe.',
  },
  {
    minScore: 0.375, // 3/8 ou mais
    title: 'Explorador(a) da Tecnologia',
    emoji: '🧭',
    message:
      'Bom começo! Ainda dá para aprender muito mais — é exatamente para isso que o Clube de Programação existe.',
  },
  {
    minScore: 0,
    title: 'Curioso(a) Iniciante',
    emoji: '🐣',
    message:
      'Todo mundo começa em algum lugar! Venha para o Clube de Programação e descubra como a tecnologia funciona.',
  },
];

export const SOCIAL_LINKS = {
  instagramHandle: '@clubedeprogramacaounifesspa',
  instagramUrl: 'https://www.instagram.com/clubedeprogramacaounifesspa/',
  youtube: 'youtube.com/@clubedeprogramacao',
} as const;
