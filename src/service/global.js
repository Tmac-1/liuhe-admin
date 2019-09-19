import request from '../utils/request';

export async function test(params){
    return request('/nj/v1/tool/pinyinCountry',{})
}

export async function aliUpload(params){
    const data = new FormData()
    return request('http://6liuhe.oss-cn-beijing.aliyuncs.com',{})
}






