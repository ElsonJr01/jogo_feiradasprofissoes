import { Button } from '@/components/ui/Button';
import { Mascot } from '@/components/ui/Mascot';
import type { PerformanceLevel } from '@/types';

interface ResultScreenProps {
  readonly score: number;
  readonly totalQuestions: number;
  readonly performanceLevel: PerformanceLevel | null;
  readonly onRestart: () => void;
}

/** Tela final: mostra a pontuação, o nível de desempenho e convida para o Clube. */
export function ResultScreen({
  score,
  totalQuestions,
  performanceLevel,
  onRestart,
}: ResultScreenProps) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-8 text-center">
      <Mascot size={180} floating />

      <div className="space-y-1">
        <p className="font-display text-6xl" aria-hidden="true">
          {performanceLevel?.emoji ?? '🎮'}
        </p>
        <h1 className="font-display text-2xl font-extrabold text-clube-blue sm:text-3xl">
          {performanceLevel?.title ?? 'Fim de jogo!'}
        </h1>
      </div>

      <p className="font-display text-xl font-bold text-clube-navy">
        Você acertou <span className="text-clube-green">{score}</span> de {totalQuestions}{' '}
        perguntas
      </p>

      <p className="max-w-md font-body text-base text-clube-navy/80">
        {performanceLevel?.message}
      </p>

      <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
        <Button onClick={onRestart} variant="primary">
          Jogar novamente 🔁
        </Button>
        <Button
          variant="ghost"
          onClick={() => window.open('https://youtube.com/@clubedeprogramacao', '_blank')}
        >
          Conhecer o Clube 💙
        </Button>
      </div>
    </section>
  );
}
