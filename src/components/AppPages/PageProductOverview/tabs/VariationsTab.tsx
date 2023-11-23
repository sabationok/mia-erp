import { usePageCurrentProduct } from '../PageCurrentProductProvider';
import { useModalProvider } from '../../../ModalProvider/ModalProvider';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import TableList, { ITableListProps } from '../../../TableList/TableList';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createTableTitlesFromTemplate, transformVariationTableData } from '../../../../utils/tables';
import FormCreateVariation from '../../../Forms/FormProduct/FormCreateVariationOverlay';
import { IVariationTableData } from '../../../../redux/products/variations/variations.types';
import { useProductsSelector, usePropertiesSelector } from '../../../../redux/selectors.store';
import { getIdRef } from '../../../../utils/dataTransform';
import { OnlyUUID } from '../../../../redux/global.types';

export interface VariationsTabProps {
  onSelect?: (variation: OnlyUUID) => void;
  selected?: OnlyUUID;
  withActions?: boolean;
}

const VariationsTab: React.FC<VariationsTabProps> = ({ onSelect, selected, withActions = true }) => {
  const page = usePageCurrentProduct();
  const modalS = useModalProvider();
  const currentProduct = useProductsSelector().currentProduct;
  const productsS = useAppServiceProvider()[ServiceName.products];
  const templates = usePropertiesSelector();
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(
    ({ refresh, update }: { refresh?: boolean; update?: boolean }) => {
      if (!currentProduct) return;
      const product = getIdRef(currentProduct);

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
      tableData: currentProduct?.variations,
      transformData: transformVariationTableData,
      onRowClick: data => {
        if (onSelect) {
          if (data?.rowData) {
            onSelect(getIdRef(data?.rowData));
            return;
          } else if (data?._id) {
            onSelect({ _id: data?._id });
          }
        }
      },
      actionsCreator: !withActions
        ? undefined
        : ctx => {
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
                  const dataForUpdate = currentProduct?.variations?.find(v => v?._id === currentId);

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
  }, [currentProduct?.variations, loadData, modalS, onSelect, page.currentProduct, variationsTableTitles, withActions]);

  useEffect(() => {
    loadData({ refresh: true });
    // if ((!currentProduct?.variations || currentProduct?.variations?.length === 0) && currentProduct?._id) {
    // }
    // eslint-disable-next-line
  }, []);

  return <TableList {...tableConfig} isSearch={false} isFilter={false} isLoading={loading} selectedRow={selected} />;
};
export default VariationsTab;
