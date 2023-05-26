import { createContext, useContext, useEffect, useRef, useState } from 'react';

export const ObserverCTX = createContext({});
export const useObserverProvider = () => useContext(ObserverCTX);

// export const TableCTX = createContext({});
// export type UseTableHookType = <TDataType = any>() => ITableListContext<TDataType>;
// export const useTable: UseTableHookType = () => useContext(TableCTX);
const ObserverProvider = () => {
  const [isOnTop, setIsOnTop] = useState();
  const currentRef = useRef<Element>(null);

  useEffect(() => {
    if (!currentRef.current) return;

    const tableObserver = new IntersectionObserver(
      ([entry]) => {
        // if(!users?.length || users?.length < params?.limit) return;

        if (entry.isIntersecting) {
          // debounce(() => getAllDataWithParams({ ...params, offset: users?.length }), 3000);

          console.log(entry);
        }
      },
      {
        rootMargin: '120px',
        threshold: [0.2],
      }
    );
    tableObserver.observe(currentRef.current);

    return () => tableObserver.disconnect();
  }, []);

  return { currentRef, isOnTop };
};

export default ObserverProvider;
