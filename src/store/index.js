import {createStore} from 'vuex'

let baseUrl;
switch (process.env.VUE_APP_CURENV) {
    case "development":
        baseUrl = "http://123.207.50.47:8080/api";
        break;
    case "production":
        baseUrl = "http://123.207.50.47:8080/api";
        break;
}

export default createStore({
    state: {
        // 后端地址
        backURL: baseUrl
    },
    mutations: {},
    actions: {},
    modules: {}
})

