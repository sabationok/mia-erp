import { OrderEntity } from '../../../types/orders/orders.types';
import FlexBox from '../../atoms/FlexBox';
import { ModalHeader } from '../../atoms';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import ButtonIcon from '../../atoms/ButtonIcon';
import { t } from '../../../lang';
import { useAppParams, useAppRouter } from '../../../hooks';
import { enumToFilterOptions } from '../../../utils';
import TabSelector from '../../atoms/TabSelector';
import OrderOverviewInfoTab from './tabs/OrderOverviewInfoTab';
import { useCurrentOrder } from '../../../Providers/CurrentOrderProvider';
import { OrderChatTab } from './tabs/OrderChatTab';

export interface OrderOverviewXLProps {
  order?: OrderEntity;
  onEdit?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onHide?: () => void;
  onRefresh?: () => void;
  isRefresh?: boolean;
  onCreateVariation?: (data: Record<string, string>, onSuccess?: () => void) => void;
  onOpenRightSide?: () => void;
  className?: string;
}
export enum OrderOverviewTabs {
  Info = 'Info',
  Chat = 'Chat',
  Statuses = 'Statuses',
  Tasks = 'Tasks',
}

const tabs = enumToFilterOptions(OrderOverviewTabs);

const OrderOverviewXL: React.FC<OrderOverviewXLProps> = p => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  // const orderS = useAppServiceProvider()[ServiceName.orders];
  const orderId = useAppParams()?.orderId;
  const Order = useCurrentOrder();
  const router = useAppRouter();

  const renderTab = useMemo(() => {
    if (tabs[currentTab].value === OrderOverviewTabs.Info) {
      return <OrderOverviewInfoTab order={Order._origin} />;
    }
    if (tabs[currentTab].value === OrderOverviewTabs.Chat) {
      return <OrderChatTab order={Order._origin} />;
    }

    return null;
  }, [Order._origin, currentTab]);

  return (
    <Container flex={1} fillWidth padding={'0 8px'}>
      <ModalHeader
        title={t('Order overview')}
        onBackPress={() => {
          router.goBack();
        }}
      />

      <Content flex={1} fillWidth overflow={'auto'}>
        <TabSelector
          options={tabs}
          optionProps={{ fitContentH: true }}
          onOptSelect={(_o, _v, i) => typeof i === 'number' && setCurrentTab(i)}
        />

        <FlexBox flex={1} overflow={'hidden'}>
          {renderTab}
        </FlexBox>

        {![OrderOverviewTabs.Chat].includes(tabs[currentTab].value) && <OverviewFooter />}
      </Content>
    </Container>
  );
};
const OverviewFooter = (p: OrderOverviewXLProps) => {
  return (
    <Footer fxDirection={'row'} alignItems={'center'} justifyContent={'space-between'} padding={'8px 0'}>
      <ButtonIcon
        size={'36px'}
        variant={'onlyIcon'}
        iconSize={'85%'}
        icon={'edit'}
        disabled={!p?.onEdit}
        onClick={p?.onEdit}
      />

      <DeleteBtn
        variant={'onlyIcon'}
        size={'36px'}
        iconSize={'85%'}
        icon={'delete'}
        disabled={!p?.onDelete}
        onClick={p?.onDelete}
      />

      <FlexBox fxDirection={'row'} gap={6} margin={'0 0 0 auto'}>
        <ButtonIcon
          size={'36px'}
          variant={'onlyIcon'}
          iconSize={'85%'}
          icon={'refresh'}
          isLoading={p?.isRefresh}
          disabled={!p?.onRefresh}
          onClick={p?.onRefresh}
        />

        <OpenBtn
          size={'36px'}
          variant={'onlyIcon'}
          iconSize={'85%'}
          icon={'SmallArrowLeft'}
          disabled={!p?.onOpenRightSide}
          onClick={p?.onOpenRightSide}
        />
      </FlexBox>
    </Footer>
  );
};
const Container = styled(FlexBox)`
  position: relative;
  overflow: hidden;

  background-color: ${p => p.theme.sideBarBackgroundColor};
`;

const Content = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
const Footer = styled(FlexBox)``;
const DeleteBtn = styled(ButtonIcon)`
  fill: ${p => p.theme.globals.colors.error};
`;
const OpenBtn = styled(ButtonIcon)`
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
export default OrderOverviewXL;
