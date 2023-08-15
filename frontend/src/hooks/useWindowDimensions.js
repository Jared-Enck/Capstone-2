import { useState, useEffect } from 'react';

// Not currently in use. Will be implemented with mobile friendly update.

/** Controls window width and height dimensions
 *
 * @returns {*} { windowSize }
 */
export default function useWindowDimensions() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return { windowSize };
}
