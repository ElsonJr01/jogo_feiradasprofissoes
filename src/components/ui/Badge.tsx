import type { ReactNode } from 'react';

interface BadgeProps {
  readonly children: ReactNode;
}

/** Pequeno rótulo arredondado usado para destacar informações curtas (ex.: pontuação). */
export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-clube-lavender px-4 py-1.5 font-display text-sm font-bold text-clube-purple">
      {children}
    </span>
  );
}
