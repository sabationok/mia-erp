import { WarehouseEntity } from '../../../types/warehousing/warehouses.types';
import { useCart } from '../../../Providers/CartProvider';
import { useAppQuery, useAppRouter } from '../../../hooks';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../redux/reduxTypes.types';
import { useProductsSelector } from '../../../redux/selectors.store';
import { useLoaders } from '../../../Providers/Loaders/useLoaders.hook';
import { useMemo, useState } from 'react';
import { VariationEntity } from '../../../types/offers/variations.types';
import { useModalService } from '../../../Providers/ModalProvider/ModalProvider';
import { countOrderSlotValues } from '../../../utils';
import { OverlayHeader } from '../../Overlays';
import FlexBox from '../../atoms/FlexBox';
import { FooterSummary } from './FooterSummary';
import { OverlayFooter } from '../../atoms';
import styled from 'styled-components';

export default function OrderSlotOverview({ warehouse }: { warehouse?: WarehouseEntity; slotId?: string }) {
  const cart = useCart();
  const query = useAppQuery();
  const currentSlot = cart.actions.getSlot(query.query?.slotId);

  const service = useAppServiceProvider().get(AppModuleName.offers);
  const { getAll } = service;
  const offersState = useProductsSelector();
  const router = useAppRouter();
  const loaders = useLoaders();
  const [selected, setSelected] = useState<VariationEntity | undefined>(currentSlot.variation);
  const [quantity, setQuantity] = useState(currentSlot?.quantity ?? 1);

  const modalSrv = useModalService();

  const counted = useMemo(() => {
    return countOrderSlotValues({
      ...selected?.price,
      offer: selected,
      variation: selected,
      ...currentSlot,
      quantity: quantity,
    });
  }, [currentSlot, quantity, selected]);

  return (
    <Container fillHeight maxWidth={'380px'} flex={1} padding={'0 8px 8px'}>
      <OverlayHeader title={'Current slot'} />

      <FlexBox flex={1}></FlexBox>

      <FooterSummary slot={counted} onChangeQuantity={setQuantity} />

      <OverlayFooter
        canAccept={!!currentSlot.tempId && currentSlot.quantity !== quantity}
        onAcceptPress={() => {
          currentSlot.setQty(quantity);
        }}
      />
    </Container>
  );
}
const Container = styled(FlexBox)`
  position: relative;
  overflow: hidden;

  background-color: ${p => p.theme.sideBarBackgroundColor};
`;
