import React, { Suspense, lazy } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { themeLight, themeDark } from './theme';
import UserProvider from './context/UserProvider';
import DataProvider from './context/DataProvider';
import Navbar from './components/navbar/Navbar';
import { CssBaseline } from '@mui/material';
import useLocalStorage from './hooks/useLocalStorage';
import { Background } from './components/styled';
// import Footer from './components/footer/Footer';

const AllRoutesComp = lazy(() => import('./AllRoutes'));

export default function App() {
  const [darkMode, setDarkMode] = useLocalStorage('dark-mode-preferred');
  const isDark = darkMode === 'true' ? true : false;
  return (
    <Suspense fallback={<Background />}>
      <CssBaseline />
      <Background />
      <ThemeProvider theme={isDark ? themeDark : themeLight}>
        <UserProvider
          isDark={isDark}
          setDarkMode={setDarkMode}
        >
          <DataProvider>
            <Navbar />
            <main>
              <AllRoutesComp />
            </main>
          </DataProvider>
        </UserProvider>
      </ThemeProvider>
    </Suspense>
  );
}
