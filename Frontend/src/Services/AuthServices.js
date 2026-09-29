import api from "./Axios.js";


const authService = {


    register: async(name,email,password)=>{

        const response = await api.post(
            "/api/user/register",
            {
                name,
                email,
                password
            }
        );


        return response;

    },



    login: async(email,password)=>{


        const response = await api.post(

            "/api/user/login",

            {
                email,
                password
            }

        );


        return response;


    },


    logout: ()=>{

        localStorage.removeItem("token");

    }



};


export default authService;