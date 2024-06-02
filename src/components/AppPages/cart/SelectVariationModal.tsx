import { OverlayFooter } from 'components/atoms';
import { FooterSummary } from './FooterSummary';
import { countOrderSlotValues, toSerializableObj } from '../../../utils';
import { useMemo, useState } from 'react';
import { useCart } from '../../../Providers/CartProvider';
import { useAppRouter, useCurrentOffer } from '../../../hooks';
import { VariationEntity } from '../../../types/offers/variations.types';
import { OfferEntity } from '../../../types/offers/offers.types';
import { WarehouseEntity } from '../../../types/warehousing/warehouses.types';
import { CreatedModal, useModalProvider } from '../../../Providers/ModalProvider/ModalProvider';
import OverlayBase from '../../Overlays/OverlayBase';
import VariationsTab from '../offers/tabs/VariationsTab';
import { omit } from 'lodash';

export const SelectVariationModal = ({
  offer,
  warehouse,
  slotId,
  onClose,
}: {
  offer?: OfferEntity;
  warehouse?: WarehouseEntity;
  slotId?: string;
} & CreatedModal) => {
  // const query = useAppQuery();

  const modalSrv = useModalProvider();
  const Offer = useCurrentOffer(offer);
  const [selected, setSelected] = useState<VariationEntity>();
  // const loaders = useLoaders();
  const router = useAppRouter();
  const cart = useCart();
  const currentSlot = cart.actions.getSlotByVariationId(selected?._id);
  const [quantity, setQuantity] = useState(currentSlot?.quantity ?? 1);

  const counted = useMemo(() => {
    return countOrderSlotValues({
      ...currentSlot,
      quantity: quantity,
      ...(selected?.price ?? Offer?.price),
      offer: Offer,
      variation: selected,
      warehouse: warehouse ?? Offer?.warehouse,
    });
  }, [currentSlot, Offer, quantity, selected, warehouse]);

  return (
    <OverlayBase title={`Select variation | ${Offer?.label}`} fillHeight>
      <VariationsTab offer={Offer} onSelect={setSelected} selected={selected} />

      <FooterSummary slot={counted} onChangeQuantity={setQuantity} />

      <OverlayFooter
        canAccept={!!selected}
        onAcceptPress={() => {
          const serialized = toSerializableObj(counted);

          if (!counted?.warehouse) {
            console.warn(`[]`);
            return;
          }

          if (selected?._id) {
            if (counted?.tempId && counted?.tempId?.includes(selected?._id)) {
              counted.quantity !== currentSlot?.quantity && cart.actions.update(serialized);
            } else if (counted?.warehouse) {
              cart.actions.addSlot(serialized);
            }
          }

          router.push({ query: omit(router.query, ['offerId', 'slotId', 'variationId']) });
          modalSrv.clearStack();
        }}
      />
    </OverlayBase>
  );
};
