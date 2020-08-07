const MUTATIONS = {
  SHOW_SIDEBAR: 'SHOW_SIDEBAR',
  HIDE_SIDEBAR: 'HIDE_SIDEBAR',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR'
}

const state = {
  isVisible: false
}

const mutations = {
  [MUTATIONS.SHOW_SIDEBAR] (state) {
    state.isVisible = true
  },
  [MUTATIONS.HIDE_SIDEBAR] (state) {
    state.isVisible = false
  },
  [MUTATIONS.TOGGLE_SIDEBAR] (state) {
    state.isVisible = !state.isVisible
  }
}

const actions = {
  showSidebar({ commit }) {
    commit(MUTATIONS.SHOW_SIDEBAR)
  },
  hideSidebar({ commit }) {
    commit(MUTATIONS.HIDE_SIDEBAR)
  },
  toggleSidebar({ commit }) {
    commit(MUTATIONS.TOGGLE_SIDEBAR)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
