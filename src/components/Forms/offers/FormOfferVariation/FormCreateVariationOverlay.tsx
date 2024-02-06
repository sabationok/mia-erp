import styled from 'styled-components';
import FlexBox from '../../../atoms/FlexBox';
import { useProductsSelector, usePropertiesSelector } from '../../../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Text } from '../../../atoms/Text';
import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import { OverlayHandlerReturn } from '../../../AppPages/PageProductOverview/PageCurrentProductProvider';
import { toVariationFormData, toVariationReqData } from '../../../../utils';
import { IVariation, IVariationFormData } from '../../../../types/variations.types';
import { OnlyUUID } from '../../../../redux/global.types';
import { ToastService } from '../../../../services';
import { ModalFormProps } from '../../../ModalForm';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../../components/FormAfterSubmitOptions';
import { OverlayFooter, OverlayHeader } from '../../FormProduct/components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppForm } from '../../../../hooks';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import InputText from '../../../atoms/Inputs/InputText';
import { t } from '../../../../lang';
import DimensionsInputs from '../../FormProduct/components/DimensionsInputs';
import LangButtonsGroup from '../../../atoms/LangButtonsGroup';
import { MaybeNull } from '../../../../types/utils.types';
import OfferVariationPropertySelector from './OfferVariationPropertySelector';

// const dimensionsInputs: {
//   label?: string;
//   placeholder?: string;
//   name: Path<IVariationFormData>;
// }[] = [
//   { name: 'dimensions.height', label: t('Height'), placeholder: t('Sm') },
//   { name: 'dimensions.width', label: t('Width'), placeholder: t('Sm') },
//   { name: 'dimensions.length', label: t('Length'), placeholder: t('Sm') },
//   { name: 'dimensions.weight', label: t('Weight'), placeholder: t('Kg') },
// ];
export interface FormVariationProps
  extends OverlayHandlerReturn,
    Omit<ModalFormProps<any, any, IVariation>, 'onSubmit' | 'defaultState'> {
  onSubmit?: AppSubmitHandler<IVariationFormData>;
  product?: OnlyUUID;

  create?: boolean;
  update?: string;

  defaultState?: IVariation;
}
const validation = yup.object().shape({
  label: yup.string().required().min(5).max(50),
  sku: yup.string().required().min(8).max(36),
  barCode: yup.string(),
  propertiesMap: yup.object().shape<{}>({
    // Ваша схема для propertiesMap
  }),
  product: yup.object().shape({
    label: yup.string(),
    _id: yup.string(),
  }),
  timeFrom: yup.date(),
  timeTo: yup.date(),
});

