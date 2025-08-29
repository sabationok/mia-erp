// router.tsx
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useAuthSelector } from '../../redux/selectors.store';
import PermissionCheck from '../AppPages/PermissionCheck';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { AppUrlParamKeys } from '../../hooks';
import { AppPages, AppPagesEnum } from 'components/AppPages';

const { PageNotFound } = AppPages;

const notFoundRoute = {
  path: '*',
  element: (
    <AppPages.AppGridPage path={'notFound'}>
      <PageNotFound />
    </AppPages.AppGridPage>
  ),
};

const createRouter = ({ isAuthorized }: { isAuthorized: boolean }) =>
  createBrowserRouter(
    [
      {
        path: '/',
        element: <Navigate to={isAuthorized ? '/app' : '/auth'} />, // Replace 'true' with token check if needed
      },
      {
        path: '/auth',
        element: <PublicRoute redirectTo={`/app/${AppPagesEnum.companies}`} />,
        children: [
          { index: true, element: <Navigate to="/auth/login" /> },
          { path: 'register', element: <AppPages.PageAuth register /> },
          // { path: `register/:${AppUrlParamKeys.businessType}`, element: <AppPages.PageAuth register /> },
          { path: 'login', element: <AppPages.PageAuth login /> },
          { path: 'sendRecoveryPasswordMail', element: <AppPages.PageAuth sendRecoveryEmail /> },
          { path: 'recoveryPassword', element: <AppPages.PageAuth recovery /> },
          { path: '*', element: <Navigate to="/auth/login" /> },
        ],
      },
      {
        path: '/app',
        element: <PrivateRoute redirectTo="/auth" />,
        children: [
          { index: true, element: <Navigate to={`/app/${AppPagesEnum.companies}`} /> },
          {
            path: AppPagesEnum.companies,
            element: <AppPages.PageSelectCompany path={AppPagesEnum.companies} />,
          },
          {
            path: `:${AppUrlParamKeys.permissionId}`,
            element: <PermissionCheck redirectTo={`/app/${AppPagesEnum.companies}`} />,
            children: [
              { index: true, element: <Navigate to={AppPagesEnum.offers} /> },
              {
                path: AppPagesEnum.companies,
                element: <AppPages.PageSelectCompany path={AppPagesEnum.companies} />,
              },
              {
                path: AppPagesEnum.transactions,
                element: <AppPages.PageTransactions path={AppPagesEnum.transactions} />,
              },
              {
                path: AppPagesEnum.orders,
                element: <AppPages.PageOrders path={AppPagesEnum.orders} />,
              },
              {
                path: `${AppPagesEnum.orders}/:${AppUrlParamKeys.orderId}`,
                element: <AppPages.PageOrderOverview path={AppPagesEnum.offers} />,
              },
              {
                path: AppPagesEnum.cart,
                element: <AppPages.PageCart path={AppPagesEnum.cart} />,
              },
              {
                path: `${AppPagesEnum.cart}/:${AppUrlParamKeys.cartId}`,
                element: <AppPages.PageCart path={`${AppPagesEnum.cart}/:${AppUrlParamKeys.cartId}`} />,
              },
              {
                path: AppPagesEnum.offers,
                element: <AppPages.PageOffers path={AppPagesEnum.offers} />,
              },
              {
                path: `${AppPagesEnum.offers}/:${AppUrlParamKeys.offerId}`,
                element: <AppPages.PageOfferOverview path={AppPagesEnum.offers} />,
              },
              // {
              //   path: `${AppPagesEnum.offers}/:${AppUrlParamKeys.offerId}/:${AppUrlParamKeys.leftSide}/:${AppUrlParamKeys.rightSide}`,
              //   element: <AppPages.PageOfferParallel path={AppPagesEnum.offers} />,
              //   // children ???
              // },
              {
                path: AppPagesEnum.refunds,
                element: <AppPages.PageRefunds path={AppPagesEnum.refunds} />,
              },
              {
                path: AppPagesEnum.dashboard,
                element: <AppPages.AppGridPage path={AppPagesEnum.dashboard} />,
              },
              {
                path: AppPagesEnum.supplement,
                element: <AppPages.AppGridPage path={AppPagesEnum.supplement} />,
              },
              {
                path: AppPagesEnum.warehouses,
                element: <AppPages.PageWarehouses path={AppPagesEnum.warehouses} />,
              },
              {
                path: `${AppPagesEnum.warehouses}/:${AppUrlParamKeys.warehouseId}`,
                element: <AppPages.PageWarehouseOverview path={AppPagesEnum.warehouses} />,
              },
              {
                path: AppPagesEnum.customers,
                element: <AppPages.PageCustomers path={AppPagesEnum.customers} />,
              },
              {
                path: `${AppPagesEnum.customers}/:${AppUrlParamKeys.customerId}`,
                element: <AppPages.PageCustomerOverview path={AppPagesEnum.customers} />,
              },
              {
                path: AppPagesEnum.priceLists,
                element: <AppPages.PagePriceManagement path={AppPagesEnum.priceLists} />,
              },
              {
                path: `${AppPagesEnum.priceLists}/:${AppUrlParamKeys.priceListId}`,
                element: <AppPages.PagePriceListOverview path={AppPagesEnum.priceLists} />,
              },
              notFoundRoute,
            ],
          },
          notFoundRoute,
        ],
      },
      notFoundRoute,
    ],
    { basename: '/mia-erp' }
  );

export const AppRoutes2: React.FC = () => {
  const { access_token } = useAuthSelector();

  const isAuthorized = !!access_token;

  return <RouterProvider router={createRouter({ isAuthorized })} />;
};
