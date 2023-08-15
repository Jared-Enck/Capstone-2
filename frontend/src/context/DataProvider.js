import React, { useCallback, useContext, useEffect, useState } from 'react';
import DataContext from './DataContext';
import useDebounce from '../hooks/useDebounce';
import GameNightApi from '../gameNightApi';
import UserContext from './UserContext';

// Provides DataContext for children
export default function DataProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [boxResults, setBoxResults] = useState('');
  const [searchResults, setSearchResults] = useState({ pages: {} });
  const [resultsHeader, setResultsHeader] = useState('');
  const [game, setGame] = useState('');
  const [colValue, setColValue] = useState(0);
  const [open, setOpen] = useState(false);
  const {
    currentUser,
    collection,
    setCollection,
    userGameIDs,
    setUserGameIDs,
  } = useContext(UserContext);

  useEffect(() => {
    // GET request for mechanics and categories, then set cache
    async function getCommonCache() {
      try {
        await GameNightApi.getCommonCache();
      } catch (err) {
        console.error('Error: ', err);
      }
    }
    getCommonCache();
  }, []);

  const debouncedRequest = useDebounce(async () => {
    try {
      if (searchTerm && searchTerm.length > 2) {
        setIsLoading(true);
        setOpen(true);
        // GET request to API for search results
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
      // GET request, checks cached mechanics/categories for id
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
        let res;
        if (skipAmount) {
          res = await GameNightApi.getSearchResults(searchObj, skipAmount);
        } else {
          res = await GameNightApi.getSearchResults(searchObj);
        }
        // set search results pages for pagination
        const pages = {
          ...searchResults.pages,
          [page]: res.results.foundGames,
        };
        const results = { pages, count: res.count };
        setSearchResults(results);
      } catch (err) {
        console.error('Error: ', err);
      }
    },
    [searchResults.pages]
  );

  /** Get game media based on gameID
   * @param {*} gameID string
   *
   * GET mechanic and category info from cache
   * GET request to API for images and videos
   * 
   * caches completeGame obj
   * 
   * where completeGame = {
          ...game,
          detail_images,
          videos,
        }
   */
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

  /** Check cache for game
   *
   * @param {*} gameID string
   *
   * if not found, call getGameMedia with gameID
   *
   */
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

  /** Calculate collection value
   * @param {*} collection [ game, ...]
   *
   * maps collection and setColValue with total
   */
  const getCollectionValue = (collection) => {
    let total = 0;
    collection.map((g) => (total += g.msrp));
    setColValue(total);
  };

  // GET gameIDs for currentUser
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

  /** Get game data for each game in collection
   *
   * formats userGameIDs to string
   */
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

  /** Add game to currentUser collection
   *
   * @param {*} game
   *
   * will get collection if not set
   *
   * then update collection, userGameIDs, and colValue
   *  with added game
   */
  async function addGame(game) {
    try {
      setIsLoading(true);
      const { id } = game;
      // POST request to server
      await GameNightApi.addGame({ id, username: currentUser });
      // if collection is not set yet, call getCollection
      if (!collection) {
        await getCollection();
      }
      setCollection((prev) => [...prev, game]);
      setUserGameIDs((prev) => new Set(prev).add(id));
      setColValue((prev) => (prev += game.msrp));
      setIsLoading(false);
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  /** Remove game from currentUser collection
   *
   * @param {*} game
   *
   * then update collection, userGameIDs, and colValue
   *  with removed game
   */
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
