import React, { useState, useMemo } from 'react';
import DeviceTypeInformer from './DeviceTypeInformer';

const MyDevice = () => {
  const [devMode, setDevMode] = useState(false);
  const windowLocation = window.location.hostname;

  useMemo(() => {
    if (windowLocation === 'localhost') {
      setDevMode(true);
      return;
    }
    setDevMode(false);
  }, [windowLocation]);

  return <>{devMode && <DeviceTypeInformer />}</>;
};

export default MyDevice;
