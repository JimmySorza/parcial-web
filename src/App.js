import './App.css';
import Home from "./views/home/home";
import { Routes, Route} from 'react-router-dom';
import Login from "./views/login/login";



function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="login" element={ <Login/> } />
            </Routes>
        </div>
    );
}
export default App;
