import request from '../../utils/request';

export async function addCase(params){
    return request('/mis/case',{
        method:'post',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(params)
    })
}

export async function getCaseDeatil(params){
    return request(`/mis/case/${params.id}`,{
        method:'get',
    })
}

export async function editCaseDeatil(params){
    return request(`/mis/case/${params.id}`,{
        method:'put',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(params)
    })
}

export async function getCaseList(params){
    return request(`/mis/cases?page=${params.page}`,{
        method:'get',
    })
}