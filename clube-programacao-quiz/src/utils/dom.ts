interface ElementOptions {
  className?: string;
  text?: string;
  attrs?: Record<string, string>;
}

/** Cria um elemento tipado, já com classe, texto e atributos opcionais. */
export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options: ElementOptions = {},
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);

  if (options.className) {
    node.className = options.className;
  }
  if (options.text) {
    node.textContent = options.text;
  }
  if (options.attrs) {
    for (const [key, value] of Object.entries(options.attrs)) {
      node.setAttribute(key, value);
    }
  }

  return node;
}

/** Remove todo o conteúdo filho de um elemento. */
export function clear(node: HTMLElement): void {
  node.innerHTML = '';
}
