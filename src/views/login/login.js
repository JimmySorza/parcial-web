import "./styles.css"
import Header from "../header";
import {Link} from "react-router-dom";

function Login() {
    return (
        <div >
         <Header login />
            <div className="loginWrapper">
                <p>Login</p>
                <div className="inputsLogin">
                    <p>Usuario</p>
                    <input/>
                    <p>Contraseña</p>
                    <input/>
                </div>
                <button>
                    Entrar
                </button>
                <Link to="/new-account"><p className="noLogin">Aun no estas registrado? Registrate</p></Link>
            </div>
        </div>
    );
}

export default Login;