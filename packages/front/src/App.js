import './App.css';
import Home from "./views/home/home";
import { Routes, Route} from 'react-router-dom';
import Login from "./views/login/login";
import Register from "./views/register/register";



function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="login" element={ <Login/> } />
                <Route path="new-account" element={ <Register/> } />
            </Routes>
        </div>
    );
}
export default App;
