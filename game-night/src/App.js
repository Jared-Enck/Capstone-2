import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { themeLight, themeDark } from './theme';
import UserProvider from './context/UserProvider';
import DataProvider from './context/DataProvider';
import Navbar from './components/navbar/Navbar';
import AllRoutes from './AllRoutes';
import { CssBaseline } from '@mui/material';
import useLocalStorage from './hooks/useLocalStorage';
import bgImage from './static/aksel-fristrup-w7eaCH6ShR4-unsplash.jpg';
import styled from '@emotion/styled';
// import Footer from "./components/Footer";

const Background = styled('div')({
  position: 'fixed',
  backgroundImage: `url(${bgImage})`,
  width: '100%',
  height: '100%',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  zIndex: -1,
});

export default function App() {
  const [darkMode, setDarkMode] = useLocalStorage('dark-mode-preferred');
  const isDark = darkMode === 'true' ? true : false;
  return (
    <UserProvider
      isDark={isDark}
      setDarkMode={setDarkMode}
    >
      <ThemeProvider theme={isDark ? themeDark : themeLight}>
        <CssBaseline />
        <DataProvider>
          <Navbar />
          <Background />
          <main>
            <AllRoutes />
          </main>
        </DataProvider>
        {/* <Footer /> */}
      </ThemeProvider>
    </UserProvider>
  );
}
