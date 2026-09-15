import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly children: ReactNode;
  readonly variant?: 'primary' | 'secondary' | 'ghost';
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-clube-blue text-white hover:bg-clube-blue-dark active:scale-95 shadow-lg shadow-clube-blue/30',
  secondary:
    'bg-clube-green text-white hover:bg-clube-green-dark active:scale-95 shadow-lg shadow-clube-green/30',
  ghost: 'bg-white text-clube-blue border-2 border-clube-blue hover:bg-clube-blue-pale active:scale-95',
};

/** Botão de ação padrão do jogo: grande, tátil e acessível para telas de feira/tablet. */
export function Button({ children, variant = 'primary', className = '', ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-xl2 px-8 py-4 text-lg font-display font-bold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
