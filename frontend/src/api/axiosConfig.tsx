/* eslint-disable react-refresh/only-export-components */
import axios from "axios";


export default axios.create({
    baseURL: 'https://b3267a5301c0.ngrok-free.app',
    headers: {"ngrok-skip-browser-warning": "true"}
})