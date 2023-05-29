import API from "../../plugins/axiosInstance";

export const getIndex = async ()=>{
    return await API({
        url: '/index',
        method: 'get',
    })
}

export const getPopCoins = async ()=>{
    return await API({
        url: '/popCoins',
        method: 'get',
    })
}