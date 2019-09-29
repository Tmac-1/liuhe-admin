import request from '../../utils/request';

/**
 * 添加广告图片
 * @param  imgUrl
 * @param  type  广告图片类型 1  banner  2  合作商家
 */ 
export async function addImg(params){
    return request('/mis/adImage',{
        method:'post',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(params)
    })
}

export async function deleteImg(params){
    return request(`/mis/adImage/${params.id}`,{
        method:'delete',
    })
}

export async function getImg(params){
    return request(`/mis/adImages?type=${params.type}`,{
        method:'get',
    })
}
