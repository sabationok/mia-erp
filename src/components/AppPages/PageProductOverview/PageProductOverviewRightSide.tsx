import { usePageCurrentProduct } from './PageCurrentProductProvider';
import { useCallback, useEffect, useMemo, useState } from 'react';
import TableList, { ITableListProps } from '../../TableList/TableList';
import { pricesColumnsForProductReview } from '../../../data/priceManagement.data';
import { enumToFilterOptions } from '../../../utils/fabrics';
import { createTableTitlesFromTemplate } from '../../../utils';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import { Text } from '../../atoms/Text';
import ModalFilter, { FilterSelectHandler } from '../../ModalForm/ModalFilter';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import FormCreateVariation from '../../Forms/FormVariation';
import { IPriceListItem } from 'redux/priceManagement/priceManagement.types';
import { IVariationTableData } from 'redux/products/variations.types';
import { transformVariationTableData } from '../../../utils/tables';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { ExtractId } from '../../../utils/dataTransform';
import { usePropertiesSelector } from '../../../redux/selectors.store';
import AppLoader from '../../atoms/AppLoader';
import { warehouseOverviewTableColumns } from '../../../data/warehauses.data';
import { IProductInventory } from '../../../redux/warehouses/warehouses.types';

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

  const templates = usePropertiesSelector();

  const variationsTableTitles = useMemo(() => {
    const template = templates.find(t => t._id === page.currentProduct?.template?._id);
    return createTableTitlesFromTemplate(template);
  }, [page.currentProduct?.template?._id, templates]);

  const loadCurrentData = useCallback(
    (current: RightSideOptionEnum) => {
      if (current === RightSideOptionEnum.Variations && page.currentProduct) {
        productsS
          .getAllVariationsByProductId({
            data: { product: ExtractId(page.currentProduct), refreshCurrent: true },
            onLoading: setLoading,
          })
          .finally();
      }
      if (current === RightSideOptionEnum.Prices && page.currentProduct) {
        pricesS
          .getAllPricesByProductId({
            data: { productId: ExtractId(page.currentProduct) },
            onLoading: setLoading,
          })
          .finally();
      }
    },
    [page.currentProduct, pricesS, productsS]
  );

  const currentTableSettings = useMemo((): ITableListProps | undefined => {
    if (current === RightSideOptionEnum.Variations) {
      return {
        tableTitles: variationsTableTitles,
        tableData: page?.currentProduct?.variations,
        transformData: transformVariationTableData,
        actionsCreator: ctx => {
          const currentId = ctx.selectedRow?._id;

          return [
            { icon: 'refresh', type: 'onlyIcon', onClick: () => loadCurrentData(current) },
            {
              icon: 'delete',
              type: 'onlyIcon',
              disabled: !currentId,
              onClick: () => {
                window.confirm(`Видалити варіацію:\n ${currentId}`);
              },
            },
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
                    product: page.currentProduct,
                    defaultState: dataForUpdate,
                  },
                });
                // toggleVisibility && toggleVisibility();
              },
            },
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
            { icon: 'delete', type: 'onlyIcon' },
            { icon: 'edit', type: 'onlyIcon', disabled: !currentId },
            { icon: 'plus', type: 'onlyIconFilled' },
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
            { icon: 'delete', type: 'onlyIcon' },
            { icon: 'edit', type: 'onlyIcon', disabled: !currentId },
            { icon: 'plus', type: 'onlyIconFilled' },
          ];
        },
      } as ITableListProps<IProductInventory>;
    }
  }, [current, modalS, page, variationsTableTitles]);

  const filterHandler: FilterSelectHandler<RightSideOptionEnum> = (_, value, index) => {
    setCurrent(value);
    // loadCurrentData(value);
  };

  useEffect(() => {
    current && page.currentProduct && loadCurrentData(current);
    // eslint-disable-next-line
  }, [current, page.currentProduct?._id]);

  return (
    <RightSide overflow={'auto'} fillHeight isVisible={isVisible}>
      <Top fillWidth padding={'4px 8px'} gap={4} height={'44px'} isVisible={isVisible}>
        <Text $weight={600} $size={16}>
          {page?.currentProduct?.label}
        </Text>

        <Text $size={12}>{page?.currentProduct?.sku}</Text>
      </Top>

      <ModalFilter filterOptions={toggleOptions} onOptSelect={filterHandler} />

      <TableList isSearch={false} isFilter={false} {...currentTableSettings} />

      <Bottom fillWidth flex={1} fxDirection={'row'} justifyContent={'flex-end'}>
        <ButtonIcon variant={'textExtraSmall'} endIcon={'SmallArrowRight'} onClick={toggleVisibility}>
          {'Згорнути'}
        </ButtonIcon>
      </Bottom>

      <AppLoader isLoading={loading} />
    </RightSide>
  );
};
const RightSide = styled(FlexBox)<{ isVisible?: boolean }>`
  overflow: auto;

  min-width: 320px;

  transition: ${p => p.theme.globals.timingFunctionMain};
  background-color: ${p => p.theme.backgroundColorLight};

  //border: 1px solid blue;

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
const Bottom = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
export default PageProductOverviewRightSide;
