import React from "react";
import './App.css';
import { ThemeProvider } from "@mui/material/styles";
import { themeLight, themeDark } from "./theme";
import UserProvider from "./context/UserProvider";
import DataProvider from "./context/DataProvider";
import Navbar from "./components/navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { CssBaseline } from "@mui/material";
import useLocalStorage from "./hooks/useLocalStorage";
// import Footer from "./components/Footer";

export default function App() {
  const [darkMode, setDarkMode] = useLocalStorage("dark-mode-preferred");
  const isDark = darkMode === "true" ? true : false;
  return (
    <UserProvider isDark={isDark} setDarkMode={setDarkMode}>
      <ThemeProvider theme={isDark ? themeDark : themeLight}>
        <CssBaseline />
        <DataProvider>
          <Navbar />
          <main>
            <AllRoutes />
          </main>
        </DataProvider>
        {/* <Footer /> */}
      </ThemeProvider>
    </UserProvider>
  );
};