import { GAME_CONFIG } from '@/lib/constants';

interface TimerProps {
  readonly secondsLeft: number;
}

/** Indicador circular de tempo restante para responder a pergunta atual. */
export function Timer({ secondsLeft }: TimerProps) {
  const isUrgent = secondsLeft <= 5;

  return (
    <div
      role="timer"
      aria-live="polite"
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 font-display text-xl font-bold transition-colors ${
        isUrgent
          ? 'border-red-400 bg-red-50 text-red-500 animate-shake-x'
          : 'border-clube-green bg-white text-clube-navy'
      }`}
    >
      {secondsLeft}
      <span className="sr-only">
        {' '}
        segundos restantes de {GAME_CONFIG.SECONDS_PER_QUESTION}
      </span>
    </div>
  );
}
