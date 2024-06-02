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
import { CART_DEFAULT_ID } from '../../../redux/cart/cart.slice';
import { enumToTabs } from '../../../utils';
import TabSelector from '../../atoms/TabSelector';

interface Props extends BaseAppPageProps {}

export enum CartPageRightTabsEnum {
  Slot = 'Slot',
  Chat = 'Chat',
}
export const cartPageTabsOptions = enumToTabs(CartPageRightTabsEnum, opt => t(opt));
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
        <Page fillWidth flex={1} overflow={'hidden'} fillHeight fxDirection={'row'} gap={4}>
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
            <TabSelector options={cartPageTabsOptions} />

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

  border-color: ${p => p.theme.trBorderClr};
  border-style: solid;
  border: 0;

  // border-left-width: ${p => (p.isVisible ? `1px` : 0)};
  border-left-width: 1px;

  @media screen and (min-width: 960px) {
    min-width: 320px;
  }

  @media screen and (max-width: 960px) {
    border-left-width: ${p => (p.isVisible ? `1px` : 0)};

    position: absolute;
    top: 0;
    right: 0;
    z-index: 250;
    height: 100%;

    transform: translateX(${p => (p.isVisible ? 0 : 100)}%);

    box-shadow: ${p => (p.isVisible ? `0 12px 26px rgba(0, 0, 0, 0.25)` : '')};
  }
`;

function PageCartSlots({ onSlotEditPress }: { onSlotEditPress?: () => void }) {
  const cartId = useAppQuery().query.cartId;
  // const cartState = useCartSelector();
  const cartSrv = useCart();
  const modalSrv = useModalService();
  const router = useAppRouter();
  const theme = useTheme();
  const Cart = cartSrv.actions.getCurrentCart(cartId || CART_DEFAULT_ID);

  const renderOrders = useMemo(() => {
    const ordersIds = Cart?.ordersIds;

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
          renderTitle={
            <FlexBox fxDirection={'row'} gap={8} padding={'0 12px'}>
              <Text $size={13} $weight={600} $padding={'2px 8px'}>
                {t('Warehouse') + ': ' + order?.warehouse?.label ?? t('undefined')}
              </Text>
            </FlexBox>
          }
        >
          <FlexBox minHeight={'300px'}>
            <TableList
              tableData={slots}
              hasSearch={false}
              hasFilter={false}
              checkBoxes={true}
              onCheckboxChange={ev => {
                cartSrv.actions.setChecked({ tempId: ev.rowId, checked: ev.checked });
              }}
              onHeadCheckboxChange={ev => {
                cartSrv.actions.setChecked({ orderId, checked: ev.checked });
              }}
              selectedRows={order?.selectedIds}
              rowIds={order?.slotsIds}
              keyExtractor={data => {
                return data?.tempId ?? 'slot';
              }}
              tableTitles={tempOrderSlotTableColumns}
              onRowClick={() => {}}
              actionsCreator={(ctx): ITableAction[] => {
                const currentId = ctx.selectedRow?.tempId;

                return [
                  {
                    icon: 'delete',
                    disabled: !currentId,
                    onClick: () => {
                      currentId && cartSrv.actions.removeSlot(currentId);
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
                    type: 'onlyIconFilled',
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

          <FlexBox padding={'8px 0'}>
            <ButtonIcon
              variant={'filledMiddle'}
              onClick={() => {
                // modalSrv.create(SelectOfferModal, {});
                cartSrv.actions.removeOrder(orderId);
              }}
            >
              {'Remove'}
            </ButtonIcon>
          </FlexBox>
        </AccordionFormArea>
      );
    });
  }, [Cart?.ordersIds, cartSrv.actions, cartSrv.ordersSlotsMap, modalSrv, router]);

  return (
    <FlexBox overflow={'auto'} fillHeight>
      <AccordionFormArea label={`Cart: ${Cart?.tempId}`} expandable={true} isOpen={true} hideFooter={true}>
        <FlexBox padding={'8px 12px'} flexWrap={'wrap'} fxDirection={'row'} gap={10}>
          {(['cashback', 'bonus', 'discount'] as const).map(dataKey => {
            return (
              <FlexBox
                key={dataKey}
                background={theme.backgroundColorSecondary}
                borderRadius={'2px'}
                justifyContent={'space-between'}
              >
                <Text $weight={400} $size={12} $padding={'4px 6px'} $textTransform={'capitalize'}>
                  {t(dataKey)}
                </Text>
                <Text $weight={600} $size={13} $padding={'4px 6px'} $align={'end'}>
                  {toPrice(Cart?.summary?.[dataKey]?.amount)}
                </Text>
              </FlexBox>
            );
          })}

          {(['brutto', 'netto'] as const).map(dataKey => {
            return (
              <FlexBox
                key={dataKey}
                background={theme.backgroundColorSecondary}
                borderRadius={'2px'}
                justifyContent={'space-between'}
              >
                <Text $weight={400} $size={12} $padding={'4px 6px'} $textTransform={'capitalize'}>
                  {t(dataKey)}
                </Text>
                <Text $weight={600} $size={13} $padding={'4px 6px'} $align={'end'}>
                  {toPrice(Cart?.summary?.[dataKey])}
                </Text>
              </FlexBox>
            );
          })}
        </FlexBox>
      </AccordionFormArea>

      <FlexBox flex={1} gap={8}>
        {renderOrders}
      </FlexBox>

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
          zIndex: 100,

          backdropFilter: 'blur(3px)',
        }}
      >
        <ButtonIcon
          variant={'outlinedMiddle'}
          icon={'plus'}
          disabled={!Cart}
          onClick={() => {
            modalSrv.create(SelectOfferModal, {});
          }}
        >
          {'Add slot'}
        </ButtonIcon>

        <ButtonIcon
          variant={'filledMiddle'}
          disabled={!Cart}
          onClick={() => {
            Cart?.remove();
          }}
        >
          {'Remove all'}
        </ButtonIcon>
      </FlexBox>
    </FlexBox>
  );
}
