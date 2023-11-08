import { useCallback, useEffect, useRef } from 'react';
import { ToastService } from '../services';
import { checks } from '../utils';

export const useScrollTo = <E extends HTMLElement = any>(
  id?: string | number,
  options?: { delay?: number; horizontal?: boolean; offsetFix?: number }
) => {
  const listRef = useRef<E>(null);

  const scrollTo = useCallback(
    (id: string | number) => {
      try {
        if (!(listRef.current instanceof HTMLElement)) {
          return;
        }
        const targetEl = listRef.current?.querySelector<HTMLElement>(`#_${id}`);

        if (targetEl) {
          const offset = options?.horizontal ? targetEl.offsetLeft : targetEl.offsetTop;
          const countedOffset = options?.offsetFix ? offset - options.offsetFix : offset;

          const scrollToOptions: ScrollToOptions = {
            top: !options?.horizontal ? countedOffset : 0,
            left: options?.horizontal ? countedOffset : 0,
            behavior: 'smooth',
          };
          console.log({ scrollToOptions, offset, countedOffset });

          listRef.current?.scrollTo(scrollToOptions);
        }
      } catch (e) {
        console.error('USE SCROLL ERROR | ', e);
        ToastService.error(`Error in useScroll`);
      }
    },
    [options?.horizontal, options?.offsetFix]
  );

  useEffect(() => {
    if (!checks.isUnd(id)) {
      setTimeout(() => {
        scrollTo(id);
      }, options?.delay || 500);
    }
  }, [id, options?.delay, options?.horizontal, scrollTo]);

  return { listRef, scrollTo };
};
export default useScrollTo;
