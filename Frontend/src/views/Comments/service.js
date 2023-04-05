import API from "../../plugins/axiosInstance";

export const commentList = async (pagination, kw)=>{
    console.log(kw);
    const params = {
        ...pagination, kw
    }
    return await API({
        url: '/commentList',
        method: 'get',
        params
    }) 
}