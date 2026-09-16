import { createContext, useState } from "react";
import api from "../Services/Axios.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import authService from "../Services/AuthServices";


export const AuthContext = createContext();


export const AuthProvider = ({children}) => {

    const [token,setToken] = useState(
        localStorage.getItem("token") || ""
    );

    const navigate = useNavigate();


    const register = async(name,email,password)=>{

        try {

            const response=await authService.register(name,email,password)
        

                const token = response.data.token;

                setToken(token);

                localStorage.setItem(
                    "token",
                    token
                );

            return response


        } catch(error){

           
           throw error
           
           
        }
    }



    const login = async(email,password)=>{

        try {

            const response = await authService.login(
                    email,
                    password
                
            );



            

                const token=response.data.token;

                setToken(token);

                localStorage.setItem(
                    "token",
                    token
                );
            
                return response

        } catch(error){

            throw error
        }

    }



    const logout=()=>{

         authService.logout()

        setToken("");

        navigate("/login");
    }






    return (

        <AuthContext.Provider
        value={{
            token,
            setToken,
            login,
            register,
            logout
        }}
        >

            {children}

        </AuthContext.Provider>

    )

}