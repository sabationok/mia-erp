import React from 'react';
import { CellTittleProps } from './TebleCells/CellTitle';
import { FilterReturnDataType, FilterSelectorType } from '../Filter/AppFilter';
import { ButtonIconVariant } from '../atoms/ButtonIcon/ButtonIcon';
import { IconIdType } from '../../img/sprite';
import { TableSearchFormState } from './TableOverHead/TableSearchForm/TableSearchForm';
import { Property } from 'csstype';

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
  name?: string;
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

export type TableQuickActionsPosition = 'top' | 'right' | 'bottom' | 'left';
export interface ITableListProps<TDataType = any> {
  tableTitles?: CellTittleProps<TDataType>[];
  tableData?: TDataType[];
  selectedRow?: Partial<TDataType>;
  actionsCreator?: TableActionCreator<TDataType>;
  transformData?: <T = any>(data: TDataType) => T;

  tableSearchParams?: SelectItem[];
  tableSortParams?: SelectItem[];

  RowActionsComp?: React.ReactNode;
  // tableActions?: TableActionsProps<TDataType>;
  // TableActionsComp?: React.ReactNode;
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
  isLoading?: boolean;
  scrollBarWidth?: number;
  selectedRows?: string[];

  quickActionsPosition?: TableQuickActionsPosition;
  quickActionsDirection?: Property.FlexDirection;

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
  rowRef?: React.MutableRefObject<HTMLElement | undefined>;
}

export type UseTableReturnType = <TDataType = any>() => ITableListContext<TDataType>;

export type ITableAction<N extends string = any> = {
  name?: N;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
  label?: string;
  renderLabel?: React.ReactNode;
  disabled?: boolean;
  disabledCheck?: () => boolean;
  type?: ButtonIconVariant;
  description?: string;
  icon?: IconIdType;
  iconSize?: string;
  separator?: boolean;
};

export type TableActionCreator<DataType = any, N extends string = any> = (
  ctx: ITableListContext<DataType>
) => ITableAction<N>[];
