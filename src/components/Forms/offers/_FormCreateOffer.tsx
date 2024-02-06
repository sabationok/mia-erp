import * as React from 'react';
import ModalForm, { ModalFormProps } from '../../ModalForm';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import TextareaPrimary from '../../atoms/Inputs/TextareaPrimary';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { useAppSelector } from '../../../redux/store.store';
import FlexBox from '../../atoms/FlexBox';
import { t } from '../../../lang';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import { useAppForm } from '../../../hooks';
import { IProductFormData, IProductReqData, ProductFilterOpt, ProductStatusEnum } from '../../../types/products.types';
import { enumToFilterOptions, toReqData } from '../../../utils';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../components/FormAfterSubmitOptions';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import useProductsService from '../../../hooks/useProductsService.hook';

export interface FormCreateOfferProps extends Omit<ModalFormProps<any, any, IProductFormData>, 'onSubmit'> {
  copy?: boolean;
  id?: string;
  edit?: boolean;
  _id?: string;
  onSubmit?: AppSubmitHandler<IProductReqData>;
  filterOptions?: ProductFilterOpt[];
  defaultState?: IProductFormData;
  addInputs?: boolean;
}

const productsStatusOption = enumToFilterOptions(ProductStatusEnum);

const _FormCreateOffer: React.FC<FormCreateOfferProps> = ({
  edit,
  _id,
  onSubmit,
  copy,
  defaultState,
  addInputs,
  onClose,
  ...props
}) => {
  const service = useProductsService();
  const submitOptions = useAfterSubmitOptions();
  const {
    directories: { directories },
  } = useAppSelector();
  const form = useAppForm<IProductFormData>({
    defaultValues: defaultState,
  });
  const {
    formState: { errors },
    register,
    setValue,
    registerSelect,
    handleSubmit,
  } = form;

  // const categories = useMemo(() => {
  //   return directories[ApiDirType.CATEGORIES_PROD].filter(el => el.type === formValues.type);
  // }, [directories, formValues.type]);
  //
  // const currentTemplate = useMemo((): IVariationTemplate | undefined => {
  //   return properties.find(t => t._id === formValues?.template?._id);
  // }, [formValues?.template?._id, properties]);

  // TODO eventDate: formatDateForInputValue(defaultState?.eventDate)
  function onValidSubmit(sData: IProductFormData) {
    const productForSubmit = toReqData(sData, { ignorePaths: ['measurement'] });

    onSubmit
      ? onSubmit(
          { _id, data: productForSubmit },
          {
            ...submitOptions.state,
          }
        )
      : service.create({
          data: { data: sData },
          onSuccess(_d) {
            submitOptions?.state?.close && onClose && onClose();
          },
        });
  }

  return (
    <ModalForm
      {...props}
      onClose={onClose}
      onSubmit={handleSubmit(onValidSubmit, data => console.log(data))}
      onOptSelect={({ value }) => value && setValue('type', value)}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
    >
      <FlexBox className={'inputs'} flex={'1'} fillWidth maxHeight={'100%'} padding={'0 8px 8px'} overflow={'auto'}>
        <InputLabel label={t('label')} error={errors.label} required>
          <InputText placeholder={t('label')} {...register('label')} required autoFocus />
        </InputLabel>

        <FlexBox fxDirection={'row'} gap={6} fillWidth>
          <InputLabel label={t('sku')} error={errors.sku}>
            <InputText placeholder={t('sku')} {...register('sku')} />
          </InputLabel>

          <InputLabel label={'Штрих-код'} error={errors.barCode}>
            <InputText placeholder={'Штрих-код'} {...register('barCode')} />
          </InputLabel>
        </FlexBox>

        <CustomSelect
          {...registerSelect('brand', {
            options: directories[ApiDirType.BRANDS],
            label: t('brand'),
            placeholder: t('selectBrand'),
            multipleMode: true,
          })}
        />

        <CustomSelect
          {...registerSelect('approved', {
            options: productsStatusOption,
            label: t('status'),
            placeholder: t('status'),
          })}
        />

        <InputLabel label={t('description')} error={errors.description}>
          <TextareaPrimary placeholder={t('description')} {...register('description')} />
        </InputLabel>
      </FlexBox>
    </ModalForm>
  );
};

export default _FormCreateOffer;
