/* eslint-disable react-refresh/only-export-components */
import axios from "axios";


export default axios.create({
    baseURL: 'https://infomarket.up.railway.app',
    headers: {
    "Content-Type": "application/json",
  },
})