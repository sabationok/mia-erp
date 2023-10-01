import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { useProductsSelector, usePropertiesSelector } from '../../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { IProperty, IPropertyValue } from '../../../redux/products/properties.types';
import { useAppForm } from '../../../hooks';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import { t } from '../../../lang';
import { checks } from '../../../utils';

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
    handleSubmit,
    register,
    formState: { errors, isValid },
    clearAfterSave,
    closeAfterSave,
    toggleAfterSubmitOption,
    formValues,
  } = useAppForm<IVariationFormData>({
    defaultValues: createVariationFormData(
      defaultState ? { ...defaultState, product: currentProduct } : { product: currentProduct }
    ),
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  const template = useMemo(() => {
    return templates.find(t => t._id === currentProduct?.template?._id);
  }, [currentProduct, templates]);
  const selectedIds = useMemo(() => {
    return formValues?.propertiesMap ? Object.values(formValues?.propertiesMap) : [];
    // eslint-disable-next-line
  }, [formValues?.propertiesMap, formValues]);

  const canSubmit = useMemo(() => {
    return selectedIds.length > 0;
  }, [selectedIds.length]);

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

  const preparedTemplate = useMemo(
    () => template?.childrenList?.filter(el => el?.isSelectable),
    [template?.childrenList]
  );

  const renderTemplate = useMemo(() => {
    return preparedTemplate?.map(prop => {
      return (
        <RenderVariationProperty
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
      <OverlayHeader onClose={onClose} title={title || template?.label} canSubmit={canSubmit} showSubmitButton />

      <Content flex={1} fillWidth overflow={'auto'}>
        <Inputs padding={'0 8px'}>
          <InputLabel label={t('label')}>
            <InputText {...register('label', { required: true })} placeholder={t('label')} required />
          </InputLabel>

          <FlexBox fxDirection={'row'} gap={8} fillWidth>
            <InputLabel label={t('sku')}>
              <InputText {...register('sku', { required: true })} placeholder={t('sku')} required />
            </InputLabel>

            <InputLabel label={t('barCode')}>
              <InputText {...register('barCode')} placeholder={t('barCode')} />
            </InputLabel>
          </FlexBox>
        </Inputs>

        <TemplateBox padding={'0 0 8px'} margin={'8px 0 0'}>
          {renderTemplate}
        </TemplateBox>
      </Content>

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
  selectedIds = [],
  onSelect,
}: {
  item: IProperty;
  selectedValue?: string;
  selectedIds?: string[];
  onSelect?: (propId: string, valueId: string) => void;
}) => {
  const renderChildren = useMemo(() => {
    return item.childrenList?.map(value => {
      const isSelected = selectedIds.includes(value._id);

      return (
        <RenderPropertyValue
          key={`prop-value-${value._id}`}
          item={value}
          isSelected={isSelected}
          onSelect={id => onSelect && onSelect(item._id, id)}
        />
      );
    });
  }, [item._id, item.childrenList, onSelect, selectedIds]);

  return (
    <PropertyBox key={`property-box-${item._id}`} gap={8} fillWidth padding={'8px 0 0'}>
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
const Content = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
const TemplateBox = styled(FlexBox)`
  padding-bottom: 8px;
`;

const PropertyBox = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  &:last-child {
    border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
  }
`;

const PropertyValuesBox = styled(FlexBox)<{ numColumns?: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${({ numColumns = 2 }) => numColumns}, 1fr);
`;
const Inputs = styled(FlexBox)``;

const ExtraFooterBox = styled(FlexBox)`
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;

const ValueTag = styled(ButtonIcon)`
  width: 100%;
  max-width: 100%;
  min-width: 50px;
`;

const RenderPropertyValue = ({
  item,
  isSelected,
  onSelect,
}: {
  item: IPropertyValue;
  isSelected?: boolean;
  onSelect: (id: string) => void;
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (checks.isNotUnd(isSelected)) {
      setIsActive(isSelected);
    }
  }, [isSelected]);

  return (
    <ValueTag
      variant={isActive ? 'filledSmall' : 'outlinedSmall'}
      padding={'6px 8px'}
      fontWeight={500}
      onClick={() => {
        onSelect && onSelect(item._id);
      }}
    >
      {item.label}
    </ValueTag>
  );
};

export default FormCreateVariationOverlay;
