/* eslint-disable react-refresh/only-export-components */
import axios from "axios";


export default axios.create({
    baseURL: 'https://8eae-197-250-204-81.ngrok-free.app',
    headers: {"ngrok-skip-browser-warning": "true"}
})