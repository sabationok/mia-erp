import { PagePathType } from '../../redux/APP_CONFIGS';
import styled from 'styled-components';
import { takeFullGridArea } from './pagesStyles';
import AppGridPage from './AppGridPage';
import { useEffect, useMemo, useState } from 'react';
import FlexBox from '../atoms/FlexBox';
import TableList from '../TableList/TableList';
import { useAppParams } from '../../hooks';
import { CellTittleProps } from '../TableList/TebleCells/CellTitle';
import { IProduct, IVariation, IVariationTemplate } from '../../redux/products/products.types';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { toast } from 'react-toastify';
import { useModalProvider } from '../ModalProvider/ModalProvider';
import { Modals } from '../ModalProvider/Modals';
import { pricesColumnsForProductReview } from '../../data/priceManagement.data';
import { IPriceListItem } from '../../redux/priceManagement/priceManagement.types';
import { ExtractId } from '../../utils/dataTransform';
import { useAppSelector } from '../../redux/store.store';

export interface PageProductOverviewProps {
  path: PagePathType;
}

function createTableTitlesFromTemplate(template: IVariationTemplate): CellTittleProps<IVariation>[] | undefined {
  return template?.childrenList
    ? template?.childrenList?.map(p => {
        const title: CellTittleProps<IVariation> = {
          top: { name: p?.label || '' },
          width: '150px',
          action: 'valueByPath',
        };
        return title;
      })
    : undefined;
}
type ToastLoaderRemover = () => void;
const createToastLoader = (messaege: string): ToastLoaderRemover => {
  const toastId = toast.loading(messaege);
  return () => toast.dismiss(toastId);
};

const toggleOptions = [{}];

const PageProductOverview: React.FC<PageProductOverviewProps> = ({ path }) => {
  const { productId } = useAppParams();
  const modalS = useModalProvider();
  const {
    priceManagement,
    products: { getById, getProductFullInfo },
  } = useAppServiceProvider();
  const {
    products: { currentProduct, properties },
  } = useAppSelector();

  const [product, setLoadedData] = useState<IProduct>();
  const [priceList, setPriceList] = useState<IPriceListItem[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingPriceList, setLoadingPriceList] = useState<boolean>();

  const tableTitles = useMemo(() => {
    return currentProduct?.template ? createTableTitlesFromTemplate(currentProduct?.template) : [];
  }, [currentProduct?.template]);

  useEffect(() => {
    if (product?._id) {
      priceManagement
        .getAllPricesByProductId({
          data: { productId: ExtractId(product) },
          onSuccess: setPriceList,
          onLoading: setLoadingPriceList,
        })
        .then();
    }
  }, [priceManagement, product]);

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

  return (
    <AppGridPage path={path}>
      <Page>
        <LeftSide>
          {currentProduct
            ? Object.entries(currentProduct).map(([k, v]) => {
                return ['string', 'number'].includes(typeof v) ? (
                  <FlexBox key={`prKey-${k}`} padding={'4px'}>
                    {v}
                  </FlexBox>
                ) : null;
              })
            : null}
        </LeftSide>

        <RightSide>
          <Top fillWidth flex={1}>
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
          </Top>
          <Bottom fillWidth flex={1}>
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
          </Bottom>
        </RightSide>
      </Page>
    </AppGridPage>
  );
};
const Page = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;

  ${takeFullGridArea}
`;
const OverviewBox = styled(FlexBox)``;
const LeftSide = styled(FlexBox)`
  border-right: 1px solid ${p => p.theme.modalBorderColor};
`;
const RightSide = styled(FlexBox)``;

const Top = styled(FlexBox)`
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;
const Bottom = styled(FlexBox)`
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;

export default PageProductOverview;
