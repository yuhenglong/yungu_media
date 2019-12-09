import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isCollapse: false,
        // tab 
        visitedviews: [],
        firData: [],
    },
    mutations: {
        setIsCollapse(state) {
            state.isCollapse = !state.isCollapse;
        },
        ADD_VISITED_VIEWS: (state, view) => { //打开新页签--添加路由数据的方法      if(state.visitedviews.some(v=>v.path==view.path))return;
            // 数组在存放在vuex之前进行验证去重
            if (state.visitedviews.some(v => v.path === view.path)) return
            state.visitedviews.push({
                name: view.name,
                path: view.path,
                title: view.title || '首页'
            })
        },
        DEL_VISITED_VIEWS: (state, view) => { //关闭页签--删除路由数据的方法
            for (let [i, v] of state.visitedviews.entries()) {
                if (v.path == view.path) {
                    state.visitedviews.splice(i, 1)
                    break
                }
            }
        },
        setIndexHtml: (state) => {
            state.visitedviews = []
        }
    },
    actions: {
        setIsCollapse(context) {
            context.commit('setIsCollapse')
        },
        addVisitedViews({ commit }, view) { //通过解构赋值得到commit方法
            commit('ADD_VISITED_VIEWS', view) //去触发ADD_VISITED_VIEWS，并传入参数
        },
        delVisitedViews({ commit, state }, view) {
            // delVisitedViews({ commit, state, view }) {
            //删除数组存放的路由之后，需要再去刷新路由，这是一个异步的过程，需要有回掉函数，所以使用并返回promise对象，也可以让组件在调用的时候接着使用.then的方法
            //commit('DEL_VISITED_VIEWS',view)
            return new Promise((resolve) => { //resolve方法：未来成功后回调的方法
                commit('DEL_VISITED_VIEWS', view);
                resolve([...state.visitedviews]);
            })
        },
        // tab设置为空
        setIndexHtml({ commit, state }) {
            commit('setIndexHtml', state)
        }
    }
})