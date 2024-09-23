import { WarehouseEntity } from '../../../types/warehousing';
import { useCart } from '../../../Providers/CartProvider';
import { useAppQuery } from '../../../hooks';
import { useMemo, useState } from 'react';
import { VariationEntity } from '../../../types/offers/variations.types';
import { countOrderSlotValues } from '../../../utils';
import FlexBox from '../../atoms/FlexBox';
import { FooterSummary } from './FooterSummary';
import { DrawerFooter } from '../../atoms';
import styled from 'styled-components';

export default function OrderSlotOverview({ warehouse }: { warehouse?: WarehouseEntity; slotId?: string }) {
  const cart = useCart();
  const query = useAppQuery();
  const Slot = cart.actions.getSlotWithMethods(query.query?.slotId as never);
  // const service = useAppServiceProvider().get(AppModuleName.offers);
  // const { getAll } = service;
  // const offersState = useProductsSelector();
  // const router = useAppRouter();
  // const loaders = useLoaders();
  // const modalSrv = useModalService();

  const [selected] = useState<VariationEntity | undefined>(Slot.variation);
  const [quantity, setQuantity] = useState(Slot?.quantity ?? 1);

  const counted = useMemo(() => {
    return countOrderSlotValues({
      variation: selected,
      ...Slot,
      ...(selected?.price ?? Slot),
      origin: selected?.price ?? Slot.origin,
      quantity: quantity,
    });
  }, [Slot, quantity, selected]);

  return (
    <Container fillHeight maxWidth={'380px'} flex={1} padding={'0 8px 8px'}>
      <FlexBox flex={1}></FlexBox>

      <FooterSummary slot={counted} onChangeQuantity={setQuantity} />

      <DrawerFooter
        canAccept={!!Slot.tempId && Slot.quantity !== quantity}
        onAcceptPress={() => {
          Slot.setQty(quantity);
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
