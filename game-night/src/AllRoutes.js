import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import CircularLoading from './components/CircularLoading';

const HomeComponent = lazy(
  () => import("./components/Home")
)

export default function AllRoutes() {
  return (
    <Suspense fallback={<CircularLoading />}>
      <Routes>
        <Route path='*' />
        <Route path='/' element={<HomeComponent />} />
        <Route path='/signup'/>
        <Route path='/login' />
      </Routes>
    </Suspense>
  );
};