import { useTheme } from 'styled-components';
import { Oval } from 'react-loader-spinner';

export const AppLoaderSpiner = ({
  size = 60,
  visible = true,
  strokeWidth = 4,
}: {
  strokeWidth?: number;
  visible?: boolean;
  size?: number | string;
} = {}) => {
  const theme = useTheme();

  return (
    <Oval
      height={size}
      width={size}
      color={theme.accentColor.base}
      ariaLabel="tail-spin-loading"
      visible={visible}
      secondaryColor={theme.accentColor.light}
      strokeWidth={strokeWidth}
      strokeWidthSecondary={strokeWidth}
    />
  );
};
