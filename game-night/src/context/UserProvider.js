import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import GameNightApi from '../gameNightApi';
import useLocalStorage from '../hooks/useLocalStorage';
import jwt_decode from 'jwt-decode';

export const TOKEN_STORAGE_ID = 'game-night-token';

export default function UserProvider({ children, isDark, setDarkMode }) {
  const [currentUser, setCurrentUser] = useState('');
  const [userData, setUserData] = useState('');
  const [collection, setCollection] = useState('');
  const [userGameIDs, setUserGameIDs] = useState('');
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const navigate = useNavigate();

  const saveToken = useCallback(() => {
    GameNightApi.token = token;
    const { username } = jwt_decode(token);
    setCurrentUser(username);
  }, [token, setCurrentUser]);

  useEffect(() => {
    if (token) saveToken();
  }, [token, saveToken]);

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
    }
  }

  async function loginUser(loginData) {
    try {
      let token = await GameNightApi.login(loginData);
      setToken(token);
      return { msg: 'success' };
    } catch (err) {
      console.log(err);
      return { msg: err };
    }
  }

  async function updateUser(formData, username) {
    try {
      const result = await GameNightApi.updateUser(formData, username);
      const user = result.user;
      if (result.token) {
        setToken(result.token);
        navigate(`/profile/${user.username}`);
      }
      setUserData({ ...user });
    } catch (err) {
      console.log(err);
      return { msg: err };
    }
  }

  const logout = useCallback(() => {
    GameNightApi.token = '';
    setCurrentUser('');
    setToken('');
    setUserData('');
    setCollection('');
    setUserGameIDs('');
    navigate('/login');
  }, [setToken, navigate]);

  async function getCurrentUser(username) {
    try {
      const user = await GameNightApi.getCurrentUser(username);
      setUserData(user);
    } catch (err) {
      console.error('Error: ', err);
      if (err[0] === 'Unauthorized') {
        return logout();
      }
    }
  }

  return (
    <UserContext.Provider
      value={{
        token,
        currentUser,
        getCurrentUser,
        collection,
        setCollection,
        userGameIDs,
        setUserGameIDs,
        userData,
        registerUser,
        loginUser,
        updateUser,
        logout,
        handleThemeToggle,
        isDark,
        navigate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
