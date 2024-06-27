import { RenderOverviewCellComponent } from '../../components/overview-types';
import { OrderEntity } from '../../../../types/orders/orders.types';
import { AreaStyledComp } from '../../components/CellStyles';
import { OverviewCellHeader } from '../../components/OverviewCellHeader';
import { Text } from '../../../atoms/Text';
import { t } from '../../../../lang';

export const OrderOverviewGroupInfo: RenderOverviewCellComponent<OrderEntity> = ({ cell, overlayHandler, data }) => {
  return (
    <AreaStyledComp.Cell>
      <OverviewCellHeader title={cell?.title} />

      {data?.group?.magicLink ? (
        <Text>{data?.group?.magicLink}</Text>
      ) : (
        <AreaStyledComp.CellText>{t('undefined')}</AreaStyledComp.CellText>
      )}
    </AreaStyledComp.Cell>
  );
};
