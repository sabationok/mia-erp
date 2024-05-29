import { createContext, useContext } from 'react';
import { PartialRecord } from '../../types/utils.types';
import { UseLoadersReturn } from './useLoaders.hook';

export const LoadersContext = createContext({} as UseLoadersReturn<any, any, any>);
export const useLoadersProvider = <
  Name extends string,
  Data extends PartialRecord<Name | string, any> = PartialRecord<Name | string, any>,
  Errors extends PartialRecord<Name, any> = PartialRecord<Name, any>
>(
  loaders?: UseLoadersReturn<Name, Data, Errors>
) => {
  const ctx = useContext<UseLoadersReturn<Name, Data, Errors>>(LoadersContext);
  if (loaders) {
    return loaders;
  } else {
    return ctx;
  }
};

export const LoadersProvider = <
  Name extends string,
  Data extends PartialRecord<Name, any> = PartialRecord<Name, any>,
  Errors extends PartialRecord<Name, any> = PartialRecord<Name, any>
>({
  children,
  value,
}: {
  value: UseLoadersReturn<Name, Data, Errors>;
  children?: React.ReactNode;
}) => {
  return <LoadersContext.Provider value={value}>{children}</LoadersContext.Provider>;
};
