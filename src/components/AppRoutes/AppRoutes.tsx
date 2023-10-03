import { Navigate, Route, Routes } from 'react-router-dom';

import { memo, useMemo } from 'react';
import { useAuthSelector } from '../../redux/selectors.store';
import PermissionCheck from '../AppPages/PermissionCheck';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { AppPagesEnum } from '../../data/pages.data';
import { AppUrlParamKeys } from '../../hooks/useAppParams.hook';
import { AppPages } from 'components/AppPages';

const { PageNotFound } = AppPages;

const AppRoutes: React.FC<{ isLoaded?: boolean }> = () => {
  const { access_token } = useAuthSelector();

  const isAuthorized = useMemo(() => !!access_token, [access_token]);

  const notFoundRouteProps = useMemo(
    () => ({
      path: '*',
      element: (
        <AppPages.AppGridPage path={'notFound'}>
          <PageNotFound />
        </AppPages.AppGridPage>
      ),
    }),
    []
  );

  return (
    <Routes>
      <Route index element={<Navigate to={isAuthorized ? '/app' : '/auth'} />} />

      <Route path={'/auth/*'} element={<PublicRoute redirectTo={`/app/${AppPagesEnum.companies}`} />}>
        <Route index element={<Navigate to="/auth/login" />} />
        <Route path="register" element={<AppPages.PageAuth register />} />
        <Route path="login" element={<AppPages.PageAuth login />} />
        <Route path="sendRecoveryPasswordMail" element={<AppPages.PageAuth sendRecoveryMail />} />
        <Route path="recoveryPassword" element={<AppPages.PageAuth recovery />} />
        <Route path={'*'} element={<Navigate to="/auth/login" />} />
      </Route>

      <Route path={'/app/*'} element={<PrivateRoute redirectTo={'/auth'} />}>
        <Route index element={<Navigate to={`/app/${AppPagesEnum.companies}`} />} />

        <Route path={AppPagesEnum.companies} element={<AppPages.PageSelectCompany path={AppPagesEnum.companies} />} />

        <Route path={`:${AppUrlParamKeys.permissionId}`} element={<PermissionCheck redirectTo={'/app/companies'} />}>
          <Route index element={<Navigate to={AppPagesEnum.transactions} />} />
          <Route path={AppPagesEnum.companies} element={<AppPages.PageSelectCompany path={AppPagesEnum.companies} />} />
          <Route
            path={AppPagesEnum.transactions}
            element={<AppPages.PageTransactions path={AppPagesEnum.transactions} />}
          />

          <Route path={AppPagesEnum.products} element={<AppPages.PageProducts path={AppPagesEnum.products} />} />
          <Route
            path={`${AppPagesEnum.products}/:${AppUrlParamKeys.productId}`}
            element={<AppPages.PageProductOverview path={AppPagesEnum.products} />}
          />

          <Route path={AppPagesEnum.orders} element={<AppPages.PageOrders path={AppPagesEnum.orders} />} />
          <Route
            path={`${AppPagesEnum.orders}/:${AppUrlParamKeys.orderId}`}
            element={<AppPages.PageOrderOverview path={AppPagesEnum.products} />}
          />

          <Route path={AppPagesEnum.refunds} element={<AppPages.PageRefunds path={AppPagesEnum.refunds} />} />
          <Route path={AppPagesEnum.dashboard} element={<AppPages.AppGridPage path={AppPagesEnum.dashboard} />} />
          <Route path={AppPagesEnum.supplement} element={<AppPages.AppGridPage path={AppPagesEnum.supplement} />} />

          <Route path={AppPagesEnum.warehouses} element={<AppPages.PageWarehouses path={AppPagesEnum.warehouses} />} />
          <Route
            path={`${AppPagesEnum.warehouses}/:${AppUrlParamKeys.warehouseId}`}
            element={<AppPages.PageWarehouseOverview path={AppPagesEnum.warehouses} />}
          />

          <Route
            path={AppPagesEnum.priceLists}
            element={<AppPages.PagePriceManagement path={AppPagesEnum.priceLists} />}
          />
          <Route
            path={`${AppPagesEnum.priceLists}/:${AppUrlParamKeys.priceListId}`}
            element={<AppPages.PagePriceListOverview path={AppPagesEnum.priceLists} />}
          />

          <Route {...notFoundRouteProps} />
        </Route>
        <Route {...notFoundRouteProps} />
      </Route>

      <Route {...notFoundRouteProps} />
    </Routes>
  );
};

export default memo(AppRoutes);
