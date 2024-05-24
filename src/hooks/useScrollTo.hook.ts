import { useCallback, useEffect, useRef } from 'react';
import { isUndefined } from 'lodash';
import { ToastService } from '../services';

export const useScrollTo = <E extends HTMLElement = any>(
  id?: string | number,
  {
    preventDefault = false,
    ...options
  }: { delay?: number; horizontal?: boolean; offsetFix?: number; preventDefault?: boolean } = {}
) => {
  const listRef = useRef<E>(null);

  const scrollTo = useCallback(
    async (id: string | number) => {
      // const hashId = window.location.hash.replace('#', '');

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
    if (preventDefault) return;

    if (!isUndefined(id)) {
      setTimeout(() => {
        scrollTo(id);
      }, options?.delay ?? 500);
    }
  }, [id, options?.delay, preventDefault, scrollTo]);

  return { listRef, scrollTo };
};
export default useScrollTo;
