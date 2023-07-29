import ModalForm, { ModalFormProps } from '../../ModalForm';
import { IProduct } from '../../../redux/products/products.types';
import FlexBox from '../../atoms/FlexBox';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import InputText from '../../atoms/Inputs/InputText';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { AppQueryParams, createApiCall } from '../../../api';
import ProductsApi from '../../../api/products.api';
import { useForm } from 'react-hook-form';
import ProductCardSimpleOverview from '../../Products/ProductCardSimpleOverview';
import styled from 'styled-components';
import { FilterOpt } from '../../ModalForm/ModalFilter';

export interface FormProductSelectorProps<D = any> {
  title?: string;
  onSubmit?: (data?: D) => void;
  onSelect?: (data?: D) => void;
  selected?: D;
  disabled?: boolean;
}

interface SelectProductModalProps extends Omit<ModalFormProps<any, any, IProduct>, 'onSubmit' | 'onSelect'> {
  selected?: IProduct;
  onSelect?: (product?: IProduct) => void;
  search?: AppQueryParams['search'];
  searchBy?: AppQueryParams['searchBy'];
}

const productSelectorFilterOptions: FilterOpt[] = [
  { label: 'By label', value: 'label' },
  {
    label: 'By sku',
    value: 'sku',
  },
];
const SelectProductModal: React.FC<SelectProductModalProps> = ({ selected, onSelect }) => {
  const { register, setValue, watch, handleSubmit } = useForm<Pick<SelectProductModalProps, 'search' | 'searchBy'>>({
    defaultValues: {
      searchBy: 'label',
      search: '',
    },
  });
  const [loadedData, setLoadedData] = useState<IProduct[] | null>(null);
  const [current, setCurrent] = useState<IProduct | undefined>(selected);

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
      <ProductCardSimpleOverview
        key={`product-${p._id}`}
        product={p}
        onSelect={() => onItemSelect(p)}
        isSelected={p._id === selected?._id}
      />
    ));
  }, [onItemSelect, loadedData, selected?._id]);

  const getData = useCallback(
    (search?: string, searchBy?: string) =>
      createApiCall(
        {
          data: { search, searchBy },
          onSuccess: setLoadedData,
        },
        ProductsApi.getAll,
        ProductsApi
      ),
    []
  );
  const onValid = ({ search, searchBy }: Pick<SelectProductModalProps, 'search' | 'searchBy'>) =>
    getData(search, searchBy);

  useEffect(() => {
    !search && getData();
  }, [getData, search]);
  return (
    <StModalForm
      fillHeight
      title={'Select product'}
      isValid={!!current}
      footer={false}
      filterOptions={productSelectorFilterOptions}
      onOptSelect={(o, v) => {
        setValue('searchBy', v);
      }}
      onSubmit={handleSubmit(onValid)}
    >
      <FlexBox fillWidth padding={'8px 8px'} fxDirection={'row'} gap={12} alignItems={'flex-end'}>
        <InputLabel label={'Пошук по назві'} direction={'vertical'}>
          <InputText placeholder={'Введіть назву продукту'} {...register('search')} autoFocus />
        </InputLabel>

        <ButtonIcon variant={'onlyIcon'} type={'submit'} icon={'search'} iconSize={'24px'} />
      </FlexBox>
      <FlexBox overflow={'auto'} fillWidth flex={'1'} gap={4} padding={'16px 8px'}>
        {renderProducts}
      </FlexBox>
    </StModalForm>
  );
};
const StModalForm = styled(ModalForm)`
  @media screen and (min-width: 768px) {
    width: 600px;
  }
`;
const FormProductSelector: React.FC<FormProductSelectorProps> = ({
  onSelect,
  disabled,
  onSubmit,
  selected,
  ...props
}) => {
  const modals = useModalProvider();
  const [current, setCurrent] = useState<IProduct | undefined>(selected);

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
    <FlexBox
      gap={8}
      maxHeight={'100%'}
      fxDirection={'column'}
      fillWidth
      // alignItems={'stretch'}
      overflow={'hidden'}
      padding={'8px 0 8px'}
    >
      {current && (
        <FlexBox fillWidth>
          <ProductCardSimpleOverview product={current} disabled />
        </FlexBox>
      )}
      <ButtonIcon variant={'outlinedSmall'} disabled={disabled} onClick={onOpenSelectorClick}>
        {`${current ? 'Change' : 'Select'} product for pricing`}
      </ButtonIcon>
    </FlexBox>
  );
};

export default FormProductSelector;
