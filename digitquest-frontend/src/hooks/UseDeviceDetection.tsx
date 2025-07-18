import { useState, useEffect } from 'react';

interface DeviceInfo {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  screenWidth: number;
  screenHeight: number;
}

export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isDesktop: true,
    isTablet: false,
    isMobile: false,
    screenWidth: 1920,
    screenHeight: 1080,
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Breakpoints
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      
      setDeviceInfo({
        isDesktop,
        isTablet,
        isMobile,
        screenWidth: width,
        screenHeight: height,
      });
    };

    updateDeviceInfo();
    
    window.addEventListener('resize', updateDeviceInfo);
    
    return () => window.removeEventListener('resize', updateDeviceInfo);
  }, []);

  return deviceInfo;
};