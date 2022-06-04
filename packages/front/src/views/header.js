import backLogo from "../assets/background-logo.svg";
import logo from "../assets/logo.svg";
import userSolid from "../assets/user-solid 1.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { apiURL } from "../utils/constans";

const Header = () => {
  let navigate = useNavigate();
  let localUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleLogout = () => {
    console.log("entra?");
    localStorage.removeItem("user");
    navigate("/");
  };
  useEffect(() => {
    console.log({ apiURL });
    if (localUser) {
      console.log({ localUser });
      const fetchData = async () => {
        const response = await axios.get(apiURL + "users/" + localUser.id);
        console.log({ response });
        if (response.data) {
          console.log("usuario obtenido");
          if (response.data.token === localUser.token) {
            console.log("token iguales");
            navigate("/booking");
          } else {
            console.log("cierra sesion");
          }
        } else {
          console.log("cierra sesion");
        }
      };

      fetchData().then();
    }
  }, [apiURL]);
  return (
    <header>
      <img id="bg-logo" src={backLogo} alt="bg-logo" />
      <img onClick={() => navigate("/")} id="logo" src={logo} alt="logo" />
      {!localUser && (
        <h1>
          <Link to="/login">
            <img src={userSolid} alt="user-icon" />
            Login
          </Link>
        </h1>
      )}
      {localUser && (
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
