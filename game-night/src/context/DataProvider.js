import React, { useCallback, useEffect, useState } from "react";
import DataContext from "./DataContext";
import GameNightApi from "../gameNightApi";

export default function DataProvider({ children }) {
  const [refinedSearch, setRefinedSearch] = useState('');
  const [refinedResults, setRefinedResults] = useState('');
  const [gameID, setGameID] = useState('');
  const [game, setGame] = useState('');
  const [open, setOpen] = useState(false);

  const getCommonCache = useCallback(async () => {
    const { date } = await GameNightApi.getCommonCache();
  },[]);

  useEffect(() => {
    getCommonCache();
  },[getCommonCache]);

  const getRefinedResults = useCallback(async () => {
    if (refinedSearch) {
      setOpen(false);
      const res = await GameNightApi.getRefinedSearch(refinedSearch);
      setRefinedResults(res);
    }
  }, [refinedSearch]);

  useEffect(() => {
    getRefinedResults();
  }, [refinedSearch, getRefinedResults]);

  const checkGameCache = useCallback(async () => {
    setOpen(false);
    const found =  await GameNightApi.checkGameCache(gameID);
    if (!found) {
      await getGameMedia();
    } else {
      setGame(found);
    }
  },[gameID]);

  const getGameMedia = useCallback(async () => {
    if (gameID) {
      const mechanicIDs = game.mechanics.map(m => m.id);
      const categoryIDs = game.categories.map(m => m.id);
      const {
        mechanicsRes,
        categoriesRes,
        detail_images,
        videos
      } = await GameNightApi.getGameMedia(gameID, mechanicIDs, categoryIDs);
      game.mechanics = mechanicsRes;
      game.categories = categoriesRes;
      const completeGame = {
        ...game,
        detail_images,
        videos
      }
      setGame(completeGame);
      await GameNightApi.cacheGame(completeGame);
    }
  }, [gameID]);

  useEffect(() => {
    if (gameID) {
      checkGameCache();
      setGameID('');
      setGame('');
    }
  }, [gameID, checkGameCache])

  return (
    <DataContext.Provider
      value={
        {
          refinedResults,
          setRefinedResults,
          setRefinedSearch,
          open,
          setOpen,
          game,
          setGame,
          setGameID
        }
      }
    >
      {children}
    </DataContext.Provider>
  );
};