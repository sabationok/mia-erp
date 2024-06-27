import { RenderOverviewAreaComponent } from '../../components/overview-types';
import { OrderEntity } from '../../../../types/orders/orders.types';
import { AreaStyledComp } from '../../components/CellStyles';
import { OverviewAreaHeader } from '../../components/OverviewAreaHeader';
import { Text } from '../../../atoms/Text';
import { t } from '../../../../lang';

export const OrderOverviewGroupInfo: RenderOverviewAreaComponent<OrderEntity> = ({ cell, overlayHandler, data }) => {
  return (
    <AreaStyledComp.Cell>
      <OverviewAreaHeader title={cell?.title} />

      {data?.group?.magicLink ? (
        <Text>{data?.group?.magicLink}</Text>
      ) : (
        <AreaStyledComp.CellText>{t('undefined')}</AreaStyledComp.CellText>
      )}
    </AreaStyledComp.Cell>
  );
};
