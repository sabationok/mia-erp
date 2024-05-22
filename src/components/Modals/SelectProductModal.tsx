import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { OfferEntity } from '../../types/offers/offers.types';
import ProductCardSimpleOverview from '../Overviews/offer/ProductCardSimpleOverview';
import { AppQueryParams, createApiCall } from '../../api';
import OffersApi from '../../api/offers.api';
import FlexBox from '../atoms/FlexBox';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import ModalForm, { ModalFormProps } from '../ModalForm';
import { TabOption } from '../atoms/TabSelector';

export interface SelectProductModalProps extends Omit<ModalFormProps<any, any, OfferEntity>, 'onSubmit' | 'onSelect'> {
  selected?: OfferEntity;
  onSelect?: (product: OfferEntity) => void;
  search?: AppQueryParams['search'];
  searchBy?: AppQueryParams['searchBy'];
}

const productSelectorFilterOptions: (TabOption & { placeholder?: string })[] = [
  { label: 'By label', value: 'label', placeholder: 'Введіть назву продукту' },
  { label: 'By sku', value: 'sku', placeholder: 'Введіть артикул продукту' },
  // { label: 'By warehouse', value: 'warehouse', placeholder: 'Введіть номер складу' },
];
const SelectProductModal: React.FC<SelectProductModalProps> = ({ selected, onSelect, ...props }) => {
  const { register, setValue, watch, handleSubmit } = useForm<Pick<SelectProductModalProps, 'search' | 'searchBy'>>({
    defaultValues: {
      searchBy: 'label',
      search: '',
    },
  });
  const [loadedData, setLoadedData] = useState<OfferEntity[] | null>(null);
  const [current, setCurrent] = useState<OfferEntity | undefined>(selected);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const { search, searchBy } = watch();

  const onItemSelect = useCallback(
    (p: OfferEntity) => {
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
        OffersApi.getAll,
        OffersApi
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
      {...props}
      filterOptions={productSelectorFilterOptions}
      isValid={!!current}
      footer={false}
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

export default SelectProductModal;
