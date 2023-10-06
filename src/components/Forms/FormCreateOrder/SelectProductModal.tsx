import { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { IProduct } from '../../../redux/products/products.types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ITableListProps } from '../../TableList/tableTypes.types';
import TableList from '../../TableList/TableList';
import { productsColumns } from '../../../data';
import { createApiCall, PriceManagementApi, ProductsApi, WarehousesApi } from '../../../api';
import { t } from '../../../lang';
import { enumToFilterOptions } from '../../../utils/fabrics';
import ModalFilter, { FilterSelectHandler } from '../../ModalForm/ModalFilter';
import { IVariationTableData } from '../../../redux/products/variations.types';
import { IPriceListItem } from '../../../redux/priceManagement/priceManagement.types';
import styled from 'styled-components';
import { ModalHeader } from '../../atoms';
import FlexBox from '../../atoms/FlexBox';
import StepsController from '../components/StepsController';
import { useAppForm } from '../../../hooks';
import { createStepsChecker, createTableTitlesFromTemplate } from '../../../utils';
import { usePropertiesSelector } from '../../../redux/selectors.store';
import VariationsApi from '../../../api/variations.api';
import { transformVariationTableData } from '../../../utils/tables';
import { ExtractId } from '../../../utils/dataTransform';
import { pricesColumnsForProductReview } from '../../../data/priceManagement.data';
import { IOrderSlotBase } from '../../../redux/orders/orders.types';
import { IProductInventory, IWarehouse } from '../../../redux/warehouses/warehouses.types';
import { warehouseOverviewTableColumns } from '../../../data/warehauses.data';

export interface SelectProductModalProps
  extends Omit<ModalFormProps<SelectProductModalSteps, any, SelectProductModalFormData>, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<IOrderSlotBase>;
}

enum SelectProductModalSteps {
  product = 'product',
  variation = 'variation',
  price = 'price',
  warehouse = 'warehouse',
}

const steps = enumToFilterOptions(SelectProductModalSteps);
const checkStep = (idx: number) => createStepsChecker(steps)(idx);
export interface SelectProductModalFormData {
  price?: IPriceListItem;
  variation?: IVariationTableData;
  product?: IProduct;
  warehouse?: IWarehouse;
  inventory?: IProductInventory;
}
type FormKey = keyof SelectProductModalFormData;

