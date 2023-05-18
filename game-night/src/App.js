import React from "react";
import './App.css';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import UserProvider from "./context/UserProvider";
import Navbar from "./components/Navbar";
import AllRoutes from "./AllRoutes";
// import Footer from "./components/Footer";

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Navbar />
        <main>
          <AllRoutes />
        </main>
      </ThemeProvider>
      {/* <Footer /> */}
    </UserProvider>
  );
};