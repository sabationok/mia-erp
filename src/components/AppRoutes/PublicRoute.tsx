import { Navigate, Outlet } from 'react-router-dom';
import { useAuthSelector } from 'redux/selectors.store';

const PublicRoute: React.FC<{ redirectTo: string }> = ({ redirectTo }) => {
  const { isLoggedIn } = useAuthSelector();
  return isLoggedIn ? <Navigate to={redirectTo} /> : <Outlet />;
};

export default PublicRoute;
