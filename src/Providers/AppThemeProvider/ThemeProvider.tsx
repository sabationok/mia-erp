import { ThemeProvider as Provider } from 'styled-components';
import { useAppSettingsSelector } from '../../redux/selectors.store';

interface ThemeProviderProps {
  children?: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { appTheme } = useAppSettingsSelector();

  return <Provider theme={appTheme}>{children}</Provider>;
};

export default ThemeProvider;
