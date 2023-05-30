//import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
import styled, { useTheme } from 'styled-components';
import { Oval } from 'react-loader-spinner';

interface AppLoaderProps {
  isLoading: boolean;
}

const AppLoader: React.FC<AppLoaderProps> = ({ isLoading }) => {
  const theme = useTheme();
  return (
    <Backdrop isOpen={isLoading}>
      <Oval
        height="60"
        width="60"
        color={theme.accentColor.base}
        ariaLabel="tail-spin-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        secondaryColor={theme.accentColor.light}
        strokeWidth={3}
        strokeWidthSecondary={3}
      />
    </Backdrop>
  );
};
const Backdrop = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;

  width: 100%;
  height: 100%;

  background: ${({ theme }) => theme.backdropColor};
`;
export default AppLoader;
