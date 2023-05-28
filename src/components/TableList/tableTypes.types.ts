import React from 'react';
import { CellTittleProps } from './TebleCells/CellTitle';
import { FilterReturnDataType, FilterSelectorType } from '../Filter/AppFilter';
import { ButtonIconVariant } from '../atoms/ButtonIcon/ButtonIcon';
import { IconIdType } from '../../img/sprite';

export interface SelectItemBase extends Record<string, any> {
  _id?: string;
  filter?: boolean;
  search?: boolean;
  label?: string;
  name?: string;
  value?: string | number;
  dataKey?: string;
  sort?: boolean;
  dataPath?: string;
  descending?: boolean;
  path?: string;
}

export interface SelectItem extends SelectItemBase {}

export interface TableActionProps<TDataType = any> {
  separator?: boolean;
  iconId?: string;
  onClick?: () => void;
  type?: 'primary' | 'filled';
  disabled?: string;
  disabledCheck?: (selectedRows: TDataType[]) => boolean;
}

export interface TableActionsProps<TDataType = any> {
  top?: any[];
  bottom?: any[];
  footer?: boolean;
  actions?: TableActionProps<TDataType>[];
}

export interface ITableSortParam extends Pick<SelectItem, 'descending' | 'path' | 'dataPath' | 'dataKey'> {}

export type OnRowClickHandlerData<RData = any> = {
  ev?: MouseEvent | React.MouseEvent<HTMLDivElement>;
  _id?: string;
  rowData?: RData;
};
export type OnRowClickHandler<RData = any> = (data: OnRowClickHandlerData<RData>) => any;

export type OnCheckBoxChangeHandlerEvent<V = any> = {
  ev?: MouseEvent | React.MouseEvent<HTMLDivElement>;
  checked: boolean;
  _id?: string;
  value?: V;
};
export type OnCheckBoxChangeHandler<V = any> = (data: OnCheckBoxChangeHandlerEvent<V>) => any;
export type OnHeadCheckBoxChangeHandler<V = any> = (data: V) => any;

export interface ITableListProps<TDataType = any> extends React.HTMLAttributes<HTMLDivElement> {
  tableTitles?: CellTittleProps[];
  tableSearchParams?: SelectItem[];
  tableSortParams?: ITableSortParam[];
  tableData?: TDataType[];
  isLoading?: boolean;
  RowActionsComp?: React.ReactNode;
  quickActions?: {
    ActionsStart?: React.ReactNode;
    ActionsEnd?: React.ReactNode;
  };
  tableActions?: TableActionsProps<TDataType>;
  TableActionsComp?: React.ReactNode;
  isFilter?: boolean;
  isSearch?: boolean;
  footer?: boolean;
  pagination?: boolean;
  counter?: boolean;
  checkBoxes?: boolean;
  rowGrid?: any;
  children?: React.ReactNode;
  filterTitle?: string;
  filterSelectors?: FilterSelectorType[];
  filterDefaultValues?: FilterReturnDataType;
  onFilterSubmit?: (filterData: FilterReturnDataType) => void;
  onRowClick?: OnRowClickHandler<TDataType>;
  onCheckboxChange?: OnCheckBoxChangeHandler;
  onHeadCheckboxChange?: OnHeadCheckBoxChangeHandler;
  onTableSortParamChange?: (params: ITableSortParam) => void;
  handleTableSort?: (sortParam: ITableSortParam) => void;
  actionsCreator?: TableActionCreator<TDataType>;
}

export interface ITableListContext<TDataType = any> extends ITableListProps<TDataType> {
  selectedRows?: string[];
  rowRef?: React.MutableRefObject<HTMLElement | undefined>;
}

export type UseTableHookType = <TDataType = any>() => ITableListContext<TDataType>;

export interface ITableAction {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
  disabled?: boolean;
  disabledCheck?: () => boolean;
  type?: ButtonIconVariant;
  separator?: boolean;
  description?: string;
  icon?: IconIdType;
  name?: string;
  iconSize?: string;
}

export type TableActionCreator<TData = any> = (ctx: ITableListContext<TData>) => ITableAction[];
