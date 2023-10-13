import FlexBox from '../../../atoms/FlexBox';
import { enumToFilterOptions } from '../../../../utils/fabrics';
import ModalFilter from '../../../ModalForm/ModalFilter';

export interface OrderContentTabProps {}

enum OrderContentTabsEnum {
  simple = 'simple',
  set = 'set',
}
const OrderContentTabs = enumToFilterOptions(OrderContentTabsEnum);
const OrderContentTab: React.FC<OrderContentTabProps> = ({}) => {
  return (
    <FlexBox fillWidth flex={1}>
      <ModalFilter filterOptions={OrderContentTabs} />
    </FlexBox>
  );
};

export default OrderContentTab;
