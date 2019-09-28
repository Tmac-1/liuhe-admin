import { message } from 'antd';
import { addCase, getCaseList,getCaseDeatil,editCaseDeatil,deleteCase } from './service';

export default {
    namespace:'case',
    state:{
      caseList:{},
      caseDetail:{}
    },
    effects:{
        *addCase({paylaod},{call,put}){
           const data =  yield call(addCase,paylaod);
        //    console.log("data",data)
           if(data && data.code == 200){
               message.success('案例添加成功~')
           }
        },
        *deleteCase({payload},{call,put}){
            const data = yield call(deleteCase,payload);
            if(data && data.code ==200){
                message.success('删除成功~')
               yield put({type:'deleteCaseSuccess',payload:payload})
            }
        },
        *editCaseDeatil({paylaod},{call,put}){
            const data =  yield call(editCaseDeatil,paylaod);
         //    console.log("data",data)
            if(data && data.code == 200){
                message.success('案例添加成功~')
            }
         },
        *getCaseList({paylaod},{call,put}){
            const data =  yield call(getCaseList,paylaod);
            // console.log("data",data)
            if(data && data.code == 200){
                yield put({type:'getCaseListSuccess',paylaod:data.data})
            }else{
                message.error('获取列表失败')
            }
         },
         *getCaseDetail({paylaod},{call,put}){
            const data =  yield call(getCaseDeatil,paylaod);
            // console.log("data",data)
            if(data && data.code == 200){
                yield put({type:'getCaseDeatilSuccess',paylaod:data.data})
            }else{
                message.error('获取列表失败')
            }
         },
    },
    reducers:{
        getCaseListSuccess(state,action){
            return({
                ...state,
                caseList:action.paylaod
            })
        },
        deleteCaseSuccess(state,action){
            // console.log(action)
            return{
                ...state,
                caseList:{
                    totalPage:~~state.caseList.totalPage - 1,
                    record:state.caseList.record.filter(item=>item.id != action.payload.id)
                }
            }
        },
        getCaseDeatilSuccess(state,action){
            return({
                ...state,
                caseDetail:action.paylaod
            })
        }
    }
}