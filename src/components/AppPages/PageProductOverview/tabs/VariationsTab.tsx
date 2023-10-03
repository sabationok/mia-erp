import { usePageCurrentProduct } from '../PageCurrentProductProvider';
import { useModalProvider } from '../../../ModalProvider/ModalProvider';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import TableList, { ITableListProps } from '../../../TableList/TableList';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createTableTitlesFromTemplate, transformVariationTableData } from '../../../../utils/tables';
import FormCreateVariation from '../../../Forms/FormProduct/FormCreateVariationOverlay';
import { IVariationTableData } from '../../../../redux/products/variations.types';
import { useProductsSelector, usePropertiesSelector } from '../../../../redux/selectors.store';
import { ExtractId } from '../../../../utils/dataTransform';

export interface VariationsTabProps {}

const VariationsTab = ({}: VariationsTabProps) => {
  const page = usePageCurrentProduct();
  const modalS = useModalProvider();
  const currentProduct = useProductsSelector().currentProduct;
  const productsS = useAppServiceProvider()[ServiceName.products];
  const templates = usePropertiesSelector();
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(
    ({ refresh, update }: { refresh?: boolean; update?: boolean }) => {
      if (!currentProduct) return;
      const product = ExtractId(currentProduct);

      productsS.getAllVariationsByProductId({
        data: { refreshCurrent: refresh, updateCurrent: update, product },
        onLoading: setLoading,
      });
    },
    [currentProduct, productsS]
  );

  const variationsTableTitles = useMemo(() => {
    const template = templates.find(t => t._id === currentProduct?.template?._id);
    return createTableTitlesFromTemplate(template);
  }, [currentProduct?.template?._id, templates]);

  const tableConfig = useMemo(() => {
    return {
      tableTitles: variationsTableTitles,
      tableData: page?.currentProduct?.variations,
      transformData: transformVariationTableData,
      actionsCreator: ctx => {
        const currentId = ctx.selectedRow?._id;

        return [
          { icon: 'refresh', type: 'onlyIcon', onClick: () => loadData({ refresh: true }) },
          { separator: true },
          {
            icon: 'delete',
            type: 'onlyIcon',
            disabled: !currentId,
            onClick: () => {
              window.confirm(`Видалити варіацію:\n ${currentId}`);
            },
          },
          { icon: 'copy', type: 'onlyIcon', disabled: !currentId },
          {
            icon: 'edit',
            type: 'onlyIcon',
            disabled: !currentId,
            onClick: () => {
              if (!currentId || !ctx.selectedRow) return;
              const dataForUpdate = page.currentProduct?.variations?.find(v => v?._id === currentId);

              modalS.open({
                ModalChildren: FormCreateVariation,
                modalChildrenProps: {
                  update: currentId,
                  defaultState: dataForUpdate,
                },
              });
            },
          },
          { separator: true },
          {
            icon: 'plus',
            type: 'onlyIconFilled',
            onClick: () => {
              // toggleVisibility && toggleVisibility();

              modalS.open({
                ModalChildren: FormCreateVariation,
                modalChildrenProps: { product: page.currentProduct },
              });
            },
          },
        ];
      },
    } as ITableListProps<IVariationTableData>;
  }, [loadData, modalS, page.currentProduct, variationsTableTitles]);

  useEffect(() => {
    // if ((!currentProduct?.variations || currentProduct?.variations?.length === 0) && currentProduct?._id) {
    // }
    loadData({ refresh: true });
    // eslint-disable-next-line
  }, []);

  return <TableList {...tableConfig} isSearch={false} isFilter={false} />;
};
export default VariationsTab;
