import request from '../../utils/request';

export async function addNews(params){
    return request('/mis/news',{
        method:'post',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(params)
    })
}

export async function getNewsDeatil(params){
    return request(`/mis/news/${params.id}`,{
        method:'get',
    })
}


export async function editNewsDeatil(params){
    return request(`/mis/news/${params.id}`,{
        method:'put',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(params)
    })
}

export async function deleteNews(params){
    return request(`/mis/news/${params.id}`,{
        method:'delete'
    })
}

export async function getNewsList(params){
    return request(`/mis/news?page=${params.page}`,{
        method:'get',
    })
}