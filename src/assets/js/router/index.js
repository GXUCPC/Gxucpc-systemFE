import {createRouter, createWebHistory} from 'vue-router';
import {defineAsyncComponent} from "vue";
import request from "@/assets/js/request/request.js";

const router = createRouter({
    history: createWebHistory(),  // history 模式
    routes: [
        {
            path: "/mobile/signup/:itemID(\\d+)/1",
            name: 'MobileSignUp',
            component: defineAsyncComponent(() => import('@/mobileViews/public/signup/MobileSignUp.vue'))
        },
        {
            path: "/mobile/signup/:itemID(\\d+)/2",
            name: 'MobileSignUpLQ',
            component: defineAsyncComponent(() => import('@/mobileViews/public/signup/MobileSignUpLQ.vue'))
        },
        {
            path: "/mobile/signup/:itemID(\\d+)/3",
            name: 'MobileSignUpNanNing',
            component: defineAsyncComponent(() => import('@/mobileViews/public/signup/MobileSignUpNanNing.vue'))
        },
        {
            path: '/',
            name: 'Public',
            component: defineAsyncComponent(() => import('@/views/Public.vue')),
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: defineAsyncComponent(() => import('@/views/public/Home.vue'))
                },
                {
                    path: 'download',
                    name: 'Download',
                    component: defineAsyncComponent(() => import('@/views/public/Download.vue')),
                },
                {
                    // 东信杯-报名表单
                    path: 'signup/:itemID(\\d+)/1',
                    name: 'SignUp',
                    component: defineAsyncComponent(() => import('@/views/public/signup/SignUp.vue'))
                },
                {
                    // 蓝桥杯-转账记录
                    path: 'signup/:itemID(\\d+)/2',
                    name: 'SignUpLQ',
                    component: defineAsyncComponent(() => import('@/views/public/signup/SignUpLQ.vue'))
                },
                {
                    // 南宁市赛-报名表单
                    path: 'signup/:itemID(\\d+)/3',
                    name: 'SignUpNanNing',
                    component: defineAsyncComponent(() => import('@/views/public/signup/SignUpNanNing.vue'))
                },
                {
                    path: 'login',
                    name: 'Name',
                    component: defineAsyncComponent(() => import('@/views/public/Login.vue')),
                },
                {
                    path: 'board/:itemID(\\d+)',
                    name: 'Board',
                    component: defineAsyncComponent(() => import('@/views/public/Board.vue')),
                },
                {
                    path: 'pages/:itemID(\\d+)',
                    name: 'Page',
                    component: defineAsyncComponent(() => import('@/views/public/page/Page.vue'))
                },
                {
                    path: 'list/:listType(notice|news|board|winners|prize|signup)',
                    name: 'PageList',
                    component: defineAsyncComponent(() => import('@/views/public/page/PageList.vue'))
                },
                {
                    path: 'form',
                    name: 'ViewForm',
                    component: defineAsyncComponent(() => import('@/views/public/Form.vue'))
                },
                {
                    path: 'query',
                    name: 'AccountQuery',
                    component: defineAsyncComponent(() => import('@/views/public/signup/AccountQuery.vue'))
                },
                {
                    path: 'signup/query',
                    name: 'SignupQuery',
                    component: defineAsyncComponent(() => import('@/views/public/query/SignUp.vue'))
                },
                {
                    path: 'signup/query/res',
                    name: 'SignupQueryRes',
                    component: defineAsyncComponent(() => import('@/views/public/query/SignUpRes.vue'))
                }
            ],
            beforeEnter: (to, from, next) => {
                let client = localStorage.getItem('client');
                if (client === null || client === "null" || client === undefined) {
                    request.get("/public/getClient").then((res) => {
                        if (res.statusCode === 50000) {
                            localStorage.setItem('client', res.data);
                        }
                    });
                }
                next();
            }
        },
        {
            path: '/m/',
            name: 'PublicMobile',
            component: defineAsyncComponent(() => import('@/mobileViews/Public.vue')),
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: defineAsyncComponent(() => import('@/mobileViews/public/Home.vue'))
                },
            ],
            beforeEnter: (to, from, next) => {
                let client = localStorage.getItem('client');
                if (client === null || client === "null" || client === undefined) {
                    request.get("/public/getClient").then((res) => {
                        if (res.statusCode === 50000) {
                            localStorage.setItem('client', res.data);
                        }
                    });
                }
                next();
            }
        },
        {
            path: '/admin',
            name: 'Admin',
            component: defineAsyncComponent(() => import('@/views/Admin.vue')),
            children: [
                {
                    path: '',
                    name: 'Dashboard',
                    component: defineAsyncComponent(() => import('@/views/admin/Dashboard.vue'))
                },
                {
                    path: 'user',
                    name: 'User',
                    component: defineAsyncComponent(() => import('@/views/admin/UserMgr.vue'))
                },
                {
                    path: 'contest',
                    name: 'Contest',
                    component: defineAsyncComponent(() => import('@/views/admin/ContestMgr.vue'))
                },
                {
                    path: 'form',
                    name: 'Form',
                    component: defineAsyncComponent(() => import('@/views/admin/FormMgr.vue'))
                },
                {
                    path: "form/add",
                    name: "AddForm",
                    component: defineAsyncComponent(() => import('@/views/admin/form/FormEditor.vue'))
                },
                {
                    path: "form/edit/:itemID",
                    name: "EditForm",
                    component: defineAsyncComponent(() => import('@/views/admin/form/FormEditor.vue'))
                },
                {
                    path: 'email',
                    name: 'Email',
                    component: defineAsyncComponent(() => import('@/views/admin/EmailMgr.vue'))
                },
                {
                    path: 'text',
                    name: 'Text',
                    component: defineAsyncComponent(() => import('@/views/admin/ArticleMgr.vue'))
                },
                {
                    path: "text/edit/:itemID",
                    name: "EditText",
                    component: defineAsyncComponent(() => import('@/views/admin/ArticleEditor.vue'))
                },
                {
                    path: "text/add",
                    name: "AddText",
                    component: defineAsyncComponent(() => import('@/views/admin/ArticleEditor.vue'))
                },
                {
                    path: "reptile",
                    name: "Reptile",
                    component: defineAsyncComponent(() => import('@/views/admin/Python.vue'))
                }
            ],
            // token验证

            beforeEnter: (to, from, next) => {
                let token = localStorage.getItem('token');
                let logindto = {};
                logindto.token = token;
                logindto.urlpath = to.path;
                if (token != null) { //登录过
                    //验证token
                    request.get("/admin/checkToken").then(res => {
                        //成功
                        if (res.statusCode === 50000) {
                            next();
                        } else {
                            next({path: '/login'});
                        }

                    }).catch(() => {
                        next({path: '/login'});
                    });
                } else { //没有登录
                    next({path: '/login'});
                }

            }
        },
        {
            path: "/:catAll(.*)",
            name: "404",
            component: defineAsyncComponent(() => import('@/views/404.vue'))
        }
    ]
});


export default router;
