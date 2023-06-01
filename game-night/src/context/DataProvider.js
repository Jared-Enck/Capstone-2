import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "./DataContext";
import GameNightApi from "../gameNightApi";

export default function DataProvider({children}) {
  const [refinedSearch, setRefinedSearch] = useState('');
  const [refinedResults, setRefinedResults] = useState('');
  const navigate = useNavigate();

  const getRefinedResults = useCallback(async () => {
    if (refinedSearch) {
      const res = await GameNightApi.getRefinedSearch(refinedSearch);
      setRefinedResults(res);
      navigate('/search/results');
    }
  },[refinedSearch]);

  useEffect(() => {
    getRefinedResults();
  },[refinedSearch, getRefinedResults]);
  
  return (
    <DataContext.Provider
      value={
        {
          refinedResults,
          setRefinedResults,
          setRefinedSearch
        }
      }
    >
      { children }
    </DataContext.Provider>
  );
};