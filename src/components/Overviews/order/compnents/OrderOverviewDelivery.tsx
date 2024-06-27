import { RenderOverviewCellComponent } from '../../components/overview-types';
import { OrderEntity } from '../../../../types/orders/orders.types';
import { AreaStyledComp } from '../../components/CellStyles';
import { t } from '../../../../lang';
import { useMemo } from 'react';
import FlexBox from '../../../atoms/FlexBox';
import { Text } from '../../../atoms/Text';
import { OverviewCellHeader } from '../../components/OverviewCellHeader';

export const OrderOverviewDelivery: RenderOverviewCellComponent<OrderEntity> = ({ cell, data }) => {
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
    <AreaStyledComp.Cell>
      <OverviewCellHeader title={t('General info')} />
      {renderCells}
    </AreaStyledComp.Cell>
  );
};
