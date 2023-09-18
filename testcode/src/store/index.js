import Vue from "vue"
import Vuex from "vuex"
import * as api from "@/services/apiService"

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        layoutList: []
    },
    actions:{
        /**
         * 从远程获取应用布局并初始化
         */
        initLayoutListFromRemote(context) {
            api.getLayout().then(res => {
                context.commit('setLayoutList', res.data)
            })
        }
    },
    mutations:{
        setLayoutList(state, layoutList) {
            state.layoutList = layoutList
        },
        addComponent(state, component) {
            state.layoutList.push(component)
        }
    }
})