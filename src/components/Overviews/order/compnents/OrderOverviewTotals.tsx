import { RenderOverviewAreaComponent } from '../../components/overview-types';
import { OrderEntity } from '../../../../types/orders/orders.types';
import { AreaStyledComp } from '../../components/CellStyles';
import { OverviewAreaHeader } from '../../components/OverviewAreaHeader';
import { t } from '../../../../i18e';
import { useMemo } from 'react';
import FlexBox from '../../../atoms/FlexBox';
import { numberWithSpaces } from '../../../../utils';
import { Text } from '../../../atoms/Text';

export const OrderOverviewTotals: RenderOverviewAreaComponent<OrderEntity> = ({ data, cell }) => {
  const renderCells = useMemo(() => {
    const cells: { label: string; value?: React.ReactNode; visible?: boolean }[] = [
      { label: t('Amount'), value: numberWithSpaces(data?.total?.amount) },
      { label: t('Items count'), value: data?.total?.items },
    ];
    return cells.map(cell => (
      <FlexBox fxDirection={'row'} padding={'6px'} justifyContent={'space-between'} fillWidth gap={8}>
        <Text $size={11}>{cell.label}</Text>
        <AreaStyledComp.CellText $weight={600}>{cell?.value}</AreaStyledComp.CellText>
      </FlexBox>
    ));
  }, [data?.total?.amount, data?.total?.items]);

  return (
    <AreaStyledComp.Cell>
      <OverviewAreaHeader title={cell.title} />

      {renderCells}
    </AreaStyledComp.Cell>
  );
};
