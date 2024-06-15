import { ObjectKeys } from './forArray.helpers';

export function sliceCleaner<State extends Record<string, any> = any>(init: State) {
  return (state: State): State => {
    ObjectKeys(init).forEach(key => {
      state[key] = init[key];
    });
    return state;
  };
}
