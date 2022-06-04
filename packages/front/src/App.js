import "./App.css";
import Home from "./views/home/home";
import { Routes, Route } from "react-router-dom";
import Login from "./views/login/login";
import Register from "./views/register/register";
import Booking from "./views/booking/booking";
import History from "./views/history/history";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="new-account" element={<Register />} />
        <Route path="booking" element={<Booking />} />
        <Route path="history" element={<History />} />
      </Routes>
    </div>
  );
}
export default App;
