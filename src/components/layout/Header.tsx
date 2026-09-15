interface HeaderProps {
  readonly rightSlot?: React.ReactNode;
}

/**
 * Cabeçalho com a marca "Clube de Programação".
 * O ícone é um "C" estilizado recriado em SVG (mesma forma/cor do logo
 * oficial), garantindo nitidez em qualquer resolução de tela.
 */
export function Header({ rightSlot }: HeaderProps) {
  return (
    <header className="flex w-full items-center justify-between px-4 py-3 sm:px-8">
      <div className="flex items-center gap-2.5">
        <ClubeLogoIcon className="h-9 w-9 sm:h-10 sm:w-10" />
        <span className="font-display text-lg font-extrabold leading-tight text-clube-blue sm:text-xl">
          Clube de
          <br className="sm:hidden" /> Programação
        </span>
      </div>
      {rightSlot}
    </header>
  );
}

/** Ícone "C" da marca, desenhado em SVG puro (vetor, sem perda de qualidade). */
export function ClubeLogoIcon({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M 78 30 A 34 34 0 1 0 78 70"
        fill="none"
        stroke="#136AFF"
        strokeWidth="16"
        strokeLinecap="round"
      />
    </svg>
  );
}
