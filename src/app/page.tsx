'use client';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { QuizScreen } from '@/components/screens/QuizScreen';
import { ResultScreen } from '@/components/screens/ResultScreen';
import { StartScreen } from '@/components/screens/StartScreen';
import { useQuizPresenter } from '@/presenters/useQuizPresenter';

/**
 * Página inicial (composition root).
 *
 * Este é o único lugar que conecta o Presenter às telas (View).
 * Cada tela recebe apenas os dados/handlers de que precisa — nenhuma
 * delas sabe como o estado é calculado, mantendo a separação MVP.
 */
export default function HomePage() {
  const vm = useQuizPresenter();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-1 flex-col">
      <Header />

      {vm.phase === 'idle' && <StartScreen onStart={vm.actions.start} />}

      {(vm.phase === 'playing' || vm.phase === 'answered') && (
        <QuizScreen
          currentQuestion={vm.currentQuestion}
          questionNumber={vm.questionNumber}
          totalQuestions={vm.totalQuestions}
          score={vm.score}
          selectedOptionIndex={vm.selectedOptionIndex}
          secondsLeft={vm.secondsLeft}
          phase={vm.phase}
          onSelectOption={vm.actions.selectOption}
          onNext={vm.actions.next}
        />
      )}

      {vm.phase === 'finished' && (
        <ResultScreen
          score={vm.score}
          totalQuestions={vm.totalQuestions}
          performanceLevel={vm.performanceLevel}
          onRestart={vm.actions.restart}
        />
      )}

      <Footer />
    </main>
  );
}
