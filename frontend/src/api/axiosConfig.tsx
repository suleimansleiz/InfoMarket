/* eslint-disable react-refresh/only-export-components */
import axios from "axios";


export default axios.create({
    baseURL: 'https://fd9a-197-250-100-66.ngrok-free.app',
    headers: {"ngrok-skip-browser-warning": "true"}
})