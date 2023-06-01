import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    //设置默认参数
    state: {
        HOST: 'http://127.0.0.1:8080',
    },
})

export default store