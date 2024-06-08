//import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
import styled, { useTheme } from 'styled-components';
import { Oval } from 'react-loader-spinner';
import FlexBox from './FlexBox';
import { Text } from './Text';

interface AppLoaderProps {
  isLoading: boolean;
  comment?: string;
}

const AppLoader: React.FC<AppLoaderProps> = ({ isLoading, comment = 'Please wait while minions do their work...' }) => {
  const theme = useTheme();
  return (
    <Backdrop isOpen={isLoading}>
      <FlexBox gap={16} alignItems={'center'} padding={'16px'}>
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
        {comment && (
          <Text $align={'center'} $size={16} $weight={600} color={'#fff'}>
            {comment}
          </Text>
        )}
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

  background: ${({ theme }) => theme.backdropColorDarkLight};
  backdrop-filter: blur(1px);
`;

export default AppLoader;
