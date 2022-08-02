import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from "vue"
import request from "../request/request.js"

const router = createRouter({
    history: createWebHistory(),  // history 模式
    routes: [
        {
            path: '/download',
            name: 'Download',
            component: defineAsyncComponent(() => import('../views/Download.vue')),
        },
        {
            path: '/signup/:itemID',
            name: 'SignUp',
            component: defineAsyncComponent(()=>import('../views/SignUp.vue'))
        },
        {
            path: '/login',
            name: 'Name',
            component: defineAsyncComponent(() => import('../views/Login.vue')),
        },
        {
            path: '/board/:itemID',
            name: 'Board',
            component: defineAsyncComponent(() => import('../views/Board.vue')),
        },
        {
            path: '/admin',
            name: 'Admin',
            component: defineAsyncComponent(() => import('../views/Admin.vue')),
            children: [
                {
                    path: '',
                    name: 'Dashboard',
                    component: defineAsyncComponent(() => import('../views/Dashboard.vue'))
                },
                {
                    path: 'user',
                    name: 'User',
                    component: defineAsyncComponent(() => import('../views/User.vue'))
                },
                {
                    path: 'contest',
                    name: 'Contest',
                    component: defineAsyncComponent(() => import('../views/Contest.vue'))
                },
                {
                    path: 'form',
                    name: 'Form',
                    component: defineAsyncComponent(() => import('../views/Form.vue'))
                },
                {
                    path: 'email',
                    name: 'Email',
                    component: defineAsyncComponent(() => import('../views/Email.vue'))
                }
            ],
            // token验证

            beforeEnter: (to, from, next) => {
                let token = localStorage.getItem('token')
                let logindto = {}
                logindto.token = token
                logindto.urlpath = to.path
                if (token != null) { //登录过
                    //验证token
                    request.get("/admin/checkToken").then(res => {
                        //成功
                        if (res.statusCode == '50000') {
                            next()
                        } else {
                            next({ path: '/login' })
                        }

                    }).catch(() => {
                        next({ path: '/login' })
                    })

                } else { //没有登录
                    next({ path: '/login' })
                }

            }
        }
    ]
})


export default router
