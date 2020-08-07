const MUTATIONS = {
  TOGGLE_SETTING_MODAL: 'TOGGLE_SETTING_MODAL',
  TOGGLE_SCHEDULE_OF_MONTH_MODAL: 'TOGGLE_SCHEDULE_OF_MONTH_MODAL'
}

const state = {
  isVisible: {
    setting: false,
    scheduleOfMonth: false,
  }
}

const mutations = {
  [MUTATIONS.TOGGLE_SETTING_MODAL] (state) {
    state.isVisible.setting = !state.isVisible.setting
  },
  [MUTATIONS.TOGGLE_SCHEDULE_OF_MONTH_MODAL] (state) {
    state.isVisible.scheduleOfMonth = !state.isVisible.scheduleOfMonth
  }
}

const actions = {
  toggleSettingModal({ commit }) {
    commit(MUTATIONS.TOGGLE_SETTING_MODAL)
  },
  toggleScheduleOfMonthModal({ commit }) {
    commit(MUTATIONS.TOGGLE_SCHEDULE_OF_MONTH_MODAL)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
