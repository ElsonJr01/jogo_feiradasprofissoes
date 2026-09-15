/**
 * Contrato comum a toda view de tela cheia. Uma view só manipula o DOM e
 * emite eventos de interação — ela nunca guarda regra de jogo nem fala
 * diretamente com o model.
 */
export abstract class BaseView {
  protected readonly root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  abstract mount(): void;

  unmount(): void {
    this.root.innerHTML = '';
  }
}
