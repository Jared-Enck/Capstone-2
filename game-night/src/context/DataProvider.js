import React, { useCallback, useContext, useEffect, useState } from "react";
import DataContext from "./DataContext";
import GameNightApi from "../gameNightApi";
import UserContext from "./UserContext";

export default function DataProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [refinedSearch, setRefinedSearch] = useState('');
  const [refinedResults, setRefinedResults] = useState('');
  const [gameID, setGameID] = useState('');
  const [game, setGame] = useState('');
  const [collection, setCollection] = useState([]);
  const [userGameIDs, setUserGameIDs] = useState(new Set());
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(UserContext);
  const username = currentUser.username || '';

  const getCommonCache = useCallback(async () => {
    try {
      await GameNightApi.getCommonCache();
    } catch (err) {
      console.error('Error: ', err)
    }
  }, []);

  useEffect(() => {
    getCommonCache();
  }, [getCommonCache]);

  const getRefinedResults = useCallback(async () => {
    try {
      if (refinedSearch) {
        setOpen(false);
        setIsLoading(true);
        const res = await GameNightApi.getRefinedSearch(refinedSearch);
        setRefinedResults(res);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Error: ', err)
    }
  }, [refinedSearch]);

  useEffect(() => {
    getRefinedResults();
  }, [refinedSearch, getRefinedResults]);

  const getGameMedia = useCallback(async () => {
    try {
      if (gameID) {
        setIsLoading(true);
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
    } catch (err) {
      console.error('Error: ', err)
    }
  }, [gameID, game]);

  const checkGameCache = useCallback(async () => {
    try {
      setOpen(false);
      const found = await GameNightApi.checkGameCache(gameID);
      if (!found) {
        await getGameMedia();
      } else {
        setGame(found);
      }
    } catch (err) {
      console.error('Error: ', err)
    }
  }, [gameID, getGameMedia]);

  useEffect(() => {
    if (gameID) {
      setIsLoading(true);
      checkGameCache();
      setGameID('');
      setGame('');
    }
    setIsLoading(false);
  }, [gameID, checkGameCache]);

  const getCollection = useCallback(async () => {
    try {
      setIsLoading(true);
      // Api needs extra commas at beginning and end of string
      const gameIdsStr = `,${Array.from(userGameIDs).join(',')},`;
      const res = await GameNightApi.getCollection({ ids: gameIdsStr });
      setCollection(res.games);
      setIsLoading(false);
    } catch (err) {
      console.error('Error: ', err)
    }
  }, [userGameIDs]);

  async function addGame(game) {
    try {
      if (username) {
        const { id } = game;
        await GameNightApi.addGame({ id, username });

        setCollection(prev => [...prev, game]);
        setUserGameIDs(prev => new Set(prev).add(id));
        console.log(`${game.name} has been added to your collection.`)
      };
    } catch (err) {
      console.error('Error: ', err)
    }
  };

  async function removeGame(game) {
    try {
      const { id } = game;
      if (username) {
        await GameNightApi.removeGame({ id, username });

        setCollection(prev => prev.filter(g => g.id !== id));
        setUserGameIDs(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        console.log(`${game.name} has been removed from your collection.`)
      };
    } catch (err) {
      console.error('Error: ', err)
    }
  };

  const getGameIDs = useCallback(async () => {
    if (currentUser) {
      try {
        const results = await GameNightApi.getGames(currentUser.username);
        setUserGameIDs(new Set(results.games));
      } catch (err) {
        console.error('Error: ', err);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    getGameIDs();
  }, [currentUser, getGameIDs])

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
          setGameID,
          collection,
          getCollection,
          addGame,
          removeGame,
          userGameIDs,
          setUserGameIDs,
          isLoading,
          setIsLoading
        }
      }
    >
      {children}
    </DataContext.Provider>
  );
};