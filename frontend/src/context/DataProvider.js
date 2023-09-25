import React, { useCallback, useContext, useEffect, useState } from 'react';
import DataContext from './DataContext';
import useDebounce from '../hooks/useDebounce';
import GameNightApi from '../GameNightApi';
import UserContext from './UserContext';

// Provides DataContext for children
export default function DataProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [boxResults, setBoxResults] = useState('');
  const [hotGames, setHotGames] = useState([]);
  const [searchResults, setSearchResults] = useState({ pages: {} });
  const [resultsHeader, setResultsHeader] = useState('');
  const [game, setGame] = useState('');
  const [videos, setVideos] = useState('');
  const [nextPageToken, setNextPageToken] = useState('');
  const [colValue, setColValue] = useState(0);
  const [open, setOpen] = useState(false);
  const {
    currentUser,
    collection,
    setCollection,
    userGameIDs,
    setUserGameIDs,
  } = useContext(UserContext);

  // Check cache for hot games
  const getHotCache = useCallback(async () => {
    try {
      const hotness = await GameNightApi.getHotCache();
      setHotGames(hotness);
    } catch (err) {
      console.error('Error: ', err);
    }
  }, []);

  const debouncedRequest = useDebounce(async () => {
    try {
      if (searchTerm && searchTerm.length > 2) {
        setIsLoading(true);
        setOpen(true);
        // GET request to API for search results
        const results = await GameNightApi.getSearchResults({
          query: searchTerm,
        });
        setBoxResults(results);
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
  // const getGameMedia = useCallback(
  //   async (gameID) => {
  //     try {
  //       const mechanicIDs = game.mechanics.map((m) => m.id);
  //       const categoryIDs = game.categories.map((m) => m.id);
  //       const { mechanicsRes, categoriesRes, detail_images, videos } =
  //         await GameNightApi.getGameMedia(gameID, mechanicIDs, categoryIDs);
  //       game.mechanics = mechanicsRes;
  //       game.categories = categoriesRes;
  //       const completeGame = {
  //         ...game,
  //         detail_images,
  //         videos,
  //       };
  //       setGame(completeGame);
  //       GameNightApi.cacheGame(completeGame);
  //     } catch (err) {
  //       console.error('Error: ', err);
  //     }
  //   },
  //   [game]
  // );

  /** Check cache for game
   *
   * @param {*} game string
   *
   * if not found, call getGameMedia with gameID
   *
   */
  const checkGameCache = useCallback(async (gameID) => {
    try {
      const res = await GameNightApi.checkGameCache(gameID);
      setGame(res);
      if (res !== -1) setVideos(res.videos.items);
    } catch (err) {
      console.error('Error: ', err);
    }
  }, []);

  async function getVideos(nextPageToken = '') {
    try {
      const videosRequest = {
        title: game.name,
        nextPageToken: nextPageToken,
      };
      setIsLoading(true);
      const res = await GameNightApi.getVideos(videosRequest);
      setVideos((prev) => [...prev, ...res.items]);
      setNextPageToken(res.nextPageToken);
      setIsLoading(false);
    } catch (err) {
      console.error('Error: ', err);
    }
  }

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
          const gameIDsStr = `${[...userGameIDs].join(',')}`;
          const res = await GameNightApi.getCollection(gameIDsStr);
          setCollection(Array.isArray(res) ? res : [res]);
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
      const gameID = game.objectid;
      // POST request to server
      await GameNightApi.addGame({ gameID, username: currentUser });
      // if collection is not set yet, call getCollection
      if (!collection) {
        await getCollection();
      }
      setCollection((prev) => [...prev, game]);
      setUserGameIDs((prev) => new Set(prev).add(gameID));
      // setColValue((prev) => (prev += game.msrp));
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
      const gameID = game.objectid;
      if (currentUser) {
        await GameNightApi.removeGame({ gameID, username: currentUser });

        setCollection((prev) => prev.filter((g) => g.objectid !== gameID));
        setUserGameIDs((prev) => {
          const next = new Set(prev);
          next.delete(gameID);
          return next;
        });
        // setColValue((prev) => (prev -= game.msrp));
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
        videos,
        getVideos,
        nextPageToken,
        checkGameCache,
        setGame,
        getCollection,
        getGameIDs,
        colValue,
        addGame,
        removeGame,
        hotGames,
        getHotCache,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
