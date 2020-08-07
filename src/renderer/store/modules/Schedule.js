import {
  getYearOfToday,
  getMonthOfToday,
  getDateOfToday
} from '@/modules/util/date'

const MUTATIONS = {
  SET_YEAR : 'setYear',
  SET_MONTH: 'setMonth',
  SET_DATE : 'setDate'
}

const state = {
  year:  getYearOfToday(),
  month: getMonthOfToday(),
  date:  getDateOfToday()
}

const mutations = {
  [MUTATIONS.SET_YEAR] (state, value) {
    state.year = value
  },
  [MUTATIONS.SET_MONTH] (state, value) {
    state.month = value
  },
  [MUTATIONS.SET_DATE] (state, value) {
    state.date = value
  }
}

const actions = {
  setYear ({ commit }, value) {
    commit(MUTATIONS.SET_YEAR, value)
  },
  setMonth ({ commit }, value) {
    commit(MUTATIONS.SET_MONTH, value)
  },
  setDate ({ commit }, value) {
    commit(MUTATIONS.SET_DATE, value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
