import { IOrder } from '../../redux/orders/orders.types';
import FlexBox from '../atoms/FlexBox';
import { ModalHeader } from '../atoms';
import React, { useMemo } from 'react';
import { OverlayHandler } from '../AppPages/PageProductOverview/PageCurrentProductProvider';
import { useOrdersSelector } from '../../redux/selectors.store';
import { useLocation, useNavigate } from 'react-router-dom';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import * as Cells from './components/Cells';
import styled from 'styled-components';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import { usePageOverlayService } from '../atoms/PageOverlayProvider';
import { t } from '../../lang';

export interface OrderOverviewXLProps {
  order?: IOrder;
  onEdit?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onHide?: () => void;
  onRefresh?: () => void;
  onCreateVariation?: (data: Record<string, string>, onSuccess?: () => void) => void;
  onOpenRightSide?: () => void;
  className?: string;
}
export type RenderOverviewCellComponent = React.FC<{
  cell: OrderOverviewCell;
  setOverlayContent: OverlayHandler;
  data?: IOrder;
}>;

export interface OrderOverviewCell {
  value?: string | number;
  title?: string;
  gridArea?: keyof IOrder;
  CellComponent?: RenderOverviewCellComponent;
  getValue?: (product?: IOrder) => string | number | undefined;
}
const OrderOverviewXL: React.FC<OrderOverviewXLProps> = p => {
  const orderS = useAppServiceProvider()[ServiceName.orders];
  const currentOrder = useOrdersSelector().currentOrder;
  const navigate = useNavigate();
  const location = useLocation();
  const overlayS = usePageOverlayService();

  const renderCells = useMemo(
    () =>
      orderOverviewCells.map(({ CellComponent, ...cell }) => {
        if (CellComponent) {
          return (
            <CellComponent
              key={cell.title}
              setOverlayContent={overlayS.createOverlayComponent}
              cell={cell}
              data={currentOrder}
            />
          );
        }
        return (
          <Cells.OverviewTextCell
            key={cell.title}
            setOverlayContent={overlayS.createOverlayComponent}
            cell={cell}
            data={currentOrder}
          />
        );
      }),
    [overlayS.createOverlayComponent, currentOrder]
  );

  return (
    <Container flex={1} fillWidth padding={'0 8px'}>
      <ModalHeader title={t('Order overview')} />

      <Content flex={1} fillWidth overflow={'auto'}></Content>

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
    </Container>
  );
};
const Container = styled(FlexBox)`
  position: relative;
  overflow: hidden;

  background-color: ${p => p.theme.sideBarBackgroundColor};
`;
const Header = styled(FlexBox)`
  height: 32px;

  & .title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
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

const orderOverviewCells: OrderOverviewCell[] = [];
