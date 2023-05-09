import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './general/NotFoudPage';
import Home from './general/Home';

export default function AllRoutes() {
  return (
    <Routes>
      <Route path='*' element={<NotFoundPage />} />
      <Route path='/' element={<Home />} />
    </Routes>
  );
};