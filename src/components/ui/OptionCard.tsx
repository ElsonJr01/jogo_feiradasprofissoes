interface OptionCardProps {
  readonly label: string;
  readonly index: number;
  readonly isSelected: boolean;
  readonly isCorrectAnswer: boolean;
  readonly hasAnswered: boolean;
  readonly onSelect: (index: number) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

/**
 * Cartão de alternativa de resposta.
 *
 * Estados visuais:
 *  - Neutro: ainda não respondido.
 *  - Selecionado + correto: verde, com ícone de check.
 *  - Selecionado + incorreto: vermelho, com ícone de X.
 *  - Não selecionado, mas é a correta (revelada após responder): verde suave.
 */
export function OptionCard({
  label,
  index,
  isSelected,
  isCorrectAnswer,
  hasAnswered,
  onSelect,
}: OptionCardProps) {
  const showAsCorrect = hasAnswered && isCorrectAnswer;
  const showAsWrong = hasAnswered && isSelected && !isCorrectAnswer;

  const stateClasses = showAsCorrect
    ? 'border-clube-green bg-clube-green/10 text-clube-navy'
    : showAsWrong
      ? 'border-red-400 bg-red-50 text-clube-navy'
      : 'border-clube-blue-light bg-white text-clube-navy hover:border-clube-blue hover:bg-clube-blue-pale';

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      disabled={hasAnswered}
      aria-pressed={isSelected}
      className={`group flex w-full items-center gap-4 rounded-xl2 border-2 px-5 py-4 text-left text-base font-body font-semibold shadow-sm transition-all duration-150 disabled:cursor-not-allowed sm:text-lg ${stateClasses} ${
        !hasAnswered ? 'active:scale-[0.98]' : ''
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ${
          showAsCorrect
            ? 'bg-clube-green text-white'
            : showAsWrong
              ? 'bg-red-400 text-white'
              : 'bg-clube-blue-pale text-clube-blue'
        }`}
      >
        {OPTION_LETTERS[index]}
      </span>
      <span className="flex-1">{label}</span>
      {showAsCorrect && <span aria-hidden="true">✅</span>}
      {showAsWrong && <span aria-hidden="true">❌</span>}
    </button>
  );
}
