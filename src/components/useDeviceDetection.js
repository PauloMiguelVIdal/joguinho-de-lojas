// hooks/useDeviceDetection.js
import { useState, useEffect } from 'react';

export function useDeviceDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // MOBILE: altura da tela < 600px (celular)
      const mobile = window.innerHeight < 600;
      // PAISAGEM: largura > altura e é mobile
      const landscape = window.innerWidth > window.innerHeight && mobile;
      
      setIsMobile(mobile);
      setIsLandscape(landscape);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', () => {
      setTimeout(checkDevice, 300);
    });

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return { isMobile, isLandscape, isDesktop: !isMobile };
}