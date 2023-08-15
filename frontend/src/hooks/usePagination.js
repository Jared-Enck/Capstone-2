import { useEffect, useState } from 'react';

/** Controls page and pageCount for pagination
 *
 * @param {*} count searchResults count
 * @param {*} itemsOnPage num prop from parent
 * @returns {*} [page, pageCount, handleChange, setPage]
 *
 * pageCount = Math.ceil(count / itemsOnPage)
 */
export default function usePagination(count, itemsOnPage) {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (count) {
      const initialPages = Math.ceil(count / itemsOnPage);
      setPageCount(initialPages >= 35 ? 34 : initialPages);
    }
  }, [count, itemsOnPage]);

  const handleChange = (evt, value) => {
    setPage(value);
  };

  return [page, pageCount, handleChange, setPage];
}
