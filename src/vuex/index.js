import { createStore } from 'vuex'

export default createStore({
  strict: false, // 嚴謹模式
  state: {
    // 所有在 store 裏的資料
    questionsList: {}, //* 題組的題目數量
    teacherUseExPaper: {} //* 老師選的考卷
    // scorePercentage: {
    //   是非題: 0,
    //   單選題: 0,
    //   複選題: 0,
    //   克漏字: 0,
    //   重組題: 0,
    //   問答題: 0
    // }
  },
  actions: {
  },
  mutations: {
    // 負責改變 state 裏的資料
    //* 取得題組的題目數量
    GET_QUESTIONS_NUM (store, val) {
      Object.keys(val).forEach(keys => {
        const queNum = val[keys]
        store.questionsList[keys] = queNum
      })
    },
    //* 確定考卷
    CONFIRM_EX_PAPER (store, val) {
      store.teacherUseExPaper = val
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
