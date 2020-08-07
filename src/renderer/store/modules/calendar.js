import {
  getYearOfToday,
  getMonthOfToday,
  getDateOfToday
} from '@/modules/util/date'

const MUTATIONS = {
  SET_CALENDAR      : 'setCalendar',
  SET_CALENDAR_YEAR : 'setCalendarYear',
  SET_CALENDAR_MONTH: 'setCalendarMonth',
  SET_SELECTED      : 'setSelected',
  SET_SELECTED_YEAR : 'setSelectedYear',
  SET_SELECTED_MONTH: 'setSelectedMonth',
  SET_SELECTED_DATE : 'setSelectedDate'
}

const state = {
  calendar: {
    year : getYearOfToday(),
    month: getMonthOfToday()
  },
  selected: {
    year : getYearOfToday(),
    month: getMonthOfToday(),
    date : getDateOfToday()
  }
}

const mutations = {
  [MUTATIONS.SET_CALENDAR] (state, payload) {
    state.calendar.year  = payload.year
    state.calendar.month = payload.month
  },
  [MUTATIONS.SET_CALENDAR_YEAR] (state, value) {
    state.calendar.year = value
  },
  [MUTATIONS.SET_CALENDAR_MONTH] (state, value) {
    state.calendar.month = value
  },
  [MUTATIONS.SET_SELECTED] (state, payload) {
    state.selected.year  = payload.year
    state.selected.month = payload.month
    state.selected.date  = payload.date
  },
  [MUTATIONS.SET_SELECTED_YEAR] (state, value) {
    state.selected.year = value
  },
  [MUTATIONS.SET_SELECTED_MONTH] (state, value) {
    state.selected.month = value
  },
  [MUTATIONS.SET_SELECTED_DATE] (state, value) {
    state.selected.date = value
  }
}

const actions = {
  setCalendar ({ commit }, value) {
    commit(MUTATIONS.SET_CALENDAR, value)
  },
  setCalendarYear ({ commit }, value) {
    commit(MUTATIONS.SET_CALENDAR_YEAR, value)
  },
  setCalendarMonth ({ commit }, value) {
    commit(MUTATIONS.SET_CALENDAR_MONTH, value)
  },
  setSelected ({ commit }, value) {
    commit(MUTATIONS.SET_SELECTED, value)
  },
  setSelectedYear ({ commit }, value) {
    commit(MUTATIONS.SET_SELECTED_YEAR, value)
  },
  setSelectedMonth ({ commit }, value) {
    commit(MUTATIONS.SET_SELECTED_MONTH, value)
  },
  setSelectedDate ({ commit }, value) {
    commit(MUTATIONS.SET_SELECTED_DATE, value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
