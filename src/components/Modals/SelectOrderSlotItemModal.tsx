import ModalForm, { ModalFormProps } from '../ModalForm';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SelectProductModalProps } from './SelectProductModal';
import { FilterOpt } from '../ModalForm/ModalFilter';
import { AppQueryParams, createApiCall } from '../../api';
import { IOrderSlotItem } from '../../redux/orders/orders.types';
import ProductsApi from '../../api/products.api';
import FlexBox from '../atoms/FlexBox';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import OrderSlotItemOverview from '../Products/OrderSlotItemOverview';

export interface SelectOrderSlotItemModalProps
  extends Omit<ModalFormProps<any, any, IOrderSlotItem>, 'onSubmit' | 'onSelect'> {
  selected?: IOrderSlotItem;
  onSelect?: (product: IOrderSlotItem) => void;
  search?: AppQueryParams['search'];
  searchBy?: AppQueryParams['searchBy'];
}

const productSelectorFilterOptions: FilterOpt[] = [
  { label: 'By label', value: 'label' },
  {
    label: 'By sku',
    value: 'sku',
  },
  { label: 'By warehouse', value: 'warehouse' },
];
const SelectOrderSlotItemModal: React.FC<SelectOrderSlotItemModalProps> = ({ onSelect, selected }) => {
  const { register, setValue, watch, handleSubmit } = useForm<Pick<SelectProductModalProps, 'search' | 'searchBy'>>({
    defaultValues: {
      searchBy: 'label',
      search: '',
    },
  });
  const [loadedData, setLoadedData] = useState<IOrderSlotItem[] | null>(null);
  const [current, setCurrent] = useState<IOrderSlotItem | undefined>(selected);

  const { search, searchBy } = watch();

  const onItemSelect = useCallback(
    (p: IOrderSlotItem) => {
      setCurrent(p);
      onSelect && onSelect(p);
    },
    [onSelect]
  );
  const renderSlotItems = useMemo(() => {
    return loadedData?.map((item, index) => (
      <OrderSlotItemOverview
        key={`slot-item-${item._id}`}
        item={item}
        onSelect={() => onItemSelect(item)}
        index={index}
      />
    ));
  }, [onItemSelect, loadedData]);

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
      // isValid={!!current}
      footer={false}
      filterOptions={productSelectorFilterOptions}
      onOptSelect={(o, v) => {
        setValue('searchBy', v);
      }}
      onSubmit={handleSubmit(onValid)}
    >
      <FlexBox fillWidth padding={'8px 8px'} fxDirection={'row'} gap={12} alignItems={'flex-end'}>
        <InputLabel label={`Параметр пошуку: ${searchBy}`} direction={'vertical'}>
          <InputText placeholder={'Введіть назву продукту'} {...register('search')} autoFocus />
        </InputLabel>

        <ButtonIcon variant={'onlyIcon'} type={'submit'} icon={'search'} iconSize={'24px'} />
      </FlexBox>
      <FlexBox overflow={'auto'} fillWidth flex={'1'} padding={'8px 8px 16px'}>
        {renderSlotItems}
      </FlexBox>
    </StModalForm>
  );
};
const StModalForm = styled(ModalForm)`
  @media screen and (min-width: 768px) {
    width: 600px;
  }
`;
export default SelectOrderSlotItemModal;
