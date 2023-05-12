import "./App.css";
import AllRoutes from "./AllRoutes";
import PrimaryAppBar from "./nav/PrimaryAppBar";
import UserProvider from "./context/UserProvider";

export default function App() {
  return (
    <div className="App">
      <UserProvider>
        <PrimaryAppBar />
        <AllRoutes />
      </UserProvider>
    </div>
  );
};