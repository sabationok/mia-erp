import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import { useProductsSelector, usePropertiesSelector } from '../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { useCallback, useMemo, useState } from 'react';
import { Text } from '../atoms/Text';
import { AppSubmitHandler, UseAppFormSubmitOptions } from '../../hooks/useAppForm.hook';
import { OverlayHandlerReturn } from '../AppPages/PageCurrentProductProvider';
import { useForm } from 'react-hook-form';
import { createVariationFormData, createVariationReqData } from '../../utils/dataTransform';
import { IVariation } from '../../redux/products/variations.types';
import { OnlyUUID } from '../../redux/global.types';
import { ToastService } from '../../services';
import AppLoader from '../atoms/AppLoader';
import { ModalFormProps } from '../ModalForm';
import FormAfterSubmitOptions from './components/FormAfterSubmitOptions';

export interface FormVariationProps
  extends OverlayHandlerReturn,
    Omit<ModalFormProps<any, any, IVariation>, 'onSubmit' | 'defaultState'> {
  onSubmit?: AppSubmitHandler<IVariationFormData>;
  product?: OnlyUUID;

  create?: boolean;
  update?: string;

  defaultState?: IVariation;
}
export interface IVariationFormData {
  propertiesMap: Record<string, string>;
  price?: OnlyUUID;
  product?: OnlyUUID;
  timeFrom?: string | number | Date;
  timeTo?: string | number | Date;
}
const FormVariation: React.FC<FormVariationProps> = ({
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

  const [submitOptions, setSubmitOptions] = useState<UseAppFormSubmitOptions>({});
  const handleChangeAfterSubmit = (key: keyof UseAppFormSubmitOptions) => {
    setSubmitOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const { setValue, watch, handleSubmit } = useForm<IVariationFormData>({
    defaultValues: defaultState ? createVariationFormData({ ...defaultState, product }) : { product },
  });
  const formValues = watch();

  const template = useMemo(() => {
    const pr = defaultState?.product || product;

    return templates.find(t => t._id === pr?.template?._id);
  }, [defaultState?.product, product, templates]);

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
            onError: e => {
              console.log(e);
            },
            onLoading: setLoading,
          })
          .then();
      } else {
        service
          .createVariation({
            data: createVariationReqData(data),
            onSuccess: data => {
              console.log('createVariation onSuccess', data);
              onClose && onClose();
            },
            onError: e => {
              console.log(e);
              ToastService.error('createVariation error');
            },
            onLoading: setLoading,
          })
          .then();
      }

      onSubmit && onSubmit(data);
    },
    [onClose, onSubmit, service, update]
  );

  const handleSelect = useCallback(
    (parentId: string, id: string) => {
      setValue(`propertiesMap.${parentId}`, id);
    },
    [setValue]
  );

  const renderTemplate = useMemo(() => {
    return template?.childrenList?.map(prop => {
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
      <Header alignItems={'center'} justifyContent={'space-between'} fxDirection={'row'} gap={6} fillWidth>
        <FlexBox fxDirection={'row'} padding={'4px 0'} alignItems={'center'} fillHeight>
          <Text $weight={600} $size={18}>
            {title || template?.label || 'Title'}
          </Text>
        </FlexBox>

        <ButtonIcon variant={'onlyIcon'} onClick={onClose} icon={'close'}></ButtonIcon>
      </Header>

      <TemplateBox flex={1} overflow={'auto'}>
        {renderTemplate}
      </TemplateBox>

      <Footer>
        <ExtraFooterBox>
          <FormAfterSubmitOptions
            clear={submitOptions.clearAfterSave}
            close={submitOptions.closeAfterSave}
            toggleOption={handleChangeAfterSubmit}
          />
        </ExtraFooterBox>

        <FlexBox padding={'6px 0'} fxDirection={'row'} gap={8} alignItems={'center'}>
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
            disabled={loading}
            style={{ flex: 1 }}
          >
            {update ? 'Підтвердити' : 'Додати'}
          </ButtonIcon>
        </FlexBox>
      </Footer>

      <AppLoader isLoading={loading} />
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

  background-color: ${p => p.theme.tableBackgroundColor};
`;
const Header = styled(FlexBox)`
  height: 32px;
`;

const TemplateBox = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  //border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
  padding-bottom: 8px;
`;

const PropertyBox = styled(FlexBox)`
  &:not(:first-child) {
    border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  }
`;

const Footer = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
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
export default FormVariation;
