import backLogo from "../assets/background-logo.svg";
import logo from "../assets/logo.svg";
import userSolid from "../assets/user-solid 1.svg";
import {Link, useNavigate} from "react-router-dom";


const Header = ({login}) => {
    let navigate = useNavigate();

    return (
        <header>
            <img  id="bg-logo" src={backLogo} alt="bg-logo" />
            <img onClick={()=> navigate("/")} id="logo" src={logo} alt="logo" />
            {!login && <h1><Link to="login"><img src={userSolid} alt="user-icon"/>Login</Link></h1>}
        </header>
    );
}

export default Header;