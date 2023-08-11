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
      let { token } = await GameNightApi.register(registerData);
      setToken(token);
    } catch (err) {
      return { err };
    }
  }

  async function loginUser(loginData) {
    try {
      let { token } = await GameNightApi.login(loginData);
      setToken(token);
    } catch (err) {
      return { err };
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
    navigate('/');
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

  async function deleteUser() {
    try {
      const result = await GameNightApi.deleteUser(currentUser);
      return result;
    } catch (err) {
      console.error('Error: ', err);
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
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
