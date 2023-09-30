import { usePageCurrentProduct } from './PageCurrentProductProvider';
import { useCallback, useEffect, useMemo, useState } from 'react';
import TableList, { ITableListProps } from '../../TableList/TableList';
import { pricesColumnsForProductReview } from '../../../data/priceManagement.data';
import { enumToFilterOptions } from '../../../utils/fabrics';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import { Text } from '../../atoms/Text';
import ModalFilter, { FilterSelectHandler } from '../../ModalForm/ModalFilter';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import FormCreateVariation from '../../Forms/FormProduct/FormCreateVariationOverlay';
import { IPriceListItem } from 'redux/priceManagement/priceManagement.types';
import { IVariationTableData } from 'redux/products/variations.types';
import { transformVariationTableData } from '../../../utils/tables';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { ExtractId } from '../../../utils/dataTransform';
import AppLoader from '../../atoms/AppLoader';
import { warehouseOverviewTableColumns } from '../../../data/warehauses.data';
import { IProductInventory } from '../../../redux/warehouses/warehouses.types';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import FormCreatePrice from '../../Forms/FormCreatePrice/FormCreatePrice';
import Forms from '../../Forms';

// const openLoader = (current: RightSideOptionEnum) =>
//   ToastService.createLoader('Loading data...').open({
//     afterClose: [`${current} data loaded`, { type: 'success' }],
//   });
enum RightSideOptionEnum {
  Variations = 'Variations',
  Prices = 'Prices',
  Warehousing = 'Warehousing',
}
const toggleOptions = enumToFilterOptions(RightSideOptionEnum);

export interface PageProductOverviewRightSideProps {
  isVisible?: boolean;
  toggleVisibility?: () => void;
}
// interface ITableDataByType {
//   [RightSideOptionEnum.Variations]: IVariation;
//   [RightSideOptionEnum.Prices]: IPriceListItem;
// }
const PageProductOverviewRightSide: React.FC<PageProductOverviewRightSideProps> = ({ isVisible, toggleVisibility }) => {
  const page = usePageCurrentProduct();
  const [current, setCurrent] = useState<RightSideOptionEnum>(RightSideOptionEnum.Prices);
  const modalS = useModalProvider();
  const productsS = useAppServiceProvider()[ServiceName.products];
  const pricesS = useAppServiceProvider()[ServiceName.priceManagement];
  const [loading, setLoading] = useState(false);

  const loadCurrentData = useCallback(
    (current: RightSideOptionEnum) => {
      if (!page.currentProduct) return;

      if (current === RightSideOptionEnum.Variations) {
        productsS.getAllVariationsByProductId({
          data: { product: ExtractId(page.currentProduct), refreshCurrent: true },
          onLoading: setLoading,
        });
      }
      if (current === RightSideOptionEnum.Prices) {
        productsS.getAllPricesByCurrentProduct({
          data: { refreshCurrent: true, params: { product: ExtractId(page.currentProduct) } },
          onLoading: setLoading,
        });
      }
    },
    [page.currentProduct, productsS]
  );

  const currentTableSettings = useMemo((): ITableListProps | undefined => {
    if (current === RightSideOptionEnum.Variations) {
      return {
        tableTitles: page?.variationsTableTitles,
        tableData: page?.currentProduct?.variations,
        transformData: transformVariationTableData,
        actionsCreator: ctx => {
          const currentId = ctx.selectedRow?._id;

          return [
            { icon: 'refresh', type: 'onlyIcon', onClick: () => loadCurrentData(current) },
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

                console.log('dataForUpdate', dataForUpdate);

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
    }

    if (current === RightSideOptionEnum.Prices) {
      return {
        tableData: page?.currentProduct?.prices,
        tableTitles: pricesColumnsForProductReview,
        actionsCreator: ctx => {
          const currentId = ctx.selectedRow?._id;

          return [
            { icon: 'refresh', type: 'onlyIcon' },
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
                    product: page.currentProduct,
                    onSubmit: d => {
                      console.log('FormCreatePrice submit pr overview', d);
                    },
                  },
                });
              },
            },
          ];
        },
      } as ITableListProps<IPriceListItem>;
    }
    if (current === RightSideOptionEnum.Warehousing) {
      return {
        tableData: page?.currentProduct?.inventories,
        tableTitles: warehouseOverviewTableColumns,
        actionsCreator: ctx => {
          const currentId = ctx.selectedRow?._id;

          return [
            { icon: 'refresh', type: 'onlyIcon' },
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
                  ModalChildren: Forms.CreateWarehouseDocument,
                  modalChildrenProps: {},
                });
              },
            },
          ];
        },
      } as ITableListProps<IProductInventory>;
    }
  }, [current, loadCurrentData, modalS, page.currentProduct, page?.variationsTableTitles]);

  const filterHandler: FilterSelectHandler<RightSideOptionEnum> = (_, value, index) => {
    setCurrent(value);
    // loadCurrentData(value);
  };

  useEffect(() => {
    current && page.currentProduct && loadCurrentData(current);
    // eslint-disable-next-line
  }, [current, page.currentProduct?._id]);

  return (
    <RightSide overflow={'hidden'} fillHeight isVisible={isVisible}>
      <Top fillWidth gap={4} isVisible={isVisible} fxDirection={'row'} justifyContent={'space-between'}>
        <ButtonIcon
          variant={'textExtraSmall'}
          icon={'SmallArrowLeft'}
          style={{ padding: 6 }}
          onClick={toggleVisibility}
        >
          {'Back'}
        </ButtonIcon>

        <FlexBox padding={'0 8px'}>
          <Text $weight={600} $size={14}>
            {page?.currentProduct?.label}
          </Text>

          <Text $size={10}>{page?.currentProduct?.sku}</Text>
        </FlexBox>
      </Top>

      <ModalFilter filterOptions={toggleOptions} onOptSelect={filterHandler} />

      <TableList isSearch={false} isFilter={false} {...currentTableSettings} />

      <AppLoader isLoading={loading} />
    </RightSide>
  );
};
const RightSide = styled(FlexBox)<{ isVisible?: boolean }>`
  overflow: auto;

  max-width: 100%;

  transition: ${p => p.theme.globals.timingFunctionMain};
  background-color: ${p => p.theme.backgroundColorLight};

  @media screen and (min-width: 768px) {
    min-width: 320px;
  }

  @media screen and (max-width: 768px) {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 20;

    transform: translateX(${p => (p.isVisible ? 0 : 100)}%);

    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.25);
  }
`;

const Top = styled(FlexBox)<{ isVisible?: boolean }>`
  @media screen and (min-width: 768px) {
    display: none;
  }
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;
export default PageProductOverviewRightSide;
