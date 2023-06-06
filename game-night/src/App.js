import React from "react";
import './App.css';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import UserProvider from "./context/UserProvider";
import DataProvider from "./context/DataProvider";
import Navbar from "./components/navbar/Navbar";
import AllRoutes from "./AllRoutes";
// import Footer from "./components/Footer";

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <DataProvider>
          <Navbar />
          <main>
            <AllRoutes />
          </main>
        </DataProvider>
      </ThemeProvider>
      {/* <Footer /> */}
    </UserProvider>
  );
};