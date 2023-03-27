import { Navigate, Outlet } from 'react-router-dom';
import { useAuthSelector } from 'redux/selectors.store';

const PrivateRoute: React.FC<{ redirectTo: string }> = ({ redirectTo }) => {
  const { isLoggedIn } = useAuthSelector();

  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} replace={true} />;
};

export default PrivateRoute;
