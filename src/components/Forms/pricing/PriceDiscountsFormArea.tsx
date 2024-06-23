import { AccordionForm, AccordionFormAreaProps } from '../../atoms/FormArea/AccordionForm';
import { OfferEntity } from '../../../types/offers/offers.types';
import { PriceEntity } from '../../../types/price-management/price-management.types';
import { useCurrentPrice } from '../../../hooks';
import { useAppDispatch } from '../../../redux/store.store';
import { usePriceDiscountsSelector } from '../../../redux/selectors.store';
import { useModalService } from '../../../Providers/ModalProvider/ModalProvider';
import { useLoaders } from '../../../Providers/Loaders/useLoaders.hook';
import { PriceDiscountEntity } from '../../../types/price-management/discounts';
import { useEffect, useMemo, useState } from 'react';
import CheckBox, {
  CheckboxEvent,
  CustomCheckboxEventHandler,
} from '../../TableList/TebleCells/CellComponents/CheckBox';
import { sortIds } from '../../../utils';
import { updatePriceThunk } from '../../../redux/priceManagement/priceManagement.thunks';
import FlexBox, { FlexUl, SimpleGridBox } from '../../atoms/FlexBox';
import ButtonIcon from '../../atoms/ButtonIcon';
import { getAllDiscountsThunk } from '../../../redux/priceManagement/discounts/discounts.thunks';
import { t } from '../../../lang';
import { CreateDiscountModal } from '../../Modals/CreateDiscountModal';
import { Text } from '../../atoms/Text';
import styled, { useTheme } from 'styled-components';

const PriceDiscountsFormArea: React.FC<AccordionFormAreaProps & { offer?: OfferEntity; price?: PriceEntity }> = ({
  price,
  offer,
  ...props
}) => {
  const Price = useCurrentPrice(price) || price || offer?.price;

  const dispatch = useAppDispatch();
  const state = usePriceDiscountsSelector();
  const modalSrv = useModalService();
  const loaders = useLoaders<
    'create' | 'update' | 'discounts' | `deleting_id.${string}`,
    { discounts?: PriceDiscountEntity[] }
  >(
    {
      create: { content: 'Creating...' },
      update: { content: 'Updating...' },
      discounts: { content: 'Refreshing...' },
    },
    { discounts: Price?.discounts }
  );

  const initSelectedIds = useMemo(() => Price?.discounts?.map(item => item._id), [Price?.discounts]);
  const [selectedIds, setSelectedIds] = useState<string[]>(initSelectedIds ?? []);

  const onToggleIdHandler = (id: string, add: boolean) => {
    setSelectedIds(prev => (add ? [id].concat(prev) : prev.filter(_id => _id !== id)));
  };
  const registerOnChange = (item: PriceDiscountEntity): CustomCheckboxEventHandler => {
    return event => {
      onToggleIdHandler(item._id, event.checked);
    };
  };

  const canSubmit = useMemo(() => {
    return !selectedIds.length ? false : sortIds(initSelectedIds)?.join('.') !== sortIds(selectedIds)?.join('.');
  }, [initSelectedIds, selectedIds]);

  useEffect(() => {
    if (!state.list.length) {
      getAllDiscountsThunk({
        onLoading: loaders.onLoading('discounts'),
      });
    }
    // eslint-disable-next-line
  }, [state.list.length]);

  const handleSubmit = () => {
    if (Price?._id) {
      dispatch(
        updatePriceThunk({
          onLoading: loaders.onLoading('update'),
          data: {
            data: {
              _id: Price._id,
              data: {
                discounts: selectedIds.map(itemId => {
                  return { _id: itemId };
                }),
              },
            },
          },
        })
      );
    } else {
      console.warn('Price id not passed');
    }
  };

  if (!Price?._id) {
    return (
      <AccordionForm label={`Select discounts (price not passed)`} expandable={false} isOpen={false}></AccordionForm>
    );
  }

  return (
    <AccordionForm
      canSubmit={canSubmit}
      isLoading={loaders.isLoading.update}
      label={'Select discounts'}
      onSubmit={handleSubmit}
      isOpen={false}
      actions={[
        {
          title: 'Add new',
          onPress: () => {
            modalSrv.create(CreateDiscountModal, {
              priceId: Price?._id,
              onSuccess: d => {
                loaders.setData('discounts', p => {
                  return [d, ...(p ?? [])];
                });
              },
            });
          },
        },
        {
          title: 'Refresh',
          onPress: () => {
            dispatch(
              getAllDiscountsThunk({
                onLoading: loaders.onLoading('discounts'),
              })
            );
          },
        },
        { title: 'Delete', danger: true, disabled: true },
      ]}
    >
      <FlexBox overflow={'auto'}>
        <FlexBox gap={8} fxDirection={'row'} width={'max-content'} padding={'8px'}>
          {state.list?.map(item => {
            const _data = state.dataMap?.[item?._id] || item;
            return (
              <PriceDiscountCard
                item={_data}
                isActive={selectedIds?.includes(_data._id)}
                onChange={registerOnChange(_data)}
                isDeleting={loaders.isLoading?.[`deleting_id.${_data._id}`]}
                onEditPress={() => {
                  modalSrv.create(CreateDiscountModal, {
                    priceId: Price?._id,
                    discount: _data,
                    onSuccess(d) {
                      onToggleIdHandler(d._id, true);
                    },
                  });
                }}
              />
            );
          })}
        </FlexBox>
      </FlexBox>
    </AccordionForm>
  );
};

