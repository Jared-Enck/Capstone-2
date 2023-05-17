import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LinearProgress } from '@mui/material';

const HomeComponent = lazy(
  () => import("./Home")
)

export default function AllRoutes() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        <Route path='*' />
        <Route path='/' element={<HomeComponent />} />
        <Route path='/signup'/>
        <Route path='/login' />
      </Routes>
    </Suspense>
  );
};