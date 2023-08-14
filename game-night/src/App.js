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

const AllRoutesComp = lazy(() => import('./AllRoutes'));

export default function App() {
  const [darkMode, setDarkMode] = useLocalStorage('dark-mode-preferred');
  const isDark = darkMode === 'true';
  return (
    <Suspense fallback={<Background />}>
      <CssBaseline />
      <ThemeProvider theme={isDark ? themeDark : themeLight}>
        <Background />
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
