import { ThemeProvider } from 'styled-components';
import { ConfigProvider } from 'antd';
import { useAppSettingsSelector } from '../../redux/selectors.store';

interface ThemeProviderProps {
  children?: React.ReactNode;
}

const AppThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { appTheme } = useAppSettingsSelector();

  return (
    <ThemeProvider theme={appTheme}>
      <ConfigProvider
        theme={{
          token: {
            colorText: appTheme.accentColor.base,
            // colorBgContainer: 'transparent',
            colorPrimary: appTheme.accentColor.base,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default AppThemeProvider;
