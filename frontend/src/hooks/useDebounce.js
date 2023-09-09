import { useEffect, useRef, useMemo } from 'react';
import { debounce } from '@mui/material';

/** After set time from debounce returns debouncedCallback
 *
 * @param {*} callback
 *
 * debounce 300 milliseconds
 *
 * @returns {*} debouncedCallback
 */
export default function useDebounce(callback) {
  const ref = useRef();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 400);
  }, []);

  return debouncedCallback;
}
