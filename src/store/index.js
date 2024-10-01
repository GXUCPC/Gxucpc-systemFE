import {createStore} from 'vuex'

let baseUrl;
switch (process.env.VUE_APP_CURENV) {
    case "development":
        baseUrl = "http://localhost:789/api";
        break;
    case "production":
        baseUrl = "/api";
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

