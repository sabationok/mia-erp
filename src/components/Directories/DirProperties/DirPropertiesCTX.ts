import { createContext, useContext } from 'react';

export interface DirPropertiesCTXValue {}
export const DirPropertiesCTX = createContext<DirPropertiesCTXValue>({});
export const useDirPropertiesCTX = () => useContext(DirPropertiesCTX);
