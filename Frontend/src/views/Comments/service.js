import API from "../../plugins/axiosInstance";
const key = 'AIzaSyAupIQVQb6aNXENvKRW1XFfNQsBvbY9fqA';
const cx ='06c0bbdfd2dc84bf6';

export const googleSearch = async (pagination, kw)=>{
    const { items } =  await API({
        url: 'https://www.googleapis.com/customsearch/v1',
        method: 'get',
        params: {
            key, cx, q:'纪念币',
            num: 10, start: pagination.currentPage
        }
    })
    return items
}