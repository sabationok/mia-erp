import { ModalFormProps } from '../../../ModalForm';
import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import { IProduct } from '../../../../redux/products/products.types';
import { FormEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { ITableListProps } from '../../../TableList/tableTypes.types';
import TableList from '../../../TableList/TableList';
import { productsColumns } from '../../../../data';
import { createApiCall, PriceManagementApi, ProductsApi, WarehousesApi } from '../../../../api';
import { t } from '../../../../lang';
import { enumToFilterOptions } from '../../../../utils/fabrics';
import ModalFilter from '../../../ModalForm/ModalFilter';
import { IVariationTableData } from '../../../../redux/products/variations.types';
import { IPriceListItem } from '../../../../redux/priceManagement/priceManagement.types';
import styled from 'styled-components';
import { ModalHeader } from '../../../atoms';
import FlexBox from '../../../atoms/FlexBox';
import StepsController from '../../components/StepsController';
import { useAppForm } from '../../../../hooks';
import { createTableTitlesFromTemplate } from '../../../../utils';
import { usePropertiesSelector } from '../../../../redux/selectors.store';
import VariationsApi from '../../../../api/variations.api';
import { transformVariationTableData } from '../../../../utils/tables';
import { ExtractId } from '../../../../utils/dataTransform';
import { pricesColumnsForProductReview } from '../../../../data/priceManagement.data';
import { IOrderTempSlot } from '../../../../redux/orders/orders.types';
import { IProductInventory, IWarehouse } from '../../../../redux/warehouses/warehouses.types';
import { warehouseOverviewTableColumns } from '../../../../data/warehauses.data';
import { useStepsHandler } from '../../../../utils/createStepChecker';
import _ from 'lodash';
import { nanoid } from '@reduxjs/toolkit';

export interface SelectProductModalProps
  extends Omit<ModalFormProps<SelectProductModalSteps, any, SelectProductModalFormData>, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<IOrderTempSlot>;
}

enum SelectProductModalSteps {
  product = 'product',
  variation = 'variation',
  price = 'price',
  // warehouse = 'warehouse',
  batch = 'batch',
}

const stepsLong = enumToFilterOptions(SelectProductModalSteps);
// TODO const stepsShort = enumToFilterOptions(SelectProductModalSteps).filter(el => el.value !== 'batch');

export interface SelectProductModalFormData {
  price?: IPriceListItem;
  variation?: IVariationTableData;
  product?: IProduct;
  warehouse?: IWarehouse;
  inventory?: IProductInventory;
}
type FormKey = keyof SelectProductModalFormData;

const SelectProductModal: React.FC<SelectProductModalProps> = ({ defaultState, onSubmit, onClose, ...props }) => {
  const { stepCheck, stepIdx, stepsCount, setPrevStep, setNextStep } = useStepsHandler(stepsLong);
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
        setNextStep();
      },
    }),
    [formData?.product, products, setFormValue, setNextStep, setValue]
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
        setNextStep();
      },
    }),
    [formData?.variation, setFormValue, setNextStep, variationTableTitles, variations]
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
        setNextStep();
      },
    }),
    [formData?.price, prices, setFormValue, setNextStep]
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
        setNextStep();
      },
    }),
    [formData?.inventory, inventories, setFormValue, setNextStep]
  );

  const tableConfig = useMemo((): ITableListProps | undefined => {
    if (stepCheck(SelectProductModalSteps.product)) {
      return productTableConfig;
    }
    if (stepCheck(SelectProductModalSteps.variation)) {
      return variationsTableConfig;
    }
    if (stepCheck(SelectProductModalSteps.price)) {
      return pricesTableConfig;
    }
    if (stepCheck(SelectProductModalSteps.batch)) {
      return warehousingTableConfig;
    }
    return;
  }, [stepCheck, productTableConfig, variationsTableConfig, pricesTableConfig, warehousingTableConfig]);

  const canGoNext = useMemo((): boolean => {
    if (stepCheck(SelectProductModalSteps.product)) {
      return !!formData?.product;
    }
    if (stepCheck(SelectProductModalSteps.variation)) {
      return !!formData?.product && !!formData?.variation;
    }
    if (stepCheck(SelectProductModalSteps.price)) {
      return !!formData?.product && !!formData?.variation && !!formData?.price;
    }
    if (stepCheck(SelectProductModalSteps.batch)) {
      return !!formData?.inventory;
    }
    return false;
  }, [formData?.inventory, formData?.price, formData?.product, formData?.variation, stepCheck]);

  const canSubmit = useMemo(() => {
    return Object.values(formData).length >= 4;
  }, [formData]);

  const loadData = useCallback(() => {
    if (stepCheck(SelectProductModalSteps.product)) {
      createApiCall(
        {
          data: { search, searchBy },
          onSuccess: setProducts,
        },
        ProductsApi.getAll,
        ProductsApi
      );
    }
    if (stepCheck(SelectProductModalSteps.variation)) {
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
    if (stepCheck(SelectProductModalSteps.price)) {
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
    if (stepCheck(SelectProductModalSteps.batch)) {
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
  }, [formData?.price, formData?.product, formData?.variation, search, searchBy, stepCheck]);

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();

    const slot: IOrderTempSlot = {
      ..._.omit(formData, ['price']),
      ..._.omit(formData?.price, ['author', 'owner', 'list']),
      origin: _.pick(formData?.price, ['_id']),
      tempId: nanoid(8),
    };

    console.log('handleSubmit', slot);

    onSubmit && onSubmit(slot);
    onClose && onClose();
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (formData.variation?.product?._id !== formData.product?._id) {
      setFormData(prev => ({ product: prev?.product }));
    }
  }, [formData.product?._id, formData.variation?.product?._id]);

  return (
    <Form fillWidth fillHeight {...props} onSubmit={handleSubmit}>
      <ModalHeader title={t('Select product')} onBackPress={onClose} />

      <Content fillWidth flex={1} overflow={'hidden'}>
        <ModalFilter filterOptions={stepsLong} asStepper currentIndex={stepIdx} />

        <TableList {...tableConfig} />
      </Content>

      <Footer padding={'8px'}>
        <StepsController
          steps={stepsLong}
          onPrevPress={() => setPrevStep()}
          onNextPress={() => setNextStep()}
          onCancelPress={stepIdx === 0 ? onClose : undefined}
          canGoNext={canGoNext}
          canSubmit={canSubmit}
          currentIndex={stepIdx}
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
