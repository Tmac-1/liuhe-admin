import { message } from 'antd';
import { addNews,getNewsList,getNewsDeatil,editNewsDeatil,deleteNews  } from './service';


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
        *deleteNews({payload},{call,put}){
            const data = yield call(deleteNews,payload);
            if(data && data.code ==200){
               yield put({type:'deleteNewsSuccess',payload:payload})
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
        deleteNewsSuccess(state,action){
            console.log(state)
            return{
                ...state,
                newsList:{
                    totalPage:~~state.newsDetail.totalPage - 1,
                    record:state.newsList.record.filter(item=>item.id != action.paylaod.id)
                }
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