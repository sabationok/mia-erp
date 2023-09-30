import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { useProductsSelector, usePropertiesSelector } from '../../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { useCallback, useMemo, useState } from 'react';
import { Text } from '../../atoms/Text';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { OverlayHandlerReturn } from '../../AppPages/PageProductOverview/PageCurrentProductProvider';
import { createVariationFormData, createVariationReqData } from '../../../utils/dataTransform';
import { IVariation, IVariationFormData } from '../../../redux/products/variations.types';
import { OnlyUUID } from '../../../redux/global.types';
import { ToastService } from '../../../services';
import { ModalFormProps } from '../../ModalForm';
import FormAfterSubmitOptions from '../components/FormAfterSubmitOptions';
import { OverlayFooter, OverlayHeader } from './components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IProperty } from '../../../redux/products/properties.types';
import { useAppForm } from '../../../hooks';

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
  const currentProduct = useProductsSelector().currentProduct;
  const service = useAppServiceProvider()[ServiceName.products];
  const templates = usePropertiesSelector();
  const [loading, setLoading] = useState(false);
  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    clearAfterSave,
    closeAfterSave,
    toggleAfterSubmitOption,
  } = useAppForm<IVariationFormData>({
    defaultValues: defaultState
      ? createVariationFormData({ ...defaultState, product: currentProduct })
      : { product: currentProduct },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  const formValues = watch();

  const template = useMemo(() => {
    return templates.find(t => t._id === currentProduct?.template?._id);
  }, [currentProduct, templates]);
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
              closeAfterSave && onClose && onClose();
            },
            onError: ToastService.toastAxiosError,
            onLoading: setLoading,
          })
          .then();
      }

      onSubmit && onSubmit(data);
    },
    [onClose, onSubmit, service, closeAfterSave, update]
  );

  const handleSelect = useCallback(
    (parentId: string, id: string) => {
      setValue(`propertiesMap.${parentId}`, id);
    },
    [setValue]
  );
  const handleClearMap = useCallback(() => {
    setValue('propertiesMap', {});
  }, [setValue]);

  const renderTemplate = useMemo(() => {
    return template?.childrenList
      ?.filter(el => el?.isSelectable)
      ?.map(prop => {
        return (
          <RenderVariationProperty
            key={`prop_${prop._id}`}
            item={prop}
            onSelect={handleSelect}
            selectedValue={formValues?.propertiesMap ? formValues?.propertiesMap[prop._id] : undefined}
          />
        );
      });
  }, [formValues?.propertiesMap, handleSelect, template?.childrenList]);

  return (
    <FormContainer onSubmit={handleSubmit(onValid)} {...props}>
      <OverlayHeader onClose={onClose} title={title || template?.label} canSubmit={canSubmit} showSubmitButton />

      <TemplateBox flex={1} overflow={'auto'}>
        {renderTemplate}
      </TemplateBox>

      <OverlayFooter
        loading={loading}
        resetButtonShown
        submitButtonText={loading ? 'Loading...' : update ? 'Підтвердити' : 'Додати'}
        canSubmit={canSubmit}
        extraFooter={
          <ExtraFooterBox>
            <FormAfterSubmitOptions
              clear={clearAfterSave}
              close={closeAfterSave}
              toggleOption={toggleAfterSubmitOption}
            />
          </ExtraFooterBox>
        }
      />
    </FormContainer>
  );
};

export const RenderVariationProperty = ({
  item,
  selectedValue,
  onSelect,
}: {
  item: IProperty;
  selectedValue?: string;
  onSelect?: (propId: string, valueId: string) => void;
}) => {
  console.log(item._id, item.label);
  console.log(selectedValue);

  const renderChildren = useMemo(() => {
    return item.childrenList?.map(value => {
      return (
        <ValueTag
          key={`prop-value-${value._id}`}
          variant={selectedValue === value._id ? 'filledSmall' : 'outlinedSmall'}
          padding={'6px 8px'}
          fontWeight={500}
          onClick={() => onSelect && onSelect(item._id, value._id)}
        >
          {value.label}
        </ValueTag>
      );
    });
  }, [item._id, item.childrenList, onSelect, selectedValue]);

  return (
    <PropertyBox key={`property-${item._id}`} gap={8} fillWidth padding={'8px 0 0'}>
      <Text style={{ flex: 1, paddingLeft: 12 }} $weight={500}>
        {item.label}
      </Text>

      <PropertyValuesBox
        fillWidth
        padding={'8px 0'}
        gap={6}
        numColumns={item.label && ['розмір'].includes(item.label.toLowerCase()) ? 4 : 3}
      >
        {renderChildren}
      </PropertyValuesBox>
    </PropertyBox>
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

const PropertyValuesBox = styled(FlexBox)<{ numColumns?: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${({ numColumns = 2 }) => numColumns}, 1fr);
`;

const ExtraFooterBox = styled(FlexBox)`
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;

const ValueTag = styled(ButtonIcon)`
  width: 100%;
  max-width: 100%;
  min-width: 50px;
`;

export default FormCreateVariationOverlay;
