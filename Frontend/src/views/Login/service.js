import API from '../../plugins/axiosInstance'
import md5 from 'md5'

export const login = async (data) =>{
    const {username, password} = data;
    const md5pwd = md5(password+username)
    return API({
        url: '/users/login',
        method: 'post',
        data: {
            username,
            password: md5pwd
        }
    })
};

export const reg = async (data) =>{
    const {username, password} = data;
    const md5pwd = md5(password+username)
    return API({
        url: '/users/reg',
        method: 'post',
        data: {
            username,
            password: md5pwd
        }
    })
};