import { Navigate, Outlet } from 'react-router-dom';
import { useAuthSelector } from 'redux/selectors.store';
import { toast } from 'react-toastify';

const PrivateRoute: React.FC<{ redirectTo: string }> = ({ redirectTo }) => {
  const { access_token } = useAuthSelector();

  if (!access_token) {
    toast.error('Unauthorized');
  }

  return access_token ? <Outlet /> : <Navigate to={redirectTo} replace={true} />;
};

export default PrivateRoute;
