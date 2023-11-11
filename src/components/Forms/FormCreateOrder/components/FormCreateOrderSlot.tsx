import { ModalFormProps } from '../../../ModalForm';
import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import { IProduct } from '../../../../redux/products/products.types';
import { FormEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { ITableListProps } from '../../../TableList/tableTypes.types';
import TableList from '../../../TableList/TableList';
import { AppQueryParams, createApiCall, ProductsApi, WarehousesApi } from '../../../../api';
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
import { getIdRef } from '../../../../utils/dataTransform';
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
  params?: Pick<AppQueryParams, 'warehouse' | 'product' | 'variation' | 'price' | 'inventory'>;
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

const FormCreateOrderSlot: React.FC<FormCreateOrderSlotProps> = ({
  params,
  defaultState,
  onSubmit,
  onClose,
  ...props
}) => {
  const { stepCheck, stepIdx, setPrevStep, setNextStep } = useStepsHandler(stepsLong);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [variations, setVariations] = useState<IVariationTableData[]>([]);
  // const [prices, setPrices] = useState<IPriceListItem[]>([]);
  const [inventories, setInventories] = useState<IProductInventory[]>([]);
  const [formData, setFormData] = useState<FormCreateOrderSlotFormData>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
  // const pricesTableConfig = useMemo(
  //   (): ITableListProps<IPriceListItem> => ({
  //     tableTitles: pricesColumnsForProductReview,
  //     tableData: prices,
  //     isSearch: false,
  //     selectedRow: formData?.price,
  //     onRowClick: data => {
  //       const v = prices.find(p => p._id === data?._id);
  //
  //       v && setFormValue('price', v);
  //       setNextStep();
  //     },
  //   }),
  //   [formData?.price, prices, setFormValue, setNextStep]
  // );

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
  }, [stepCheck, productTableConfig, variationsTableConfig, warehousingTableConfig]);

  const canGoNext = useMemo((): boolean => {
    const { product, variation, inventory } = formData;
    if (stepCheck(FormCreateOrderSlotSteps.product)) {
      return !!product;
    }
    if (stepCheck(FormCreateOrderSlotSteps.variation)) {
      if (inventories.length > 0) {
        return !!product && !!variation;
      }
      return !!product;
    }
    if (stepCheck(FormCreateOrderSlotSteps.batch)) {
      return !!inventory;
    }
    return false;
  }, [formData, inventories.length, stepCheck]);

  const canSubmit = useMemo(() => {
    return Object.values(formData).length >= 4;
  }, [formData]);

  const loadData = useCallback(() => {
    const { product, variation } = formData;

    if (stepCheck(FormCreateOrderSlotSteps.product)) {
      return createApiCall(
        {
          data: { search, searchBy },
          onSuccess: setProducts,
          onLoading: setIsLoading,
        },
        ProductsApi.getAll,
        ProductsApi
      );
    }
    if (stepCheck(FormCreateOrderSlotSteps.variation) && product) {
      return createApiCall(
        {
          data: { product: getIdRef(product) },
          onSuccess: d => {
            setVariations(d.map(v => transformVariationTableData(v)));
          },
          onLoading: setIsLoading,
        },
        VariationsApi.getAllByProductId,
        VariationsApi
      );
    }
    if (stepCheck(FormCreateOrderSlotSteps.batch) && product) {
      return createApiCall(
        {
          data: {
            product: getIdRef(product),
            variation: variation ? getIdRef(variation) : undefined,
            warehouse: params?.warehouse ? getIdRef(params?.warehouse) : undefined,
          },
          onSuccess: setInventories,
          onLoading: setIsLoading,
        },
        WarehousesApi.getAllInventories,
        WarehousesApi
      );
    }
  }, [formData, params?.warehouse, search, searchBy, stepCheck]);

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();

    const slot: IOrderTempSlot = {
      ..._.omit(formData?.inventory?.price, [
        '_id',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'author',
        'owner',
        'list',
        'product',
        'variation',
      ]),
      ..._.omit(formData, ['price']),
      origin: formData?.inventory?.price,
      tempId: nanoid(8),
      quantity: 1,
    };

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

        <TableList {...tableConfig} isLoading={isLoading} />
      </Content>

      <Footer padding={'8px'}>
        <StepsController
          steps={stepsLong}
          onPrevPress={() => setPrevStep()}
          onNextPress={() => setNextStep()}
          onCancelPress={stepIdx === 0 ? onClose : undefined}
          canGoNext={canGoNext}
          canSubmit={canSubmit}
          submitButton
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

  color: ${p => p.theme.fontColorSidebar};

  background-color: ${p => p.theme.modalBackgroundColor};
`;

const Content = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;

const Footer = styled(FlexBox)``;
export default FormCreateOrderSlot;

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
