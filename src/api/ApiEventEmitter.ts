import { EventEmitter1 } from '../services';
import { HttpApi } from './HttpApi';

export class ApiEventEmitterService {
  private static emitter = new EventEmitter1<HttpApi.DefaultEventsMap>({
    name: ApiEventEmitterService.name,
  });

  public static get emitterRef() {
    return this.emitter;
  }

  protected static eventListeners: HttpApi.CreateOptions['eventListeners'] = {
    onUnauthorized: error => this.emitter.emit(HttpApi.ReservedEventName.onUnauthorized, error),
    onRefreshToken: data => this.emitter.emit(HttpApi.ReservedEventName.onRefreshToken, data),
    onForbidden: data => this.emitter.emit(HttpApi.ReservedEventName.onForbidden, data),
  };

  static onUnauthorized = (listener: HttpApi.EventListenersMap['onUnauthorized']) => {
    return this.emitter.onWith(
      HttpApi.ReservedEventName.onUnauthorized,
      HttpApi.ReservedEventName.onUnauthorized,
      listener
    );
  };
  static onRefreshToken = (listener: HttpApi.EventListenersMap['onRefreshToken']) => {
    return this.emitter.onWith(
      HttpApi.ReservedEventName.onRefreshToken,
      HttpApi.ReservedEventName.onRefreshToken,
      listener
    );
  };
  static onForbidden = (listener: HttpApi.EventListenersMap['onForbidden']) => {
    return this.emitter.onWith(HttpApi.ReservedEventName.onForbidden, HttpApi.ReservedEventName.onForbidden, listener);
  };
}
