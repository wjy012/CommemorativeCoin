import API from "../../plugins/axiosInstance";

export const getCoinDetail = async (id)=>{
    return await API({
        url: '/coinDetail',
        method: 'get',
        params: {id}
    })
}

export const editCoinDetail = async (id, coinInfo)=>{
    return await API({
        url: '/updateCoin',
        method: 'post',
        data: {
            id, coinInfo
        }
    })
}