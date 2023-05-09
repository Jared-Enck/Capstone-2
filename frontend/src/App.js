import "./App.css";
// import NavBar from "./navBar/NavBar.js";
import AllRoutes from "./AllRoutes";
import PrimaryNavBar from "./general/PrimaryNavBar";
// import UserContextProvider from "./context/UserContextProvider";

export default function App() {
  return (
    <div className="App">
      <PrimaryNavBar />
      <AllRoutes />
    </div>
  );
};