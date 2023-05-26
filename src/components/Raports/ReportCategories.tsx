// @flow
import * as React from 'react';
import { useMemo, useState } from 'react';
import ReportList, { ReportListItemProps } from './ReportList';
import ModalForm from '../ModalForm';
import { IReportBaseProps } from './report.types';
import FlexBox from 'components/atoms/FlexBox';
import { FilterOpt } from '../ModalForm/ModalFilter';
import { categoriesFilterOptions } from '../../data/directories.data';
import { CategoriesTypesMap, CategoryTypes } from '../../redux/categories/categories.types';
import styled from 'styled-components';
import { founder, numberWithSpaces } from '../../utils';

const arr: ReportListItemProps<CategoryTypes>[] = [
  {
    label: 'Категорія',
    type: 'INCOME',

    amount: 15206,
    childrenList: [
      {
        label: 'Під-категорія 1',
        type: 'INCOME',
        amount: 2563,
      },
      {
        label: 'Під-категорія 2',
        type: 'INCOME',
        amount: 2135,
      },
    ],
  },
  {
    label: 'Категорія 3',
    type: 'INCOME',

    amount: 16562,
    childrenList: [
      {
        label: 'Під-категорія 1',
        type: 'INCOME',
        amount: 2563,
      },
      {
        label: 'Під-категорія 2',
        type: 'INCOME',
        amount: 2135,
      },
    ],
  },
  {
    label: 'Категорія 2',
    type: 'EXPENSE',

    amount: 56345,
    childrenList: [
      {
        label: 'Під-категорія 1',
        type: 'EXPENSE',
        amount: 3513,
      },
      {
        label: 'Під-категорія 2',
        type: 'EXPENSE',
        amount: 2135,
      },
    ],
  },
];

export interface IReportCategoriesProps<V = any, D = any> extends IReportBaseProps<unknown, V, D> {
  entryList?: ReportListItemProps<CategoryTypes>[];
  currency?: string;
}

const ReportCategories: React.FC<IReportCategoriesProps<CategoryTypes>> = ({
  currency = 'UAH',
  entryList,
  ...props
}) => {
  const [filterOpt, setFilterOpt] = useState<Partial<FilterOpt<CategoryTypes>>>({});
  const countedTotals = useMemo(() => {
    let totals: Record<CategoryTypes, number> = {
      INCOME: 0,
      EXPENSE: 0,
      TRANSFER: 0,
    };
    if (!entryList) return totals;

    entryList.map(el => {
      if (el.amount && el.type) {
        totals[el.type] = totals[el.type] += el.amount;
      }
      return null;
    });
    return totals;
  }, [entryList]);
  const reportCategoriesFilterOptions = useMemo(
    () =>
      categoriesFilterOptions.map(el => ({
        ...el,
        extraLabel: (
          <ExtraLabel colorType={el.value}>{`${numberWithSpaces(countedTotals[el.value])} ${
            currency || ''
          }`}</ExtraLabel>
        ),
      })),
    [countedTotals, currency]
  );

  const entryLists = useMemo((): Partial<Record<CategoryTypes, ReportListItemProps<CategoryTypes>[]>> => {
    let data: Partial<Record<CategoryTypes, ReportListItemProps<CategoryTypes>[]>> = {};

    if (!entryList) return data;

    Object.keys(CategoriesTypesMap).map(key => {
      data[key as CategoryTypes] = founder({ searchParam: 'type', searchQuery: key, data: entryList });
      return '';
    });

    return data;
  }, [entryList]);

  function handleSelect(option: FilterOpt<CategoryTypes>, value: CategoryTypes) {
    setFilterOpt(option);
  }

  return (
    <ModalForm {...props} filterOptions={reportCategoriesFilterOptions} preventFilter onOptSelect={handleSelect}>
      <FlexBox fillWidth flex={'1'}>
        {filterOpt.value && (
          <ReportList
            entryList={entryLists[filterOpt.value] || []}
            totalAmount={countedTotals[filterOpt.value] || 0}
            currency={currency}
          />
        )}

        {!filterOpt.value && (
          <FlexBox flex={'1'} fillWidth justifyContent={'center'} alignItems={'center'}>
            {'Оберіть тип звіту'}
          </FlexBox>
        )}
      </FlexBox>
    </ModalForm>
  );
};

const ExtraLabel = styled.div<{ colorType?: CategoryTypes }>`
  font-weight: 400;
  color: ${({ colorType, theme }) => {
    const map: Record<CategoryTypes, any> = {
      INCOME: theme.globals.colors.success,
      EXPENSE: theme.globals.colors.error,
      TRANSFER: theme.globals.colors.info,
    };
    return colorType ? map[colorType] : '';
  }};
`;

export default ReportCategories;