import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:1912/'
})

export default request