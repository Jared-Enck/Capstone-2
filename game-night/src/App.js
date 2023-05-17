import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Navbar from "./components/Navbar";
import AllRoutes from "./AllRoutes";
// import Footer from "./components/Footer";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <AllRoutes />
      {/* <Footer /> */}
    </ThemeProvider>
  );
};