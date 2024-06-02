import * as React from 'react';
import { useMemo, useState } from 'react';
import ReportList, { ReportListItemProps } from './ReportList';
import ModalForm from '../ModalForm';
import { IReportBaseProps } from './report.types';
import FlexBox from 'components/atoms/FlexBox';
import { TabOption } from '../atoms/TabSelector';
import { FinTransactionType, FinTransactionTypeEnum } from '../../types/directories.types';
import styled from 'styled-components';
import { enumToArray, founder, numberWithSpaces } from '../../utils';
import { categoriesFilterOptions } from '../../data/modalFilterOptions.data';

export interface IReportCategoriesProps<V = any, D = any> extends IReportBaseProps<unknown, V, D> {
  entryList?: ReportListItemProps<FinTransactionType>[];
  currency?: string;
}

const ReportCategories: React.FC<IReportCategoriesProps<FinTransactionType>> = ({
  currency = 'UAH',
  entryList,
  ...props
}) => {
  const [filterOpt, setFilterOpt] = useState<Partial<TabOption<FinTransactionType>>>({});
  const countedTotals = useMemo(() => {
    let totals: Record<FinTransactionType, number> = {
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

  const entryLists = useMemo((): Partial<Record<FinTransactionType, ReportListItemProps<FinTransactionType>[]>> => {
    let data: Partial<Record<FinTransactionType, ReportListItemProps<FinTransactionType>[]>> = {};

    if (!entryList) return data;

    enumToArray(FinTransactionTypeEnum).map(key => {
      data[key] = founder({ searchParam: 'type', searchQuery: key, data: entryList });
      return '';
    });

    return data;
  }, [entryList]);

  function handleSelect(option: TabOption<FinTransactionType>, value: FinTransactionType) {
    setFilterOpt(option);
  }

  return (
    <ModalForm {...props} options={reportCategoriesFilterOptions} preventDefault onOptSelect={handleSelect}>
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

const ExtraLabel = styled.div<{ colorType?: FinTransactionType }>`
  font-weight: 400;
  color: ${({ colorType, theme }) => {
    const map: Record<FinTransactionType, any> = {
      INCOME: theme.globals.colors.success,
      EXPENSE: theme.globals.colors.error,
      TRANSFER: theme.globals.colors.info,
    };
    return colorType ? map[colorType] : '';
  }};
`;

export default ReportCategories;
