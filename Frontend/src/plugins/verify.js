import API from "./axiosInstance";

export const verify = async ()=>{  //查询登录状态
    return API({
     url: 'users/verify',
     method: 'get'
   })
 }
 