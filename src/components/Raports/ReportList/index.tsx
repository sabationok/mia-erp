import * as React from 'react';
import { useMemo } from 'react';
import FlexBox, { FieldBox } from '../../atoms/FlexBox';
import CheckBox from '../../TableList/TebleCells/CellComponents/CheckBox';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { iconId } from '../../../img/sprite';
import styled from 'styled-components';
import Text from '../../atoms/Text';
import { countPercentage, numberWithSpaces } from '../../../utils';

export interface ReportListItemBaseProps<T = any>
  extends React.HTMLAttributes<HTMLDivElement> {
  label?: string | number;
  value?: string;
  type?: T;
  percentage?: string | number;
  amount?: number;
  currency?: string;
}

export interface ReportListItemProps<T = any>
  extends ReportListItemBaseProps<T> {
  childrenList?: ReportListItemProps<T>[];
}

const ReportListItem: React.FC<ReportListItemProps> = ({
  label,
  amount,
  currency,
  percentage,
  childrenList,
}) => {
  const renderChildren = useMemo(
    () =>
      childrenList?.map(ch => (
        <ReportListItem
          key={ch.label}
          {...ch}
          currency={currency}
          percentage={
            ch.amount && amount ? countPercentage(ch.amount, amount) : 0
          }
        />
      )),
    [amount, childrenList, currency]
  );

  return (
    <FlexBox fillWidth gap={8}>
      <FlexBox fxDirection={'row'} fillWidth gap={4} alignItems={'center'}>
        <CheckBox />
        <FieldBox fxDirection={'row'} flex={'1'}>
          <FlexBox
            fxDirection={'row'}
            flex={'1'}
            padding={'5px 8px'}
            alignItems={'center'}
            fillHeight
          >
            <Text>{label}</Text>
            {percentage && (
              <>
                <Separator />
                <Percentage>{percentage}%</Percentage>
              </>
            )}
            <Text style={{ marginLeft: 'auto' }}>{`${numberWithSpaces(
              amount
            )} ${currency || ''}`}</Text>
          </FlexBox>
          <ButtonIcon
            iconId={iconId.SmallArrowDown}
            variant={'onlyIconNoEffects'}
            size={'26px'}
            iconSize={'100%'}
            disabled={!childrenList}
          />
        </FieldBox>
      </FlexBox>

      {childrenList && (
        <FlexBox fillWidth padding={'0 0 0 32px'} gap={8}>
          {renderChildren}
        </FlexBox>
      )}
    </FlexBox>
  );
};

export interface ReportListProps {
  entryList?: ReportListItemProps[];
  totalAmount?: number;
  currency?: string;
}

export const ReportList: React.FC<ReportListProps> = ({
  entryList = [],
  totalAmount,
  currency,
}) => {
  const renderList = useMemo(
    () =>
      entryList.map(el => (
        <ReportListItem
          key={el.label}
          {...el}
          currency={currency}
          percentage={
            el.amount && totalAmount
              ? countPercentage(el.amount, totalAmount)
              : undefined
          }
        />
      )),
    [entryList, currency, totalAmount]
  );
  return (
    <FlexBox
      fillWidth
      fillHeight
      overflow={'auto'}
      gap={12}
      padding={'8px 12px'}
    >
      {renderList}
    </FlexBox>
  );
};

const Separator = styled.div`
  height: 100%;
  margin: 0 8px;

  border-right: 1px solid ${({ theme }) => theme.tableHeaderStroke};
  background-color: ${({ theme }) => theme.tableHeaderStroke};
`;

const Percentage = styled(Text)`
  background-color: ${({ theme }) =>
    '#464649' || theme.backgroundColorSecondary};
  color: ${({ theme }) => theme.accentColor.base};

  padding: 2px 4px;

  border-radius: 2px;
`;
export default ReportList;
