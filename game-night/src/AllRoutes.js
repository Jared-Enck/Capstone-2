import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import CircularLoading from './components/common/CircularLoading';

const NotFoundComponent = lazy(
  () => import("./NotFound")
);
const HomeComponent = lazy(
  () => import("./components/Home")
);
const LoginComponent = lazy(
  () => import("./components/account/LoginForm")
);
const SignUpComponent = lazy(
  () => import("./components/account/SignUpForm")
);
const CollectionComponent = lazy(
  () => import("./components/games/Collection")
);
const SearchResultsPageComponent = lazy(
  () => import("./components/search/SearchResultsPage")
);
const GameDetailsComponent = lazy(
  () => import("./components/games/GameDetailsPage")
);

export default function AllRoutes() {
  return (
    <Suspense fallback={<CircularLoading size={"2rem"} />}>
      <Routes>
        <Route path='*' element={<NotFoundComponent />} />
        <Route path='/' element={<HomeComponent />} />
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/signup' element={<SignUpComponent />} />
        <Route path='/collection' element={<CollectionComponent />} />
        <Route
          path='/search/results'
          element={<SearchResultsPageComponent />}
        />
        <Route
          path='/games/:id'
          element={<GameDetailsComponent />}
        />
      </Routes>
    </Suspense>
  );
};