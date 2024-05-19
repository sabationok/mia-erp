import { RenderOverviewCellComponent } from './overview-types';
import { OrderEntity } from '../../../types/orders/orders.types';
import { CellStyledComp } from './CellStyles';
import { OverviewCellHeader } from './OverviewCellHeader';
import { Text } from '../../atoms/Text';
import { t } from '../../../lang';

export const OrderOverviewGroupInfo: RenderOverviewCellComponent<OrderEntity> = ({ cell, overlayHandler, data }) => {
  return (
    <CellStyledComp.Cell>
      <OverviewCellHeader title={cell?.title} />

      {data?.group?.magicLink ? (
        <Text>{data?.group?.magicLink}</Text>
      ) : (
        <CellStyledComp.CellText>{t('undefined')}</CellStyledComp.CellText>
      )}
    </CellStyledComp.Cell>
  );
};
