import { ObjectKeys } from './forArray.helpers';
import { ClientLogger } from './logger';

const _logger = new ClientLogger('Slice Cleaner');

export function sliceCleaner<State extends Record<string, any> = any>(init: State, { name }: { name?: string } = {}) {
  return (state: State): State => {
    ObjectKeys(init).forEach(key => {
      state[key] = init[key];
    });

    if (name) _logger.setPrefix(name);
    _logger.debug('State was cleaned');
    return state;
  };
}
