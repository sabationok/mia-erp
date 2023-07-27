import { useEffect } from 'react';

function useCloseByEscapeOrClickOnBackdrop(
  setState: (state: boolean) => void,
  dataAttribute: string,
  closeOnClickOut?: boolean
) {
  useEffect(() => {
    function onCloseCallback(ev: MouseEvent | KeyboardEvent) {
      if (!closeOnClickOut) return;

      if (ev.target instanceof HTMLElement && !ev.target.closest(`[${dataAttribute}]`)) setState(false);
      if (ev instanceof KeyboardEvent && ev?.code === 'Escape') setState(false);
    }

    document.addEventListener('click', onCloseCallback);
    document.addEventListener('keydown', onCloseCallback);

    return () => {
      document.removeEventListener('click', onCloseCallback);
      document.removeEventListener('keydown', onCloseCallback);
    };
  }, [closeOnClickOut, dataAttribute, setState]);
}

export default useCloseByEscapeOrClickOnBackdrop;