import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import CircularLoading from './components/CircularLoading';

const HomeComponent = lazy(
  () => import("./components/Home")
)
const LoginComponent = lazy(
  () => import("./components/LoginForm")
)
const SignUpComponent = lazy(
  () => import("./components/SignUpForm")
)
const CollectionComponent = lazy(
  () => import("./components/Collection")
)

export default function AllRoutes() {
  return (
    <Suspense fallback={<CircularLoading />}>
      <Routes>
        <Route path='*' />
        <Route path='/' element={<HomeComponent />} />
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/signup' element={<SignUpComponent />} />
        <Route path='/collection' element={<CollectionComponent />} />
      </Routes>
    </Suspense>
  );
};