import React, {
  useState, 
  useEffect, 
  useCallback, 
  useMemo 
} from "react";
// import { useNavigate } from "react-router-dom"
import UserContext from "./UserContext";
import GameNightApi from "../api";
import useLocalStorage from '../hooks/useLocalStorage';
import jwt_decode from "jwt-decode";
import LoadingSpinner from '../common/LoadingSpinner';

export const TOKEN_STORAGE_ID = "game-night-token";

export default function UserProvider({children}) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState('');
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  // const navigate = useNavigate();

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

  const getCurrentUser = useCallback(async () => {
    if (token) {
      try {
        const {id} = jwt_decode(token);
        GameNightApi.token = token;
        const user = await GameNightApi.getCurrentUser(id);
        setCurrentUser(user);
        // navigate('/');
      } catch (err) {
        console.log(err);
        setCurrentUser('');
      };
    };
    setIsLoading(false);
  },[token]);

  useEffect(() => {
    setIsLoading(true);
    getCurrentUser();
  },[token, getCurrentUser]);

  const onHomepage = window.location.pathname === '/';

  if (isLoading && !onHomepage) return <LoadingSpinner />;

  return (
    <UserContext.Provider
      value={
        {
          setIsLoading,
          currentUser,
          registerUser,
          loginUser
        }
      }
    >
      { children }
    </UserContext.Provider>
  );
};