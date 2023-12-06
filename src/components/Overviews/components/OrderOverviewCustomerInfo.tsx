import { RenderOverviewCellComponent } from './overview-types';
import { IOrder } from '../../../types/orders/orders.types';
import { CellStyledComp } from './CellStyles';
import FlexBox from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';
import { t } from '../../../lang';
import { useMemo } from 'react';
import { OverviewCellHeader } from './OverviewCellHeader';

export const OrderOverviewCustomerInfo: RenderOverviewCellComponent<IOrder> = ({ cell, data }) => {
  const renderCells = useMemo(() => {
    const cells: { label: string; value?: React.ReactNode; visible?: boolean }[] = [
      {
        label: t('First name'),
        value: data?.customer?.name?.first,
        visible: data?.customer?.businessType !== 'company',
      },
      {
        label: t('Second name'),
        value: data?.customer?.name?.second,
        visible: data?.customer?.businessType !== 'company',
      },
      {
        label: t('Middle name'),
        value: data?.customer?.name?.middle,
        visible: data?.customer?.businessType !== 'company',
      },

      {
        label: t('Base label'),
        value: data?.customer?.name?.first,
        visible: data?.customer?.businessType !== 'person',
      },
      { label: t('Print'), value: data?.customer?.name?.second, visible: data?.customer?.businessType !== 'person' },

      { label: t('Email'), value: data?.customer?.email },
      { label: t('Phone'), value: data?.customer?.phone },

      { label: t('Tags'), value: null },
    ];

    return cells.map(cell => {
      return (
        <FlexBox
          key={cell.label}
          fxDirection={'row'}
          padding={'6px'}
          gap={8}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text $size={11}>{cell?.label}</Text>
          <Text $size={13} $weight={500}>
            {cell?.value ?? t('undefined')}
          </Text>
        </FlexBox>
      );
    });
  }, [
    data?.customer?.businessType,
    data?.customer?.email,
    data?.customer?.name?.first,
    data?.customer?.name?.middle,
    data?.customer?.name?.second,
    data?.customer?.phone,
  ]);

  return (
    <CellStyledComp.Cell>
      {cell?.title && <OverviewCellHeader title={cell?.title} />}

      {renderCells}
    </CellStyledComp.Cell>
  );
};
