import { RenderOverviewAreaComponent } from '../../components/overview-types';
import { OrderEntity } from '../../../../types/orders/orders.types';
import { AreaStyledComp } from '../../components/CellStyles';
import FlexBox from '../../../atoms/FlexBox';
import { Text } from '../../../atoms/Text';
import { t } from '../../../../i18e';
import { useMemo } from 'react';
import { OverviewAreaHeader } from '../../components/OverviewAreaHeader';

export const OrderOverviewCustomerInfo: RenderOverviewAreaComponent<OrderEntity> = ({ cell, data }) => {
  const renderCells = useMemo(() => {
    const customer = data?.customer;

    const cells: { label: string; value?: React.ReactNode; visible?: boolean }[] = [
      {
        label: t('First name'),
        value: customer?.name?.first,
        visible: customer?.businessType !== 'company',
      },
      {
        label: t('Second name'),
        value: customer?.name?.second,
        visible: customer?.businessType !== 'company',
      },
      {
        label: t('Middle name'),
        value: customer?.name?.middle,
        visible: customer?.businessType !== 'company',
      },

      {
        label: t('Base label'),
        value: customer?.name?.first,
        visible: customer?.businessType !== 'person',
      },
      { label: t('Print'), value: customer?.name?.second, visible: customer?.businessType !== 'person' },

      { label: t('Email'), value: customer?.email, visible: true },
      { label: t('Phone'), value: customer?.phone, visible: true },

      { label: t('Business type'), value: customer?.businessType, visible: true },
      { label: t('Sex type'), value: customer?.sexType, visible: true },

      { label: t('Engagement type'), value: customer?.engagementSource, visible: true },

      { label: t('Age'), value: customer?.age, visible: true },

      { label: t('Tags'), value: null, visible: true },
    ];

    return cells.map(cell => {
      return (
        cell.visible && (
          <FlexBox
            key={cell.label}
            fxDirection={'row'}
            padding={'6px'}
            gap={8}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Text $size={11}>{cell?.label}</Text>
            <Text $size={13} $weight={500}>
              {cell?.value ?? t('undefined')}
            </Text>
          </FlexBox>
        )
      );
    });
  }, [data?.customer]);

  return (
    <AreaStyledComp.Cell>
      {cell?.title && <OverviewAreaHeader title={cell?.title} />}

      {renderCells}
    </AreaStyledComp.Cell>
  );
};
