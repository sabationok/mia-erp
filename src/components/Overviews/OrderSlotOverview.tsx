import { IOrderSlot, IOrderSlotBase, IOrderTempSlot } from '../../redux/orders/orders.types';
import FlexBox from '../atoms/FlexBox';
import styled from 'styled-components';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';
import { IProductImage } from '../../redux/products/products.types';
import { Text } from '../atoms/Text';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';

export interface OrderSlotOverviewProps {
  slot?: Partial<IOrderSlot> & { tempId?: string };
  index?: number;
  onSelect?: () => void;
  onRemove?: (id: string) => void;
  onRemovePress?: () => void;
  disabled?: boolean;

  onUpdate?: (slot: IOrderTempSlot) => void;
}

const CountSelector = ({
  value = 0,
  onInputChange,
  width,
  height = '20px',
  disabled,
  className,
  autoFocus,
  onChange,
}: {
  value?: number;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  onChange?: (number: number) => void;
  height?: string;
  width?: string;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
}) => {
  const [count, setCount] = useState(value);
  const handleIncrementChange = (increment: number) => () => {
    setCount(prev => {
      return prev + increment;
    });
    onChange && onChange(count + increment);
  };

  return (
    <FlexBox fxDirection={'row'} gap={4} width={width} alignItems={'center'}>
      <ButtonIcon variant={'onlyIcon'} size={height} icon={'minus'} onClick={handleIncrementChange(-1)} />
      <StyledInput
        value={count}
        disabled={disabled}
        className={className}
        onChange={({ target: { value } }) => {
          setCount(Number(value));
          onChange && onChange(Number(value));
        }}
        autoFocus={autoFocus}
      />
      <ButtonIcon variant={'onlyIcon'} size={height} icon={'plus'} onClick={handleIncrementChange(1)} />
    </FlexBox>
  );
};
const OrderSlotOverview: React.FC<OrderSlotOverviewProps> = ({ slot, disabled, onSelect, onRemovePress }) => {
  const [formData, setFormData] = useState<IOrderSlotBase | undefined>(slot || undefined);

  const handleUpdateQuantity = (value: number) => {
    setFormData(prev => ({
      ...prev,
      quantity: value,
      total: !prev?.price ? prev?.price : value * prev?.price,
    }));
  };

  const imgPreview = useMemo(() => {
    let images: IProductImage[] = [];
    if (formData?.product?.images) {
      images = formData?.product?.images;
    }
    if (formData?.variation?.product?.images) {
      images = formData?.variation?.product?.images;
    }
    if (formData?.inventory?.product?.images) {
      images = formData?.inventory?.product?.images;
    }
    if (formData?.origin?.product?.images) {
      images = formData?.origin?.product?.images;
    }
    return images[0]?.img_preview || '';
  }, [
    formData?.product?.images,
    formData?.variation?.product?.images,
    formData?.origin?.product?.images,
    formData?.inventory?.product?.images,
  ]);

  const renderInputs = useMemo(() => {
    return overviewInputs.map(info => {
      return (
        <InputLabel key={info.name} label={info.label}>
          <InputText
            placeholder={info.label}
            // value={numberWithSpaces(info.name && formData ? numberWithSpaces(formData[info.name] || 0) : 0)}
          />
        </InputLabel>
      );
    });
  }, []);

  useEffect(() => {
    console.log('OrderSlotOverview', formData);
  }, [formData]);

  return (
    <Card disabled={disabled}>
      <ImageBox>
        <img src={imgPreview} style={{ objectFit: 'contain' }} alt={''} width={'100%'} />
      </ImageBox>

      <CardGridArea flex={1}>
        <FlexBox fxDirection={'row'} gap={8} fillWidth height={'30px'} alignItems={'center'} padding={'0 8px'}>
          <Text style={{ flex: 1 }}>{slot?.variation?.label}</Text>
          <Text>{slot?.variation?.sku}</Text>
          <Text>{slot?.product?.type}</Text>
        </FlexBox>
        <FlexBox fxDirection={'row'} gap={8} fillWidth alignItems={'center'} justifyContent={'space-between'}>
          {renderInputs}
          {/*<Text>{numberWithSpaces(slot?.quantity || 0)}</Text>*/}
          {/*<Text>{numberWithSpaces(slot?.price || 0)}</Text>*/}
          {/*<Text>{numberWithSpaces(slot?.discountAmount || 0)}</Text>*/}
          {/*<Text>{numberWithSpaces(slot?.cashbackAmount || 0)}</Text>*/}
          {/*<Text>{numberWithSpaces(slot?.bonusAmount || 0)}</Text>*/}
          {/*<Text>{numberWithSpaces(slot?.total || 0)}</Text>*/}
        </FlexBox>
      </CardGridArea>

      {!disabled && (
        <Buttons justifyContent={'space-between'} gap={4}>
          <ButtonIcon variant={'onlyIcon'} iconSize={'100%'} size={'24px'} icon={'info'} disabled />
          {onRemovePress && (
            <ButtonIcon
              variant={'onlyIcon'}
              iconSize={'100%'}
              size={'24px'}
              icon={'delete'}
              disabled={!onRemovePress}
              onClick={onRemovePress}
            />
          )}
          {onSelect && (
            <ButtonIcon
              variant={'onlyIcon'}
              iconSize={'100%'}
              size={'24px'}
              icon={'doneAll'}
              disabled={!onSelect}
              onClick={onSelect}
            />
          )}
        </Buttons>
      )}
    </Card>
  );
};
const Card = styled(FlexBox)<{ isSelected?: boolean; disabled?: boolean }>`
  display: grid;
  grid-template-columns: ${({ disabled }) => (disabled ? `min-content 1fr` : `min-content 1fr min-content`)};
  gap: 8px;

  position: relative;
  height: fit-content;
  padding: 4px;

  //border-bottom: 2px solid ${({ theme }) => theme.fieldBackgroundColor};

  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
  cursor: default;

  box-shadow: 0 4px 10px 1px rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: ${({ disabled }) =>
      !disabled && '0 4px 10px 2px rgba(0, 0, 0, 0.1), 0 4px 10px 2px rgba(210, 210, 210, 0.25)'};
  }

  border-left: 3px solid ${({ theme }) => theme.accentColor.base};

  &::after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    z-index: 5;

    background-color: ${({ theme, isSelected }) => (isSelected ? theme.accentColor.base : 'transparent')};
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-rows: 150px max-content min-content;
    max-height: 100%;
  }
`;
const CardGridArea = styled(FlexBox)`
  //display: grid;
  //grid-template-columns: repeat(6, 1fr);
  //grid-template-rows: repeat(5, min-content);
  //grid-template-areas:
  //  'label label label label sku sku'
  //  'price bonus discount bonus cashback total';
  //'category category brand brand type type'
  //'atr_1 atr_1  atr_2  atr_2 qty qty'
  //'warehouse warehouse warehouse warehouse warehouse warehouse';

  //max-width: 270px;
  height: max-content;
  //border-top: 1px solid ${({ theme }) => theme.trBorderClr};

  //@media screen and (max-width: 480px) {
  //  grid-template-columns: repeat(6, 1fr);
  //  grid-template-rows: repeat(5, min-content);
  //  grid-template-areas:
  //    'variation.label variation.label variation.label variation.label variation.sku variation.sku'
  //    'category category brand brand type type'
  //    'atr_1 atr_1 atr_1 atr_2 atr_2 atr_2'
  //    'qty qty price price bonuses discount'
  //    'total total total total currency currency'
  //    'warehouse warehouse warehouse warehouse warehouse warehouse';
  //}
`;
const CardGridBox = styled(FlexBox)<{ borderBottom?: boolean; gridArea?: string; isLastInRow?: boolean }>`
  justify-content: space-between;
  height: 40px;
  width: 100%;
  overflow: hidden;
  grid-area: ${({ gridArea = '' }) => gridArea};

  padding: 4px 6px;

  border-right: 1px solid ${({ theme, isLastInRow }) => (!isLastInRow ? theme.trBorderClr : 'transparent')};
  border-bottom: 1px solid ${({ theme }) => theme.trBorderClr};

  & .text {
    color: ${({ theme }) => theme.fontColor};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;

    text-align: right;
    font-weight: 600;
    font-size: 12px;
  }

  & .title {
    font-size: 10px;
    line-height: 1.5;
    color: ${({ theme }) => theme.globals.inputPlaceholderColor};
  }

  @media screen and (max-width: 480px) {
    height: 50px;
    & .text {
      font-size: 16px;
    }

    & .title {
      font-size: 12px;
    }
  }
  //outline: 1px solid tomato;
`;
const Buttons = styled(FlexBox)`
  @media screen and (max-width: 480px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const ImageBox = styled(FlexBox)`
  //height: fit-content;

  //width: 100%;
  object-position: center;
  object-fit: fill;
  overflow: hidden;
  height: 60px;
  width: 60px;
  background-color: ${({ theme }) => theme.fieldBackgroundColor};

  @media screen and (max-width: 480px) {
    width: 100px;
    margin: auto;
  }
