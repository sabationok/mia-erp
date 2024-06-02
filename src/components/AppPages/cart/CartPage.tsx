import styled, { useTheme } from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import { takeFullGridArea } from '../pagesStyles';
import { BaseAppPageProps } from '../index';
import { AppGridPage } from '../pages';
import TableList from '../../TableList/TableList';
import { useCart } from '../../../Providers/CartProvider';
import { tempOrderSlotTableColumns } from '../../../data';
import { useEffect, useMemo } from 'react';
import { useModalService } from '../../../Providers/ModalProvider/ModalProvider';
import ButtonIcon from '../../atoms/ButtonIcon';
import { AccordionFormArea } from '../../atoms/FormArea/AccordionForm';
import { ITableAction } from '../../TableList/tableTypes.types';
import { useAppParams, useAppQuery, useAppRouter } from '../../../hooks';
import OverlayStackProvider from '../../../Providers/Overlay/OverlayStackProvider';
import { OverlayStack } from '../../../Providers/Overlay/OverlayStack';
import SelectOfferModal from './SelectOfferModal';
import OrderSlotOverview from './OrderSlotOverview';
import { useMediaQuery } from 'react-responsive';
import { Text } from '../../atoms/Text';
import { t } from '../../../lang';
import { toPrice } from '../../../utils/numbers';

interface Props extends BaseAppPageProps {}

export default function CartPage({ path }: Props) {
  // const [isVisible, setIsVisible] = useState(false);
  const query = useAppQuery();
  const params = useAppParams();
  const isDesktop = useMediaQuery({ query: '(min-width: 960px)' });
  const cart = useCart();

  useEffect(() => {
    if (params.cartId) {
      cart.actions.setCartId(params.cartId);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AppGridPage path={path}>
      <OverlayStackProvider>
        <Page fillWidth flex={1} overflow={'hidden'} fillHeight fxDirection={'row'} gap={12}>
          <FlexBox fillHeight flex={2}>
            <PageCartSlots
            // onSlotEditPress={() => setIsVisible(true)}
            />
          </FlexBox>

          <RightSide
            isVisible={isDesktop ? undefined : !!query?.query?.slotId}
            className={'RightSide'}
            // onAcceptPress={() => setIsVisible(false)}
            style={
              {
                // position: 'absolute',
                // top: 0,
                // right: 0,
                // zIndex: 100,
                //
                // width: '100%',
                // height: '100%',
                // alignItems: 'flex-end',
                // background: theme.backdropColor,
              }
            }
          >
            <OrderSlotOverview />
          </RightSide>
        </Page>

        <OverlayStack />
      </OverlayStackProvider>
    </AppGridPage>
  );
}

const Page = styled(FlexBox)`
  ${takeFullGridArea}
`;
const RightSide = styled(FlexBox)<{ isVisible?: boolean }>`
  overflow: auto;

  max-width: 100%;
  height: 100%;

  transition: ${p => p.theme.globals.timingFunctionMain};
  background-color: ${p => p.theme.backgroundColorLight};

  @media screen and (min-width: 768px) {
    min-width: 320px;
  }

  @media screen and (max-width: 768px) {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 250;
    height: 100%;

    transform: translateX(${p => (p.isVisible ? 0 : 100)}%);

    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.25);
  }
`;

function PageCartSlots({ onSlotEditPress }: { onSlotEditPress?: () => void }) {
  const cartId = useAppQuery().query.cartId;
  // const cartState = useCartSelector();
  const cartSrv = useCart();
  const modalSrv = useModalService();
  const router = useAppRouter();
  const theme = useTheme();
  const cart = cartSrv.actions.getCurrentCart(cartId);

  const renderOrders = useMemo(() => {
    const ordersIds = cart?.ordersIds;

    return ordersIds?.map((orderId, index) => {
      if (!orderId) {
        return null;
      }
      const order = cartSrv.actions.getOrderById(orderId);
      const slots = cartSrv.ordersSlotsMap?.[orderId];

      return (
        <AccordionFormArea
          key={orderId ?? index}
          label={t('Warehouse') + ': ' + order?.warehouse?.label ?? t('undefined')}
          hideFooter
        >
          <FlexBox minHeight={'300px'}>
            <TableList
              tableData={slots}
              hasSearch={false}
              hasFilter={false}
              tableTitles={tempOrderSlotTableColumns}
              actionsCreator={(ctx): ITableAction[] => {
                const currentId = ctx.selectedRow?.tempId;
                return [
                  {
                    icon: 'delete',
                    disabled: !currentId,
                    onClick: () => {
                      currentId && cartSrv.actions.remove(currentId);
                    },
                  },
                  {
                    icon: 'edit',
                    disabled: !currentId,
                    onClick: () => {
                      currentId &&
                        router.push({
                          query: {
                            slotId: currentId,
                          },
                        });
                    },
                  },
                  {
                    icon: 'plus',
                    disabled: !order?.warehouse,
                    onClick: () => {
                      order?.warehouse &&
                        modalSrv.create(SelectOfferModal, {
                          warehouse: order?.warehouse,
                        });
                    },
                  },
                ];
              }}
            />
          </FlexBox>
        </AccordionFormArea>
      );
    });
  }, [cart?.ordersIds, cartSrv.actions, cartSrv.ordersSlotsMap, modalSrv, router]);

  return (
    <FlexBox overflow={'auto'} fillHeight>
      <AccordionFormArea label={`Cart: ${cart?.tempId}`} expandable={true} isOpen={true} hideFooter={true}>
        <FlexBox padding={'8px 12px'} flexWrap={'wrap'} fxDirection={'row'} gap={10}>
          {(['cashback', 'bonus', 'discount'] as const).map(dataKey => {
            return (
              <FlexBox
                key={dataKey}
                background={theme.backgroundColorSecondary}
                borderRadius={'4px'}
                justifyContent={'space-between'}
              >
                <Text $weight={400} $size={12} $padding={'4px 6px'} $textTransform={'capitalize'}>
                  {t(dataKey)}
                </Text>
                <Text $weight={600} $size={13} $padding={'4px 6px'} $align={'end'}>
                  {toPrice(cart?.summary?.[dataKey]?.amount)}
                </Text>
              </FlexBox>
            );
          })}

          {(['brutto', 'netto'] as const).map(dataKey => {
            return (
              <FlexBox
                key={dataKey}
                background={theme.backgroundColorSecondary}
                borderRadius={'4px'}
                justifyContent={'space-between'}
              >
                <Text $weight={400} $size={12} $padding={'4px 6px'} $textTransform={'capitalize'}>
                  {t(dataKey)}
                </Text>
                <Text $weight={600} $size={13} $padding={'4px 6px'} $align={'end'}>
                  {toPrice(cart?.summary?.[dataKey])}
                </Text>
              </FlexBox>
            );
          })}
        </FlexBox>
      </AccordionFormArea>

      <FlexBox flex={1}>{renderOrders}</FlexBox>

      <FlexBox
        fxDirection={'row'}
        gap={12}
        padding={'16px'}
        fillWidth
        alignItems={'center'}
        justifyContent={'center'}
        style={{
          position: 'sticky',
          bottom: 0,
          left: 0,
        }}
      >
        <ButtonIcon
          variant={'filledMiddle'}
          icon={'plus'}
          onClick={() => {
            modalSrv.create(SelectOfferModal, {});
          }}
        >
          {'Create'}
        </ButtonIcon>
      </FlexBox>
    </FlexBox>
  );
}
