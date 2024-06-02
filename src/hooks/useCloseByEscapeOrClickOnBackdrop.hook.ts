import { useCallback, useEffect } from 'react';

function useCloseByEscapeOrClickOnBackdrop(
  setState: (state: boolean) => void,
  dataAttribute: string,
  disabled?: boolean
) {
  useEffect(() => {
    function onCloseCallback(ev: MouseEvent | KeyboardEvent) {
      if (!disabled) return;

      if (ev.target instanceof HTMLElement && !ev.target.closest(`[${dataAttribute}]`)) setState(false);
      if (ev instanceof KeyboardEvent && ev?.code === 'Escape') setState(false);
    }

    if (!disabled) {
      document.addEventListener('click', onCloseCallback);
      document.addEventListener('keydown', onCloseCallback);
    }

    return () => {
      document.removeEventListener('click', onCloseCallback);
      document.removeEventListener('keydown', onCloseCallback);
    };
  }, [disabled, dataAttribute, setState]);
}
export function useCloseByEscape(setState: (state: boolean) => void, { disabled }: { disabled?: boolean } = {}) {
  const onCloseCallback = useCallback(
    (ev: MouseEvent | KeyboardEvent) => {
      if (disabled) return;

      if (ev instanceof KeyboardEvent && ev?.code === 'Escape') setState(false);
    },
    [disabled, setState]
  );

  useEffect(() => {
    if (disabled) return;

    document.addEventListener('keydown', onCloseCallback);

    return () => {
      document.removeEventListener('keydown', onCloseCallback);
    };
  }, [disabled, onCloseCallback]);
}

export function useCloseByBackdropClick(
  setState: (state: boolean) => void,
  dataAttribute: string,
  { disabled }: { disabled?: boolean } = {}
) {
  useEffect(() => {
    function onCloseCallback(ev: MouseEvent | KeyboardEvent) {
      if (disabled) return;

      if (ev.target instanceof HTMLElement && !ev.target.closest(`[${dataAttribute}]`)) {
        setState(false);
      }
    }

    if (!disabled) {
      document.addEventListener('click', onCloseCallback);
    }

    return () => {
      if (!disabled) {
        document.removeEventListener('click', onCloseCallback);
      }
    };
  }, [disabled, dataAttribute, setState]);
}

export default useCloseByEscapeOrClickOnBackdrop;
