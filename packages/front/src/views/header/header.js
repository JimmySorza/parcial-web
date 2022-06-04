import backLogo from "../../assets/background-logo.svg";
import logo from "../../assets/logo.svg";
import userSolid from "../../assets/user-solid 1.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../utils/constans";
import getLocalUser from "../../utils/getLocalUser";

const Header = () => {
  let navigate = useNavigate();
  const { localUser, isLogged } = getLocalUser();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  useEffect(() => {
    if (localUser && localUser !== "undefined") {
      const fetchData = async () => {
        const response = await axios.get(apiURL + "users/" + localUser.id);
        if (response.data) {
          if (response.data.token === localUser.token) {
            console.log("logged");
          } else {
            handleLogout();
          }
        } else {
          handleLogout();
        }
      };

      fetchData().then();
    }
  }, [apiURL]);
  return (
    <header>
      <img id="bg-logo" src={backLogo} alt="bg-logo" />
      <img onClick={() => navigate("/")} id="logo" src={logo} alt="logo" />
      {!isLogged && (
        <h1>
          <Link to="/login">
            <img src={userSolid} alt="user-icon" />
            Login
          </Link>
        </h1>
      )}
      {isLogged && (
        <>
          <h1>
            <img src={userSolid} alt="user-icon" />
            Hola {localUser.username}
          </h1>
          <div className="logout" onClick={() => handleLogout()}>
            Cerrar Sesión
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
