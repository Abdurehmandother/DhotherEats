import "./App.css";
import AppRoutes from "./components/AppRoutes";
import Navbar from "./components/Header/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
