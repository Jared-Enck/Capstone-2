import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import GameNightApi from '../gameNightApi';
import useLocalStorage from '../hooks/useLocalStorage';
import jwt_decode from 'jwt-decode';

export const TOKEN_STORAGE_ID = 'game-night-token';

export default function UserProvider({ children, isDark, setDarkMode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState('');
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

  const saveToken = useCallback(() => {
    GameNightApi.token = token;
    const { username } = jwt_decode(token);
    setCurrentUser(username);
  }, [token, setCurrentUser]);

  async function updateUser(formData, username) {
    try {
      const result = await GameNightApi.updateUser(formData, username);
      const user = result.user;
      if (result.token) {
        setToken(result.token);
        saveToken();
        navigate(`/profile/${user.username}`);
      }
      setUserData({ ...user });
    } catch (err) {
      console.log(err);
      return { msg: err };
    }
  }

  const logout = () => {
    GameNightApi.token = '';
    setCurrentUser('');
    setToken('');
  };

  const getCurrentUser = useCallback(
    async (username) => {
      try {
        const user = await GameNightApi.getCurrentUser(username);
        setUserData(user);
      } catch (err) {
        console.error('Error: ', err);
      }
    },
    [setUserData]
  );

  useEffect(() => {
    if (token) {
      saveToken();
    }
  }, [token, saveToken]);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        setIsLoading,
        currentUser,
        getCurrentUser,
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
