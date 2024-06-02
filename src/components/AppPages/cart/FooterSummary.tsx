import { IOrderTempSlot } from '../../../types/orders/order-slot.types';
import { useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { isUndefined } from 'lodash';
import FlexBox from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';
import { t } from '../../../lang';
import { toPrice } from '../../../utils/numbers';
import InputText from '../../atoms/Inputs/InputText';
import ButtonIcon from '../../atoms/ButtonIcon';

export const FooterSummary = ({
  slot,
  onChangeQuantity,
}: {
  slot?: IOrderTempSlot;
  onChangeQuantity?: (val: number) => void;
}) => {
  const [quantity, setQuantity] = useState(slot?.quantity ?? 1);
  const theme = useTheme();
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();
  const intervalRef = useRef<NodeJS.Timer | undefined>();

  const registerIncrement = (inc: 1 | -1) => {
    return () => {
      const q = slot?.quantity;
      if (!isUndefined(q) && onChangeQuantity) {
        onChangeQuantity(q + inc < 0 ? q : q + inc);
      } else {
        setQuantity(prev => (prev + inc < 0 ? prev : prev + inc));
      }
    };
  };

  const registerAutoIncrement = (inc: 1 | -1) => {
    return {
      onMouseDown: () => {
        timeoutRef.current = setTimeout(() => {
          intervalRef.current = setInterval(() => {
            setQuantity(prev => (prev + inc < 0 ? prev : prev + inc));
          }, 100);
        }, 250);
      },
      onMouseUp: () => {
        clearTimeout(timeoutRef.current);
        clearInterval(intervalRef.current);
        timeoutRef.current = undefined;
        intervalRef.current = undefined;
        onChangeQuantity && onChangeQuantity(quantity);
      },
    };
  };

  useEffect(() => {
    const q = slot?.quantity;
    if (!isUndefined(q)) {
      setQuantity(q);
    }
  }, [slot?.quantity]);

  return (
    <FlexBox
      flexWrap={'wrap'}
      gap={8}
      padding={'8px'}
      fxDirection={'row'}
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}
    >
      {(['cashback', 'bonus', 'discount'] as const).map(dataKey => {
        return (
          <FlexBox
            key={dataKey}
            background={theme.fieldBackgroundColor}
            borderRadius={'4px'}
            justifyContent={'space-between'}
          >
            <Text $weight={400} $size={12} $padding={'4px 6px'}>
              {t(dataKey)}
            </Text>
            <Text $weight={600} $size={13} $padding={'4px 6px'} $align={'end'}>
              {toPrice(slot?.[dataKey]?.amount)}
            </Text>
          </FlexBox>
        );
      })}

      {(['brutto', 'netto'] as const).map(dataKey => {
        return (
          <FlexBox
            key={dataKey}
            background={theme.fieldBackgroundColor}
            borderRadius={'4px'}
            justifyContent={'space-between'}
          >
            <Text $weight={400} $size={12} $padding={'4px 6px'}>
              {t(dataKey)}
            </Text>
            <Text $weight={600} $size={13} $padding={'4px 6px'} $align={'end'}>
              {toPrice(slot?.[dataKey])}
            </Text>
          </FlexBox>
        );
      })}

      <FlexBox padding={'0 8px'}>
        <ChangeButton
          variant={'def'}
          iconSize={'15px'}
          icon={'SmallArrowUp'}
          {...registerAutoIncrement(1)}
          onClick={registerIncrement(1)}
        ></ChangeButton>

        <InputText
          value={quantity}
          name={'quantity'}
          align={'center'}
          onChange={ev => {
            setQuantity(Number(ev.target.value));
          }}
          onBlur={() => {
            onChangeQuantity && onChangeQuantity(quantity);
          }}
        />

        <ChangeButton
          variant={'def'}
          iconSize={'15px'}
          icon={'SmallArrowDown'}
          {...registerAutoIncrement(-1)}
          onClick={registerIncrement(-1)}
        ></ChangeButton>
      </FlexBox>
    </FlexBox>
  );
};
const ChangeButton = styled(ButtonIcon)`
  height: 15px;

  &:hover {
    padding: 4px 0;
  }
`;
