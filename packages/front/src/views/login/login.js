import "./styles.css"
import Header from "../header";
import {Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import {useEffect, useState} from "react";

const schema = yup.object().shape({
    username: yup.string().min(5, 'El nombre de usuario debe ser de al menos 5 caracteres').required(),
    password: yup.string().min(3, 'La contraseña debe ser de al menos 3 caracteres').max(10, 'Maximo de 10 caracteres').required(),
});
const urlApi = 'http://localhost:3000/'
function Login() {
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)
    let localUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null


    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(()=>{
        if (localUser){
            console.log({localUser})
            const fetchData = async () => {
                const response = await axios.get(urlApi+'users/'+localUser.id);
                console.log({response})
                if (response.data){
                    console.log('usuario obtenido')
                   if (response.data.token === localUser.token){
                       console.log('token iguales')
                   } else {
                       console.log('cierra sesion')
                   }
                } else {
                    console.log('cierra sesion')
                }
            }

            fetchData().then();
        }
    })

    const onSubmitHandler = async (data) => {
        const params = {
           "filter":{
               "offset": 0,
               "limit": 100,
               "skip": 0,
               "order": "string",
               "where": {
                   "username": data.username
               },
               "fields": {
                   "id": true,
                   "username": true,
                   "password": true
               }
           }
        }
        try {
            const response = await axios.get(urlApi+'users', {params});
            console.log(response.data);
            if (response.data.length === 0){
                setError("El usuario no existe")
            } else {
                await setUser(response.data[0])
                const userGot = response.data[0]
                if(response.data[0].password === data.password){
                    console.log('Acceso concedido')
                    const token = Math.random().toString(36).substr(2)
                    console.log({user})
                    userGot.token = token
                    const setToken = await axios.put(urlApi + 'users/'+ userGot.id, userGot)
                    console.log({setToken})
                    if (setToken.status === 204){
                        console.log('token seteado')
                        localStorage.setItem('user', JSON.stringify(userGot));
                    }else {
                        console.log('error al guardar sesion')
                    }
                    setError(null)
                } else {
                    setError("Contraseña erronea")
                }
            }
        } catch (error) {
            console.error(error);
        }
        reset();
    };
    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
         <Header login />
            <div className="loginWrapper">
                <p>Login</p>
                {error && <p className="errorMessage">{error}</p>}
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
                </div>

                <button type="submit">
                    Entrar
                </button>
                <Link to="/new-account"><p className="noLogin">Aun no estas registrado? Registrate</p></Link>
            </div>
        </form>
    );
}

export default Login;