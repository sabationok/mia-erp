import _ from 'lodash';
import { AnyFn } from './types';

export const throttledLogger = _.throttle((...args: any) => {
  console.log('Throttled Logger', ...args);
}, 5000);

export const throttleCallback = _.throttle(<T extends AnyFn>(fn: T) => {
  console.log(throttleCallback.name);

  fn();
}, 3000);

export const throttledCallback = <Fn extends AnyFn>(fn: Fn, wait: number = 3000) => {
  console.log('throttledCallback return');
  return _.throttle(fn, wait);
};
