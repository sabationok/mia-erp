import AppGridPage from 'components/AppPages/AppGridPage/AppGridPage';
import { AppPages } from 'components/AppPages/pages';
import DesktopFooter from 'components/Layout/DesktopFooter/DesktopFooter';

import MobileFooter from 'components/Layout/MobileFooter/MobileFooter';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getUserData } from 'redux/selectors';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const {
  PageHome,
  PageError,
  PageNotFound,
  PageProducts,
  PageOrders,
  PageRefunds,
  PageAdmin,
  PageLogOut,
  PageAuth,
  PageDirectories,
} = AppPages;

const AppRoutes = ({ locationRef }) => {
  const auth = useSelector(getUserData);

  return (
    <>
      <Routes>
        <Route index element={<Navigate to={auth.isLoggedIn ? 'home' : 'auth'} />} errorElement={<PageError />} />

        <Route path="/" element={<PublicRoute redirectTo={'home'} />}>
          <Route index element={<Navigate to="auth" />} errorElement={<PageError />} />
          <Route path="auth" element={<AppGridPage path="auth" />} errorElement={<PageError />}>
            <Route index element={<Navigate to="signIn" />} errorElement={<PageError />}></Route>
            <Route path="signUp" element={<PageAuth path="signUp" />} errorElement={<PageError />}></Route>
            <Route path="signIn" element={<PageAuth path="signIn" />} errorElement={<PageError />}></Route>
            <Route path="*" element={<PageNotFound />} errorElement={<PageError />} />
          </Route>
        </Route>

        <Route path="/" element={<PrivateRoute redirectTo="auth" />}>
          <Route index element={<Navigate to="home" />} errorElement={<PageError />} />
          <Route path="home" element={<AppGridPage path="home" />} errorElement={<PageError />}>
            <Route index element={<PageHome />} errorElement={<PageError />}></Route>
            <Route path="home" element={<PageHome path="home" />} errorElement={<PageError />} />
            <Route path="*" element={<PageNotFound />} errorElement={<PageError />} />
          </Route>

          <Route path="products" element={<AppGridPage path="products" />} errorElement={<PageError />}>
            <Route index element={<PageProducts />} errorElement={<PageError />}></Route>
            <Route path="products" element={<PageProducts path="products" />} errorElement={<PageError />} />
            <Route path=":id" element={<PageProducts path="products" />} errorElement={<PageError />} />
            <Route path="product" element={<PageProducts path="product" />} errorElement={<PageError />} />
            <Route path=":id/product" element={<PageProducts path="product" />} errorElement={<PageError />} />
            <Route path="stock" element={<PageProducts path="stock" />} errorElement={<PageError />} />
            <Route path=":id/stock" element={<PageProducts path="stock" />} errorElement={<PageError />} />
            <Route path="*" element={<PageNotFound />} errorElement={<PageError />} />
          </Route>

          <Route path="orders" element={<AppGridPage path="orders" />} errorElement={<PageError />}>
            <Route index element={<PageOrders />} errorElement={<PageError />}></Route>
            <Route path="orders" element={<PageOrders path="orders" />} errorElement={<PageError />} />
            <Route path=":id" element={<PageOrders path="orders" />} errorElement={<PageError />} />
            <Route path="order" element={<PageOrders path="order" />} errorElement={<PageError />} />
            <Route path=":id/order" element={<PageOrders path="order" />} errorElement={<PageError />} />
            <Route path="deliveries" element={<PageOrders path="deliveries" />} errorElement={<PageError />} />
            <Route path=":id/deliveries" element={<PageOrders path="deliveries" />} errorElement={<PageError />} />
            <Route path="*" element={<PageNotFound />} errorElement={<PageError />} />
          </Route>

          <Route path="refunds" element={<AppGridPage path="refunds" />} errorElement={<PageError />}>
            <Route index element={<PageRefunds />} errorElement={<PageError />}></Route>
            <Route path="refunds" element={<PageRefunds path="refunds" />} errorElement={<PageError />} />
            <Route path=":id" element={<PageRefunds path="refunds" />} errorElement={<PageError />} />
            <Route path="refund" element={<PageRefunds path="refund" />} errorElement={<PageError />} />
            <Route path="inspection" element={<PageRefunds path="inspection" />} errorElement={<PageError />} />
            <Route path=":id/refund" element={<PageRefunds path="refund" />} errorElement={<PageError />} />
            <Route path=":id/inspect" element={<PageRefunds path="inspect" />} errorElement={<PageError />} />
            <Route path="*" element={<PageNotFound />} errorElement={<PageError />} />
          </Route>

          <Route path="directories" element={<AppGridPage path="directories" />} errorElement={<PageError />}>
            <Route index element={<PageDirectories />} errorElement={<PageError />}></Route>
            <Route path="categories" element={<PageDirectories path="categories" />} errorElement={<PageError />} />

            <Route path="*" element={<PageNotFound />} errorElement={<PageError />} />
          </Route>
        </Route>

        <Route path="/" element={<AdminRoute redirectTo={'home'} />}>
          <Route path="admin" element={<AppGridPage path="admin" />} errorElement={<PageError />}>
            <Route index element={<PageAdmin />} errorElement={<PageError />}></Route>
            <Route path="users" element={<PageAdmin path="users" />} errorElement={<PageError />} />
            <Route path="managers" element={<PageAdmin path="managers" />} errorElement={<PageError />} />
            <Route path="vendors" element={<PageAdmin path="vendors" />} errorElement={<PageError />} />
            <Route path="roles" element={<PageAdmin path="roles" />} errorElement={<PageError />} />
            <Route path="settings" element={<PageAdmin path="settings" />} errorElement={<PageError />} />
            <Route path="*" element={<PageNotFound />} errorElement={<PageError />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <PageNotFound>
              <MobileFooter />
              <DesktopFooter />
            </PageNotFound>
          }
          errorElement={<PageError />}
        />
        <Route path="logout" element={<PageLogOut />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
