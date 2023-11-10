import { useMediaQuery } from 'react-responsive';
import css from './DeviceTypeInformer.module.css';

const DeviceTypeInformer = () => {
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ minWidth: 480, maxWidth: 767 });
  const isTabletXL = useMediaQuery({ minWidth: 768, maxWidth: 999 });
  const isDesktop = useMediaQuery({ minWidth: 1000 });

  return (
    <div className={css.device}>
      <div className={css.type}>
        {isMobile && <p>Mobile</p>}
        {isTablet && <p>Tablet</p>}
        {isTabletXL && <p>TabletXL</p>}
        {isDesktop && <p>Desktop</p>}
      </div>
    </div>
  );
};

export default DeviceTypeInformer;
