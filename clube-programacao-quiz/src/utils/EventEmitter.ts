type Listener<T> = (payload: T) => void;

/**
 * Pub/sub mínimo e tipado. As views o usam para avisar "o usuário clicou
 * aqui" sem precisar saber quem está ouvindo — quem ouve é sempre o
 * presenter correspondente.
 */
export class EventEmitter<EventMap extends Record<string, unknown>> {
  private listeners: { [K in keyof EventMap]?: Listener<EventMap[K]>[] } = {};

  on<K extends keyof EventMap>(event: K, listener: Listener<EventMap[K]>): void {
    const current = this.listeners[event] ?? [];
    current.push(listener);
    this.listeners[event] = current;
  }

  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]): void {
    this.listeners[event]?.forEach((listener) => listener(payload));
  }
}
