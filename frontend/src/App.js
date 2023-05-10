import "./App.css";
// import NavBar from "./navBar/NavBar.js";
import AllRoutes from "./AllRoutes";
import PrimaryNavBar from "./PrimaryNavBar";
import UserProvider from "./context/UserProvider";

export default function App() {
  return (
    <div className="App">
      <UserProvider>
        <PrimaryNavBar />
        <AllRoutes />
      </UserProvider>
    </div>
  );
};