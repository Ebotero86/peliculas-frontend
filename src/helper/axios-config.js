import axios from "axios";



const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000'
   // baseURL: 'https://inventory-backend-peliculas.onrender.com/'
    
});

export{
    axiosInstance
}