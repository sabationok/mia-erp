import { Navigate, Route, Routes } from 'react-router-dom';
import AppPages from 'components/AppPages';
import { appPages } from 'data';
import { memo } from 'react';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const { PageNotFound } = AppPages;

const AppRoutes: React.FC = () => {
  const notFoundRouteProps = {
    path: '*',
    element: <PageNotFound />,
    errorElement: <PageNotFound />,
  };

  return (
    <Routes>
      <Route
        index
        element={<Navigate to="/auth" />}
        errorElement={<PageNotFound />}
      />

      <Route path="/">
        <Route path="/" element={<PrivateRoute redirectTo="/auth" />}>
          <Route
            path="/"
            element={<AppPages.AppGridPage path={appPages.transactions.path} />}
            errorElement={<PageNotFound />}
          >
            <Route
              index
              element={<Navigate to={appPages.transactions.path} />}
              errorElement={<PageNotFound />}
            />

            <Route
              path={appPages.transactions.path}
              element={<AppPages.PageTransactions />}
              errorElement={<PageNotFound />}
            />
            <Route
              path={appPages.home.path}
              element={<AppPages.PageHome />}
              errorElement={<PageNotFound />}
            />
          </Route>
        </Route>

        <Route
          path="auth/*"
          element={
            <PublicRoute redirectTo={`/${appPages.transactions.path}`} />
          }
        >
          <Route index element={<Navigate to="login" />} />
          <Route path="register" element={<AppPages.PageAuth register />} />
          <Route path="login" element={<AppPages.PageAuth login />} />

          <Route
            path="sendRecoveryPasswordMail"
            element={<AppPages.PageAuth sendRecoveryMail />}
          />

          <Route
            path="recoveryPassword"
            element={<AppPages.PageAuth recovery />}
          />

          <Route {...notFoundRouteProps} />
        </Route>
        <Route {...notFoundRouteProps} />
      </Route>
    </Routes>
  );
};

export default memo(AppRoutes);
