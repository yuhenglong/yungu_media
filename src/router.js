import Vue from 'vue'
import Router from 'vue-router'
import yunguIndex from '@/components/dashboard/view/yunguIndex'
import login from '@/components/dashboard/login'
import register from '@/components/dashboard/register'
import index from '@/components/dashboard/index'
import notfound from '@/components/dashboard/404'
import addArea from '@/components/dashboard/view/addArea'
import addAreaPlace from '@/components/dashboard/view/addAreaPlace'
import customerManage from '@/components/dashboard/view/customerManage'
import checkCustomer from '@/components/dashboard/view/checkCustomer'
import advertiserList from '@/components/dashboard/view/advertiserList'
import contractList from '@/components/dashboard/view/contractList'
import areaList from '@/components/dashboard/view/areaList'
import placeAuditList from '@/components/dashboard/view/placeAuditList'
import waitPlaPayAudit from '@/components/dashboard/view/waitPlaPayAudit'
import plaInstallList from '@/components/dashboard/view/plaInstallList'
import getWaitEngineeringInstallPageList from '@/components/dashboard/view/getWaitEngineeringInstallPageList'
import getFeedBackList from '@/components/dashboard/view/getFeedBackList'
import editPlaceAudit from '@/components/dashboard/view/editPlaceAudit'
import equipList from '@/components/dashboard/view/equipList'
import examinePage from '@/components/dashboard/view/examinePage'
import checkEquipTable from '@/components/dashboard/view/checkEquipTable'
import editEquipTable from '@/components/dashboard/view/editEquipTable'
import addNewEquip from '@/components/dashboard/view/addNewEquip'
import addContract from '@/components/dashboard/view/addContract'
import logManage from '@/components/dashboard/view/logManage'
import waitConList from '@/components/dashboard/view/waitConList'
import checkContract from '@/components/dashboard/view/checkContract'
import planPayDetail from '@/components/dashboard/view/planPayDetail'
import editContractPage from '@/components/dashboard/view/editContractPage'
import lookConInfo from '@/components/dashboard/view/lookConInfo'
import addPlaInstallList from '@/components/dashboard/view/addPlaInstallList'
import lizi from '@/components/dashboard/view/lizi'

import sysUse from '@/components/dashboard/view/sys/sysUser.vue'
import roleManage from '@/components/dashboard/view/sys/roleManage.vue'
import filialeManage from '@/components/dashboard/view/sys/filialeManage/index'
import resourceManage from '@/components/dashboard/view/sys/resourceManage.vue'
import createProcessPageList from '@/components/dashboard/view/work/createProcessPageList.vue'
import getAllProcessList from '@/components/dashboard/view/work/getAllProcessList.vue'
import involvedProcessPageList from '@/components/dashboard/view/work/involvedProcessPageList.vue'
import toDoTaskList from '@/components/dashboard/view/work/toDoTaskList.vue'

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
                },
                {
                    path: '/addArea',
                    component: addArea
                },
                {
                    path: '/addAreaPlace',
                    component: addAreaPlace
                },
                {
                    path: '/customerManage',
                    component: customerManage,
                }, {
                    path: '/checkCustomer',
                    component: checkCustomer,
                },
                {
                    path: '/advertiserList',
                    component: advertiserList
                },
                {
                    path: '/getAllProcessList',
                    component: getAllProcessList
                },
                {
                    path: '/createProcessPageList',
                    component: createProcessPageList
                },
                {
                    path: '/involvedProcessPageList',
                    component: involvedProcessPageList
                },
                {
                    path: '/toDoTaskList',
                    component: toDoTaskList
                },
                {
                    path: '/contractList',
                    component: contractList
                },
                {
                    path: '/areaList',
                    component: areaList
                },
                {
                    path: '/placeAuditList',
                    component: placeAuditList
                },
                {
                    path: 'getWaitEngineeringInstallPageList',
                    component: getWaitEngineeringInstallPageList
                },
                {
                    path: 'waitPlaPayAudit',
                    component: waitPlaPayAudit
                },
                {
                    path: 'plaInstallList',
                    component: plaInstallList
                },
                {
                    path: '/getFeedBackList',
                    component: getFeedBackList
                },
                {
                    path: '/editPlaceAudit',
                    component: editPlaceAudit
                },
                {
                    path: '/equipList',
                    component: equipList
                },
                {
                    path: '/examinePage',
                    component: examinePage
                },
                {
                    path: '/checkEquipTable',
                    name: 'checkEquipTable',
                    component: checkEquipTable
                },
                {
                    path: '/editEquipTable',
                    name: 'editEquipTable',
                    component: editEquipTable
                },
                {
                    path: '/addNewEquip',
                    component: addNewEquip
                },
                {
                    path: '/addContract',
                    component: addContract,
                    children: [{
                        path: '/',
                        component: lizi
                    }, {
                        path: 'lizi',
                        name: 'lizi',
                        component: lizi
                    }]
                },
                {
                    path: '/logManage',
                    component: logManage
                },
                {
                    path: '/waitConList',
                    component: waitConList
                },
                {
                    path: '/checkContract',
                    component: checkContract
                },
                {
                    path: '/planPayDetail',
                    name: 'planPayDetail',
                    component: planPayDetail
                },
                {
                    path: '/editContractPage',
                    component: editContractPage
                },
                {
                    path: '/lookConInfo',
                    component: lookConInfo
                },
                {
                    path: '/addPlaInstallList',
                    component: addPlaInstallList
                }
            ]
        },
        {
            path: '*',
            name: 'notfound',
            component: notfound
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/login',
            name: 'login',
            component: login
        }
    ]
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