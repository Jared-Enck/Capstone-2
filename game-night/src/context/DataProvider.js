import React, { useCallback, useContext, useEffect, useState } from 'react';
import DataContext from './DataContext';
import useDebounce from '../hooks/useDebounce';
import GameNightApi from '../gameNightApi';
import UserContext from './UserContext';

export default function DataProvider({ children }) {
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [boxResults, setBoxResults] = useState({});
  const [searchResults, setSearchResults] = useState({ pages: {} });
  const [resultsHeader, setResultsHeader] = useState('');
  const [game, setGame] = useState('');
  const [colValue, setColValue] = useState(0);
  const [open, setOpen] = useState(false);
  const {
    currentUser,
    navigate,
    collection,
    setCollection,
    userGameIDs,
    setUserGameIDs,
  } = useContext(UserContext);

  const getCommonCache = useCallback(async () => {
    try {
      await GameNightApi.getCommonCache();
    } catch (err) {
      console.error('Error: ', err);
    }
  }, []);

  useEffect(() => {
    getCommonCache();
  }, [getCommonCache]);

  const debouncedRequest = useDebounce(async () => {
    try {
      if (searchTerm && searchTerm.length > 2) {
        setIsLoading(true);
        setOpen(true);
        setErrors(false);
        const res = await GameNightApi.getSearchResults({ name: searchTerm });
        setBoxResults(res.results);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  });

  async function getSearchHeader(id) {
    try {
      const res = await GameNightApi.getHeaderById(id);
      setResultsHeader(res);
    } catch (err) {
      console.error('Error:', err);
    }
  }

  const getSearchResults = useCallback(
    async (searchObj, page = 1, skipAmount) => {
      try {
        setSearchTerm('');
        setErrors(false);
        let res;
        if (skipAmount) {
          res = await GameNightApi.getSearchResults(searchObj, skipAmount);
        } else {
          res = await GameNightApi.getSearchResults(searchObj);
        }
        const pages = {
          ...searchResults.pages,
          [page]: res.results.foundGames,
        };
        const results = { pages, count: res.count };
        setSearchResults(results);
        setIsLoading(false);
      } catch (err) {
        console.error('Error: ', err);
      }
    },
    [searchResults.pages]
  );

  const getGameMedia = useCallback(
    async (gameID) => {
      try {
        const mechanicIDs = game.mechanics.map((m) => m.id);
        const categoryIDs = game.categories.map((m) => m.id);
        const { mechanicsRes, categoriesRes, detail_images, videos } =
          await GameNightApi.getGameMedia(gameID, mechanicIDs, categoryIDs);
        game.mechanics = mechanicsRes;
        game.categories = categoriesRes;
        const completeGame = {
          ...game,
          detail_images,
          videos,
        };
        setGame(completeGame);
        GameNightApi.cacheGame(completeGame);
      } catch (err) {
        console.error('Error: ', err);
      }
    },
    [game]
  );

  const checkGameCache = useCallback(
    async (gameID) => {
      try {
        const found = await GameNightApi.checkGameCache(gameID);
        if (!found) {
          await getGameMedia(gameID);
        } else {
          setGame(found);
        }
        setOpen(false);
      } catch (err) {
        console.error('Error: ', err);
      }
    },
    [getGameMedia]
  );

  const getCollectionValue = (collection) => {
    let total = 0;
    collection.map((g) => (total += g.msrp));
    setColValue(total);
  };

  const getGameIDs = useCallback(async () => {
    try {
      const results = await GameNightApi.getGames(currentUser);
      setUserGameIDs(new Set(results.games));
    } catch (err) {
      console.error('Error: ', err);
    }
  }, [currentUser, setUserGameIDs]);

  useEffect(() => {
    if (currentUser) getGameIDs();
  }, [currentUser, getGameIDs]);

  const getCollection = useCallback(async () => {
    try {
      if (!collection) {
        if (userGameIDs.size) {
          // Third party API requires commas at start and end of string
          const gameIDsStr = `,${[...userGameIDs].join(',')},`;
          const res = await GameNightApi.getCollection(gameIDsStr);
          setCollection([...res.games]);
          getCollectionValue(res.games);
        } else {
          setCollection([]);
          setColValue(0);
        }
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }, [collection, setCollection, userGameIDs]);

  async function addGame(game) {
    try {
      if (currentUser) {
        setIsLoading(true);
        const { id } = game;
        await GameNightApi.addGame({ id, username: currentUser });
        if (!collection) {
          await getCollection();
        }
        setCollection((prev) => [...prev, game]);
        setUserGameIDs((prev) => new Set(prev).add(id));
        setColValue((prev) => (prev += game.msrp));

        console.log(`${game.name} has been added to your collection.`);
        setIsLoading(false);
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  async function removeGame(game) {
    try {
      const { id } = game;
      if (currentUser) {
        await GameNightApi.removeGame({ id, username: currentUser });

        setCollection((prev) => prev.filter((g) => g.id !== id));
        setUserGameIDs((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        setColValue((prev) => (prev -= game.msrp));
        console.log(`${game.name} has been removed from your collection.`);
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  return (
    <DataContext.Provider
      value={{
        isLoading,
        setIsLoading,
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
        boxResults,
        setBoxResults,
        resultsHeader,
        getSearchHeader,
        setResultsHeader,
        getSearchResults,
        debouncedRequest,
        errors,
        open,
        setOpen,
        game,
        checkGameCache,
        setGame,
        getCollection,
        getGameIDs,
        colValue,
        addGame,
        removeGame,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
