import axios from "axios";

export default function axiosInstance(){
    return axios.create({
        baseURL: "http://0.0.0.0:8080/api",
        timeout: 50000
    })
}