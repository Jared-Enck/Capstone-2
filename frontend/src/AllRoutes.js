import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './NotFoudPage';
import Home from './Home';
import SignUpForm from './user/SignUpForm';
import LoginForm from './user/LoginForm';

export default function AllRoutes() {
  return (
    <Routes>
      <Route path='*' element={<NotFoundPage />} />
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUpForm />} />
      <Route path='/login' element={<LoginForm />} />
    </Routes>
  );
};