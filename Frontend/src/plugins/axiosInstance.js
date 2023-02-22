import axios from "axios";
import { ElStep } from "element-plus";

const API = axios.create({
    baseURL: 'http://localhost:3000',
    timeout:3000
})

//请求拦截
API.interceptors.request.use(config => {
    return config
}, err => {
    console.error('请求失败', err);
})
//响应拦截
API.interceptors.response.use(res =>{
    return res
}, err =>{
    console.error('响应错误', err);
})

export default API