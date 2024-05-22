import * as React from 'react';
import { useMemo, useState } from 'react';
import ReportList, { ReportListItemProps } from './ReportList';
import ModalForm from '../ModalForm';
import { IReportBaseProps } from './report.types';
import FlexBox from '../atoms/FlexBox';
import { TabOption } from '../atoms/TabSelector';
import { numberWithSpaces } from 'utils';
import { CountType } from 'redux/directories/counts.types';
import { CurrencyCode } from '../../types/finances/transactions.types';
import styled from 'styled-components';

export interface IReportCountsProps<V = any, D = any> extends IReportBaseProps<unknown, V, D> {
  entryList?: ReportListItemProps<CountType>[];
  currency?: CurrencyCode;
}

const ReportCounts: React.FC<IReportCountsProps<CountType>> = ({ entryList, filterOptions, currency, ...props }) => {
  const [filterOpt, setFilterOpt] = useState<Partial<TabOption<CountType>>>({});
  const countedTotals = useMemo(() => {
    let totals: Record<CountType, number> = {
      ACTIVE: 0,
      PASSIVE: 0,
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

  const filterOptionsMemo = useMemo(() => {
    if (!filterOptions) return;
    return filterOptions.map(el => ({
      ...el,
      extraLabel: (
        <ExtraLabel colorType={el.value}>{`${numberWithSpaces(countedTotals[el.value])} ${currency || ''}`}</ExtraLabel>
      ),
    }));
  }, [countedTotals, currency, filterOptions]);

  // const entryLists = useMemo((): Partial<Record<CountType, ReportListItemProps<CountType>[]>> => {
  //   let data: Partial<Record<CountType, ReportListItemProps<CountType>[]>> = {};
  //
  //   if (!entryList) return data;
  //
  //   enumToArray(CountsTypesEnum).map(key => {
  //     data[key] = founder({ searchParam: 'type', searchQuery: key, data: entryList });
  //     return '';
  //   });
  //
  //   return data;
  // }, [entryList]);

  function handleSelect(option: TabOption<CountType>, value: CountType) {
    setFilterOpt(option);
  }

  return (
    <ModalForm {...props} preventDefault filterOptions={filterOptionsMemo} onOptSelect={handleSelect}>
      <FlexBox fillWidth flex={'1'}>
        {filterOpt.value && (
          <ReportList entryList={[]} totalAmount={countedTotals[filterOpt.value] || 0} currency={currency} />
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
const ExtraLabel = styled.div<{ colorType?: CountType }>`
  font-weight: 400;
  color: ${({ colorType, theme }) => {
    const map: Record<CountType, any> = {
      ACTIVE: theme.globals.colors.success,
      PASSIVE: theme.globals.colors.error,
    };
    return colorType ? map[colorType] : '';
  }};
`;

export default ReportCounts;
