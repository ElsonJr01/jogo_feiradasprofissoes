import Image from 'next/image';

interface MascotProps {
  readonly size?: number;
  readonly floating?: boolean;
  readonly className?: string;
}

/** Mascote oficial do Clube de Programação ("Polvinho"), usado em toda a jornada do jogo. */
export function Mascot({ size = 220, floating = true, className = '' }: MascotProps) {
  return (
    <Image
      src="/images/polvinho.png"
      alt="Polvinho, o mascote do Clube de Programação, sorrindo em frente a um notebook"
      width={933}
      height={614}
      priority
      style={{ width: size, height: 'auto' }}
      className={`select-none drop-shadow-xl ${floating ? 'animate-float' : ''} ${className}`}
    />
  );
}
