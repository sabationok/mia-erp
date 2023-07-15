import { Navigate, Route, Routes } from 'react-router-dom';
import AppPages from 'components/AppPages';
import { memo, useMemo } from 'react';
import { useAuthSelector } from '../../redux/selectors.store';
import PermissionCheck from '../AppPages/PermissionCheck';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const { PageNotFound } = AppPages;

const AppRoutes: React.FC = () => {
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

      <Route path={'/auth/*'} element={<PublicRoute redirectTo={'/app/home'} />}>
        <Route index element={<Navigate to="/auth/login" />} />
        <Route path="register" element={<AppPages.PageAuth register />} />
        <Route path="login" element={<AppPages.PageAuth login />} />
        <Route path="sendRecoveryPasswordMail" element={<AppPages.PageAuth sendRecoveryMail />} />
        <Route path="recoveryPassword" element={<AppPages.PageAuth recovery />} />
        <Route path={'*'} element={<Navigate to="/auth/login" />} />
      </Route>

      <Route path={'/app/*'} element={<PrivateRoute redirectTo={'/auth'} />}>
        <Route index element={<Navigate to={'/app/home'} />} />
        <Route path={'home'} element={<AppPages.PageSelectCompany path={'home'} />} />

        <Route path={':permissionId'} element={<PermissionCheck redirectTo={'/app/home'} />}>
          <Route index element={<Navigate to={'transactions'} />} />
          <Route path={'companies'} element={<AppPages.PageSelectCompany path={'companies'} />} />
          <Route path={'transactions'} element={<AppPages.PageTransactions path={'transactions'} />} />
          <Route {...notFoundRouteProps} />
        </Route>
        <Route {...notFoundRouteProps} />
      </Route>

      <Route {...notFoundRouteProps} />
    </Routes>
  );
};

export default memo(AppRoutes);

// <Route path={'/test/*'} element={<PrivateRoute redirectTo="/auth" />}>
//   <Route path="/*" element={<AppPages.AppGridPage path={'transactions'} />}>
//     <Route index element={<Navigate to={'/transactions'} />} errorElement={<PageNotFound />} />
//
//     <Route path={'transactions'} element={<AppPages.PageTransactions />} errorElement={<PageNotFound />} />
//     <Route path={'home'} element={<AppPages.PageCompanies />} errorElement={<PageNotFound />} />
//
//     <Route {...notFoundRouteProps} />
//   </Route>
//
//   <Route path="auth/*" element={<PublicRoute redirectTo={'/transactions'} />}>
//     <Route index element={<Navigate to="login" />} />
//     <Route path="register" element={<AppPages.PageAuth register />} />
//     <Route path="login" element={<AppPages.PageAuth login />} />
//
//     <Route path="sendRecoveryPasswordMail" element={<AppPages.PageAuth sendRecoveryMail />} />
//
//     <Route path="recoveryPassword" element={<AppPages.PageAuth recovery />} />
//
//     <Route {...notFoundRouteProps} />
//   </Route>
// </Route>
