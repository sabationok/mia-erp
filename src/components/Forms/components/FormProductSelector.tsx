import ModalForm, { ModalFormProps } from '../../ModalForm';
import { IProduct } from '../../../redux/products/products.types';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import InputText from '../../atoms/Inputs/InputText';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { createApiCall } from '../../../api';
import ProductsApi from '../../../api/products.api';
import { useForm } from 'react-hook-form';

export interface FormProductSelectorProps<D = any> {
  title?: string;
  onSubmit?: (data?: D) => void;
  onSelect?: (data?: D) => void;
  selected?: D;
}

export interface ProductCardForSelectorProps {
  product: IProduct;
  isSelected?: boolean;
  onSelect?: () => void;
  disabled?: boolean;
}

const ProductCardForSelector: React.FC<ProductCardForSelectorProps> = ({ product, disabled, isSelected, onSelect }) => {
  const logProduct = () => {
    console.log(product);
  };

  useEffect(logProduct, [product]);
  return (
    <Card fxDirection={'row'} fillWidth gap={16} isSelected={isSelected} onClick={onSelect} disabled={disabled}>
      <ImageBox>
        <img
          src={
            (product?.images && product?.images[0]?.img_1x) ||
            'https://cdn.create.vista.com/api/media/medium/186787692/stock-photo-profile-young-stylish-man-eyeglasses?token='
          }
          alt={''}
          width={'100%'}
          height={'100%'}
        />
      </ImageBox>
      <FlexBox gap={8}>
        <FlexBox style={{ fontSize: 16, fontWeight: 600 }}>{product.label}</FlexBox>
        <FlexBox style={{ fontSize: 16, color: 'rgba(0,0,0,0.5)' }}>{product.sku}</FlexBox>
      </FlexBox>
    </Card>
  );
};

interface SelectItemModalProps<D = any> extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  selected?: D;
  onSelect?: (item?: D) => void;
}

const SelectProductModal = ({ selected, onSelect }: SelectItemModalProps<IProduct>) => {
  const [loadedData, setLoadedData] = useState<IProduct[] | null>(null);
  const [current, setCurrent] = useState<IProduct | null>(null);

  const { register, watch, handleSubmit } = useForm<{ search: string }>();
  const { search } = watch();

  const onItemSelect = useCallback(
    (p: IProduct) => {
      setCurrent(p);
      onSelect && onSelect(p);
    },
    [onSelect]
  );
  const renderProducts = useMemo(() => {
    return loadedData?.map(p => (
      <ProductCardForSelector
        key={`product-${p._id}`}
        product={p}
        onSelect={() => onItemSelect(p)}
        isSelected={p._id === selected?._id}
      />
    ));
  }, [onItemSelect, loadedData, selected?._id]);

  const getData = useCallback(
    (search?: string) => createApiCall({ data: { search }, onSuccess: setLoadedData }, ProductsApi.getAll, ProductsApi),
    []
  );
  const onValid = ({ search }: { search: string }) => getData(search);

  useEffect(() => {
    !search && getData();
  }, [getData, search]);
  return (
    <ModalForm
      fillHeight
      fitContentH
      title={'Select product'}
      isValid={!!current}
      footer={false}
      onSubmit={handleSubmit(onValid)}
    >
      <FlexBox fillWidth padding={'8px 16px'} fxDirection={'row'} gap={12} alignItems={'flex-end'}>
        <InputLabel label={'Пошук по назві'} direction={'vertical'}>
          <InputText placeholder={'Введіть назву продукту'} {...register('search')} autoFocus />
        </InputLabel>

        <ButtonIcon variant={'onlyIcon'} type={'submit'} icon={'search'} iconSize={'24px'} />
      </FlexBox>
      <FlexBox overflow={'auto'} fillWidth flex={'1'} gap={4} padding={'16px'}>
        {renderProducts}
      </FlexBox>
    </ModalForm>
  );
};
const FormProductSelector: React.FC<FormProductSelectorProps> = ({ onSelect, onSubmit, ...props }) => {
  const modals = useModalProvider();
  const [current, setCurrent] = useState<IProduct | undefined>();

  const onOpenSelectorClick = () => {
    const modal = modals.handleOpenModal({
      ModalChildren: SelectProductModal,
      modalChildrenProps: {
        onSelect: p => {
          setCurrent(p);
          onSelect && onSelect(p);
          modal?.onClose();
        },
        selected: current,
      },
    });
  };

  return (
    <FlexBox gap={8} fxDirection={'column'} fillWidth alignItems={'stretch'} padding={'8px 0 8px'}>
      {current && (
        <FlexBox fillWidth>
          <ProductCardForSelector product={current} disabled />
        </FlexBox>
      )}
      <ButtonIcon variant={'outlinedSmall'} onClick={onOpenSelectorClick}>
        <FlexBox>{`${current ? 'Change' : 'Select'} product for pricing`}</FlexBox>
      </ButtonIcon>
    </FlexBox>
  );
};

const Card = styled(FlexBox)<{ isSelected?: boolean; disabled?: boolean }>`
  position: relative;

  min-height: 100px;

  padding: 8px;
  border-bottom: 2px solid ${({ theme, isSelected }) => theme.fieldBackgroundColor};
  box-shadow: ${({ theme, isSelected }) => (isSelected ? '0px 2px 6px 0px rgba(0, 0, 0, 0.16)' : '')};

  transition: all ${({ theme, isSelected }) => theme.globals.timingFunctionMain};
  pointer-events: ${({ disabled }) => disabled && 'none'};

  &:hover {
    box-shadow: ${({ theme }) => '0px 2px 6px 0px rgba(0, 0, 0, 0.16)'};
  }

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
`;
const ImageBox = styled(FlexBox)`
  height: 100%;
  width: 60px;
  overflow: hidden;

  background-color: ${({ theme }) => theme.fieldBackgroundColor};
`;

export default FormProductSelector;
