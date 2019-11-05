import Vue from 'vue'
import Router from 'vue-router'
import yunguIndex from '@/components/dashboard/view/yunguIndex'
import login from '@/components/dashboard/login'
import register from '@/components/dashboard/register'
import index from '@/components/dashboard/index'
import notfound from '@/components/dashboard/404'
import areaManage from '@/components/dashboard/view/areaManage'
import addArea from '@/components/dashboard/view/addArea'

import sysUse from '@/components/dashboard/view/sys/sysUser.vue'
import roleManage from '@/components/dashboard/view/sys/roleManage.vue'
import filialeManage from '@/components/dashboard/view/sys/filialeManage/index'
import resourceManage from '@/components/dashboard/view/sys/resourceManage.vue'


Vue.use(Router)

const router = new Router({
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        component: index,
        children: [{
                path: '/',
                component: yunguIndex
            },
            {
                path: 'userManage',
                component: sysUse
            }, {
                path: 'roleManage',
                component: roleManage
            }, {
                path: 'resourceManage',
                component: resourceManage
            },
            {
                path: 'filialeManage',
                component: filialeManage
            }, {
                path: '/areaManage',
                component: areaManage
            }, {
                path: '/addArea',
                component: addArea
            }
        ]
    }, {
        path: '*',
        name: 'notfound',
        component: notfound
    }, {
        path: '/register',
        name: 'register',
        component: register
    }, {
        path: '/login',
        name: 'login',
        component: login
    }]
})

router.beforeEach((to, from, next) => {
    const isLogin = localStorage.eleToken ? true : false;
    if (to.path == "/login" || to.path == "/register") {
        next();
    } else {
        isLogin ? next() : next("/login");
    }
})

export default router;