`;
const StyledInput = styled.input`
  flex: 1;
  width: 100%;

  border: 0;
  color: inherit;
  background: transparent;
  text-align: center;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;

  border-radius: 2px;

  &:focus {
    box-shadow: 0 1px 8px ${({ theme }) => theme.accentColor.base};
  }
`;

export default OrderSlotOverview;

const overviewInputs: {
  name?: keyof IOrderSlot | string;
  label?: string;
  value?: React.ReactNode;
  borderBottom?: boolean;
}[] = [
  {
    label: 'Кількість',
    // value: numberWithSpaces(slot?.quantity || 0),
    name: 'quantity',
  },
  {
    label: 'Ціна',
    // value: numberWithSpaces(Number(slot?.price || 0)),
    name: 'price',
  },
  {
    label: 'Бонус',
    // value: numberWithSpaces(slot?.bonusAmount || 0),
    name: 'bonus',
  },
  {
    label: 'Кешбек',
    // value: numberWithSpaces(slot?.cashbackAmount || 0),
    name: 'cashback',
  },
  {
    label: 'Знижка',
    // value: numberWithSpaces(slot?.discountAmount || 0),
    name: 'discount',
  },
  {
    label: 'Сума',
    // value: numberWithSpaces(slot?.total || 0),
    name: 'total',
  },
];
