import { AccordionForm } from '../../atoms/FormArea/AccordionForm';
import { OfferFormAreaProps } from './types';
import { OfferEntity, OfferStatusEnum, OfferTypeEnum } from '../../../types/offers/offers.types';
import { useAppForm } from '../../../hooks';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { t } from '../../../lang';
import InputText from '../../atoms/Inputs/InputText';
import FlexBox from '../../atoms/FlexBox';
import CustomSelect from '../../atoms/Inputs/CustomSelect';
import { toReqData } from '../../../utils';
import useOffersService from '../../../hooks/useOffersService.hook';
import { OfferStatusFilterOptions } from '../../../data';
import { useWarehousesSelector } from '../../../redux/selectors.store';
import { offerTypeFilterOptions } from '../../../data/modalFilterOptions.data';
import ButtonSwitch from '../../atoms/ButtonSwitch';
import ButtonsGroup from '../../atoms/ButtonsGroup';
import { VariationFormData } from '../../../types/offers/variations.types';
import { useLoadersProvider } from '../../../Providers/Loaders/LoaderProvider';

export interface VariationBaseInfoFormAreaProps extends OfferFormAreaProps<VariationFormData> {
  onSuccess?: (data: { data: OfferEntity }) => void;
  edit?: boolean;
}

export const VariationBaseInfoFormArea = ({ defaultValues, onSuccess, _id }: VariationBaseInfoFormAreaProps) => {
  const { isLoading, onLoading } = useLoadersProvider<'create' | 'update'>();
  const service = useOffersService();
  const warehousesState = useWarehousesSelector();

  const {
    formState: { errors },
    register,
    registerSelect,
    formValues,
    setValue,
    handleSubmit,
    ...appForm
  } = useAppForm<VariationFormData>({
    defaultValues: { visible: false, approved: OfferStatusEnum.pending, _id, ...defaultValues },
  });
  const edit = !!formValues?._id;

  function onValid(sData: VariationFormData) {
    const productForSubmit = toReqData(sData, { ignorePaths: ['measurement'] });

    !edit
      ? service.createVariation({
          data: {
            data: {
              data: productForSubmit as never,
            },
          },
          onSuccess: onSuccess,
          onLoading: onLoading('create'),
        })
      : service.updateVariationById({
          data: { data: { data: productForSubmit as never, _id } },
          onSuccess: onSuccess,
          onLoading: onLoading('update'),
        });
  }

  return (
    <>
      <AccordionForm
        label={t('Base info')}
        isLoading={!edit ? isLoading?.create : isLoading?.update}
        onSubmit={handleSubmit(onValid)}
        onReset={appForm.reset}
        canSubmit={true}
        expandable={false}
      >
        <ButtonsGroup
          value={formValues?.type ?? OfferTypeEnum.GOODS}
          options={offerTypeFilterOptions}
          onSelect={o => setValue('type', o.value)}
        />

        <InputLabel label={t('label')} error={errors.label} required>
          <InputText placeholder={t('label')} {...register('label')} required autoFocus />
        </InputLabel>

        <FlexBox fxDirection={'row'} gap={6} fillWidth>
          <InputLabel label={t('sku')} error={errors.sku}>
            <InputText placeholder={t('sku')} {...register('sku')} />
          </InputLabel>

          <InputLabel label={t('Bar-code')} error={errors.barCode}>
            <InputText placeholder={t('Bar-code')} {...register('barCode')} />
          </InputLabel>
        </FlexBox>

        <CustomSelect
          {...registerSelect('warehouse', {
            options: warehousesState.warehouses,
            label: t('Select warehouse'),
            placeholder: t('Select warehouse'),
          })}
        />

        <CustomSelect
          {...registerSelect('approved', {
            options: OfferStatusFilterOptions,
            label: t('status'),
            placeholder: t('status'),
            onlyValue: true,
          })}
        />

        <InputLabel label={t('Visibility')} error={errors.description}>
          <ButtonSwitch
            value={formValues.visible}
            onChange={val => {
              setValue('visible', val, { shouldTouch: true, shouldDirty: true });
            }}
          />
        </InputLabel>
      </AccordionForm>
    </>
  );
};
