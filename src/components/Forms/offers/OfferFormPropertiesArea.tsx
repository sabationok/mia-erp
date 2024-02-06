import { useCallback, useEffect, useMemo, useState } from 'react';
import { Text } from '../../atoms/Text';
import { FormArea } from '../FormArea/FormArea';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { useProductsSelector, usePropertiesSelector } from '../../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { OnlyUUID } from '../../../redux/global.types';

export interface OfferFormPropertiesAreaProps {
  onSubmit?: AppSubmitHandler<string[]>;
  onSelect?: (id: string) => void;
  onChange?: (ids: string[]) => void;
  offerRef?: OnlyUUID;
  templateRef?: OnlyUUID;
  update?: string;
}

export const OfferFormPropertiesArea = ({
  onSubmit,
  onSelect,
  onChange,
  offerRef,
  templateRef,
  update,
}: OfferFormPropertiesAreaProps) => {
  const currentProduct = useProductsSelector().currentProduct;
  const service = useAppServiceProvider()[ServiceName.products];
  const templates = usePropertiesSelector();
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const templateData = useMemo(() => {
    return templates.find(t => t._id === (templateRef?._id || currentProduct?.template?._id));
  }, [currentProduct?.template?._id, templateRef?._id, templates]);

  const canSubmit = useMemo(() => {
    return currentProduct?.properties?.map(p => p._id).join(',') !== selectedIds.join(',');
  }, [currentProduct?.properties, selectedIds]);

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
    }
  }, [currentProduct?.properties]);

  return (
    <FormArea>
      <TemplateBox flex={1} overflow={'auto'}>
        {renderTemplate}
      </TemplateBox>
    </FormArea>
  );
};
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
const PropertyValuesList = styled(FlexBox)<{ numColumns?: number }>``;
const ValueTag = styled(ButtonIcon)`
  flex-basis: 100px;
  min-width: max-content;
`;
