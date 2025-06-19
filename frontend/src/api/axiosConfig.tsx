/* eslint-disable react-refresh/only-export-components */
import axios from "axios";


export default axios.create({
    baseURL: 'https://eaf4-197-250-51-179.ngrok-free.app',
    headers: {"ngrok-skip-browser-warning": "true"}
})