/* eslint-disable react-refresh/only-export-components */
import axios from "axios";


export default axios.create({
    baseURL: 'https://2ff4dffa72a2.ngrok-free.app',
    headers: {"ngrok-skip-browser-warning": "true"}
})