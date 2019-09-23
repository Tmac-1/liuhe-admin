import { message } from 'antd';
import { addNews  } from './service';



export default {
    namespace:'article',
    state:{},
    effects:{
        *addNews({paylaod},{call,put}){
            const data = yield call(addNews,paylaod);
            if(data && data.code ==200){
                message.success('添加成功')
            }
        }
    },
    reducers:{}
}