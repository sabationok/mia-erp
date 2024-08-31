import { ClientLogger } from '../utils/logger';
import { MaybePromise, PartialRecord } from '../types/utils.types';
import ConfigService from './ConfigService';
import { ObjectKeys } from '../utils';
import { AxiosError } from 'axios';

export namespace EvEmitter {
  export type EventsMap = {
    [key: string]: any;
  };
  export type Events<EvMap extends EventsMap = EventsMap> = EventsMap &
    EvMap & {
      onUnauthorized?: AxiosError;
      onForbidden?: AxiosError;
      onRefreshToken?: { _id: string; access_token: string };
    };

  export type Id = `l_${string | number}` | `m_${string | number}`;
  export type SubscriberData<Payload> = {
    id: Id;
    once?: boolean;
    listener: EvListener<Payload>;
  };

  export type NamedQueue<Payload> = Map<string, SubscriberData<Payload>>;
  export type ListQueue<Payload> = SubscriberData<Payload>[];

  export type EvListener<Ev> = (ev: Ev) => void;
  export type ListenersMappedType<EventMap> = {
    [key in keyof EventMap]: EvEmitter.EvListener<EventMap[key]>;
  };

  export class EventQueues<Payload> {
    map: EvEmitter.NamedQueue<Payload>;
    list: EvEmitter.ListQueue<Payload>;

    constructor() {
      this.list = [];
      this.map = new Map();
    }
  }
}

export class EventEmitter1<
  EmitEvMap extends EvEmitter.EventsMap = EvEmitter.EventsMap,
  Event extends keyof EmitEvMap = keyof EmitEvMap,
> {
  private _maxListeners: number = 10;
  private _logger: ClientLogger;
  private _queues: PartialRecord<Event, EvEmitter.EventQueues<EmitEvMap[Event]>> = {};

  constructor(configs?: { name?: string }) {
    this._logger = new ClientLogger(
      configs?.name ? [EventEmitter1.name, configs?.name ?? 'default'].join('/') : EventEmitter1.name
    );
  }

  on<Key extends Event>(event: Key, listener: EvEmitter.EvListener<EmitEvMap[Key]>): () => void {
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

  onWith<Key extends Event>(event: Key, id: string, listener: EvEmitter.EvListener<EmitEvMap[Key]>): () => void {
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

  clear(event?: Event) {
    if (event) {
      this._clearQueue(event);
    } else {
      ObjectKeys(this._queues).forEach(key => {
        this._clearQueue(key);
      });
    }
  }

  emit<Key extends Event, Async extends boolean = boolean>(
    event: Key,
    args: EmitEvMap[Key],
    { async }: { async?: Async } = {}
  ): MaybePromise<Async> {
    const _exec = (): boolean => {
      try {
        const queue = this._getQueue(event);
        if (queue) {
          const exec = this._getRunner(event, args);

          const list = queue.list.slice(0).concat(Array.from(queue.map.values()))!;
          if (!list.length) {
            return false;
          }
          list.forEach(exec as never);
          if (queue.list.length || queue.map.size) {
            ConfigService.isDevMode() &&
              this._logger.log(`Emitted event: ${String(event)} ${queue.list.length + queue.map.size} times`);
            return true;
          }
        }
        return false;
      } catch (e) {
        console.log(e);
        return false;
      }
    };

    return (async ? Promise.resolve(_exec()) : _exec()) as MaybePromise<Async>;
  }

  private _getQueue<Key extends Event>(event: Key): EvEmitter.EventQueues<EmitEvMap[Key]> {
    if (this._queues[event]) {
      return this._queues[event]!;
    }

    const q = new EvEmitter.EventQueues<EmitEvMap[Key]>();
    this._queues[event] = q as never;

    return q;
  }

  private _filter(list: EvEmitter.SubscriberData<any>[], id: string | number) {
    return list.filter((data: EvEmitter.SubscriberData<any>) => data.id !== `l_${id}`);
  }

  private _offFor<Key extends Event>(event: Key, id: EvEmitter.Id) {
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

  private _clearQueue(event: Event) {
    const q = this._getQueue(event);
    q.map.clear();
    q.list.length = 0;

    delete this._queues[event];
  }

  private _getRunner<Key extends Event>(name: Key, args: EmitEvMap[Key]) {
    return ({ listener, once, id }: EvEmitter.SubscriberData<EmitEvMap[Key]>) => {
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
