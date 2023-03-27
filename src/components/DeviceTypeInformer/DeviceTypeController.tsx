import { useMediaQuery } from 'react-responsive';
import { Navigate, Outlet } from 'react-router-dom';
const LITTLE_MOBILE = 279;
const MOBILE_END = 479;
const TABLET_START = 480;
const TABLET_END = 767;
const TABLET_MAX_START = 768;
const TABLET_MAX_END = 1099;
const DESKTOP_START = 1100;
export const deviceParams = {
  LITTLE_MOBILE,
  MOBILE_END,
  TABLET_START,
  TABLET_END,
  TABLET_MAX_START,
  TABLET_MAX_END,
  DESKTOP_START,
};

export const MinDesktop: React.FC<{ children: React.ReactElement<any, any> | null }> = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: DESKTOP_START });
  return isDesktop ? children : null;
};
export const Tablet: React.FC<{ children: React.ReactElement<any, any> | null }> = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: TABLET_START, maxWidth: TABLET_END });
  return isTablet ? children : null;
};
export const TabletXL: React.FC<{ children: React.ReactElement<any, any> | null }> = ({ children }) => {
  const isTabletXl = useMediaQuery({ minWidth: TABLET_MAX_START, maxWidth: DESKTOP_START });
  return isTabletXl ? children : null;
};
export const AllTablets: React.FC<{ children: React.ReactElement<any, any> | null }> = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: TABLET_START, maxWidth: TABLET_MAX_END });
  return isTablet ? children : null;
};
export const LiitleMobile: React.FC<{ children: React.ReactElement<any, any> | null }> = ({ children }) => {
  const isLittleMobile = useMediaQuery({ maxWidth: LITTLE_MOBILE });
  return isLittleMobile ? children : null;
};
export const Mobile: React.FC<{ children: React.ReactElement<any, any> | null }> = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: MOBILE_END });
  return isMobile ? children : null;
};
export const MaxToTablet: React.FC<{ children: React.ReactElement<any, any> | null }> = ({ children }) => {
  const isTablet = useMediaQuery({ maxWidth: TABLET_END });
  return isTablet ? children : null;
};
export const MaxToTabletXl: React.FC<{ children: React.ReactElement<any, any> | null }> = ({ children }) => {
  const isTabletXL = useMediaQuery({ maxWidth: DESKTOP_START });
  return isTabletXL ? children : null;
};
export const MinTabletXl: React.FC<{ children: React.ReactElement<any, any> | null }> = ({ children }) => {
  const isTabletXL = useMediaQuery({ minWidth: TABLET_MAX_START });
  return isTabletXL ? children : null;
};
export const NotMobile: React.FC<{ children: React.ReactElement<any, any> | null }> = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: TABLET_MAX_START });
  return isNotMobile ? children : null;
};
export const NotMobileRoute: React.FC<{ redirectTo?: string | any }> = ({ redirectTo }) => {
  const isMobile = useMediaQuery({ minWidth: MOBILE_END });
  return isMobile ? <Outlet /> : <Navigate to={redirectTo} />;
};
export const MobileRoute: React.FC<{ redirectTo?: string | any }> = ({ redirectTo }) => {
  const isMobile = useMediaQuery({ maxWidth: MOBILE_END });
  return isMobile ? <Outlet /> : <Navigate to={redirectTo} />;
};
export const MaxTabletRoute: React.FC<{ redirectTo?: string | any }> = ({ redirectTo }) => {
  const isTablet = useMediaQuery({ maxWidth: TABLET_END });
  return isTablet ? <Outlet /> : <Navigate to={redirectTo} />;
};
export const MinTabletXlRoute: React.FC<{ redirectTo?: string | any }> = ({ redirectTo }) => {
  const isTabletXl = useMediaQuery({ minWidth: TABLET_MAX_START });
  return isTabletXl ? <Outlet /> : <Navigate to={redirectTo} />;
};
export const MinDesktopRoute: React.FC<{ redirectTo?: string | any }> = ({ redirectTo }) => {
  const isTabletXl = useMediaQuery({ minWidth: DESKTOP_START });
  return isTabletXl ? <Outlet /> : <Navigate to={redirectTo} />;
};

const DeviceConrol = {
  MinDesktop,
  Tablet,
  TabletXL,
  AllTablets,
  LiitleMobile,
  Mobile,
  MaxToTablet,
  MaxToTabletXl,
  MinTabletXl,
  NotMobile,
  NotMobileRoute,
  MobileRoute,
  MaxTabletRoute,
  MinTabletXlRoute,
  MinDesktopRoute,
};
export default DeviceConrol;
