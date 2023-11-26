import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ProductCardSimpleOverview from '../Overviews/ProductCardSimpleOverview';
import { AppQueryParams, createApiCall, PriceManagementApi } from '../../api';
import FlexBox from '../atoms/FlexBox';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import ModalForm, { ModalFormProps } from '../ModalForm';
import { FilterOpt } from '../ModalForm/ModalFilter';
import { IPriceListItem } from '../../types/priceManagement.types';

export interface SelectPriceListItemProps
  extends Omit<ModalFormProps<any, any, IPriceListItem>, 'onSubmit' | 'onSelect'> {
  selected?: IPriceListItem;
  onSelect?: (product: IPriceListItem) => void;
  search?: AppQueryParams['search'];
  searchBy?: AppQueryParams['searchBy'];
}

const productSelectorFilterOptions: (FilterOpt & { placeholder?: string })[] = [
  { label: 'By label', value: 'label', placeholder: 'Введіть назву продукту' },
  { label: 'By sku', value: 'sku', placeholder: 'Введіть артикул продукту' },
  // { label: 'By warehouse', value: 'warehouse', placeholder: 'Введіть номер складу' },
];
const SelectPriceListItem: React.FC<SelectPriceListItemProps> = ({ selected, onSelect }) => {
  const { register, setValue, watch, handleSubmit } = useForm<Pick<SelectPriceListItemProps, 'search' | 'searchBy'>>({
    defaultValues: {
      searchBy: 'label',
      search: '',
    },
  });
  const [loadedData, setLoadedData] = useState<IPriceListItem[] | null>(null);
  const [current, setCurrent] = useState<IPriceListItem | undefined>(selected);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const { search, searchBy } = watch();

  const onItemSelect = useCallback(
    (p: IPriceListItem) => {
      setCurrent(p);
      onSelect && onSelect(p);
    },
    [onSelect]
  );
  const renderProducts = useMemo(() => {
    return loadedData?.map(
      p =>
        p?.product && (
          <ProductCardSimpleOverview
            key={`product-${p._id}`}
            product={p?.product}
            onSelect={() => onItemSelect(p)}
            isSelected={p._id === selected?._id}
          />
        )
    );
  }, [onItemSelect, loadedData, selected?._id]);

  const getData = useCallback(
    (search?: string, searchBy?: string) =>
      createApiCall(
        {
          data: { search, searchBy },
          onSuccess: setLoadedData,
        },
        PriceManagementApi.getAllForUser,
        PriceManagementApi
      ),
    []
  );

  const onValid = ({ search, searchBy }: Pick<SelectPriceListItemProps, 'search' | 'searchBy'>) =>
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
      onOptSelect={(_o, v, index) => {
        setValue('searchBy', v);
        setCurrentTab(index);
      }}
      onSubmit={handleSubmit(onValid)}
    >
      <FlexBox fillWidth padding={'8px 8px'} fxDirection={'row'} gap={12} alignItems={'flex-end'}>
        <InputLabel label={`Параметр пошуку: ${searchBy?.toUpperCase()}`} direction={'vertical'}>
          <InputText
            placeholder={productSelectorFilterOptions[currentTab]?.placeholder}
            {...register('search')}
            autoFocus
          />
        </InputLabel>

        <ButtonIcon variant={'onlyIcon'} type={'submit'} icon={'search'} iconSize={'30px'} />
      </FlexBox>
      <FlexBox overflow={'auto'} fillWidth flex={'1'} padding={'8px 8px 16px'}>
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

export default SelectPriceListItem;
