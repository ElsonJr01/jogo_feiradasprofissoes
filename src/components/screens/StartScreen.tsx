import { Button } from '@/components/ui/Button';
import { Mascot } from '@/components/ui/Mascot';
import { GAME_CONFIG } from '@/lib/constants';

interface StartScreenProps {
  readonly onStart: () => void;
}

/** Tela inicial: apresenta o jogo e convida o aluno a começar. */
export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-8 text-center">
      <Mascot size={200} />

      <div className="max-w-md space-y-3">
        <h1 className="font-display text-3xl font-extrabold text-clube-blue sm:text-4xl">
          Quiz do Clube de Programação
        </h1>
        <p className="font-body text-base text-clube-navy/80 sm:text-lg">
          Teste o que você sabe sobre algoritmos, história da computação e o mercado de
          tecnologia — e descubra se tem a mente de um(a) futuro(a) programador(a)!
        </p>
      </div>

      <ul className="flex flex-wrap justify-center gap-3 text-sm font-semibold text-clube-navy/70">
        <li className="rounded-full bg-white px-4 py-2 shadow">
          🧩 {GAME_CONFIG.QUESTIONS_PER_ROUND} perguntas
        </li>
        <li className="rounded-full bg-white px-4 py-2 shadow">
          ⏱️ {GAME_CONFIG.SECONDS_PER_QUESTION}s por pergunta
        </li>
        <li className="rounded-full bg-white px-4 py-2 shadow">🏆 Ranking de desempenho</li>
      </ul>

      <Button onClick={onStart} className="mt-2">
        Começar o Quiz 🚀
      </Button>
    </section>
  );
}
