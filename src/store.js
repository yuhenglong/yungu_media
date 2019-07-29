import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse:false
  },
  mutations: {
    setIsCollapse(state){
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {
    setIsCollapse(context){
      context.commit('setIsCollapse')
    }
  }
})
