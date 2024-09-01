import { CustomerEntity } from '../../../../types/customers.types';
import { useTheme } from 'styled-components';
import * as React from 'react';
import { useMemo } from 'react';
import FlexBox from '../../../atoms/FlexBox';
import { Text } from '../../../atoms/Text';
import { t } from '../../../../i18e';

const CustomerInfoComponent = ({
  info,
  isReceiver,
  isManager,
}: {
  info?: CustomerEntity;
  isReceiver?: boolean;
  isManager?: boolean;
}) => {
  const theme = useTheme();
  const renderCells = useMemo(() => {
    if (!info) return undefined;

    return getCustomerInfoComponentCells({ info: warehouse, isReceiver, isManager }).map(
      ({ label, getValue, visible }) => {
        return (
          visible && (
            <FlexBox
              key={label}
              gap={2}
              padding={'4px'}
              flex={'1 1 50%'}
              maxWidth={'50%'}
              border={`1px solid ${theme.modalBorderColor}`}
            >
              <Text $size={10}>{label}</Text>
              <Text $align={'right'} $size={12} $weight={600}>
                {getValue(info)}
              </Text>
            </FlexBox>
          )
        );
      }
    );
  }, [info, isManager, isReceiver, theme.modalBorderColor]);

  return (
    <FlexBox fillWidth flexWrap={'wrap'} fxDirection={'row'} border={`1px solid ${theme.modalBorderColor}`}>
      {renderCells}
    </FlexBox>
  );
};

export default CustomerInfoComponent;
function getCustomerInfoComponentCells({
  isManager,
}: {
  info?: CustomerEntity;
  isReceiver?: boolean;
  isManager?: boolean;
}) {
  return [
    { label: t('label'), getValue: (info?: CustomerEntity) => info?.label?.base || '---', visible: !isManager },
    { label: t('name'), getValue: (info?: CustomerEntity) => info?.name?.first || '---', visible: true },
    { label: t('Middle name'), getValue: (info?: CustomerEntity) => info?.name?.middle || '---', visible: true },
    { label: t('secondName'), getValue: (info?: CustomerEntity) => info?.name?.second || '---', visible: true },
    { label: t('email'), getValue: (info?: CustomerEntity) => info?.email || '---', visible: true },
    { label: t('taxCode'), getValue: (info?: CustomerEntity) => info?.taxCode?.corp || '---', visible: !isManager },
    {
      label: t('personalTaxCode'),
      getValue: (info?: CustomerEntity) => info?.taxCode?.personal || '---',
      visible: !isManager,
    },
    { label: t('tags'), getValue: (info?: CustomerEntity) => info?.tags?.join(', ') || '---', visible: !isManager },
  ];
}
