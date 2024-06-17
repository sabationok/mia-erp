import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import TabSelector, { FilterSelectHandler } from '../../atoms/TabSelector';
import { useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../../utils';
import { useOrdersSelector } from '../../../redux/selectors.store';
import OrderContentTab from './tabs/OrderContentTab';
import OrderInvoicesTab from './tabs/OrderInvoicesTab';
import OrderPaymentsTab from './tabs/OrderPaymentsTab';
import OrderDeliveriesTab from './tabs/OrderDeliveriesTab';
import { DrawerHeader } from '../../Overlays';
import { t } from '../../../lang';

export interface PageOrderOverviewTabsProps {
  isVisible?: boolean;
  toggleVisibility?: () => void;
}
enum OrderTabNameEnum {
  Content = 'Content',
  Invoices = 'Invoices',
  Payments = 'Payments',
  Deliveries = 'Deliveries',
  // Shipments = 'Shipments',
}
const toggleOptions = enumToFilterOptions(OrderTabNameEnum);
const PageOrderOverviewTabs = ({ toggleVisibility, isVisible }: PageOrderOverviewTabsProps) => {
  // const orderId = useAppParams()?.orderId;

  const { currentOrder } = useOrdersSelector();
  // const service = useAppServiceProvider()[ServiceName.orders];
  const [current, setCurrent] = useState<OrderTabNameEnum>(OrderTabNameEnum.Content);

  const renderTab = useMemo(() => {
    if (current === OrderTabNameEnum.Content) {
      return <OrderContentTab />;
    }
    if (current === OrderTabNameEnum.Invoices) {
      return <OrderInvoicesTab />;
    }
    if (current === OrderTabNameEnum.Payments) {
      return <OrderPaymentsTab />;
    }
    if (current === OrderTabNameEnum.Deliveries) {
      return <OrderDeliveriesTab />;
    }
  }, [current]);

  const filterHandler: FilterSelectHandler<OrderTabNameEnum> = (_, value, index) => {
    value && setCurrent(value);
  };

  return (
    <RightSide overflow={'hidden'} fillHeight isVisible={isVisible}>
      {isVisible && (
        <DrawerHeader title={currentOrder?.reference?.internal ?? t('undefined')} onBackPress={toggleVisibility} />
      )}

      <FlexBox>
        <TabSelector options={toggleOptions} defaultValue={current} onOptSelect={filterHandler} preventDefault />
      </FlexBox>

      <FlexBox overflow={'hidden'} flex={1}>
        {renderTab}
      </FlexBox>
    </RightSide>
  );
};
const RightSide = styled(FlexBox)<{ isVisible?: boolean }>`
  overflow: auto;

  max-width: 100%;

  transition: ${p => p.theme.globals.timingFunctionMain};
  background-color: ${p => p.theme.backgroundColorLight};

  @media screen and (min-width: 768px) {
    min-width: 320px;
  }

  @media screen and (max-width: 768px) {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 20;

    transform: translateX(${p => (p.isVisible ? 0 : 100)}%);

    box-shadow: ${p => (p.isVisible ? '0 12px 26px rgba(0, 0, 0, 0.25)' : '')};
  }
`;

export default PageOrderOverviewTabs;
