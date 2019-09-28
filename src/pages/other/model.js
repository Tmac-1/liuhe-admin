import { addImg,getImg } from './service';
import { message } from 'antd';

export default {
    namespace:'other',
    state:{
      imgs:{},// 合作logo
      imgs02:{},// banner
    },
    effects:{
        *addImg({payload},{call,put}){
           const data = yield call(addImg,payload);
           if(data && data.code == 200){
            //    message.success('添加成功~')
           }
        },
        *getImg({payload},{call,put}){
            const data = yield call(getImg,payload);
            if(data && data.code == 200){
               yield put({type:'getImgSuccess',payload:data.data})
            }else{
                message.error('获取数据失败')
            }
         },
         *addImg02({payload},{call,put}){
            const data = yield call(addImg,payload);
            if(data && data.code == 200){
             //    message.success('添加成功~')
            }
         },
         *getImg02({payload},{call,put}){
            const data = yield call(getImg,payload);
            if(data && data.code == 200){
               yield put({type:'getImg02Success',payload:data.data})
            }else{
                message.error('获取数据失败')
            }
         }
    },
    reducers:{
        getImgSuccess(state,action){
            return{
                ...state,
                imgs:action.payload
            }
        },
        getImg02Success(state,action){
            return{
                ...state,
                imgs02:action.payload
            }
        }
    }
}