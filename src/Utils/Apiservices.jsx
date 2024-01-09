import axios from "axios";
const API_URL='https://65990c7da20d3dc41cef31b0.mockapi.io'
 const axioService=axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json"
    }
 })

 export default axioService