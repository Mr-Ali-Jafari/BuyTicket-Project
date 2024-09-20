import axios from "axios";

const Caxios = axios.create({
    baseURL:import.meta.env.VITE_API_KEY,
    timeout:3000,
    headers: {
        'Content-Type': 'application/json'
    }
})


export default Caxios