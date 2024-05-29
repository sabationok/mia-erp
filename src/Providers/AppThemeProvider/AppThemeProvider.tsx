import { ThemeProvider } from 'styled-components';
import { useAppSettingsSelector } from '../../redux/selectors.store';

interface ThemeProviderProps {
  children?: React.ReactNode;
}

const AppThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { appTheme } = useAppSettingsSelector();

  return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
