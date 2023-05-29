import { Navigate, Outlet } from 'react-router-dom';
import { useAuthSelector } from 'redux/selectors.store';
import { toast } from 'react-toastify';

const PrivateRoute: React.FC<{ redirectTo: string }> = ({ redirectTo }) => {
  const { isLoggedIn } = useAuthSelector();

  if (!isLoggedIn) {
    toast.error('Unauthorized');
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} replace={true} />;
};

export default PrivateRoute;
