import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import { takeFullGridArea } from '../pagesStyles';
import { BaseAppPageProps } from '../index';
import { AppGridPage } from '../pages';
import TableList from '../../TableList/TableList';
import { useCart } from '../../../Providers/CartProvider';
import { useCartSelector } from '../../../redux/selectors.store';
import { tempOrderSlotTableColumns } from '../../../data';
import { useMemo } from 'react';
import { useModalService } from '../../../Providers/ModalProvider/ModalProvider';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { AccordionFormArea } from '../../Forms/FormArea/AccordionForm';
import { ITableAction } from '../../TableList/tableTypes.types';
import { useAppQuery, useAppRouter } from '../../../hooks';
import OverlayStackProvider from '../../../Providers/Overlay/OverlayStackProvider';
import { OverlayStack } from '../../../Providers/Overlay/OverlayStack';
import SelectOfferModal from './SelectOfferModal';
import OrderSlotOverview from './OrderSlotOverview';
import { useMediaQuery } from 'react-responsive';

interface Props extends BaseAppPageProps {}

export default function CartPage({ path }: Props) {
  // const [isVisible, setIsVisible] = useState(false);
  const query = useAppQuery();
  const isDesktop = useMediaQuery({ query: '(min-width: 960px)' });

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
type WarehouseId = string;
function PageCartSlots({ onSlotEditPress }: { onSlotEditPress?: () => void }) {
  const cartState = useCartSelector();
  const cart = useCart();
  const modalSrv = useModalService();
  const router = useAppRouter();

  const renderWarehouses = useMemo(() => {
    return Object.values(cartState.ordersDataMap)
      .filter(el => el.slotKeys?.length)
      .map((wrhs, index) => {
        const wrhsId = wrhs.warehouse?._id;
        if (!wrhsId) {
          return null;
        }
        const slots = cart.warehousesSlotsMap?.[wrhsId];

        return (
          <AccordionFormArea key={wrhsId ?? index} label={wrhs.warehouse?.label} hideFooter>
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
                        currentId && cart.actions.remove(currentId);
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
                      onClick: () => {
                        modalSrv.create(SelectOfferModal, {
                          warehouse: wrhs.warehouse,
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
  }, [cart.actions, cart.warehousesSlotsMap, cartState.ordersDataMap, modalSrv, router]);

  return (
    <FlexBox overflow={'auto'} fillHeight>
      <FlexBox flex={1}>{renderWarehouses}</FlexBox>

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