const SelectProductModal: React.FC<SelectProductModalProps> = ({ defaultState, onSubmit, onClose, ...props }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [variations, setVariations] = useState<IVariationTableData[]>([]);
  const [prices, setPrices] = useState<IPriceListItem[]>([]);
  const [inventories, setInventories] = useState<IProductInventory[]>([]);

  const [formData, setFormData] = useState<SelectProductModalFormData>({});

  const setFormValue = useCallback(<Key extends FormKey = any>(key: Key, value: SelectProductModalFormData[Key]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  }, []);

  const templates = usePropertiesSelector();

  const { watch, setValue } = useAppForm<{ search?: string; searchBy?: string }>();
  const { search, searchBy } = watch();
  const onSetStep: FilterSelectHandler<SelectProductModalSteps> = (_o, _v, i) => {
    setCurrentTab(i);
  };

  const productTableConfig = useMemo(
    (): ITableListProps<IProduct> => ({
      tableTitles: productsColumns,
      tableData: products,
      tableSearchParams: [
        { dataPath: 'label', label: t('label') },
        { dataPath: 'sku', label: t('sku') },
      ],
      selectedRow: formData?.product,
      onSubmitSearch: data => {
        setValue('search', data.search);
        setValue('searchBy', data.searchParam?.dataPath);
      },
      onRowClick: data => {
        const v = products.find(p => p._id === data?._id);

        v && setFormValue('product', v);
      },
    }),
    [formData?.product, products, setFormValue, setValue]
  );
  const variationTableTitles = useMemo(() => {
    const template = templates.find(t => t._id === formData?.product?.template?._id);
    return createTableTitlesFromTemplate(template);
  }, [templates, formData]);

  const variationsTableConfig = useMemo(
    (): ITableListProps<IVariationTableData> => ({
      tableTitles: variationTableTitles,
      tableData: variations,
      isSearch: false,
      selectedRow: formData?.variation,
      onRowClick: data => {
        const v = variations.find(p => p._id === data?._id);

        v && setFormValue('variation', v);
      },
    }),
    [formData?.variation, setFormValue, variationTableTitles, variations]
  );
  const pricesTableConfig = useMemo(
    (): ITableListProps<IProduct> => ({
      tableTitles: pricesColumnsForProductReview,
      tableData: prices,
      isSearch: false,
      selectedRow: formData?.price,
      onRowClick: data => {
        const v = prices.find(p => p._id === data?._id);

        v && setFormValue('price', v);
      },
    }),
    [formData?.price, prices, setFormValue]
  );

  const warehousingTableConfig = useMemo(
    (): ITableListProps<IProductInventory> => ({
      tableTitles: warehouseOverviewTableColumns,
      tableData: inventories,
      isSearch: false,
      selectedRow: formData?.inventory,
      onRowClick: data => {
        const v = inventories.find(p => p._id === data?._id);

        v && setFormValue('inventory', v);
        v?.warehouse && setFormValue('warehouse', v?.warehouse);
      },
    }),
    [formData?.inventory, inventories, setFormValue]
  );

  const tableConfig = useMemo((): ITableListProps | undefined => {
    if (checkStep(currentTab)?.product) {
      return productTableConfig;
    }
    if (checkStep(currentTab)?.variation) {
      return variationsTableConfig;
    }
    if (checkStep(currentTab)?.price) {
      return pricesTableConfig;
    }
    if (checkStep(currentTab)?.warehouse) {
      return warehousingTableConfig;
    }
    return;
  }, [currentTab, pricesTableConfig, productTableConfig, variationsTableConfig, warehousingTableConfig]);

  const canGoNext = useMemo((): boolean => {
    if (checkStep(currentTab)?.product) {
      return !!formData?.product;
    }
    if (checkStep(currentTab)?.variation) {
      return !!formData?.product && !!formData?.variation;
    }
    if (checkStep(currentTab)?.price) {
      return !!formData?.product && !!formData?.variation && !!formData?.price;
    }
    if (checkStep(currentTab)?.warehouse) {
      return !!formData?.inventory;
    }
    return false;
  }, [currentTab, formData?.inventory, formData?.price, formData?.product, formData?.variation]);

  const canAccept = useMemo(() => {
    return Object.values(formData).length >= 4;
  }, [formData]);

  const loadData = useCallback(() => {
    if (checkStep(currentTab)?.product) {
      createApiCall(
        {
          data: { search, searchBy },
          onSuccess: setProducts,
        },
        ProductsApi.getAll,
        ProductsApi
      );
    }
    if (checkStep(currentTab)?.variation) {
      formData?.product &&
        createApiCall(
          {
            data: { product: formData?.product },
            onSuccess: d => {
              const transformed = d.map(v => transformVariationTableData(v));
              setVariations(transformed);
            },
          },
          VariationsApi.getAllByProductId,
          VariationsApi
        );
    }
    if (checkStep(currentTab)?.price) {
      formData?.product &&
        createApiCall(
          {
            data: {
              product: ExtractId(formData?.product),
              variation: formData?.variation ? ExtractId(formData?.variation) : undefined,
            },
            onSuccess: setPrices,
          },
          PriceManagementApi.getAllPrices,
          PriceManagementApi
        );
    }
    if (checkStep(currentTab)?.warehouse) {
      formData?.product &&
        createApiCall(
          {
            data: {
              product: ExtractId(formData?.product),
              variation: formData?.variation ? ExtractId(formData?.variation) : undefined,
              price: formData?.price ? ExtractId(formData?.price) : undefined,
            },
            onSuccess: setInventories,
          },
          WarehousesApi.getAllInventories,
          WarehousesApi
        );
    }
  }, [currentTab, formData?.price, formData?.product, formData?.variation, search, searchBy]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (formData.variation?.product?._id !== formData.product?._id) {
      setFormData(prev => ({ product: prev?.product }));
    }
  }, [formData.product?._id, formData.variation?.product?._id]);

  return (
    <Form fillWidth fillHeight {...props}>
      <ModalHeader title={t('Select product')} onBackPress={onClose} />

      <Content fillWidth flex={1} overflow={'hidden'}>
        <ModalFilter filterOptions={steps} asStepper currentIndex={currentTab} />
        <TableList {...tableConfig} />
      </Content>

      <Footer padding={'8px'}>
        <StepsController
          steps={steps}
          onNextPress={onSetStep}
          onPrevPress={onSetStep}
          onCancelPress={currentTab === 0 ? onClose : undefined}
          canGoNext={canGoNext}
          canAccept={canAccept}
          currentIndex={currentTab}
          onAcceptPress={
            currentTab + 1 === steps.length
              ? () => {
                  onSubmit && onSubmit(formData);
                  onClose && onClose();
                }
              : undefined
          }
        />
      </Footer>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 98vw;
  height: 98vh;
  padding: 0 8px;

  background-color: ${p => p.theme.modalBackgroundColor};
`;

const Content = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;

const Footer = styled(FlexBox)``;
export default SelectProductModal;
