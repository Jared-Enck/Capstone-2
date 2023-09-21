import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import GameNightApi from '../GameNightApi';
import useLocalStorage from '../hooks/useLocalStorage';
import jwt_decode from 'jwt-decode';

export const TOKEN_STORAGE_ID = 'game-night-token';

// Provides UserContext to children
export default function UserProvider({ children, isDark, setDarkMode }) {
  const [currentUser, setCurrentUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState('');
  const [collection, setCollection] = useState('');
  const [userGameIDs, setUserGameIDs] = useState('');
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const navigate = useNavigate();

  /** Saves token from login or register
   *
   * set GameNightApi.token
   *
   * decodes token and sets currentUser to username
   */
  const saveToken = useCallback(() => {
    GameNightApi.token = token;
    const { username } = jwt_decode(token);
    setCurrentUser(username);
  }, [token, setCurrentUser]);

  useEffect(() => {
    if (token) saveToken();
    setIsLoading(false);
  }, [token, saveToken]);

  const handleThemeToggle = () => {
    setDarkMode(`${!isDark}`);
  };

  /** Sends request to register a user
   *
   * @param {*} registerData { username, password, email }
   *
   * then sets token
   */
  async function registerUser(registerData) {
    try {
      let { token } = await GameNightApi.register(registerData);
      setToken(token);
    } catch (err) {
      return { err };
    }
  }

  /** Sends request to login a user
   *
   * @param {*} loginData { username, password }
   *
   * then sets token
   */
  async function loginUser(loginData) {
    try {
      let { token } = await GameNightApi.login(loginData);
      setToken(token);
    } catch (err) {
      return { err };
    }
  }

  /** Sends request to update a user
   *
   * @param {*} formData
   * @param {*} username
   *
   * then sets token
   *
   * and sets userData to result.user
   *
   * userData = { ...user }
   */
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

  // Logout user and clear data, navigates to home
  const logout = useCallback(() => {
    GameNightApi.token = '';
    setCurrentUser('');
    setToken('');
    setUserData('');
    setCollection('');
    setUserGameIDs('');
    navigate('/');
  }, [setToken, navigate]);

  /** Gets userData based on username
   *
   * @param {*} username
   */
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

  // Delete user from db
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
        isLoading,
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
