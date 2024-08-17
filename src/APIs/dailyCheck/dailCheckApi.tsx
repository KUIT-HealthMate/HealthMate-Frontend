import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACK_URL;
const JWT_TOKEN = localStorage.getItem("jwtToken");

export const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Jwt': JWT_TOKEN,
    },

});

//건강진단
//export const diagnoise

