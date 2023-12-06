import { RenderOverviewCellComponent } from './overview-types';
import { IOrder } from '../../../types/orders/orders.types';
import { CellStyledComp } from './CellStyles';
import { t } from '../../../lang';
import { useMemo } from 'react';
import FlexBox from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';
import { OverviewCellHeader } from './OverviewCellHeader';

export const OrderOverviewDelivery: RenderOverviewCellComponent<IOrder> = ({ cell, data }) => {
  const renderCells = useMemo(() => {
    const cells: { label: string; value?: React.ReactNode; visible?: boolean }[] = [
      { label: t('Count'), value: data?.deliveries?.length },
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
  }, [data?.deliveries?.length]);

  return (
    <CellStyledComp.Cell>
      <OverviewCellHeader title={t('General info')} />
      {renderCells}
    </CellStyledComp.Cell>
  );
};
