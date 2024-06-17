import React from 'react';
import { CellTittleProps } from './TebleCells/CellTitle';
import { FilterReturnDataType, FilterSelectorType } from '../Filter/AppFilter';
import { ButtonIconVariant } from '../atoms/ButtonIcon';
import { IconIdType } from '../../img/sprite';
import { TableSearchFormState } from './TableOverHead/TableSearchForm/TableSearchForm';
import { Property } from 'csstype';
import { CheckboxEvent } from './TebleCells/CellComponents/CheckBox';
import { orderBy } from 'lodash';
import { Path } from 'react-hook-form';
import { Values } from '../../types/utils.types';

export enum TableSortOrderEnum {
  desc = 'desc',
  asc = 'asc',
  DESC = 'DESC',
  ASC = 'ASC',
}
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
  sortOrder?: TableSortOrderEnum;
}

export interface SelectItem extends SelectItemBase {}

export interface TableSearchParam<DataPath = any, DataKey = any, DataType = any> {
  _id?: string;
  id?: string;
  label?: string;
  dataKey?: DataKey;
  dataPath?: DataPath;
  isArray?: boolean;
  isManual?: boolean;
  callback?: (data: DataType, param: TableSearchParam<DataPath, DataKey>) => boolean;
}
export interface TableSortParam<DataPath = any, DataKey = any, DataType = any> {
  _id?: string;
  id?: string;
  label?: string;
  dataKey?: DataKey;
  dataPath?: DataPath;
  isManual?: boolean;
  callback?: (data: DataType, param: TableSortParam<DataPath, DataKey>) => boolean;
}

function getSortedDataByParam<DataType = any>(
  data: DataType[],
  param: TableSortParam<Path<DataType>, never, DataType>,
  sortOrder: Values<Pick<typeof TableSortOrderEnum, 'desc' | 'asc'>>
) {
  return orderBy(data, [param.dataPath], [sortOrder]);
}

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

export type OnRowClickEvent<RData = any> = Partial<MouseEvent | React.MouseEvent<HTMLDivElement>> & {
  rowId?: string;
  rowData?: RData;
};
export type OnRowClickHandler<RData = any> = (event?: OnRowClickEvent<RData>) => any;

export type CheckboxChangeEvent<V = any> = CheckboxEvent & {
  checked: boolean;
  rowId?: string;
  value?: V;
};
export type OnCheckBoxChangeHandler<V = any> = (ev: CheckboxChangeEvent<V>) => any;
export type OnHeadCheckBoxChangeHandler<V = any> = (ev: CheckboxChangeEvent<V>) => any;

export type TableQuickActionsPosition = 'top' | 'right' | 'bottom' | 'left';
export interface ITableListProps<
  TDataType = any,
  SearchParam extends TableSearchParam = TableSearchParam,
  SortParam extends TableSortParam = TableSortParam,
  Extra = any,
> {
  tableTitles?: CellTittleProps<TDataType>[];
  tableData?: TDataType[];
  selectedRow?: Partial<TDataType>;
  actionsCreator?: TableActionsCreator<TDataType, any, Extra>;
  transformData?: <T = any>(data: TDataType) => T;

  searchParams?: SearchParam[];
  sortParams?: SortParam[];

  RowActionsComp?: React.ReactNode;
  // tableActions?: TableActionsProps<TDataType>;
  // TableActionsComp?: React.ReactNode;
  hasFilter?: boolean;
  hasSearch?: boolean;
  showFooter?: boolean;
  pagination?: boolean;
  counter?: boolean;
  checkBoxes?: boolean;

  keyExtractor?: (data: TDataType, index?: number) => string;

  rowGrid?: any;

  filterTitle?: string;
  filterSelectors?: FilterSelectorType[];
  filterDefaultValues?: FilterReturnDataType;
  isLoading?: boolean;
  scrollBarWidth?: number;
  selectedRows?: string[];
  rowIds?: string[];

  quickActionsPosition?: TableQuickActionsPosition;
  quickActionsDirection?: Property.FlexDirection;

  onSubmitSearch?: (data: TableSearchFormState<SearchParam>) => void;

  onFilterSubmit?: (filterData: FilterReturnDataType) => void;

  onRowClick?: OnRowClickHandler<TDataType | undefined>;
  onRowDoubleClick?: OnRowClickHandler<TDataType | undefined>;

  onCheckboxChange?: OnCheckBoxChangeHandler;
  onHeadCheckboxChange?: OnHeadCheckBoxChangeHandler;

  onTableSortChange?: (param: SortParam, order: TableSortOrderEnum) => void;
  onTableSortParamChange?: (params: SortParam, order: TableSortOrderEnum) => void;
  onRefresh?: (loading: boolean) => void;
  onRefreshPress?: () => void;
}

export interface ITableListContext<TDataType = any> extends ITableListProps<TDataType> {
  rowRef?: React.MutableRefObject<HTMLElement | undefined>;
  children?: React.ReactNode;
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
  navTo?: string;
};

export type TableActionsCreator<DataType = any, N extends string = any, Extra = any> = (
  ctx: ITableListContext<DataType>,
  extra?: Extra
) => ITableAction<N>[];
