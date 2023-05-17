import React, { useState, useEffect, useCallback} from "react";
import DataContext from "./DataContext";
import BGAtlasApi from "../BGAtlasApi";

export default function DataProvider({children}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [listGames, setListGames] = useState([]);

  const getLikeGames = useCallback(async () => {
    if (searchTerm) {
      const games = await BGAtlasApi.getLikeName(searchTerm);
      setListGames(games);
      console.log(listGames);
    }
  },[searchTerm]);

  useEffect(() => {
    getLikeGames();
  },[searchTerm, getLikeGames])
  
  return (
    <DataContext.Provider
      value={
        {
          listGames,
          setSearchTerm,
          setListGames
        }
      }
    >
      { children }
    </DataContext.Provider>
  );
};