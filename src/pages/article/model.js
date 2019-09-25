import { message } from 'antd';
import { addNews,getNewsList,getNewsDeatil,editNewsDeatil  } from './service';


export default {
    namespace:'article',
    state:{
        newsList:{},
        newsDetail:{}
    },
    effects:{
        *addNews({payload},{call,put}){
            const data = yield call(addNews,payload);
            if(data && data.code ==200){
                message.success('添加成功')
            }
        },
        *editNewsDeatil({payload},{call,put}){
            const data = yield call(editNewsDeatil,payload);
            if(data && data.code ==200){
                message.success('修改成功')
            }
        },
        *getNewsList({payload},{call,put}){
            const data = yield call(getNewsList,payload);
            if(data && data.code ==200){
                yield put({type:'getNewsListSuccess',payload:data.data})
            }else{
                message.error('请求数据出错了~')
            }
        },
        *getNewsDeatil({payload},{call,put}){
            const data = yield call(getNewsDeatil,payload);
            if(data && data.code ==200){
                yield put({type:'getNewsDeatilSuccess',payload:data.data})
            }else{
                message.error('请求数据出错了~')
            }
        }
    },
    reducers:{
        getNewsListSuccess(state,action){
            return{
                ...state,
                newsList:action.payload
            }
        },
        getNewsDeatilSuccess(state,action){
            return{
                ...state,
                newsDetail:action.payload
            }
        }
    }
}