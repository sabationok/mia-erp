import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { useCallback, useEffect, useMemo, useState } from 'react';
import TableList, { ITableListProps } from '../../../TableList/TableList';
import { pricesColumnsForProductReview } from '../../../../data/priceManagement.data';
import FormCreatePrice from '../../../Forms/FormCreatePrice/FormCreatePrice';
import { IPriceListItem } from '../../../../redux/priceManagement/priceManagement.types';
import { useProductsSelector } from '../../../../redux/selectors.store';
import { useModalProvider } from '../../../ModalProvider/ModalProvider';
import { ExtractId } from '../../../../utils/dataTransform';

export interface PricesTabProps {}
const PricesTab = ({}: PricesTabProps) => {
  const currentProduct = useProductsSelector().currentProduct;
  const pricesS = useAppServiceProvider()[ServiceName.priceManagement];
  const modalS = useModalProvider();
  const productsS = useAppServiceProvider()[ServiceName.products];
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(
    async ({ refresh, update }: { refresh?: boolean; update?: boolean }) => {
      if (!currentProduct) return;
      const product = ExtractId(currentProduct);

      productsS.getAllPricesByProductId({
        data: { params: { product } },
        onLoading: setLoading,
      });
    },
    [currentProduct, productsS]
  );

  const tableConfig = useMemo((): ITableListProps<IPriceListItem> => {
    return {
      tableData: currentProduct?.prices,
      tableTitles: pricesColumnsForProductReview,
      actionsCreator: ctx => {
        const currentId = ctx.selectedRow?._id;

        return [
          { icon: 'refresh', type: 'onlyIcon', onClick: () => loadData({ refresh: true }) },
          { separator: true },
          { icon: 'delete', type: 'onlyIcon', disabled: !currentId },
          { icon: 'copy', type: 'onlyIcon', disabled: !currentId },
          { icon: 'edit', type: 'onlyIcon', disabled: !currentId },
          { separator: true },
          {
            icon: 'plus',
            type: 'onlyIconFilled',
            onClick: () => {
              modalS.open({
                ModalChildren: FormCreatePrice,
                modalChildrenProps: {
                  product: currentProduct,
                  onSubmit: d => {
                    console.log('FormCreatePrice submit pr overview', d);
                  },
                },
              });
            },
          },
        ];
      },
    };
  }, [currentProduct, loadData, modalS]);

  useEffect(() => {
    // if ((!currentProduct?.prices || currentProduct?.prices?.length === 0) && currentProduct?._id) {
    // }
    loadData({ refresh: true });
    // eslint-disable-next-line
  }, []);

  return <TableList {...tableConfig} isSearch={false} isFilter={false} />;
};

export default PricesTab;
