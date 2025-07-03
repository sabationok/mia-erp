import { IBase } from './utils.types';

export type TreeEntityType = IBase & {
  parent?: TreeEntityType;
  children?: TreeEntityType[];
  childrenList: TreeEntityType[];
  path?: string;
  label?: string;
};
