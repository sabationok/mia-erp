import { ClientLogger } from '../utils/logger';
import { Keys, PartialRecord, Values } from '../types/utils.types';
import { nanoid } from '@reduxjs/toolkit';

export class AppEventEmitter<T extends Record<string, (...args: any[]) => void>> {
  private _maxListeners: number = 10;
  private _name: string = '';
  private _logger = new ClientLogger(AppEventEmitter.name);

  private listeners: PartialRecord<
    Keys<T>,
    { map: Map<string | number, Values<T>>; list: { id: string | number; listener: Values<T> }[] }
  > = {};

  public _getQueue(name: Keys<T>): {
    map: Map<string | number, Values<T>>;
    list: { id: string | number; listener: Values<T> }[];
  } {
    if (this.listeners[name]) {
      return this.listeners[name]!;
    }

    return (this.listeners[name] = { map: new Map(), list: [] });
  }

  on<K extends keyof T>(event: K, listener: T[K]): () => void {
    const ls = this._getQueue(event);
    if (ls.map.size + ls.list.length >= this._maxListeners) {
      this._logger.error('Max listeners count reached');
      return () => {};
    }

    const listenerId = nanoid(12);
    ls.list!.push({ id: listenerId, listener: listener } as never);

    return () => {
      this.off(event, listenerId);
    };
  }

  onWith<K extends keyof T>(event: K, id: string, listener: T[K]): () => void {
    const ls = this._getQueue(event);

    if (ls.map.size + ls.list.length >= this._maxListeners) {
      this._logger.error('Max listeners count reached');
      return () => {};
    }

    ls.map.set(id, listener as never);
    return () => {
      this.off(event, id);
    };
  }

  off<K extends keyof T>(event: K, id: number | string) {
    const ls = this.listeners[event];
    if (!ls) {
      return;
    }

    if (ls.map.has(id)) {
      ls.map.delete(id);
    } else {
      ls.list.filter(item => item.id !== id);
    }
  }

  emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>) {
    const _exec = async () => {
      const ls = this.listeners[event];
      if (ls) {
        ls.list!.forEach(({ listener }) => listener(...args));
        Array.from(ls.map.values()).forEach(ls => {
          ls(...args);
        });
        if (ls.list.length || ls.map.size) {
          this._logger.log(`Emitted event: ${String(event)}`);
        }
      }
    };
    _exec();
  }
}
