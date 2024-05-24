import { ModalFormProps } from '../ModalForm';
import { IPriceFormData, PriceEntity } from '../../types/price-management/price-management.types';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { OfferEntity } from '../../types/offers/offers.types';
import { t } from '../../lang';
import { VariationEntity } from '../../types/offers/variations.types';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { LoadersProvider, useLoadersProvider } from '../../Providers/Loaders/LoaderProvider';
import ModalBase from '../atoms/Modal';
import { CreatePriceFormArea } from '../Forms/pricing/CreatePriceFormArea';
import { AddDiscountFormArea } from '../Forms/pricing/AddDiscountFormArea';
import TableList from '../TableList/TableList';
import { PriceDiscountEntity } from '../../types/price-management/discounts';
import FlexBox from '../atoms/FlexBox';
import { usePriceManagementSelector } from '../../redux/selectors.store';

export interface ModalCreatePriceProps
  extends Omit<ModalFormProps<any, any, IPriceFormData>, 'onSubmit' | 'afterSubmit'> {
  onSubmit?: AppSubmitHandler<IPriceFormData>;
  offer?: OfferEntity;
  variation?: VariationEntity;
  updateId?: string;
}

type UsePriceFormLoadersKey =
  | 'create'
  | 'update'
  | 'copy'
  | 'price'
  | 'set_default'
  | 'create_discount'
  | 'update_discount'
  | 'discounts';

export const usePriceModalFormLoaders = () => useLoadersProvider<UsePriceFormLoadersKey>();

const ModalCreatePrice: React.FC<ModalCreatePriceProps> = ({ updateId, offer, onSubmit, ...props }) => {
  const pricesState = usePriceManagementSelector();
  const forUpdate = updateId ? pricesState?.dataMap[updateId] : undefined;
  const loaders = useLoaders<UsePriceFormLoadersKey, { price?: PriceEntity; discounts?: PriceDiscountEntity[] }>(
    {
      create: { content: 'Creating...' },
      set_default: { content: 'Updating offer...' },
    },
    { price: forUpdate }
  );

  // const submitOptions = useAfterSubmitOptions();

  return (
    <ModalBase
      title={t('Pricing')}
      onClose={props?.onClose}
      // extraHeader={
      //   // <TabSelector
      //   //   defaultValue={formData?.type ?? OfferTypeEnum.GOODS}
      //   //   filterOptions={productsFilterOptions}
      //   //   onOptSelect={o => setData('formData', prev => ({ ...prev, type: o.value }))}
      //   // />
      // }
    >
      <LoadersProvider value={loaders}>
        <FlexBox padding={'0 0 24px'}>
          <CreatePriceFormArea offer={offer} defaultState={loaders.state?.price} />

          {!!loaders.state.discounts?.length && (
            <TableList
              tableData={loaders.state.discounts}
              isSearch={false}
              tableTitles={[
                {
                  top: { name: 'Type' },
                  width: '125px',
                },
                {
                  top: { name: 'Value type' },
                  width: '125px',
                },
                {
                  top: { name: 'Threshold' },
                  width: '125px',
                },
                {
                  top: { name: 'Bonus balance' },
                  width: '125px',
                },
              ]}
            />
          )}

          {loaders.state?.price && <AddDiscountFormArea priceId={loaders.state?.price?._id} onSuccess={() => {}} />}
        </FlexBox>
      </LoadersProvider>
    </ModalBase>
  );
};

export default ModalCreatePrice;
