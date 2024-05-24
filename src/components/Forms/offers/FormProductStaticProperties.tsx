import { ProperiesGroupEntity, PropertyValueEntity } from '../../../types/offers/properties.types';
import { IFormDataValueWithID } from '../../../redux/global.types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { Text } from '../../atoms/Text';

export interface FormProductStaticPropertiesProps {
  template?: ProperiesGroupEntity;
  formData?: IFormDataValueWithID[];
  onSelect?: (id: string, option?: PropertyValueEntity) => void;
  onChange?: (ids: string[]) => void;
  children?: React.ReactNode;
  defaultData?: string[];
}
const FormProductStaticProperties: React.FC<FormProductStaticPropertiesProps> = ({
  children,
  onSelect,
  onChange,
  template,
  defaultData,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (defaultData) {
      setSelectedIds(defaultData);
    }
  }, [defaultData]);

  const handleSelect = useCallback(
    (id: string, option?: PropertyValueEntity) => {
      setSelectedIds(p => {
        const newData = p.includes(id) ? p.filter(el => el !== id) : [...p, id];
        onSelect && onSelect(id);
        onChange && onChange(newData);
        return newData;
      });
    },
    [onChange, onSelect]
  );

  const currentTemplateData = useMemo(() => {
    return template?.childrenList?.filter(props => !props.isSelectable);
  }, [template?.childrenList]);

  const renderProperties = useMemo(() => {
    return currentTemplateData?.map(item => {
      return (
        <PropertyBox key={`prop-${item?._id}`} gap={8} fillWidth padding={'8px 0'}>
          <Text $weight={500} $size={12} style={{ marginInline: 8 }}>
            {item?.label}
          </Text>

          <FlexBox fillWidth gap={8} fxDirection={'row'} flexWrap={'wrap'}>
            {item?.childrenList?.map(value => (
              <ButtonIcon
                key={`prop-value-${value?._id}`}
                variant={selectedIds.includes(value?._id) ? 'filledSmall' : 'outlinedSmall'}
                onClick={() => {
                  handleSelect(value?._id);
                }}
              >
                {value?.label}
              </ButtonIcon>
            ))}
          </FlexBox>
        </PropertyBox>
      );
    });
  }, [currentTemplateData, handleSelect, selectedIds]);

  return (
    <Container fillWidth>
      <FlexBox padding={'8px 8px 0'}>
        <Text $size={14} $weight={600}>
          {'Доступні харктеристики'}
        </Text>
      </FlexBox>

      {children && (
        <FlexBox fillWidth padding={'6px 0'}>
          {children}
        </FlexBox>
      )}

      {renderProperties}
    </Container>
  );
};
const Container = styled(FlexBox)`
  margin: 8px 0 0;
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
const PropertyBox = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  //border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
export default FormProductStaticProperties;
