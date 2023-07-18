import React, {
  useEffect,
  useState
} from "react";
import { useNavigate } from "react-router-dom"
import UserContext from "./UserContext";
import GameNightApi from "../gameNightApi";
import useLocalStorage from '../hooks/useLocalStorage';
import jwt_decode from "jwt-decode";

export const TOKEN_STORAGE_ID = "game-night-token";

export default function UserProvider({ children, isDark, setDarkMode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState('');
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState('');
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const navigate = useNavigate();

  const handleThemeToggle = () => {
    setDarkMode(`${!isDark}`);
  };

  async function registerUser(registerData) {
    try {
      let token = await GameNightApi.register(registerData);
      setToken(token);
      return { msg: 'success' };
    } catch (err) {
      console.error('register failed', err);
      return { msg: err };
    };
  };

  async function loginUser(loginData) {
    try {
      let token = await GameNightApi.login(loginData);
      setToken(token);
      return { msg: 'success' };
    } catch (err) {
      console.log(err);
      return { msg: err };
    };
  };

  const logout = () => {
    GameNightApi.token = '';
    setCurrentUser('');
    setToken('');
    setUserData('');
  }

  useEffect(() => {
    async function getCurrentUser(username) {
      try {
        setIsLoading(true);
        const user = await GameNightApi.getCurrentUser(username);
        setUserData(user);
      } catch (err) {
        console.error('Error: ', err);
      };
      setIsLoading(false);
    };
    if (username) getCurrentUser(username);
  }, [username])

  useEffect(() => {
    if (token) {
      GameNightApi.token = token;
      const { username } = jwt_decode(token);
      setCurrentUser(username);
    }
    setIsLoading(false);
  }, [token]);

  return (
    <UserContext.Provider
      value={
        {
          isLoading,
          setIsLoading,
          currentUser,
          setUsername,
          userData,
          registerUser,
          loginUser,
          logout,
          handleThemeToggle,
          isDark,
          navigate
        }
      }
    >
      {children}
    </UserContext.Provider>
  );
};