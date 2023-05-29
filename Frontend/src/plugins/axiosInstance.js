import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 30000
})

//请求拦截
API.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
}, err => {
    console.error('请求失败', err);
})
//响应拦截
API.interceptors.response.use(res =>{
    return res.data
}, err =>{
    console.error('响应错误', err);
})

export default API