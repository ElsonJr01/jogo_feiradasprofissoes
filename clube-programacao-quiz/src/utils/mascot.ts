const MASCOT_MARKUP = `
<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mascote do Clube de Programação">
  <path
    d="M80 20c-32 0-56 23-56 56 0 18 7 31 7 31l-9 23c-2 5 3 10 8 8l21-9c9 4 19 6 29 6 32 0 56-23 56-56S112 20 80 20Z"
    fill="var(--blue-600)"
  />
  <path
    d="M44 42c11-15 24-21 36-21"
    fill="none"
    stroke="var(--green-600)"
    stroke-width="13"
    stroke-linecap="round"
  />
  <circle cx="61" cy="74" r="11" fill="#FFFFFF" />
  <circle cx="63" cy="75" r="4.5" fill="var(--ink)" />
  <circle cx="99" cy="74" r="11" fill="#FFFFFF" />
  <circle cx="101" cy="75" r="4.5" fill="var(--ink)" />
  <path d="M63 99c6 6 28 6 34 0" fill="none" stroke="var(--ink)" stroke-width="4.5" stroke-linecap="round" />
</svg>
`;

/** Cria o mascote do jogo como um elemento DOM pronto para ser anexado. */
export function createMascot(): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'mascot';
  wrapper.innerHTML = MASCOT_MARKUP.trim();
  return wrapper;
}
