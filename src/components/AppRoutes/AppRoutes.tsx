import { Navigate, Route, Routes } from 'react-router-dom';
import AppPages from 'components/AppPages';
import { memo, useEffect, useMemo } from 'react';
import { useAuthSelector } from '../../redux/selectors.store';
import { toast } from 'react-toastify';

const { PageNotFound } = AppPages;

const AppRoutes: React.FC = () => {
  const { accessToken } = useAuthSelector();

  const isAuthorized = useMemo(() => !!accessToken, [accessToken]);

  useEffect(() => {
    if (!isAuthorized) {
      toast.error('Not authorized');
    }
  }, [isAuthorized]);

  const notFoundRouteProps = useMemo(
    () => ({
      path: '*',
      element: <PageNotFound />,
    }),
    []
  );

  return (
    <Routes>
      {/*<Route index element={<Navigate to={'/auth'} />} />*/}

      {/*<Route path={'/'} element={<Navigate to={'/auth'} />} />*/}

      {isAuthorized && (
        <Route>
          <Route index element={<Navigate to={'/transactions'} />} />
          <Route path={'/transactions'} element={<AppPages.PageTransactions path={'transactions'} />} />
          <Route path={'/home'} element={<AppPages.PageHome path={'home'} />} />
        </Route>
      )}

      {!isAuthorized && (
        <Route path="/auth/*">
          <Route index element={<Navigate to="login" />} />
          <Route path="register" element={<AppPages.PageAuth register />} />
          <Route path="login" element={<AppPages.PageAuth login />} />

          <Route path="sendRecoveryPasswordMail" element={<AppPages.PageAuth sendRecoveryMail />} />

          <Route path="recoveryPassword" element={<AppPages.PageAuth recovery />} />

          <Route {...notFoundRouteProps} />
        </Route>
      )}

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
//     <Route path={'home'} element={<AppPages.PageHome />} errorElement={<PageNotFound />} />
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
