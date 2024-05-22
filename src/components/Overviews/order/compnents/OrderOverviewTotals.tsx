import { RenderOverviewCellComponent } from '../../components/overview-types';
import { OrderEntity } from '../../../../types/orders/orders.types';
import { CellStyledComp } from '../../components/CellStyles';
import { OverviewCellHeader } from '../../components/OverviewCellHeader';
import { t } from '../../../../lang';
import { useMemo } from 'react';
import FlexBox from '../../../atoms/FlexBox';
import { numberWithSpaces } from '../../../../utils';
import { Text } from '../../../atoms/Text';

export const OrderOverviewTotals: RenderOverviewCellComponent<OrderEntity> = ({ data, cell }) => {
  const renderCells = useMemo(() => {
    const cells: { label: string; value?: React.ReactNode; visible?: boolean }[] = [
      { label: t('Amount'), value: numberWithSpaces(data?.total?.amount) },
      { label: t('Items count'), value: data?.total?.items },
    ];
    return cells.map(cell => (
      <FlexBox fxDirection={'row'} padding={'6px'} justifyContent={'space-between'} fillWidth gap={8}>
        <Text $size={11}>{cell.label}</Text>
        <CellStyledComp.CellText $weight={600}>{cell?.value}</CellStyledComp.CellText>
      </FlexBox>
    ));
  }, [data?.total?.amount, data?.total?.items]);

  return (
    <CellStyledComp.Cell>
      <OverviewCellHeader title={cell.title} />

      {renderCells}
    </CellStyledComp.Cell>
  );
};
