import React, { useState } from "react";
import DataContext from "./DataContext";
import useDebounce from "../hooks/useDebounce";
import GameNightApi from "../gameNightApi";

export default function DataProvider({children}) {
  const initialState = {
    search: ''
  };
  const [searchTerm, setSearchTerm] = useState(initialState);
  const [listGames, setListGames] = useState([]);
  
  const debouncedRequest = useDebounce(async () => {
    if (searchTerm) {
      const { games } = await GameNightApi.getSearchResults(searchTerm);
      setListGames(games);
      console.log(games)
    }
  });
  
  return (
    <DataContext.Provider
      value={
        {
          listGames,
          setSearchTerm,
          setListGames,
          debouncedRequest
        }
      }
    >
      { children }
    </DataContext.Provider>
  );
};