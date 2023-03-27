import { Navigate, Outlet } from 'react-router-dom';
import { useAuthSelector } from 'redux/selectors.store';

const AdminRoute: React.FC<{ redirectTo: string }> = ({ redirectTo }) => {
  const { isLoggedIn } = useAuthSelector();
  // const isAdmin = user.role?.name === 'ADMIN';

  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} replace={true} />;
};

export default AdminRoute;
