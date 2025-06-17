/* eslint-disable react-refresh/only-export-components */
import axios from "axios";


export default axios.create({
    baseURL: 'https://98da-197-250-51-236.ngrok-free.app',
    headers: {"ngrok-skip-browser-warning": "true"}
})