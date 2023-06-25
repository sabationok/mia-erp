//import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
import styled, { useTheme } from 'styled-components';
import { Oval } from 'react-loader-spinner';
import FlexBox from './FlexBox';

interface AppLoaderProps {
  isLoading: boolean;
  comment?: string;
}

const AppLoader: React.FC<AppLoaderProps> = ({ isLoading, comment = 'Please wait while minions do their work...' }) => {
  const theme = useTheme();
  return (
    <Backdrop isOpen={isLoading}>
      <FlexBox gap={16} fxDirection={'column'} alignItems={'center'}>
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
        {comment && <Text>{comment}</Text>}
      </FlexBox>
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
  backdrop-filter: blur(1px);
`;
const Text = styled.div`
  font-size: 22px;
  font-weight: 600;

  color: ${({ theme }) => theme.colorLight};
`;
export default AppLoader;
