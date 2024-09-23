import { AxiosError } from 'axios';

export type EventsMap = {
  [key: string]: any;
};
export type ListenersMappedType<EventDataMap = EventsMap> = {
  [key in keyof EventDataMap]: EvListener<EventDataMap[key]>;
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
export type EvListener<Ev> = (ev: Ev) => void;
export type NamedQueue<Payload> = Map<string, SubscriberData<Payload>>;
export type ListQueue<Payload> = SubscriberData<Payload>[];

export class EventQueues<Payload> {
  map: NamedQueue<Payload>;
  list: ListQueue<Payload>;

  constructor() {
    this.list = [];
    this.map = new Map();
  }
}
