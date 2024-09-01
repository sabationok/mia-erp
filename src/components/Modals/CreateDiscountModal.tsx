import { CreatedModal } from '../../Providers/ModalProvider/ModalProvider';
import { PriceDiscountEntity } from '../../types/price-management/discounts';
import { useAppForm, useCurrentDiscount } from '../../hooks';
import ModalBase from '../atoms/Modal';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { CreateDiscountFormData, DiscountBaseInfoFormArea } from '../Forms/pricing/DiscountBaseInfoFormArea';
import { AccordionForm } from '../atoms/FormArea/AccordionForm';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import { AppFormProvider } from '../../hooks/useAppForm.hook';
import { LoadersProvider } from '../../Providers/Loaders/LoaderProvider';
import { useAppDispatch } from '../../redux/store.store';
import { updateDiscountThunk } from '../../redux/priceManagement/discounts/discounts.thunks';
import { toReqData } from '../../utils';
import { omit } from 'lodash';
import { t } from '../../i18e';

export interface CreateDiscountModalProps extends CreatedModal {
  priceId?: string;
  offerId?: string;
  discount?: PriceDiscountEntity;
  onSuccess?: (data: PriceDiscountEntity) => void;
}

export const CreateDiscountModal = ({ onSuccess, priceId, offerId, discount }: CreateDiscountModalProps) => {
  const Discount = useCurrentDiscount(discount);

  const loaders = useLoaders<'create' | 'update' | 'current'>({
    create: { content: 'Creating...' },
    update: { content: 'Updating...' },
  });
  const form = useAppForm<CreateDiscountFormData>({
    defaultValues: {
      ...omit(Discount, 'cmsConfigs'),
      cmsConfigs: {
        key: Discount?.cmsConfigs?.key ?? undefined,
        labels: Discount?.cmsConfigs?.labels ?? undefined,
      },
      priceId,
      offerId,
    },
  });
  const dispatch = useAppDispatch();

  return (
    <ModalBase title={`Discount ${Discount ? `(${t('edit')})` : ''}`} fillHeight>
      <LoadersProvider value={loaders}>
        <AppFormProvider value={form}>
          <DiscountBaseInfoFormArea discount={Discount} onSuccess={onSuccess} />

          <AccordionForm
            label={'Cms'}
            isLoading={loaders.isLoading?.update}
            onSubmit={form.handleSubmit(fData => {
              const id = fData._id;
              id &&
                dispatch(
                  updateDiscountThunk({
                    data: {
                      data: { ...toReqData({ cmsConfigs: fData.cmsConfigs }), _id: id },
                    },
                  })
                );
            })}
          >
            <InputLabel label={'Custom key'} error={form.formState.errors?.cmsConfigs?.key}>
              <InputText {...form.register('cmsConfigs.key')} />
            </InputLabel>
          </AccordionForm>
        </AppFormProvider>
      </LoadersProvider>
    </ModalBase>
  );
};
