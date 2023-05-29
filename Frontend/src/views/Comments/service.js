import API from "../../plugins/axiosInstance";

export const commentList = async (pagination, kw)=>{
    const params = {
        ...pagination, kw
    }
    return await API({
        url: '/commentList',
        method: 'get',
        params
    }) 
}

export const refreshComments = async ()=>{
    return await API({
        url: '/refreshComments',
        method: 'get'
    })
}