import { ThemeProvider } from 'styled-components';
import useAppSettings from 'redux/appSettings/useAppSettings.hook';

interface ThemeProviderProps {
  children?: React.ReactNode;
}
const AppThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { appTheme } = useAppSettings();

  return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
