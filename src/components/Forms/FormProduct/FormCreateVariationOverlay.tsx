import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { useProductsSelector, usePropertiesSelector } from '../../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { useCallback, useMemo, useState } from 'react';
import { Text } from '../../atoms/Text';
import { AppSubmitHandler, UseAppFormSubmitOptions } from '../../../hooks/useAppForm.hook';
import { OverlayHandlerReturn } from '../../AppPages/PageProductOverview/PageCurrentProductProvider';
import { useForm } from 'react-hook-form';
import { createVariationFormData, createVariationReqData } from '../../../utils/dataTransform';
import { IVariation, IVariationFormData } from '../../../redux/products/variations.types';
import { OnlyUUID } from '../../../redux/global.types';
import { ToastService } from '../../../services';
import { ModalFormProps } from '../../ModalForm';
import FormAfterSubmitOptions from '../components/FormAfterSubmitOptions';
import { OverlayFooter, OverlayHeader } from './components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
  sku: yup.string(),
  label: yup.string(),
  propertiesMap: yup.object().shape<{}>({
    // Ваша схема для propertiesMap
  }),
  product: yup.object().shape({
    label: yup.string(),
  }),
  timeFrom: yup.mixed(), // Ось тут потрібно додати відповідні перевірки для дати та числа
  timeTo: yup.mixed(),
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
  const product = useProductsSelector().currentProduct;
  const service = useAppServiceProvider()[ServiceName.products];
  const templates = usePropertiesSelector();
  const [loading, setLoading] = useState(false);
  const { setValue, watch, handleSubmit } = useForm<IVariationFormData>({
    defaultValues: defaultState ? createVariationFormData({ ...defaultState, product }) : { product },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  const [submitOptions, setSubmitOptions] = useState<UseAppFormSubmitOptions>({
    closeAfterSave: true,
    clearAfterSave: true,
  });
  const formValues = watch();

  const handleChangeAfterSubmit = (key: keyof UseAppFormSubmitOptions) => {
    setSubmitOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const template = useMemo(() => {
    const pr = defaultState?.product || product;

    return templates.find(t => t._id === pr?.template?._id);
  }, [defaultState?.product, product, templates]);

  const canSubmit = useMemo(() => {
    return formValues.propertiesMap && Object.values(formValues.propertiesMap).length > 0;
  }, [formValues.propertiesMap]);

  const onValid = useCallback(
    (data: IVariationFormData) => {
      if (update) {
        service
          .updateVariationById({
            data: createVariationReqData(data, update),
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
            data: createVariationReqData(data),
            onSuccess: data => {
              console.log('createVariation onSuccess', data);
              submitOptions.closeAfterSave && onClose && onClose();
            },
            onError: ToastService.toastAxiosError,
            onLoading: setLoading,
          })
          .then();
      }

      onSubmit && onSubmit(data);
    },
    [onClose, onSubmit, service, submitOptions.closeAfterSave, update]
  );

  const handleSelect = useCallback(
    (parentId: string, id: string) => {
      setValue(`propertiesMap.${parentId}`, id);
    },
    [setValue]
  );

  const renderTemplate = useMemo(() => {
    return template?.childrenList
      ?.filter(el => el?.isSelectable)
      ?.map(prop => {
        return (
          <PropertyBox key={`property-${prop._id}`} gap={8} fillWidth padding={'8px 0 0'}>
            <Text style={{ flex: 1, paddingLeft: 12 }} $weight={500}>
              {prop.label}
            </Text>

            <FlexBox fillWidth padding={'8px 0'} fxDirection={'row'} gap={6} flexWrap={'wrap'}>
              {prop.childrenList?.map(value => {
                const isActive = formValues?.propertiesMap && formValues?.propertiesMap[prop._id] === value._id;

                return (
                  <ValueTag
                    key={`prop-value-${value._id}`}
                    variant={isActive ? 'filledSmall' : 'outlinedSmall'}
                    padding={'6px 8px'}
                    fontWeight={500}
                    onClick={() => handleSelect(prop._id, value._id)}
                  >
                    {value.label}
                  </ValueTag>
                );
              })}
            </FlexBox>
          </PropertyBox>
        );
      });
  }, [formValues, handleSelect, template?.childrenList]);

  return (
    <FormContainer onSubmit={handleSubmit(onValid)} {...props}>
      <OverlayHeader onClose={onClose} title={title || template?.label} canSubmit={canSubmit} showSubmitButton />

      <TemplateBox flex={1} overflow={'auto'}>
        {renderTemplate}
      </TemplateBox>

      <OverlayFooter
        loading={loading}
        submitButtonText={loading ? 'Loading...' : update ? 'Підтвердити' : 'Додати'}
        canSubmit={canSubmit}
        extraFooter={
          <ExtraFooterBox>
            <FormAfterSubmitOptions
              clear={submitOptions.clearAfterSave}
              close={submitOptions.closeAfterSave}
              toggleOption={handleChangeAfterSubmit}
            />
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

const TemplateBox = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
  padding-bottom: 8px;
`;

const PropertyBox = styled(FlexBox)`
  &:not(:first-child) {
    border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  }
`;

const ExtraFooterBox = styled(FlexBox)`
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;

const ValueTag = styled(ButtonIcon)`
  flex-basis: 100px;
  min-width: max-content;

  // border-radius: 2px;
  // border: 2px solid ${p => p.theme.accentColor.light};
  //
  // &:hover {
  //   border: 2px solid ${p => p.theme.accentColor.base};
  // }
`;
export default FormCreateVariationOverlay;
