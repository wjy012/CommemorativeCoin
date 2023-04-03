import API from "../../plugins/axiosInstance";

/**
 * pagination: {
 *    pageSize: number,
 *    currentPage: number,
 * }
 * 参数params: {
 *    type: string,
 *    query:{
 *      key, year, material, theme
 *    }
 * }
 */
export const getCoinList = async (pagination, query)=>{
    const params = {
        ...pagination
    }
    for(const key in query){
        if(query[key]){
            params[key] = query[key]
        }
    }
    return await API({
        url: '/coinList',
        method: 'get',
        params
    })
}

export const addCoin = async (data)=>{
    return await API({
        url: '/addCoin',
        method: 'post',
        data
    })
}