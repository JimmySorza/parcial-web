import "./styles.css"
import Header from "../header";
import {Link} from "react-router-dom";

function Register() {
    return (
        <div className="container">
         <Header login />
            <div className="registerWrapper">
                <p>Registro Nuevo Usuario</p>
                <div className="inputsLogin">
                    <p>Usuario</p>
                    <input/>
                    <p>Nueva Contraseña</p>
                    <input/>
                    <p>Repite tu nueva contraseña</p>
                    <input/>
                </div>
                <button>
                    Entrar
                </button>
                <Link to={"/login"}>
                    <p className="noLogin">Ya estas registrado?</p>
                </Link>
            </div>
        </div>
    );
}

export default Register;