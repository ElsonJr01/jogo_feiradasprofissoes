import { Badge } from '@/components/ui/Badge';
import { OptionCard } from '@/components/ui/OptionCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Timer } from '@/components/ui/Timer';
import type { QuizViewModel } from '@/presenters/useQuizPresenter';

type QuizScreenProps = Pick<
  QuizViewModel,
  | 'currentQuestion'
  | 'questionNumber'
  | 'totalQuestions'
  | 'score'
  | 'selectedOptionIndex'
  | 'secondsLeft'
  | 'phase'
> & {
  readonly onSelectOption: (index: number) => void;
  readonly onNext: () => void;
};

/** Tela principal do jogo: pergunta atual, alternativas e feedback imediato. */
export function QuizScreen({
  currentQuestion,
  questionNumber,
  totalQuestions,
  score,
  selectedOptionIndex,
  secondsLeft,
  phase,
  onSelectOption,
  onNext,
}: QuizScreenProps) {
  if (!currentQuestion) return null;

  const hasAnswered = phase === 'answered';
  const wasCorrect = hasAnswered && selectedOptionIndex === currentQuestion.correctOptionIndex;

  return (
    <section className="flex flex-1 flex-col gap-5 px-4 py-6 sm:px-8">
      <div className="flex items-center gap-4">
        <Timer secondsLeft={secondsLeft} />
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between font-display text-sm font-bold text-clube-navy/70">
            <span>
              Pergunta {questionNumber} de {totalQuestions}
            </span>
            <Badge>⭐ {score} pontos</Badge>
          </div>
          <ProgressBar current={questionNumber - 1} total={totalQuestions} />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-6">
        <h2 className="text-balance text-center font-display text-2xl font-extrabold text-clube-navy sm:text-3xl">
          {currentQuestion.prompt}
        </h2>

        <div className="mx-auto flex w-full max-w-xl flex-col gap-3">
          {currentQuestion.options.map((option, index) => (
            <OptionCard
              key={option}
              label={option}
              index={index}
              isSelected={selectedOptionIndex === index}
              isCorrectAnswer={index === currentQuestion.correctOptionIndex}
              hasAnswered={hasAnswered}
              onSelect={onSelectOption}
            />
          ))}
        </div>

        {hasAnswered && (
          <div
            className="mx-auto w-full max-w-xl animate-pop-in rounded-xl2 border-2 border-clube-blue-light bg-white p-4 text-center shadow-lg"
            role="status"
          >
            <p className="font-display text-lg font-bold text-clube-navy">
              {wasCorrect ? '🎉 Isso aí! Resposta certa!' : '💡 Quase! Veja a curiosidade:'}
            </p>
            <p className="mt-1 font-body text-sm text-clube-navy/80 sm:text-base">
              {currentQuestion.funFact}
            </p>
            <button
              type="button"
              onClick={onNext}
              className="mt-3 font-body text-sm font-semibold text-clube-blue underline decoration-2 underline-offset-2"
            >
              Próxima pergunta →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
