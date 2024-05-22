import { useCallback, useEffect, useMemo, useState } from 'react';
import { Text } from '../../../atoms/Text';
import { AccordionForm } from '../../FormArea/AccordionForm';
import styled from 'styled-components';
import FlexBox from '../../../atoms/FlexBox';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { usePropertiesSelector } from '../../../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import CustomSelect from '../../../atoms/Inputs/CustomSelect/CustomSelect';
import { OfferFormAreaProps } from '../types';
import { useOfferLoadersProvider } from '../../../Modals/CreateOfferModal';
import { ArrayOfUUID } from '../../../../redux/global.types';
import { t } from '../../../../lang';
import { OfferEntity } from '../../../../types/offers/offers.types';

export interface OfferFormPropertiesAreaProps extends OfferFormAreaProps<ArrayOfUUID> {
  onSubmit?: AppSubmitHandler<string[]>;
  onSelect?: (id: string) => void;
  onChange?: (ids: string[]) => void;
  onSuccess?: (data: OfferEntity) => void;
  update?: string;
}

export const OfferFormPropertiesArea = ({ onSubmit, onSuccess, disabled, offer }: OfferFormPropertiesAreaProps) => {
  const loaders = useOfferLoadersProvider();
  const templates = usePropertiesSelector();
  const service = useAppServiceProvider()[ServiceName.offers];
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [templateId, setTemplateId] = useState<string>(templates[0]?._id);

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    if (onSubmit) {
      onSubmit(selectedIds);
    } else if (offer) {
      service.updateById({
        data: { _id: offer?._id, updateCurrent: true, data: { properties: selectedIds } },
        onLoading: loaders.onLoading('properties'),
        onSuccess: onSuccess,
      });
    }
  };

  const templateData = useMemo(() => {
    return templates.find(t => t._id === templateId);
  }, [templateId, templates]);

  const canSubmit = useMemo(() => {
    if (disabled) return false;
    if (offer?.properties?.length) {
      return (
        offer?.properties
          ?.map(p => p._id)
          .sort((a, b) => a.localeCompare(b))
          .join(',') !== selectedIds.sort((a, b) => a.localeCompare(b)).join(',')
      );
    }
    return !!selectedIds.length;
  }, [offer?.properties, disabled, selectedIds]);

  const handleSelect = useCallback((id: string, _parentId?: string) => {
    setSelectedIds(prev => {
      const newData = prev.includes(id) ? prev.filter(el => el !== id) : [...prev, id];

      return newData;
    });
  }, []);

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
    if (offer?.properties) {
      setSelectedIds(offer?.properties.map(p => p._id));
    }
  }, [offer?.properties]);

  return (
    <AccordionForm
      label={t('Properties')}
      onSubmit={handleSubmit}
      isLoading={loaders.isLoading?.properties}
      disabled={!canSubmit}
    >
      <CustomSelect
        label={t('Available templates')}
        options={templates}
        selectedValue={templateId}
        onSelect={option => {
          setTemplateId(option?._id);
        }}
      />

      <TemplateBox flex={1} overflow={'auto'}>
        {renderTemplate}
      </TemplateBox>
    </AccordionForm>
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
