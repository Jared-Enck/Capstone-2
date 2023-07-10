import React, { useCallback, useContext, useEffect, useState } from "react";
import DataContext from "./DataContext";
import useDebounce from "../hooks/useDebounce";
import GameNightApi from "../gameNightApi";
import UserContext from "./UserContext";

export default function DataProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [boxResults, setBoxResults] = useState({});
  const [searchParam, setSearchParam] = useState({});
  const [searchResults, setSearchResults] = useState('');
  const [searchCount, setSearchCount] = useState('');
  const [resultsHeader, setResultsHeader] = useState('');
  const [nextResults, setNextResults] = useState({});
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

  const debouncedRequest = useDebounce(async () => {
    try {
      if (searchTerm && searchTerm.length > 2) {
        setOpen(true);
        setErrors(false);
        const res = await GameNightApi.getSearchResults({ name: searchTerm });
        setBoxResults(res.results);
      }
    } catch (err) {
      console.error('Error:', err)
    };
    setIsLoading(false);
  });

  async function getSearchResults(searchObj) {
    try {
      const { path, item } = searchObj;
      setSearchParam({ [path]: item.id });
      setResultsHeader(item);
      setSearchTerm('');
      setErrors(false);
      setNextResults({});
      setIsLoading(true);
      const res = await GameNightApi.getSearchResults({ [path]: item.id });
      console.log(res)
      setSearchResults(res.results.foundGames);
      setSearchCount(res.count);
      setNextResults({ 1: res.results.foundGames });
    } catch (err) {
      console.error('Error: ', err)
    }
    setIsLoading(false);
  };

  async function getNextResults(page, skipAmount) {
    try {
      setIsLoading(true);
      setErrors(false);
      const res = await GameNightApi.getSearchResults(searchParam, skipAmount);
      const games = res.results.foundGames;
      console.log('next: ', { ...nextResults, [page]: games })
      setNextResults({ ...nextResults, [page]: games });
    } catch (err) {
      console.error('Error: ', err)
      setErrors(true);
    };
    setIsLoading(false);
  };

  const getGameMedia = useCallback(async (gameID) => {
    try {
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
      GameNightApi.cacheGame(completeGame);
    } catch (err) {
      console.error('Error: ', err)
    }
  }, [game]);

  const checkGameCache = useCallback(async (gameID) => {
    try {
      setIsLoading(true);
      const found = await GameNightApi.checkGameCache(gameID);
      if (!found) {
        await getGameMedia(gameID);
      } else {
        setGame(found);
      }
      setOpen(false);
    } catch (err) {
      console.error('Error: ', err)
    }
    setIsLoading(false);
  }, [getGameMedia]);

  const getCollection = useCallback(async () => {
    try {
      setIsLoading(true);
      // Api needs extra commas at beginning and end of string
      const gameIdsStr = `,${Array.from(userGameIDs).join(',')},`;
      const res = await GameNightApi.getCollection({ ids: gameIdsStr });
      setCollection(res.games);
    } catch (err) {
      console.error('Error: ', err)
    }
    setIsLoading(false);
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
          searchTerm,
          setSearchTerm,
          searchResults,
          setSearchResults,
          searchCount,
          boxResults,
          setBoxResults,
          resultsHeader,
          setResultsHeader,
          getSearchResults,
          debouncedRequest,
          nextResults,
          getNextResults,
          errors,
          open,
          setOpen,
          game,
          checkGameCache,
          setGame,
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