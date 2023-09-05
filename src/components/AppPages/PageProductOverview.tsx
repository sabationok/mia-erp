import { PagePathType } from '../../redux/APP_CONFIGS';
import styled from 'styled-components';
import { takeFullGridArea } from './pagesStyles';
import AppGridPage from './AppGridPage';
import { useProductsSelector } from '../../redux/selectors.store';
import { useEffect, useMemo, useState } from 'react';
import FlexBox from '../atoms/FlexBox';
import TableList from '../TableList/TableList';
import { useAppParams } from '../../hooks';
import { CellTittleProps } from '../TableList/TebleCells/CellTitle';
import { IProduct, IVariation, IVariationTemplate } from '../../redux/products/products.types';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { toast } from 'react-toastify';
import { usePermissionsSelector } from '../../hooks/usePermissionsService.hook';
import { useModalProvider } from '../ModalProvider/ModalProvider';
import { Modals } from '../ModalProvider/Modals';
import { baseApi } from '../../api';

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
const PageProductOverview: React.FC<PageProductOverviewProps> = ({ path }) => {
  const {
    permission: { _id: permissionId },
  } = usePermissionsSelector();

  const { productId } = useAppParams();
  const { getById } = useAppServiceProvider()[ServiceName.products];
  const [loading, setLoading] = useState(false);
  const modalS = useModalProvider();
  const [loaderId, setLoaderId] = useState<number | string>();
  const [loadedData, setLoadedData] = useState<IProduct>();

  const productsState = useProductsSelector();

  const tableTitles = useMemo(() => {
    return createTableTitlesFromTemplate(loadedData?.template || productsState.properties[2]);
  }, [loadedData?.template, productsState.properties]);

  useEffect(() => {
    console.log('PageProductOverview', baseApi.defaults.headers);
    if (productId) {
      (async () => {})();
      getById({
        data: productId,
        onSuccess: setLoadedData,
        onLoading: setLoading,

        onError: e => {
          console.warn('PageProductOverview', e);
        },
      }).finally();
      setTimeout(() => {}, 3000);
    }
  }, []);

  // useEffect(() => {
  //   const remover = createToastLoader('Loading........');
  //   if (loading) {
  //   }
  //   return remover;
  // }, [loading]);

  return (
    <AppGridPage path={path}>
      <Page>
        <FlexBox>
          {loadedData
            ? Object.entries(loadedData).map(([k, v]) => {
                return ['string', 'number'].includes(typeof v) ? (
                  <FlexBox key={`prKey-${k}`} padding={'4px'}>
                    {v}
                  </FlexBox>
                ) : null;
              })
            : null}
        </FlexBox>

        <FlexBox padding={'8px'}>
          <TableList
            actionsCreator={ctx => {
              return [
                {
                  icon: 'plus',
                  onClick: () => {
                    modalS.handleOpenModal({ Modal: Modals.FormCreateVariation });
                  },
                },
              ];
            }}
            tableTitles={tableTitles}
          />
        </FlexBox>
      </Page>
    </AppGridPage>
  );
};
const Page = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;

  ${takeFullGridArea}
`;

export default PageProductOverview;
