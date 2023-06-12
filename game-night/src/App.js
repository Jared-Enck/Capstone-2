import React, { useState } from "react";
import './App.css';
import { ThemeProvider } from "@mui/material/styles";
import { themeLight, themeDark } from "./theme";
import UserProvider from "./context/UserProvider";
import DataProvider from "./context/DataProvider";
import Navbar from "./components/navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { CssBaseline } from "@mui/material";
// import Footer from "./components/Footer";

export default function App() {
  const [light, setLight] = useState(false);
  return (
    <UserProvider setLight={setLight}>
      <ThemeProvider theme={light ? themeLight : themeDark}>
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