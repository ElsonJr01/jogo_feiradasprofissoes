import { SOCIAL_LINKS } from '@/lib/constants';

/** Rodapé com os canais oficiais do Clube, reaproveitados do slide de encerramento. */
export function Footer() {
  return (
    <footer className="w-full px-4 pb-6 pt-2 text-center sm:px-8">
      <p className="font-body text-sm text-clube-navy/70">
        Juntos, do aprendizado à prática! 💙 Siga{' '}
        <a
          href={SOCIAL_LINKS.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-clube-blue underline decoration-2 underline-offset-2 hover:text-clube-blue-dark"
        >
          {SOCIAL_LINKS.instagramHandle}
        </a>{' '}
        e veja as aulas em{' '}
        <span className="font-semibold text-clube-blue">{SOCIAL_LINKS.youtube}</span>
      </p>
    </footer>
  );
}
