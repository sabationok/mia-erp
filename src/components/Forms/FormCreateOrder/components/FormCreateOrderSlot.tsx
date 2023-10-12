import { ModalFormProps } from '../../../ModalForm';
import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import { IProduct } from '../../../../redux/products/products.types';
import { FormEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { ITableListProps } from '../../../TableList/tableTypes.types';
import TableList from '../../../TableList/TableList';
import { createApiCall, ProductsApi, WarehousesApi } from '../../../../api';
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
import { warehouseBatchColumns } from '../../../../data/warehauses.data';
import { useStepsHandler } from '../../../../utils/createStepChecker';
import _ from 'lodash';
import { nanoid } from '@reduxjs/toolkit';
import { productsColumns } from '../../../../data/products.data';

export interface FormCreateOrderSlotProps
  extends Omit<ModalFormProps<FormCreateOrderSlotSteps, any, FormCreateOrderSlotFormData>, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<IOrderTempSlot>;
}

enum FormCreateOrderSlotSteps {
  product = 'product',
  variation = 'variation',
  // price = 'price',
  // warehouse = 'warehouse',
  batch = 'batch',
}

const stepsLong = enumToFilterOptions(FormCreateOrderSlotSteps);
// TODO const stepsShort = enumToFilterOptions(FormCreateOrderSlotSteps).filter(el => el.value !== 'batch');

export interface FormCreateOrderSlotFormData {
  price?: IPriceListItem;
  variation?: IVariationTableData;
  product?: IProduct;
  warehouse?: IWarehouse;
  inventory?: IProductInventory;
}
type FormKey = keyof FormCreateOrderSlotFormData;

const FormCreateOrderSlot: React.FC<FormCreateOrderSlotProps> = ({ defaultState, onSubmit, onClose, ...props }) => {
  const { stepCheck, stepIdx, stepsCount, setPrevStep, setNextStep } = useStepsHandler(stepsLong);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [variations, setVariations] = useState<IVariationTableData[]>([]);
  const [prices, setPrices] = useState<IPriceListItem[]>([]);
  const [inventories, setInventories] = useState<IProductInventory[]>([]);
  const [formData, setFormData] = useState<FormCreateOrderSlotFormData>({});

  const setFormValue = useCallback(<Key extends FormKey = any>(key: Key, value: FormCreateOrderSlotFormData[Key]) => {
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
      tableTitles: warehouseBatchColumns,
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
    if (stepCheck(FormCreateOrderSlotSteps.product)) {
      return productTableConfig;
    }
    if (stepCheck(FormCreateOrderSlotSteps.variation)) {
      return variationsTableConfig;
    }
    if (stepCheck(FormCreateOrderSlotSteps.batch)) {
      return warehousingTableConfig;
    }
    return;
  }, [stepCheck, productTableConfig, variationsTableConfig, pricesTableConfig, warehousingTableConfig]);

  const canGoNext = useMemo((): boolean => {
    if (stepCheck(FormCreateOrderSlotSteps.product)) {
      return !!formData?.product;
    }
    if (stepCheck(FormCreateOrderSlotSteps.variation)) {
      return !!formData?.product && !!formData?.variation;
    }
    if (stepCheck(FormCreateOrderSlotSteps.batch)) {
      return !!formData?.inventory;
    }
    return false;
  }, [formData?.inventory, formData?.price, formData?.product, formData?.variation, stepCheck]);

  const canSubmit = useMemo(() => {
    return Object.values(formData).length >= 4;
  }, [formData]);

  const loadData = useCallback(() => {
    if (stepCheck(FormCreateOrderSlotSteps.product)) {
      createApiCall(
        {
          data: { search, searchBy },
          onSuccess: setProducts,
        },
        ProductsApi.getAll,
        ProductsApi
      );
    }
    if (stepCheck(FormCreateOrderSlotSteps.variation)) {
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
    // if (stepCheck(FormCreateOrderSlotSteps.price)) {
    //   formData?.product &&
    //     createApiCall(
    //       {
    //         data: {
    //           product: ExtractId(formData?.product),
    //           variation: formData?.variation ? ExtractId(formData?.variation) : undefined,
    //         },
    //         onSuccess: setPrices,
    //       },
    //       PriceManagementApi.getAllPrices,
    //       PriceManagementApi
    //     );
    // }
    if (stepCheck(FormCreateOrderSlotSteps.batch)) {
      formData?.product &&
        createApiCall(
          {
            data: {
              product: ExtractId(formData?.product),
              variation: formData?.variation ? ExtractId(formData?.variation) : undefined,
            },
            onSuccess: setInventories,
          },
          WarehousesApi.getAllInventories,
          WarehousesApi
        );
    }
  }, [formData?.product, formData?.variation, search, searchBy, stepCheck]);

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();

    const slot: IOrderTempSlot = {
      ..._.omit(formData?.inventory?.price, ['author', 'owner', 'list', 'product', 'variation', '']),
      ..._.omit(formData, ['price']),
      origin: _.pick(formData?.inventory?.price, ['_id']),
      tempId: nanoid(8),
    };

    console.log('handleSubmit new slot data', slot);

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
export default FormCreateOrderSlot;
