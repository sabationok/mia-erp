import { createContext, useContext } from 'react';
import { PartialRecord } from '../../types/utils.types';
import { UseLoadersReturn } from './useLoaders.hook';

export const LoadersContext = createContext({} as UseLoadersReturn<any, any, any>);
export const useLoadersProvider = <
  Name extends string,
  Data extends PartialRecord<Name, any> = PartialRecord<Name, any>,
  Errors extends PartialRecord<Name, any> = PartialRecord<Name, any>
>() => useContext<UseLoadersReturn<Name, Data, Errors>>(LoadersContext);

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
