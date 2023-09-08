import { PagePathType } from '../../redux/APP_CONFIGS';
import styled from 'styled-components';
import { takeFullGridArea } from './pagesStyles';
import AppGridPage from './AppGridPage';
import { useCallback, useEffect, useMemo, useState } from 'react';
import FlexBox from '../atoms/FlexBox';
import TableList from '../TableList/TableList';
import { useAppParams } from '../../hooks';
import { IProduct } from '../../redux/products/products.types';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { toast } from 'react-toastify';
import { useModalProvider } from '../ModalProvider/ModalProvider';
import { Modals } from '../ModalProvider/Modals';
import { pricesColumnsForProductReview } from '../../data/priceManagement.data';
import { IPriceListItem } from '../../redux/priceManagement/priceManagement.types';
import { useAppSelector } from '../../redux/store.store';
import ProductOverviewXL from '../Modals/Overviews/ProductOverviewXL';
import { enumToFilterOptions } from '../../utils/fabrics';
import ModalFilter from '../ModalForm/ModalFilter';
import { createTableTitlesFromTemplate } from '../../utils';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import { Text } from '../atoms/Text';

export interface PageProductOverviewProps {
  path: PagePathType;
}

type ToastLoaderRemover = () => void;
const createToastLoader = (messaege: string): ToastLoaderRemover => {
  const toastId = toast.loading(messaege);
  return () => toast.dismiss(toastId);
};

enum RightSideOptionEnum {
  Variations = 'Variations',
  Prices = 'Prices',
}
const toggleOptions = enumToFilterOptions(RightSideOptionEnum);

const PageProductOverview: React.FC<PageProductOverviewProps> = ({ path }) => {
  const { productId } = useAppParams();
  const modalS = useModalProvider();
  const [current, setCurrent] = useState<RightSideOptionEnum>(RightSideOptionEnum.Prices);
  const {
    priceManagement,
    products: { getProductFullInfo },
  } = useAppServiceProvider();

  const {
    products: { currentProduct, properties },
  } = useAppSelector();

  const [product, setLoadedData] = useState<IProduct>();
  const [priceList, setPriceList] = useState<IPriceListItem[]>([]);
  const [isRightSideVisible, setIsRightSideVisible] = useState<boolean>(false);
  const toggleRightSide = useCallback(() => {
    setIsRightSideVisible(p => !p);
  }, []);
  const [loading, setLoading] = useState(false);
  const [loadingPriceList, setLoadingPriceList] = useState<boolean>();

  const tableTitles = useMemo(() => {
    return createTableTitlesFromTemplate(currentProduct?.template);
  }, [currentProduct?.template]);

  // useEffect(() => {
  //   if (product?._id) {
  //     priceManagement
  //       .getAllPricesByProductId({
  //         data: { productId: ExtractId(product) },
  //         onSuccess: setPriceList,
  //         onLoading: setLoadingPriceList,
  //       })
  //       .then();
  //   }
  // }, [priceManagement, product]);

  useEffect(() => {
    if (productId) {
      getProductFullInfo({
        data: { _id: productId },
        onSuccess: setLoadedData,
        onLoading: setLoading,

        onError: e => {
          console.warn('PageProductOverview', e);
        },
      }).finally();
    }
  }, [getProductFullInfo, productId]);

  const renderRightSideContent = useMemo(() => {
    if (current === RightSideOptionEnum.Prices) {
      return (
        <TableList
          tableTitles={pricesColumnsForProductReview}
          tableData={currentProduct?.prices}
          actionsCreator={ctx => {
            return [
              {
                icon: 'plus',
                type: 'onlyIconFilled',

                onClick: () => {
                  modalS.handleOpenModal({
                    Modal: Modals.FormCreatePrice,
                    props: { onSubmit: () => {}, product: product },
                  });
                },
              },
            ];
          }}
          isSearch={false}
          isFilter={false}
          isLoading={loadingPriceList}
        />
      );
    }
    if (current === RightSideOptionEnum.Variations) {
      return (
        <TableList
          tableData={currentProduct?.variations}
          isSearch={false}
          actionsCreator={ctx => {
            return [
              {
                icon: 'plus',
                type: 'onlyIconFilled',
                onClick: () => {
                  modalS.handleOpenModal({
                    Modal: Modals.FormCreateVariation,
                    props: { title: 'Створити варіацію' },
                  });
                },
              },
            ];
          }}
          tableTitles={tableTitles}
          isLoading={loading}
        />
      );
    }
    return null;
  }, [
    current,
    currentProduct?.prices,
    currentProduct?.variations,
    loading,
    loadingPriceList,
    modalS,
    product,
    tableTitles,
  ]);

  return (
    <AppGridPage path={path}>
      <Page>
        <LeftSide>
          <ProductOverviewXL
            product={currentProduct}
            onEdit={() => {
              modalS.create<Modals.FormCreateProduct>(m => ({
                Modal: Modals.FormCreateProduct,
                props: { defaultState: product, onSubmit: (d, o) => {} },
              }));
            }}
            onDelete={() => {}}
            onArchive={() => {}}
            onHide={() => {}}
            onOpenRightSide={toggleRightSide}
          />
        </LeftSide>

        <RightSide overflow={'auto'} fillHeight isVisible={isRightSideVisible}>
          <Top fillWidth padding={'4px 8px'} gap={4}>
            <Text $weight={600} $size={16}>
              {currentProduct?.label}
            </Text>
            <Text $size={12}>{currentProduct?.sku}</Text>
          </Top>

          <ModalFilter
            filterOptions={toggleOptions}
            onOptSelect={(option, value, index) => {
              setCurrent(value);
            }}
          />

          {renderRightSideContent}

          <Bottom fillWidth flex={1} fxDirection={'row'} justifyContent={'flex-end'}>
            <ButtonIcon variant={'textExtraSmall'} endIcon={'SmallArrowRight'} onClick={toggleRightSide}>
              {'Згорнути'}
            </ButtonIcon>
          </Bottom>
        </RightSide>
      </Page>
    </AppGridPage>
  );
};
const Page = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 1fr) 2fr;

  ${takeFullGridArea};

  @media screen and (max-width: 768px) {
    grid-template-columns: minmax(280px, 1fr) 0;
  }
`;

const LeftSide = styled(FlexBox)`
  overflow: auto;

  border-right: 1px solid ${p => p.theme.modalBorderColor};
`;

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

const Top = styled(FlexBox)`
  @media screen and (min-width: 768px) {
    display: none;
  }
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;
const Bottom = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};
`;

export default PageProductOverview;
