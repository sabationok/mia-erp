import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import styled from 'styled-components';

interface AppLoaderProps {
  isLoading?: boolean;
}
const AppLoader: React.FC<AppLoaderProps> = ({ isLoading }) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading || false}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
// const StyledCircularProgress = styled(CircularProgress)``;
export default AppLoader;