const PriceDiscountCard = ({
  item,
  isActive,
  onChange,
  isDeleting,
  onDeletePress,
  isDeleted,
  onEditPress,
}: {
  item?: PriceDiscountEntity;
  isActive?: boolean;
  isDeleted?: boolean;
  onPress?: () => void;
  isDeleting?: boolean;
  onDeletePress?: () => void;
  onEditPress?: () => void;
  onSelect?: (item: PriceDiscountEntity) => void;
  onChange?: (event: CheckboxEvent) => void;
}) => {
  return (
    <ItemContainer gap={8} borderRadius={'6px'} padding={'8px'} flex={'1 0 115px'} isActive={isActive}>
      <FlexUl gap={8}>
        {fields.map(field => {
          if ('separator' in field) {
            return <Separator text={field.text} />;
          }
          return <CardRow key={field.label} field={field} item={item} />;
        })}
      </FlexUl>

      <FlexBox fxDirection={'row'} gap={8} alignItems={'center'}>
        <ButtonIcon
          variant={'onlyIconFilled'}
          icon={'delete'}
          size={'30px'}
          iconSize={'85%'}
          danger
          disabled={isDeleted || !onDeletePress}
          onClick={onDeletePress}
        />

        <ButtonIcon
          disabled={isDeleted || !onEditPress}
          onClick={onEditPress}
          variant={'onlyIconOutlined'}
          size={'30px'}
          iconSize={'85%'}
          icon={'edit'}
          margin={'0 auto 0 0'}
        ></ButtonIcon>

        <CheckBox
          size={'24px'}
          disabled={isDeleted}
          checked={isActive}
          onChange={_event => {
            onChange && onChange(_event);
          }}
        />
      </FlexBox>
    </ItemContainer>
  );
};

const Separator = ({ text }: { text?: string }) => {
  const theme = useTheme();
  return (
    <FlexBox fillWidth fxDirection={'row'} alignItems={'center'} gap={text ? 8 : 0} padding={'4px'} minHeight={'24px'}>
      <FlexBox flex={1} minHeight={'1px'} background={theme.modalBorderColor}></FlexBox>

      {text && (
        <Text $size={12} $weight={400}>
          {text}
        </Text>
      )}
      <FlexBox flex={1} minHeight={'1px'} background={theme.modalBorderColor}></FlexBox>
    </FlexBox>
  );
};
const ItemContainer = styled(FlexBox)`
  border: 1px solid ${p => (p.isActive ? p.theme.accentColor.base : p.theme.accentColor.light)};

  box-shadow: ${p => (p.isActive ? `1px 5px 8px ${p.theme.accentColor.extraLight}` : '')};

  transition: all ${p => p.theme.globals.timingFnMain};

  @media (hover: hover) {
    &:hover {
      border: 1px solid ${p => p.theme.accentColor.base};

      box-shadow: ${p => `1px 8px 12px ${p.theme.accentColor.light}`};
    }
  }
  @media (hover: none) {
    &:active {
      border: 1px solid ${p => p.theme.accentColor.base};

      box-shadow: ${p => `1px 8px 12px ${p.theme.accentColor.light}`};
    }
  }
`;
type CardFieldProps = {
  label: string;
  getValue: (item?: PriceDiscountEntity) => React.ReactNode;
  children?: Omit<CardFieldProps, 'children'>;
};
const CardRow = ({ field, item }: { field: CardFieldProps; item?: PriceDiscountEntity }) => {
  return (
    <SimpleGridBox
      $columns={field.children ? ['2fr', '1fr'] : '1fr'}
      gap={8}
      padding={'2px 6px'}
      className={'listItem'}
      fxDirection={'row'}
    >
      <FlexBox gap={6} flex={1}>
        <Text $weight={400} $size={12} $align={'start'}>
          {field.label}
        </Text>
        <Text $weight={500} $size={13} $align={'end'}>
          {field.getValue(item) ?? '---'}
        </Text>
      </FlexBox>

      {field.children && (
        <FlexBox gap={6}>
          <Text $weight={400} $size={12} $align={'start'}>
            {field.children?.label}
          </Text>
          <Text $weight={500} $size={13} $align={'end'}>
            {field.children?.getValue(item) ?? '---'}
          </Text>
        </FlexBox>
      )}
    </SimpleGridBox>
  );
};

const fields: (CardFieldProps | { separator: boolean; text?: string })[] = [
  {
    label: t('Type'),
    getValue: item => item?.type,
  },
  {
    label: t('Value'),
    getValue: item => item?.value,
    children: {
      label: t('Type'),
      getValue: item => item?.valueType,
    },
  },
  // {
  //   label: t('Value type'),
  //   getValue: item => item?.valueType,
  // },
  {
    label: t('Bonus balance'),
    getValue: item => item?.balanceType,
  },
  {
    label: t('Discount threshold'),
    getValue: item => item?.threshold,
    children: {
      label: t('Type'),
      getValue: item => item?.thresholdType,
    },
  },

  {
    label: t('Discount source volume'),
    getValue: item => item?.sourceVolume,
  },

  {
    label: t('Discount target volume'),
    getValue: item => item?.targetVolume,
  },
  // {
  //   label: t('Discount threshold type'),
  //   getValue: item => item?.thresholdType,
  // },
  { separator: true },
  {
    label: t('Label'),
    getValue: item => item?.label,
  },
  {
    label: t('Category'),
    getValue: item => item?.category,
  },
  { separator: true, text: t('Additional') },
  {
    label: t('Custom key'),
    getValue: item => item?.cmsConfigs?.key,
  },
  { separator: true },
];

export default PriceDiscountsFormArea;
