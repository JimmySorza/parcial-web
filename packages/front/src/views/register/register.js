import "./styles.css";
import Header from "../header";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { apiURL } from "../../utils/constans";
import tokenGenerator from "../../utils/token-generator";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(5, "El nombre de usuario debe ser de al menos 5 caracteres")
    .required(),
  password: yup
    .string()
    .min(3, "La contraseña debe ser de al menos 3 caracteres")
    .max(10, "Maximo de 10 caracteres")
    .required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir"),
});

function Register() {
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = async (data) => {
    setError(null);
    const params = {
      filter: {
        offset: 0,
        limit: 100,
        skip: 0,
        order: "string",
        where: {
          username: data.username,
        },
        fields: {
          id: true,
          username: true,
          password: true,
        },
      },
    };
    try {
      const response = await axios.get(apiURL + "users", { params });
      if (response.data.length === 0) {
        const token = tokenGenerator(data.username);
        const { username, password } = data;
        const createUser = await axios.post(apiURL + "users", {
          username,
          password,
          token,
        });
        if (createUser.status === 200 && createUser.data.length !== 0) {
          localStorage.setItem("user", JSON.stringify(createUser.data));
          navigate("/booking");
        }
      } else {
        setError("El usuario ya existe, por favor inicia sesión");
      }
    } catch (error) {
      console.error(error);
    }
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Header login />
      <div className="registerWrapper">
        <p>Registro Nuevo Usuario</p>
        <div className="inputsLogin">
          <p>Usuario</p>
          <input {...register("username")} placeholder="username" required />
          <p className="errorMessage">{errors.username?.message}</p>
          <p>Contraseña</p>
          <input
            {...register("password")}
            placeholder="password"
            type="password"
            required
          />
          <p className="errorMessage">{errors.password?.message}</p>
          <p>Confirma tu nueva contraseña</p>
          <input
            {...register("passwordConfirm")}
            placeholder="Confirma contraseña"
            type="password"
            required
          />
          <p className="errorMessage">{errors.passwordConfirm?.message}</p>
        </div>
        {error && <p className="errorMessage">{error}</p>}
        <button type="submit">Registrar</button>
        <Link to={"/login"}>
          <p className="noLogin">Ya estas registrado?</p>
        </Link>
      </div>
    </form>
  );
}

export default Register;
