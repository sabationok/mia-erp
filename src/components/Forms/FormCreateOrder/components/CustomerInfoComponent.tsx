import { ICustomer } from '../../../../types/customers.types';
import { useTheme } from 'styled-components';
import * as React from 'react';
import { useMemo } from 'react';
import FlexBox from '../../../atoms/FlexBox';
import { Text } from '../../../atoms/Text';
import { t } from '../../../../lang';

const CustomerInfoComponent = ({
  info,
  isReceiver,
  isManager,
}: {
  info?: ICustomer;
  isReceiver?: boolean;
  isManager?: boolean;
}) => {
  const theme = useTheme();
  const renderCells = useMemo(() => {
    if (!info) return undefined;

    return getCustomerInfoComponentCells({ info, isReceiver, isManager }).map(({ label, getValue, visible }) => {
      return (
        visible && (
          <FlexBox
            key={label}
            gap={4}
            padding={'4px'}
            flex={'1 1 50%'}
            maxWidth={'50%'}
            border={`1px solid ${theme.modalBorderColor}`}
          >
            <Text $size={12}>{label}</Text>
            <Text $align={'right'}>{getValue(info)}</Text>
          </FlexBox>
        )
      );
    });
  }, [info, isManager, isReceiver, theme.modalBorderColor]);

  return (
    <FlexBox fillWidth flexWrap={'wrap'} fxDirection={'row'} border={`1px solid ${theme.modalBorderColor}`}>
      {renderCells}
    </FlexBox>
  );
};

export default CustomerInfoComponent;
function getCustomerInfoComponentCells({ isManager }: { info?: ICustomer; isReceiver?: boolean; isManager?: boolean }) {
  return [
    { label: t('label'), getValue: (info?: ICustomer) => info?.label || '---', visible: !isManager },
    { label: t('name'), getValue: (info?: ICustomer) => info?.name || '---', visible: true },
    { label: t('secondName'), getValue: (info?: ICustomer) => info?.secondName || '---', visible: true },
    { label: t('email'), getValue: (info?: ICustomer) => info?.email || '---', visible: true },
    { label: t('taxCode'), getValue: (info?: ICustomer) => info?.taxCode || '---', visible: !isManager },
    {
      label: t('personalTaxCode'),
      getValue: (info?: ICustomer) => info?.personalTaxCode || '---',
      visible: !isManager,
    },
    { label: t('tags'), getValue: (info?: ICustomer) => info?.tags?.join(', ') || '---', visible: !isManager },
  ];
}
