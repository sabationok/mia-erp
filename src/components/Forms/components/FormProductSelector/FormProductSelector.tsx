import ModalForm, { ModalFormProps } from '../../../ModalForm';
import { IProduct } from '../../../../redux/products/products.types';
import FlexBox from '../../../atoms/FlexBox';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useModalProvider } from '../../../ModalProvider/ModalProvider';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import InputText from '../../../atoms/Inputs/InputText';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import { createApiCall } from '../../../../api';
import ProductsApi from '../../../../api/products.api';
import { useForm } from 'react-hook-form';
import SelectorProductCard from './SelectorProductCard';

export interface FormProductSelectorProps<D = any> {
  title?: string;
  onSubmit?: (data?: D) => void;
  onSelect?: (data?: D) => void;
  selected?: D;
}

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
      <SelectorProductCard
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
    <ModalForm fillHeight title={'Select product'} isValid={!!current} footer={false} onSubmit={handleSubmit(onValid)}>
      <FlexBox fillWidth padding={'8px 8px'} fxDirection={'row'} gap={12} alignItems={'flex-end'}>
        <InputLabel label={'Пошук по назві'} direction={'vertical'}>
          <InputText placeholder={'Введіть назву продукту'} {...register('search')} autoFocus />
        </InputLabel>

        <ButtonIcon variant={'onlyIcon'} type={'submit'} icon={'search'} iconSize={'24px'} />
      </FlexBox>
      <FlexBox overflow={'auto'} fillWidth flex={'1'} gap={4} padding={'16px 8px'}>
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
          <SelectorProductCard product={current} disabled />
        </FlexBox>
      )}
      <ButtonIcon variant={'outlinedSmall'} onClick={onOpenSelectorClick}>
        <FlexBox>{`${current ? 'Change' : 'Select'} product for pricing`}</FlexBox>
      </ButtonIcon>
    </FlexBox>
  );
};

export default FormProductSelector;
