import React, {
  useState, 
  useEffect, 
  useCallback, 
  useMemo 
} from "react";
import { useNavigate } from "react-router-dom"
import UserContext from "./UserContext";
import GameNightApi from "../gameNightApi";
import useLocalStorage from '../hooks/useLocalStorage';
import jwt_decode from "jwt-decode";

export const TOKEN_STORAGE_ID = "game-night-token";

export default function UserProvider({children, isDark, setDarkMode}) {
  const [currentUser, setCurrentUser] = useState('');
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [gameToAdd, setGameToAdd] = useState('');
  const [userGames, setUserGames] = useState(new Set());
  const [games, setGames] = useState('');
  const navigate = useNavigate();

  const handleThemeToggle = () => {
    setDarkMode(`${!isDark}`);
  };

  const addGame = useCallback(async () => {
    if (gameToAdd) {
      try{
        const username = currentUser.username;
        await GameNightApi.addGame(gameToAdd, username);
        const { games } = await GameNightApi.getGames(username);
        setUserGames(new Set(games));
      } catch (err) {
        console.error('unable to add game', err)
      }
    }
  },[gameToAdd]);

  useEffect(() => {
    addGame();
    setGameToAdd('');
  },[gameToAdd, addGame]);

  const getCollection = useCallback(async () => {
    if (userGames.size) {
      // Api needs extra commas at beginnin and end of string
      const gameIdsStr = `,${Array.from(userGames).join(',')},`;
      const res = await GameNightApi.getCollection({ids: gameIdsStr});
      setGames(res.games);
    }
  },[userGames]);

  async function registerUser(registerData) {
    try {
        let token = await GameNightApi.register(registerData);
        setToken(token);
        return { success: true };
      } catch (err) {
      console.error('register failed', err);
      return { success: false, err};
    };
  };

  async function loginUser(loginData) {
    try {
        let token = await GameNightApi.login(loginData);
        setToken(token);
        return { success: true };
      } catch (err) {
      console.log(err);
      return { success: false, err};
    };
  };

  const logout = () => {
    setCurrentUser('');
    setUserGames('');
    setToken('');
    navigate('/');
  }

  const getCurrentUser = useCallback(async () => {
    if (token) {
      try {
        const { username } = jwt_decode(token);
        GameNightApi.token = token;
        const { user } = await GameNightApi.getCurrentUser(username);
        const { games } = await GameNightApi.getGames(username);
        setCurrentUser(user);
        setUserGames(new Set(games));
        navigate('/');
      } catch (err) {
        console.log(err);
        setCurrentUser('');
      };
    };
  },[token]);

  useEffect(() => {
    getCurrentUser();
  },[token, getCurrentUser]);

  // const onHomepage = window.location.pathname === '/';

  return (
    <UserContext.Provider
      value={
        {
          currentUser,
          registerUser,
          loginUser,
          logout,
          handleThemeToggle,
          isDark,
          setGameToAdd,
          userGames,
          setUserGames,
          getCollection,
          games
        }
      }
    >
      { children }
    </UserContext.Provider>
  );
};