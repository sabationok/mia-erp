import { IOrderSlot } from '../../redux/orders/orders.types';
import FlexBox from '../atoms/FlexBox';
import styled from 'styled-components';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import { ChangeEventHandler, useCallback, useMemo, useState } from 'react';
import { IProductImage } from '../../redux/products/products.types';
import { Text } from '../atoms/Text';
import numberWithSpaces from '../../utils/numbers';
import { t } from '../../lang';

export type SlotOverviewData = Partial<IOrderSlot> & { tempId?: string };
export interface OrderSlotOverviewProps {
  slot?: SlotOverviewData;
  index?: number;
  onSelectPress?: () => void;
  onRemove?: (id: string) => void;
  onRemovePress?: () => void;
  disabled?: boolean;
  onEditPress?: () => void;
  onUpdate?: (slot: SlotOverviewData) => void;
}

const CountSelector = ({
  value = 0,
  onChangeValue,
  width,
  height = '20px',
  disabled,
  className,
  autoFocus,
  onChange,
}: {
  value?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onChangeValue?: (number: number) => void;
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
    onChangeValue && onChangeValue(count + increment);
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
          onChangeValue && onChangeValue(Number(value));
        }}
        autoFocus={autoFocus}
      />
      <ButtonIcon variant={'onlyIcon'} size={height} icon={'plus'} onClick={handleIncrementChange(1)} />
    </FlexBox>
  );
};
const OrderSlotOverview: React.FC<OrderSlotOverviewProps> = ({
  slot,
  onEditPress,
  disabled,
  onSelectPress,
  onRemovePress,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<SlotOverviewData | undefined>(slot);

  const handleUpdateQuantity = useCallback(
    (value: number) => {
      setFormData(prev => {
        if (!prev) return prev;

        const newData = {
          ...prev,
          quantity: value,
          total: !prev?.price ? prev?.price : value * prev?.price,
        };
        onUpdate && onUpdate(newData);
        return newData;
      });
    },
    [onUpdate]
  );

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

  const renderPriceInfo = useMemo(() => {
    return overviewInputs.map(info => {
      return (
        <FlexBox key={info.name} justifyContent={'flex-start'} fillWidth padding={'4px'} gap={4}>
          <CardText colorType={'secondary'} $size={10}>
            {info.label}
          </CardText>

          {info.name === 'quantity' ? (
            <CountSelector onChangeValue={handleUpdateQuantity} value={formData?.quantity} />
          ) : (
            <CardText $size={12} $align={'right'} $weight={500}>
              {numberWithSpaces((formData && info.name && formData[info.name as never]) || 0)}
            </CardText>
          )}
        </FlexBox>
      );
    });
  }, [formData, handleUpdateQuantity]);

  const renderProperties = useMemo(() => {
    return slot?.variation?.properties?.map(prop => {
      return (
        <FlexBox key={prop?._id} justifyContent={'flex-start'} fillWidth padding={'4px'} gap={4}>
          <CardText colorType={'secondary'} $size={10}>
            {prop?.parent?.label}
          </CardText>

          <Text $size={12} $align={'right'} $weight={500}>
            {prop?.label}
          </Text>
        </FlexBox>
      );
    });
  }, [slot?.variation?.properties]);

  // useEffect(() => {
  //   console.log('OrderSlotOverview', formData);
  // }, [formData]);

  return (
    <Card disabled={disabled}>
      <FlexBox fillWidth gap={8} fxDirection={'row'}>
        <LeftSide>
          <ImageBox justifyContent={'flex-start'}>
            <img src={imgPreview} style={{ objectFit: 'cover', objectPosition: 'center' }} alt={''} width={'100%'} />
          </ImageBox>

          <FlexBox>
            {onRemovePress && (
              <ActionButton variant={'textExtraSmall'} disabled={!onRemovePress} onClick={onRemovePress}>
                {t('Delete')}
              </ActionButton>
            )}

            {!onSelectPress && (
              <ActionButton variant={'textExtraSmall'} disabled={!onSelectPress} onClick={onSelectPress}>
                {t('Select')}
              </ActionButton>
            )}

            {!onEditPress && (
              <ActionButton variant={'textExtraSmall'} disabled={!onEditPress} onClick={onEditPress}>
                {t('Edit')}
              </ActionButton>
            )}
          </FlexBox>
        </LeftSide>

        <FlexBox flex={1}>
          <FlexBox fxDirection={'row'} gap={8} fillWidth alignItems={'flex-start'}>
            <FlexBox fxDirection={'row'} flexWrap={'wrap'} gap={8} flex={1} alignItems={'center'} padding={'4px 8px'}>
              <CardText style={{ flex: 1 }}>{slot?.variation?.label}</CardText>

              <CardText $size={12} colorType={'secondary'}>
                {slot?.variation?.sku}
              </CardText>

              <CardText $size={12} colorType={'secondary'}>
                {slot?.product?.type}
              </CardText>
            </FlexBox>

            {/*<ButtonIcon variant={'textExtraSmall'} iconSize={'100%'} size={'24px'} icon={'info'} disabled />*/}
          </FlexBox>

          <CardGridArea fillWidth alignItems={'flex-start'} justifyContent={'space-between'} margin={'0 0 8px'}>
            {renderPriceInfo}
          </CardGridArea>

          <Properties fillWidth alignItems={'flex-start'}>
            {renderProperties}
          </Properties>
        </FlexBox>
      </FlexBox>
    </Card>
  );
};
const Card = styled(FlexBox)<{ isSelected?: boolean; disabled?: boolean }>`
  position: relative;
  //height: fit-content;
  padding: 4px;

  //height: min-content;

  //border-bottom: 2px solid ${({ theme }) => theme.fieldBackgroundColor};
  color: ${({ theme }) => theme.fontColorSidebar};
  cursor: default;

  border: 1px solid ${({ theme }) => theme.modalBorderColor};
  border-left: 3px solid ${({ theme }) => theme.modalBorderColor};

  transition: all ${({ theme }) => theme.globals.timingFunctionMain};

  &:hover {
    border-color: ${({ disabled, theme }) => !disabled && theme.accentColor.base};
  }
`;
const LeftSide = styled(FlexBox)`
  width: min-content;
  @media screen and (min-width: 768px) {
    width: max-content;
    flex-direction: row;
    gap: 8px;
  }
`;
const CardGridArea = styled(FlexBox)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  //grid-template-rows: repeat(5, min-content);
  //grid-template-areas:
  //  'label label label label sku sku'
  //  'price bonus discount bonus cashback total';
  //'category category brand brand type type'
  //'atr_1 atr_1  atr_2  atr_2 qty qty'
  //'warehouse warehouse warehouse warehouse warehouse warehouse';

  //max-width: 270px;
  height: max-content;
  border-top: 1px solid ${({ theme }) => theme.modalBorderColor};
  border-bottom: 1px solid ${({ theme }) => theme.modalBorderColor};
`;
const Properties = styled(CardGridArea)`
  grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
`;

const ImageBox = styled(FlexBox)`
  //height: fit-content;

  //width: 100%;
  object-position: center;
  object-fit: contain;
  overflow: hidden;
  width: 100%;
  max-width: 125px;
  //max-height: 100px;
  //height: 100px;

  //@media screen and (max-width: 480px) {
  //  width: 100px;
  //  margin: auto;
  //}
`;
const StyledInput = styled.input`
  flex: 1;
  width: 100%;
  height: 100%;

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
const CardText = styled(Text)<{ colorType?: 'secondary' | 'primary' }>`
  color: ${({ theme, colorType }) =>
    colorType === 'secondary' ? theme.globals.inputPlaceholderColor : theme.fontColorSidebar};
`;
const ActionButton = styled(ButtonIcon)`
  padding: 4px 8px;
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
