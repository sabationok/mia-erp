import { EventsMap } from '@socket.io/component-emitter';

export interface IoNamespaceEventsMap extends EventsMap, Record<string, (...args: any[]) => void> {}
export interface IoServerEvents extends IoNamespaceEventsMap {
  // Події, які сервер надсилає клієнту
  message: (data: string) => void;
  update: (data: any) => void;
}

export interface IoClientEvents extends EventsMap {
  // Події, які клієнт надсилає серверу
  sendMessage: (data: string) => void;
  requestUpdate: () => void;
}
