import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { useProductsSelector, usePropertiesSelector } from '../../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { FormEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { Text } from '../../atoms/Text';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { OverlayHandlerReturn } from '../../AppPages/PageProductOverview/PageCurrentProductProvider';
import { OnlyUUID } from '../../../redux/global.types';
import { ModalFormProps } from '../../ModalForm';
import { ToastService } from '../../../services';

export interface FormSelectPropertiesProps
  extends OverlayHandlerReturn,
    Omit<ModalFormProps<any, any, string[]>, 'onSubmit' | 'onChange' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<string[]>;
  onSelect?: (id: string) => void;
  onChange?: (ids: string[]) => void;

  product?: OnlyUUID;
  template?: OnlyUUID;

  update?: string;
}

const FormSelectProperties: React.FC<FormSelectPropertiesProps> = ({
  onClose,
  title,
  defaultState,
  onSubmit,
  update,
  product,
  template,
  onSelect,
  onChange,
  ...props
}) => {
  const currentProduct = useProductsSelector().currentProduct;
  const service = useAppServiceProvider()[ServiceName.products];
  const templates = usePropertiesSelector();
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  // const [submitOptions, setSubmitOptions] = useState<UseAppFormSubmitOptions>({});
  // const handleChangeAfterSubmit = (key: keyof UseAppFormSubmitOptions) => {
  //   setSubmitOptions(prev => ({ ...prev, [key]: !prev[key] }));
  // };

  const templateData = useMemo(() => {
    return templates.find(t => t._id === template?._id || currentProduct?.template?._id);
  }, [currentProduct?.template?._id, template?._id, templates]);

  const handleSubmit: FormEventHandler = useCallback(
    event => {
      event.preventDefault();

      if (update) {
        service.updateById({
          data: { _id: update, data: { properties: selectedIds } },
          onLoading: setLoading,
          onSuccess: (data, _meta) => {
            ToastService.success('Product updated');
            onClose && onClose();
          },
        });
      } else {
        console.log('selectedIds', selectedIds);
      }

      onSubmit && onSubmit(selectedIds);
    },
    [onClose, onSubmit, selectedIds, service, update]
  );

  const handleSelect = useCallback(
    (id: string, parentId?: string) => {
      setSelectedIds(prev => {
        const newData = prev.includes(id) ? prev.filter(el => el !== id) : [...prev, id];

        onChange && onChange(newData);
        onSelect && onSelect(id);

        return newData;
      });
    },
    [onChange, onSelect]
  );

  const renderTemplate = useMemo(() => {
    return templateData?.childrenList
      ?.filter(el => !el?.isSelectable)
      .map(prop => {
        return (
          <PropertyBox key={`property-${prop._id}`} gap={8} fillWidth padding={'8px 0 0'}>
            <Text style={{ flex: 1, paddingLeft: 12 }} $weight={500}>
              {prop.label}
            </Text>

            <PropertyValuesList fillWidth padding={'8px 0'} gap={6} flexWrap={'wrap'} fxDirection={'row'}>
              {prop.childrenList?.map(value => {
                const isActive = selectedIds.includes(value._id);

                return (
                  <ValueTag
                    key={`prop-value-${value._id}`}
                    variant={isActive ? 'filledSmall' : 'outlinedSmall'}
                    padding={'6px 8px'}
                    fontWeight={500}
                    onClick={() => handleSelect(value._id, prop._id)}
                  >
                    {value.label}
                  </ValueTag>
                );
              })}
            </PropertyValuesList>
          </PropertyBox>
        );
      });
  }, [handleSelect, selectedIds, templateData?.childrenList]);

  useEffect(() => {
    if (currentProduct?.properties) {
      setSelectedIds(currentProduct?.properties.map(p => p._id));
      console.log('useEffect properties');
    }
  }, [currentProduct?.properties]);

  return (
    <FormContainer onSubmit={handleSubmit} {...props}>
      <Header alignItems={'center'} justifyContent={'space-between'} fxDirection={'row'} gap={6} fillWidth>
        <ButtonIcon
          variant={'textExtraSmall'}
          onClick={onClose}
          icon={'SmallArrowLeft'}
          style={{ minWidth: 6, padding: 6 }}
        >
          {'Back'}
        </ButtonIcon>

        <FlexBox fxDirection={'row'} padding={'4px 0'} alignItems={'center'} fillHeight>
          <Text $weight={600} $size={18}>
            {title || templateData?.label || 'Title'}
          </Text>
        </FlexBox>
      </Header>

      <TemplateBox flex={1} overflow={'auto'}>
        {renderTemplate}
      </TemplateBox>

      <Footer padding={'6px 0'} fxDirection={'row'} gap={8} alignItems={'center'}>
        <ButtonIcon
          type={'submit'}
          fontWeight={600}
          variant={'filledLarge'}
          textTransform={'uppercase'}
          endIcon={'SmallArrowRight'}
          disabled={loading}
          style={{ flex: 1 }}
        >
          {loading ? 'Loading...' : 'Підтвердити'}
        </ButtonIcon>
      </Footer>
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
const PropertyValuesList = styled(FlexBox)<{ numColumns?: number }>`
  //display: grid;
  //grid-template-columns: repeat(auto-fill, 25%);
  //
  //@media screen and (max-width: 480px) {
  //  grid-template-columns: repeat(auto-fill, 50%);
  //}
`;

const Footer = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
`;

const ValueTag = styled(ButtonIcon)`
  flex-basis: 100px;
  min-width: max-content;

  //width: 100%;
  //min-width: unset;

  // border-radius: 2px;
  // border: 2px solid ${p => p.theme.accentColor.light};
  //
  // &:hover {
  //   border: 2px solid ${p => p.theme.accentColor.base};
  // }
`;
export default FormSelectProperties;
