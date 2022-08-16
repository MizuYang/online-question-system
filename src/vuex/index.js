import { createStore } from 'vuex'

export default createStore({
  strict: false, // 嚴謹模式
  state: {
    // 所有在 store 裏的資料
    questionsNumList: {}
  },
  actions: {
  },
  mutations: {
    // 負責改變 state 裏的資料
    //* 取得題組的題目數量
    GET_QUESTIONS_NUM (store, val) {
      Object.keys(val).forEach(keys => {
        store.questionsNumList[keys] = val[keys]
      })
    }
  },
  getters: {
    // 像 computed 一樣，運算處理 state 資料
  },
  modules: {
    // 按需求分拆 module
    // 每個 module 都有自己的state, actions, mutations, getters, modules
  }
})
