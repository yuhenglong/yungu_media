import Vue from 'vue'
import Router from 'vue-router'
import yunguIndex from '@/components/dashboard/view/yunguIndex'
import login from '@/components/dashboard/login'
import register from '@/components/dashboard/register'
import index from '@/components/dashboard/index.vue'
import notfound from '@/components/dashboard/404.vue'

Vue.use(Router)

const router = new Router({
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        component: index,
        children: [{
            path: '/',
            component: yunguIndex
        }]
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

// router.beforeEach((to, from, next) => {
//     const isLogin = localStorage.eleToken ? true : false;
//     if (to.path == "/login" || to.path == "/register") {
//         next();
//     } else {
//         isLogin ? next() : next("/login");
//     }
// })

export default router;