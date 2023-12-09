import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { Text } from '../../atoms/Text';
import ModalFilter, { FilterSelectHandler } from '../../ModalForm/ModalFilter';
import { useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../../utils';
import { useOrdersSelector } from '../../../redux/selectors.store';
import { useAppParams } from '../../../hooks';
import OrderContentTab from './tabs/OrderContentTab';
import OrderInvoicesTab from './tabs/OrderInvoicesTab';
import OrderPaymentsTab from './tabs/OrderPaymentsTab';
import OrderShipmentsTab from './tabs/OrderShipmentsTab';

export interface PageOrderOverviewTabsProps {
  isVisible?: boolean;
  toggleVisibility?: () => void;
}
enum OrderTabNameEnum {
  Content = 'Content',
  Invoices = 'Invoices',
  Payments = 'Payments',
  Shipments = 'Shipments',
}
const toggleOptions = enumToFilterOptions(OrderTabNameEnum);
const PageOrderOverviewTabs = ({ toggleVisibility, isVisible }: PageOrderOverviewTabsProps) => {
  const orderId = useAppParams()?.orderId;

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
    if (current === OrderTabNameEnum.Shipments) {
      return <OrderShipmentsTab />;
    }
  }, [current]);

  const filterHandler: FilterSelectHandler<OrderTabNameEnum> = (_, value, index) => {
    setCurrent(value);
  };

  return (
    <RightSide overflow={'hidden'} fillHeight isVisible={isVisible}>
      <Top fillWidth gap={4} isVisible={isVisible} fxDirection={'row'} justifyContent={'space-between'}>
        <ButtonIcon
          variant={'textExtraSmall'}
          icon={'SmallArrowLeft'}
          style={{ padding: 6 }}
          onClick={toggleVisibility}
        >
          {'Back'}
        </ButtonIcon>

        <FlexBox padding={'0 8px'}>
          <Text $weight={600} $size={14}>
            {currentOrder?.code}
          </Text>

          <Text $size={10}>{orderId}</Text>
        </FlexBox>
      </Top>

      <FlexBox>
        <ModalFilter filterOptions={toggleOptions} defaultValue={current} onOptSelect={filterHandler} preventFilter />
      </FlexBox>

      {renderTab}
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

    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.25);
  }
`;

const Top = styled(FlexBox)<{ isVisible?: boolean }>`
  @media screen and (min-width: 768px) {
    display: none;
  }
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;
export default PageOrderOverviewTabs;
