import * as EventEmitter from './EventEmitter.types';
import { MaybeAsyncResult, PartialRecord } from '../../types/utils.types';
import { ClientLogger } from 'utils/logger';
import { ObjectKeys } from '../../utils';
import ConfigService from 'services/ConfigService';

export class EventEmitter1<
  EmitEvMap extends EventEmitter.EventsMap = EventEmitter.EventsMap,
  EventName extends Extract<keyof EmitEvMap, string> = Extract<keyof EmitEvMap, string>,
> {
  private _maxListeners: number = 10;
  private _logger: ClientLogger;
  private _queues: PartialRecord<EventName, EventEmitter.EventQueues<EmitEvMap[EventName]>> = {};

  constructor(configs?: { name?: string; _maxListeners?: number }) {
    this._logger = new ClientLogger(
      configs?.name ? [EventEmitter1.name, configs?.name ?? 'default'].join('/') : EventEmitter1.name
    );
  }

  on<Key extends EventName>(event: Key, listener: EventEmitter.EvListener<EmitEvMap[Key]>): () => void {
    const queue = this._getQueue(event);
    if (queue.map.size + queue.list.length >= this._maxListeners) {
      this._logger.warn(
        `Warning: possible EventEmitter memory leak detected. ${queue.map.size + 1} "${String(event)}" listeners added.`
      );
      this._logger.error('Max listeners count reached');
      return () => {};
    }

    const listenerId = `l_${queue.list.length - 1}` as const;
    queue.list!.push({ id: listenerId, listener: listener } as never);

    return () => {
      this._offFor(event, listenerId);
    };
  }

  onWith<Key extends EventName>(event: Key, id: string, listener: EventEmitter.EvListener<EmitEvMap[Key]>): () => void {
    const queue = this._getQueue(event);

    // Перевірка на максимальну кількість слухачів
    if (queue.map.size + queue.list.length >= this._maxListeners) {
      this._logger.warn(
        `Warning: possible EventEmitter memory leak detected. ${queue.map.size + 1} "${String(event)}" listeners added.`
      );
      this._logger.error('Max listeners count reached');
      console.trace('[EventEmitter]');
      return () => {};
    }

    queue.map.set(id, { id: `m_${id}`, listener });
    return () => {
      this._offFor(event, `m_${id}`);
    };
  }

  clear(event?: EventName) {
    if (event) {
      this._clearQueue(event);
    } else {
      ObjectKeys(this._queues).forEach(key => {
        this._clearQueue(key);
      });
    }
  }

  emit<Key extends EventName, Async extends boolean = boolean>(
    eventName: Key,
    args: EmitEvMap[Key],
    { async }: { async?: Async } = {}
  ): MaybeAsyncResult<boolean, Async> {
    const _exec = (): boolean => {
      try {
        const queue = this._getQueue(eventName);
        if (queue) {
          const exec = this._getRunner(eventName, args);

          const list = queue.list.slice(0).concat(Array.from(queue.map.values()))!;
          if (!list.length) {
            return false;
          }
          list.forEach(exec as never);
          if (list.length) {
            ConfigService.isDevMode &&
              this._logger.log(`Emitted event: ${String(eventName)} ${queue.list.length + queue.map.size} times`);
            return true;
          }
        }
        return false;
      } catch (e) {
        console.log(e);
        return false;
      }
    };

    return (async ? Promise.resolve(_exec()) : _exec()) as MaybeAsyncResult<boolean, Async>;
  }

  private _getQueue<Key extends EventName>(event: Key): EventEmitter.EventQueues<EmitEvMap[Key]> {
    if (this._queues[event]) {
      return this._queues[event]!;
    }

    const q = new EventEmitter.EventQueues<EmitEvMap[Key]>();
    this._queues[event] = q as never;

    return q;
  }

  private _filter(list: EventEmitter.SubscriberData<any>[], id: string | number) {
    return list.filter((data: EventEmitter.SubscriberData<any>) => data.id !== `l_${id}`);
  }

  private _offFor<Key extends EventName>(event: Key, id: EventEmitter.Id) {
    const __queue = this._getQueue<Key>(event);

    if (!__queue) {
      return;
    }

    if (id.startsWith('l_')) {
      __queue.list = this._filter(__queue.list, id);
    } else {
      if (__queue.map.has(id)) {
        __queue.map.delete(id);
      }
    }
  }

  private _clearQueue(event: EventName) {
    const q = this._getQueue(event);
    q.map.clear();
    q.list.length = 0;

    delete this._queues[event];
  }

  private _getRunner<Key extends EventName>(name: Key, args: EmitEvMap[Key]) {
    return ({ listener, once, id }: EventEmitter.SubscriberData<EmitEvMap[Key]>) => {
      try {
        listener(args);
        if (once) this._offFor(name, id);
      } catch (err) {
        this._logger.error(
          `Error while execute listener ${String(name)}` + (listener.name ? ' | ' + listener.name : '')
        );
      }
    };
  }
}
