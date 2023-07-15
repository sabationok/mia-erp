import { Navigate, Outlet } from 'react-router-dom';
import { useAuthSelector } from 'redux/selectors.store';

const PublicRoute: React.FC<{ redirectTo: string }> = ({ redirectTo }) => {
  const { access_token } = useAuthSelector();
  return access_token ? <Navigate to={redirectTo} /> : <Outlet />;
};

export default PublicRoute;
