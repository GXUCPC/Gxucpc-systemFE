import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from "vue";

const router = createRouter({
    history: createWebHistory(),  // history 模式
    routes: [
        {
            path: '/download',
            name: 'Download',
            component: defineAsyncComponent(() => import('../views/Download.vue')),
        },
        {
            path: '/enroll/:itemID',
            name: '报名信息',
            component: defineAsyncComponent(()=>import('../views/Enroll.vue'))
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
            // children: [
            //     {
            //     }
            // ],
            beforeEnter: (to, from, next) => {
                let token = localStorage.getItem('token')
                let logindto = {}
                logindto.token = token
                logindto.urlpath = to.path
                if (token != null) { //登录过
                    //验证token
                    request.post("/user/checkToken", token).then(res => {
                        //成功
                        if (res.statusCode == '200') {
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
