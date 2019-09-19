import { test } from '../service/global';

export default {
    namespace:'global',
    state:{
        test:''
    },
    effects:{
        *test({payload},{call,put}){
            console.log(222)
            const data = yield call(test)
        },
    },
    reducers:{

    }
}