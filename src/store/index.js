import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo:{},
    contentBox:null,
  },
  mutations: {
    setUserInfo(state,info){
      state.userInfo = info
    },
    setContentBox(state,box){
      state.contentBox = box
    }
  },
  actions: {
  },
  modules: {
  }
})
