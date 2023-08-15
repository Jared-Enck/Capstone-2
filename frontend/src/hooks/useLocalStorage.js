import { useState, useEffect } from 'react';

/** Controls local storage variables
 *
 * @param {*} key
 * @param {*} firstValue
 * @returns [item, setItem]
 */
export default function useLocalStorage(key, firstValue = null) {
  const initialValue = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initialValue);

  useEffect(
    function setKeyInLocalStorage() {
      // console.debug('hooks useLocalStorage useEffect', 'item=', item);

      if (item === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, item);
      }
    },
    [key, item]
  );

  return [item, setItem];
}
