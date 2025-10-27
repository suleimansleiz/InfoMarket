/* eslint-disable react-refresh/only-export-components */
import axios from "axios";


export default axios.create({
    // baseURL: 'https://infomarket.up.railway.app',
    // headers: {
    // "Content-Type": "application/json",

    baseURL: 'https://a7b60db0e89d.ngrok-free.app',
    headers: {
    "ngrok-skip-browser-warning": "true",
  },
})