const FormCreateVariationOverlay: React.FC<FormVariationProps> = ({
  onClose,
  title,
  defaultState,
  onSubmit,
  update,
  create,
  ...props
}) => {
  const submitOptions = useAfterSubmitOptions();
  const currentProduct = useProductsSelector().currentProduct;
  const service = useAppServiceProvider()[ServiceName.products];
  const templates = usePropertiesSelector();
  const [loading, setLoading] = useState(false);
  const formMethods = useAppForm<IVariationFormData>({
    defaultValues: toVariationFormData(
      defaultState ? { ...defaultState, product: currentProduct } : { product: currentProduct }
    ),
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors },
    formValues,
  } = formMethods;

  const [propLabelsByParentId, setPropLabelsByParentId] = useState<Record<string, string>>({});

  // const [labelsSet, setLabelSet] = useState<Record<string, string>>({});
  // const [propertiesSet, setPropertiesSet] = useState<Record<string, string>[]>([]);

  const template = useMemo(() => {
    return templates.find(t => t._id === currentProduct?.template?._id);
  }, [currentProduct, templates]);

  const preparedTemplate = useMemo(
    () => template?.childrenList?.filter(el => el?.isSelectable),
    [template?.childrenList]
  );

  const selectedIds = useMemo(() => {
    return formValues?.propertiesMap ? Object.values(formValues?.propertiesMap) : [];
    // eslint-disable-next-line
  }, [formValues?.propertiesMap, formValues]);

  const canSubmit = useMemo(() => {
    return selectedIds.length > 0;
  }, [selectedIds.length]);

  // useEffect(() => {
  //   if (!preparedTemplate) return;
  //   setLabelSet(
  //     Object.assign(
  //       {},
  //       ...preparedTemplate?.map((el, index) => {
  //         return { [index]: '' };
  //       })
  //     )
  //   );
  //
  //   console.log('preparedTemplate labels set init');
  // }, []);

  useEffect(() => {
    let newLabel = '';
    const propLabelsSet = Object.values(propLabelsByParentId);

    if (propLabelsSet.join('').length === 0) {
      newLabel = `${currentProduct?.label}. {{VARIATION_LABEL}}`;
    } else {
      const propLabelsString = propLabelsSet.join('. ');
      newLabel = currentProduct?.label ? `${currentProduct?.label}. ${propLabelsString}` : propLabelsString;
    }

    setValue('label', newLabel);
  }, [currentProduct?.label, propLabelsByParentId, setValue, update]);

  const onValid = useCallback(
    (data: IVariationFormData) => {
      if (update) {
        service
          .updateVariationById({
            data: toVariationReqData(data, update),
            onSuccess: data => {
              console.log('updateVariationById onSuccess', data);

              onClose && onClose();
            },
            onError: ToastService.toastAxiosError,
            onLoading: setLoading,
          })
          .then();
      } else {
        service
          .createVariation({
            data: toVariationReqData(data),
            onSuccess: data => {
              submitOptions.state.close && onClose && onClose();
            },
            onError: ToastService.toastAxiosError,
            onLoading: setLoading,
          })
          .then();
      }

      onSubmit && onSubmit(data);
    },
    [onClose, onSubmit, service, submitOptions.state.close, update]
  );

  const handleSelect = useCallback(
    (parentId: string, id: string, label?: MaybeNull<string>) => {
      setValue(`propertiesMap.${parentId}`, id);
      label && setPropLabelsByParentId(p => ({ ...p, [parentId]: label }));
    },
    [setValue]
  );

  const handleClearMap = useCallback(() => {
    setValue('propertiesMap', {});
    setPropLabelsByParentId({});
  }, [setValue]);

  const renderTemplate = useMemo(() => {
    return preparedTemplate?.map(prop => {
      return (
        <OfferVariationPropertySelector
          key={`prop_${prop._id}`}
          item={prop}
          selectedIds={selectedIds}
          onSelect={handleSelect}
        />
      );
    });
  }, [preparedTemplate, selectedIds, handleSelect]);

  return (
    <FormContainer onSubmit={handleSubmit(onValid)} onReset={handleClearMap} {...props}>
      <OverlayHeader onBackPress={onClose} title={(title || template?.label) ?? ''} canSubmit={canSubmit} okButton />

      <Content flex={1} fillWidth overflow={'auto'}>
        <Inputs>
          <InputLabel label={t('label')} error={errors.label}>
            <InputText {...register('label', { required: true })} placeholder={t('label')} required />
          </InputLabel>

          <FlexBox fxDirection={'row'} gap={8} fillWidth>
            <InputLabel label={t('sku')} error={errors.sku}>
              <InputText {...register('sku', { required: true })} placeholder={t('sku')} required />
            </InputLabel>

            <InputLabel label={t('barCode')} error={errors.barCode}>
              <InputText {...register('barCode')} placeholder={t('barCode')} />
            </InputLabel>
          </FlexBox>

          <DimensionsInputs form={formMethods} />
        </Inputs>

        <TemplateBox padding={'0 0 8px'} margin={'8px 0 0'}>
          {renderTemplate}
        </TemplateBox>

        {!currentProduct && (
          <CmsConfigs padding={'8px 0'} fillWidth>
            <CmsConfigsHeader padding={'8px'} justifyContent={'flex-end'} fxDirection={'row'} fillWidth>
              <Text $size={13} $weight={500}>
                {t('Cms configs')}
              </Text>
            </CmsConfigsHeader>

            <Inputs>
              <InputLabel label={t('Language key')} error={errors?.cmsConfigs?.key}>
                <LangButtonsGroup disabled />
              </InputLabel>

              <InputLabel label={t('Label by lang key')} error={errors?.cmsConfigs?.labels?.ua}>
                <InputText placeholder={'Label'} {...register('cmsConfigs.labels.ua')} />
              </InputLabel>
            </Inputs>
          </CmsConfigs>
        )}
      </Content>

      <OverlayFooter
        loading={loading}
        resetButtonShown
        submitButtonText={loading ? 'Loading...' : update ? 'Підтвердити' : 'Додати'}
        canSubmit={canSubmit}
        extraFooter={
          <ExtraFooterBox>
            <FormAfterSubmitOptions {...submitOptions} />
          </ExtraFooterBox>
        }
      />
    </FormContainer>
  );
};

const FormContainer = styled.form`
  flex: 1;

  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 8px;

  overflow: hidden;

  max-width: 480px;
  color: ${p => p.theme.fontColorSidebar};
  background-color: ${p => p.theme.tableBackgroundColor};
`;
const Content = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
const TemplateBox = styled(FlexBox)`
  padding-bottom: 8px;
`;

const Inputs = styled(FlexBox)`
  padding: 0 4px;
`;

const ExtraFooterBox = styled(FlexBox)`
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;

const CmsConfigs = styled(FlexBox)``;

const CmsConfigsHeader = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;

export default FormCreateVariationOverlay;
