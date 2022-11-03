import axios from 'axios'
import store from '@/store/index.js'
import router from "@/router";


const request = axios.create({
    baseURL: store.state.backURL,
    // baseURL: 'http://localhost:80/api',
    timeout: 100000
})

// request 拦截器
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    // let usertoken = localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null

    let usertoken = localStorage.getItem("token")
    let username = localStorage.getItem("username")
    let userType = localStorage.getItem("userType")
    let password = localStorage.getItem("password")
    let client = localStorage.getItem("client")

    config.headers['token'] = usertoken;  // 设置请求头
    config.headers['username'] = username
    config.headers['userType'] = userType
    config.headers['password'] = password
    config.headers['client'] = client

    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
request.interceptors.response.use(
    response => {
        let res = response.data;
        // token失效
        if (res.statusCode === 50002) {
            router.replace('/login')
            this.$message.error(res.message)
        }

        // token续租
        if (response.headers['token'] !== null && response.headers['token'] !== undefined) {
            localStorage.setItem('token', response.headers['token'])
        }
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
        // return response;
    },
    error => {
        return Promise.reject(error)
    }
)


export default request

