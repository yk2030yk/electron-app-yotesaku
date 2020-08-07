import {
  getYearOfToday,
  getMonthOfToday,
  getDateOfToday
} from '@/modules/util/date'

const MUTATIONS = {
  SET_MESSAGE: 'SET_MESSAGE',
  RESET_MESSAGE: 'RESET_MESSAGE'
}

const state = {
  message: false,
}

const mutations = {
  [MUTATIONS.SET_MESSAGE] (state, value) {
    state.message = value
  },
  [MUTATIONS.RESET_MESSAGE] (state, value) {
    state.message = false
  }
}

const actions = {
  setMessage({ commit }, value) {
    commit(MUTATIONS.SET_MESSAGE, value)
    setTimeout(() => {
      commit(MUTATIONS.RESET_MESSAGE)
    }, 1500)
  },
  resetMessage({ commit }, value) {
    commit(MUTATIONS.RESET_MESSAGE)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
