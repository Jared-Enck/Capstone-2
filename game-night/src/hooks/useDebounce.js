import React, { useEffect, useRef, useMemo} from "react";
import { debounce } from "@mui/material";

export default function useDebounce(callback) {
    const ref = useRef();
  
    useEffect(() => {
      ref.current = callback;
    }, [callback]);
  
    const debouncedCallback = useMemo(() => {
      const func = () => {
        ref.current?.();
      };
  
      return debounce(func, 1000);
    }, []);
  
    return debouncedCallback;
  };
