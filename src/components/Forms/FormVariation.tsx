import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import { useProductsSelector } from '../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { useCallback, useMemo } from 'react';
import { Text } from '../atoms/Text';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { OverlayHandlerReturn } from '../AppPages/PageCurrentProductProvider';
import { useForm } from 'react-hook-form';
import { createVariationFormData, createVariationReqData } from '../../utils/dataTransform';
import { IVariation } from '../../redux/products/variations.types';
import { OnlyUUID } from '../../redux/global.types';

export interface FormVariationBaseProps {
  onSubmit?: AppSubmitHandler<IVariationFormData>;

  create?: boolean;
  update?: string;
}

export interface FormVariationProps extends OverlayHandlerReturn {
  onSubmit?: AppSubmitHandler<IVariationFormData>;
  product?: OnlyUUID;

  create?: boolean;
  update?: string;

  defaultState?: IVariation;
}
export interface IVariationFormData {
  properties: Record<string, string>;
  product?: OnlyUUID;
  timeFrom?: string | number | Date;
  timeTo?: string | number | Date;
}
const FormVariation: React.FC<FormVariationProps> = ({ onClose, defaultState, onSubmit, update, create, ...props }) => {
  const product = useProductsSelector().currentProduct;
  const service = useAppServiceProvider()[ServiceName.products];

  const defaultFormState = useMemo(() => {
    if (defaultState) {
      return createVariationFormData(defaultState);
    }
    const dataForUpdate = product?.variations?.find(variation => variation._id === update);
    return dataForUpdate ? createVariationFormData(dataForUpdate) : {};
  }, [defaultState, product?.variations, update]);

  const { setValue, watch, handleSubmit, ...form } = useForm<IVariationFormData>({ defaultValues: defaultFormState });
  const formValues = watch();

  const onValid = useCallback(
    (data: IVariationFormData) => {
      if (create) {
        service
          .createVariation({
            data: createVariationReqData(data),
            onSuccess: data => {
              console.log('createVariation onSuccess', data);
              onClose && onClose();
            },
            onError: e => {
              console.log(e);
            },
          })
          .then();
      }
      if (update) {
        service
          .updateVariationById({
            data: createVariationReqData(data, update),
            onSuccess: data => {
              console.log('updateVariationById onSuccess', data);

              onClose && onClose();
            },
            onError: e => {
              console.log(e);
            },
          })
          .then();
      }

      onSubmit && onSubmit(data);
    },
    [create, onClose, onSubmit, service, update]
  );

  const handleSelect = useCallback(
    (parentId: string, id: string) => {
      setValue(`properties.${parentId}`, id);
    },
    [setValue]
  );

  const renderTemplate = useMemo(() => {
    return product?.template?.childrenList?.map(prop => {
      return (
        <PropertyBox key={`property-${prop._id}`} gap={8} fillWidth padding={'8px 0 0'}>
          <Text style={{ flex: 1, paddingLeft: 12 }} $weight={500}>
            {prop.label}
          </Text>

          <FlexBox fillWidth padding={'8px 0'} fxDirection={'row'} gap={6} flexWrap={'wrap'}>
            {prop.childrenList?.map(value => (
              <ValueTag
                key={`prop-value-${value._id}`}
                variant={
                  formValues?.properties && formValues?.properties[prop._id] === value._id
                    ? 'filledSmall'
                    : 'outlinedSmall'
                }
                padding={'6px 8px'}
                fontWeight={500}
                onClick={() => handleSelect(prop._id, value._id)}
              >
                {value.label}
              </ValueTag>
            ))}
          </FlexBox>
        </PropertyBox>
      );
    });
  }, [formValues, handleSelect, product?.template?.childrenList]);

  return (
    <FormContainer onSubmit={handleSubmit(onValid)}>
      <Header alignItems={'center'} justifyContent={'space-between'} fxDirection={'row'} gap={6} fillWidth>
        <FlexBox fxDirection={'row'} padding={'4px 0'} alignItems={'center'} fillHeight>
          <Text $weight={600} $size={18}>
            {product?.template?.label || 'Title'}
          </Text>
        </FlexBox>

        <ButtonIcon variant={'onlyIcon'} onClick={onClose} icon={'close'}></ButtonIcon>
      </Header>

      <TemplateBox flex={1} overflow={'auto'}>
        {renderTemplate}
      </TemplateBox>

      <FlexBox padding={'6px'} fxDirection={'row'} gap={8} alignItems={'center'}>
        <ButtonIcon
          onClick={onClose}
          variant={'onlyIconFilled'}
          size={'36px'}
          iconSize={'28px'}
          textTransform={'uppercase'}
          icon={'close'}
        />

        <ButtonIcon
          type={'submit'}
          fontWeight={600}
          variant={'outlinedLarge'}
          textTransform={'uppercase'}
          endIcon={'SmallArrowRight'}
          style={{ flex: 1 }}
        >
          {update ? 'Підтвердити' : 'Додати'}
        </ButtonIcon>
      </FlexBox>
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

  background-color: ${p => p.theme.tableBackgroundColor};
`;
const Header = styled(FlexBox)`
  height: 32px;
`;

const TemplateBox = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;

const PropertyBox = styled(FlexBox)`
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
const ValueTag = styled(ButtonIcon)`
  flex-basis: 100px;
  width: max-content;

  // border-radius: 2px;
  // border: 2px solid ${p => p.theme.accentColor.light};
  //
  // &:hover {
  //   border: 2px solid ${p => p.theme.accentColor.base};
  // }
`;
export default FormVariation;
