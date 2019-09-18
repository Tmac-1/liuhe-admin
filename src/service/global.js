import request from '../utils/request';

export async function test(params){
    return request({
       url:'/nj/v1/tool/pinyinCountry' 
    })
}






