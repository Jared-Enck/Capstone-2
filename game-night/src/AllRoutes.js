import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserContext from './context/UserContext';
import NotFound from './components/NotFound';
import Home from './components/Home';
import LoginForm from './components/account/LoginForm';
import SignUpForm from './components/account/SignUpForm';
import Profile from './components/account/Profile';
import SearchResultsPage from './components/search/SearchResultsPage';
import GameDetailsPage from './components/games/GameDetailsPage';

export default function AllRoutes() {
  const { loginUser, registerUser } = useContext(UserContext);
  return (
    <Routes>
      <Route
        path='*'
        element={<NotFound />}
      />
      <Route
        path='/'
        element={<Home />}
      />
      <Route
        path='/login'
        element={<LoginForm loginUser={loginUser} />}
      />
      <Route
        path='/signup'
        element={<SignUpForm registerUser={registerUser} />}
      />
      <Route
        path='/profile/:username'
        element={<Profile itemsOnPage={9} />}
      />
      <Route
        path='search/:path/:id'
        element={<SearchResultsPage itemsOnPage={30} />}
      />
      <Route
        path='/games/:id'
        element={<GameDetailsPage />}
      />
    </Routes>
  );
}
