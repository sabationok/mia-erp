import { IOrderTempSlot } from '../../../../types/orders/orders.types';
import { useMemo } from 'react';
import OrderSlotOverview from '../../../Overviews/order/OrderSlotOverview';
import FormAccordionItem from '../../../atoms/FormAccordionItem';
import styled, { useTheme } from 'styled-components';
import FlexBox from '../../../atoms/FlexBox';
import ButtonIcon from '../../../atoms/ButtonIcon';
import { t } from 'i18e';
import { Text } from '../../../atoms/Text';

const OrderGroupItem = ({
  slots,
  onRemove,
  onUpdate,
  renderHeader,
  title,
  onAddSlotPress,
  renderFooter,
}: {
  slots: IOrderTempSlot[];
  renderHeader?: React.ReactNode;
  renderFooter?: React.ReactNode;
  title?: React.ReactNode;
  onRemove?: (id: string) => void;
  onUpdate?: (slot: IOrderTempSlot) => void;
  onAddSlotPress?: () => void;
}) => {
  const theme = useTheme();
  const renderSlots = useMemo(() => {
    return slots.map(slot => (
      <OrderSlotOverview
        key={`slot_${slot?.tempId}`}
        slot={slot}
        editable
        onRemovePress={onRemove ? () => slot?.tempId && onRemove(slot?.tempId) : undefined}
        onUpdate={onUpdate}
      />
    ));
  }, [onRemove, onUpdate, slots]);

  const renderHeaderComp = useMemo(() => {
    return (
      <FlexBox fxDirection={'row'} fillHeight gap={8} alignItems={'center'} padding={'2px 0'}>
        {renderHeader || (
          <Text $weight={500} $size={15}>
            {title}
          </Text>
        )}

        {onAddSlotPress && <FlexBox height={'80%'} border={`1px solid ${theme.modalBorderColor}`} />}

        {onAddSlotPress && (
          <ButtonIcon
            variant={'textExtraSmall'}
            style={{ minWidth: 'fit-content', height: '100%', fontWeight: 600 }}
            disabled={!onAddSlotPress}
            onClick={onAddSlotPress}
          >
            {t('Add')}
          </ButtonIcon>
        )}
      </FlexBox>
    );
  }, [onAddSlotPress, renderHeader, theme.modalBorderColor, title]);

  return (
    <>
      <StAccordionItem open renderHeader={renderHeaderComp} renderFooter={renderFooter} title={title}>
        {renderSlots}
      </StAccordionItem>
    </>
  );
};

const StAccordionItem = styled(FormAccordionItem)`
  & .header {
  }
  & .content {
    padding: 0;
  }
`;
export default OrderGroupItem;
