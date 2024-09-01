import { ModalFormProps } from '../ModalForm';
import { IPriceFormData, PriceEntity } from '../../types/price-management/price-management.types';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { OfferEntity } from '../../types/offers/offers.types';
import { t } from '../../i18e';
import { VariationEntity } from '../../types/offers/variations.types';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { LoadersProvider, useLoadersProvider } from '../../Providers/Loaders/LoaderProvider';
import ModalBase from '../atoms/Modal';
import { OfferPriceFormArea } from '../Forms/pricing/OfferPriceFormArea';
import { PriceDiscountEntity } from '../../types/price-management/discounts';
import FlexBox from '../atoms/FlexBox';
import { useCurrentPrice } from '../../hooks';
import PriceDiscountsFormArea from 'components/Forms/pricing/PriceDiscountsFormArea';

export interface ModalCreatePriceProps
  extends Omit<ModalFormProps<any, any, IPriceFormData>, 'onSubmit' | 'afterSubmit'> {
  onSubmit?: AppSubmitHandler<IPriceFormData>;
  offer?: OfferEntity;
  variation?: VariationEntity;
  updateId?: string;
}

type UsePriceFormLoadersKey =
  | 'price'
  | 'update'
  | 'copy'
  | 'set_default_price'
  | 'create_discount'
  | 'update_discount'
  | 'discounts'
  | 'all_discounts'
  | `deleting_id.${string}`;

export const usePriceModalFormLoaders = () => useLoadersProvider<UsePriceFormLoadersKey>();

const CreatePriceModal: React.FC<ModalCreatePriceProps> = ({ updateId, offer, onSubmit, ...props }) => {
  const Price = useCurrentPrice({ _id: updateId });
  const loaders = useLoaders<UsePriceFormLoadersKey, { price?: PriceEntity; discounts?: PriceDiscountEntity[] }>(
    {
      price: { content: 'Creating...' },
      update: { content: 'Updating...' },
      set_default_price: { content: 'Updating offer...' },
      discounts: { content: 'Refreshing...' },
    },
    { price: Price, discounts: Price?.discounts }
  );

  return (
    <ModalBase title={t('Pricing')} onClose={props?.onClose}>
      <LoadersProvider value={loaders}>
        <FlexBox padding={'0 0 24px'}>
          <OfferPriceFormArea offer={offer} defaultState={Price} price={Price} />

          <PriceDiscountsFormArea price={Price} />
        </FlexBox>
      </LoadersProvider>
    </ModalBase>
  );
};

export default CreatePriceModal;
