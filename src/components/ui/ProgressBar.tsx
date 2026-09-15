interface ProgressBarProps {
  readonly current: number;
  readonly total: number;
}

/** Barra de progresso indicando em qual pergunta o aluno está. */
export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.min(100, (current / total) * 100) : 0;

  return (
    <div
      className="h-3 w-full overflow-hidden rounded-full bg-clube-blue-light/40"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Pergunta ${current} de ${total}`}
    >
      <div
        className="h-full rounded-full bg-clube-green transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
