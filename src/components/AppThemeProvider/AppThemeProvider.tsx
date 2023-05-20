import { ThemeProvider } from 'styled-components';
import useAppSettings from 'redux/appSettings/useAppSettings.hook';
import { ConfigProvider } from 'antd';

interface ThemeProviderProps {
  children?: React.ReactNode;
}

const AppThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { appTheme } = useAppSettings();

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
