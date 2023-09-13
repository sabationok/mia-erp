import { IPropertyValue, IVariationTemplate } from '../../../redux/products/properties.types';
import { IFormDataValueWithUUID } from '../../../redux/global.types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { Text } from '../../atoms/Text';

export interface FormProductStaticPropertiesProps {
  template?: IVariationTemplate;
  formData?: IFormDataValueWithUUID[];
  onSelect?: (key: string, option: IPropertyValue) => void;
  children?: React.ReactNode;
}
const FormProductStaticProperties: React.FC<FormProductStaticPropertiesProps> = ({
  children,
  formData,
  onSelect,
  template,
}) => {
  const [selectedData, setSelectedData] = useState<Record<string, IPropertyValue>>({});

  useEffect(() => {
    if (formData) {
      const map: Record<string, IFormDataValueWithUUID> = {};
      formData.map(el => {
        if (el?.parent?._id) {
          map[el?.parent?._id] = el;
        }
        return el;
      });
      setSelectedData(map);
    }
  }, [formData]);
  const handleSelect = useCallback(
    (key: string, option: IPropertyValue) => {
      setSelectedData(prev => (option ? { ...prev, [key]: option } : prev));

      onSelect && onSelect(key, option);
    },
    [onSelect]
  );

  const renderSelects = useMemo(() => {
    return template?.childrenList?.map(item => {
      // const configs: CustomSelectProps = {
      //   label: item?.label,
      //   placeholder: item?.label,
      //   options: item?.childrenList,
      //   onSelect: option => handleSelect(item?._id, option),
      //   selectValue: selectedData[item?._id],
      // };

      return (
        <PropertyBox key={`prop-${item?._id}`} gap={8} fillWidth padding={'8px 0'}>
          <Text $weight={500} $size={12} style={{ marginInline: 8 }}>
            {item?.label}
          </Text>

          <FlexBox fillWidth gap={8} fxDirection={'row'} flexWrap={'wrap'}>
            {item?.childrenList?.map(value => (
              <ButtonIcon key={`prop-value-${value?._id}`} variant={'outlinedSmall'}>
                {value?.label}
              </ButtonIcon>
            ))}
          </FlexBox>
        </PropertyBox>
      );
    });
  }, [template?.childrenList]);

  return (
    <Container fillWidth>
      <FlexBox padding={'8px 8px 0'}>
        <Text $size={14} $weight={600}>
          {'Статичні характеристики'}
        </Text>
      </FlexBox>
      {children}
      {renderSelects}
    </Container>
  );
};
const Container = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
const PropertyBox = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
export default FormProductStaticProperties;
