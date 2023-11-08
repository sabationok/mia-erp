import React from 'react';
import { CellTittleProps } from './TebleCells/CellTitle';
import { FilterReturnDataType, FilterSelectorType } from '../Filter/AppFilter';
import { ButtonIconVariant } from '../atoms/ButtonIcon/ButtonIcon';
import { IconIdType } from '../../img/sprite';
import { TableSearchFormState } from './TableOverHead/TableSearchForm/TableSearchForm';

export interface SelectItemBase extends Record<string, any> {
  _id?: string;
  id?: string;
  filter?: boolean;
  search?: boolean;
  label?: string;
  name?: string;
  secondName?: string;
  value?: string | number;
  dataKey?: string;
  sort?: boolean;
  dataPath?: any;
  path?: string;
  sortOrder?: 'desc' | 'asc';
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

export type OnRowClickHandlerData<RData = any> = {
  ev?: MouseEvent | React.MouseEvent<HTMLDivElement>;
  _id?: string;
  rowData?: RData;
};
export type OnRowClickHandler<RData = any> = (data?: OnRowClickHandlerData<RData>) => any;

export type OnCheckBoxChangeHandlerEvent<V = any> = {
  ev?: MouseEvent | React.MouseEvent<HTMLDivElement>;
  checked: boolean;
  _id?: string;
  value?: V;
};
export type OnCheckBoxChangeHandler<V = any> = (data: OnCheckBoxChangeHandlerEvent<V>) => any;
export type OnHeadCheckBoxChangeHandler<V = any> = (data: V) => any;

export interface ITableListProps<TDataType = any> {
  tableTitles?: CellTittleProps<TDataType>[];
  tableData?: TDataType[];
  tableSearchParams?: SelectItem[];
  tableSortParams?: SelectItem[];
  transformData?: <T = any>(data: TDataType) => T;
  RowActionsComp?: React.ReactNode;
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
  selectedRow?: Partial<TDataType>;
  isLoading?: boolean;
  scrollBarWidth?: number;
  actionsCreator?: TableActionCreator<TDataType>;

  onSubmitSearch?: (data: TableSearchFormState) => void;
  onFilterSubmit?: (filterData: FilterReturnDataType) => void;
  handleTableSort?: (param: SelectItem, sortOrder: SelectItem['sortOrder']) => void;
  onRowClick?: OnRowClickHandler<TDataType | undefined>;
  onRowDoubleClick?: OnRowClickHandler<TDataType | undefined>;
  onCheckboxChange?: OnCheckBoxChangeHandler;
  onHeadCheckboxChange?: OnHeadCheckBoxChangeHandler;
  onTableSortParamChange?: (params: SelectItem) => void;
  onRefresh?: (loading: boolean) => void;
}

export interface ITableListContext<TDataType = any> extends ITableListProps<TDataType> {
  selectedRows?: string[];
  rowRef?: React.MutableRefObject<HTMLElement | undefined>;
}

export type UseTableHookType = <TDataType = any>() => ITableListContext<TDataType>;

export interface ITableAction<N extends string = any> {
  name?: N;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
  disabled?: boolean;
  disabledCheck?: () => boolean;
  type?: ButtonIconVariant;
  separator?: boolean;
  description?: string;
  icon?: IconIdType;
  iconSize?: string;
}

export type TableActionCreator<TData = any, N extends string = any> = (
  ctx: ITableListContext<TData>
) => ITableAction<N>[];
