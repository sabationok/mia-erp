import { IOrderSlot, IOrderTempSlot } from '../../redux/orders/orders.types';
import FlexBox from '../atoms/FlexBox';
import styled, { useTheme } from 'styled-components';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import { useCallback, useMemo, useState } from 'react';
import { IProductImage } from '../../redux/products/products.types';
import { Text } from '../atoms/Text';
import numberWithSpaces from '../../utils/numbers';
import { t } from '../../lang';
import CountSelectorBase from '../atoms/CountSelectorBase';
import InputLabel from '../atoms/Inputs/InputLabel';

export interface OrderSlotOverviewProps {
  slot?: IOrderTempSlot;
  index?: number;
  onSelectPress?: () => void;
  onRemove?: (id: string) => void;
  onRemovePress?: () => void;
  disabled?: boolean;
  editable?: boolean;
  onEditPress?: () => void;
  onUpdate?: (slot: IOrderTempSlot) => void;
}

const OrderSlotOverview: React.FC<OrderSlotOverviewProps> = ({
  slot,
  onEditPress,
  disabled,
  onSelectPress,
  onRemovePress,
  onUpdate,
  editable,
}) => {
  const [formData, setFormData] = useState<IOrderTempSlot | undefined>(slot);

  const handleUpdateQuantity = useCallback(
    (value: number) => {
      setFormData(prev => {
        if (!prev) return prev;

        const newData = {
          ...prev,
          quantity: value,
          total: !prev?.in ? prev?.in : value * prev?.in,
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
      return info.name === 'quantity' ? null : (
        <FlexBox key={info.name} justifyContent={'flex-start'} fillWidth padding={'4px'} gap={4}>
          <CardText colorType={'secondary'} $size={10}>
            {info.label}
          </CardText>

          {info.name === 'quantity' && editable ? (
            <CountSelectorBase onChangeValue={handleUpdateQuantity} value={formData?.quantity} />
          ) : (
            <CardText $size={12} $align={'right'} $weight={500}>
              {numberWithSpaces((formData && info.name && formData[info.name as never]) || 0)}
            </CardText>
          )}
        </FlexBox>
      );
    });
  }, [editable, formData, handleUpdateQuantity]);

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
  const theme = useTheme();

  return (
    <Card disabled={disabled}>
      <FlexBox fillWidth gap={8} fxDirection={'row'}>
        <LeftSide style={{ borderRight: `1px solid ${theme.modalBorderColor}` }} padding={'0 4px 0 0'}>
          <ImageBox justifyContent={'flex-start'}>
            <img src={imgPreview} style={{ objectFit: 'cover', objectPosition: 'center' }} alt={''} width={'100%'} />
          </ImageBox>

          {!disabled && (
            <FlexBox maxWidth={'125px'} justifyContent={'space-between'}>
              {editable && (
                <InputLabel label={t('quantity')} style={{ width: '100%', marginBottom: 8 }} disabled={disabled}>
                  <CountSelectorBase
                    onChangeValue={handleUpdateQuantity}
                    value={formData?.quantity}
                    disabled={disabled}
                  />
                </InputLabel>
              )}

              <Buttons>
                {onRemovePress && (
                  <ActionButton variant={'textExtraSmall'} disabled={!onRemovePress} onClick={onRemovePress}>
                    {t('Delete')}
                  </ActionButton>
                )}

                {onSelectPress && (
                  <ActionButton variant={'textExtraSmall'} disabled={!onSelectPress} onClick={onSelectPress}>
                    {t('Select')}
                  </ActionButton>
                )}

                {onEditPress && (
                  <ActionButton variant={'textExtraSmall'} disabled={!onEditPress} onClick={onEditPress}>
                    {t('Edit')}
                  </ActionButton>
                )}
              </Buttons>
            </FlexBox>
          )}
        </LeftSide>

        <FlexBox flex={1} gap={2}>
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
          </FlexBox>

          <Text $size={12} $weight={600}>
            {t('Price')}
          </Text>
          <CardGridArea fillWidth alignItems={'flex-start'} justifyContent={'space-between'}>
            {renderPriceInfo}
          </CardGridArea>

          <Text $size={12} $weight={600}>
            {t('Properties')}
          </Text>
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

const CardText = styled(Text)<{ colorType?: 'secondary' | 'primary' }>`
  color: ${({ theme, colorType }) =>
    colorType === 'secondary' ? theme.globals.inputPlaceholderColor : theme.fontColorSidebar};
`;
const ActionButton = styled(ButtonIcon)`
  padding: 6px 10px;
`;
const Buttons = styled(FlexBox)`
  //border-top: 1px solid ${p => p.theme.modalBorderColor};
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
