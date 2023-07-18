import { useEffect, useState } from "react";

export default function usePagination(count, itemsOnPage) {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (count) {
      const initialPages = count / itemsOnPage;
      setPageCount((
        initialPages % 1 === 0
          ? initialPages
          : Math.ceil(initialPages)
      ));
    };
  }, [count, itemsOnPage]);

  const handleChange = (evt, value) => {
    setPage(value);
  };

  return [
    page,
    setPage,
    pageCount,
    handleChange
  ];
};