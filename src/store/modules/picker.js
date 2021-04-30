// helper to catch errors
const fetchJSON = (...args) => {
  return fetch(...args)
    .then(res => {
      if (res.ok) { return res.json() }
      return res.text().then(text => { throw new Error(text) })
    })
}

export default {
  namespaced: true,
  state: () => ({
    date: [new Date().toISOString().substring(0, 10)],
    originDate: [new Date().toISOString().substring(0, 10)],
    loading: true,
    dialog: {
      show: false,
      type: 'failure'
    }
  }),
  mutations: {
    SET_DATE (state, payload) { state.date = payload },
    SET_ORIGIN_DATE (state, payload) { state.originDate = payload },
    SET_LOADING (state, payload) { state.loading = payload },
    SET_MODAL (state, payload) { state.dialog = payload }
  },
  actions: {  
    GET_DATES ({ commit }) {
      fetchJSON('http://test.unit.homestretch.ch', { method: 'GET' })
        .then((data) => {
          commit('SET_DATE', [...data])
          commit('SET_ORIGIN_DATE', [...data])
          commit('SET_LOADING', false)
        })
        .catch(error => {
          console.error(error)
          commit('SET_MODAL', { show: true, type: 'failure' })
        })
    },
    SET_SELECTION ({ commit }, selectedArr) { commit('SET_DATE', selectedArr) },
    POST_DATES ({ state, commit }) {
      const newDates = state.date
      if (newDates.length === 0) { return }
      commit('SET_LOADING', true)

      const oldDates = state.originDate
      const postData = []

      oldDates.forEach(date => {
        if (newDates.indexOf(date) === -1) {
          postData.push({ date, value: false })
        }
      })
      newDates.forEach(date => { postData.push({ date, value: true }) })

      // to decrease the amount of API calls compare if same dates were selected
      if (oldDates.length === postData.length && postData.every(item => item.value)) {
        commit('SET_LOADING', false)
        return
      }

      let headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Origin','http://localhost:8080');

      fetchJSON('http://test.unit.homestretch.ch/save', {
          method: 'POST',
          headers,
          body: JSON.stringify(postData),
        })
        .then((data) => {
          // if expected data changes from the server then component can be rerendered here
          // otherwise, our new success data is already in the state
          console.log('Success:', data)
          commit('SET_ORIGIN_DATE', data)
          commit('SET_MODAL', { show: true, type: 'success' })
          commit('SET_LOADING', false)
        })
        .catch(error => {
          console.error('Error:', error)
          commit('SET_MODAL', { show: true, type: 'failure' })
          commit('SET_LOADING', false) // to keep it DRY can be wrapped in a func with async await
        })
    },
    RESET_DATES ({ commit, state }) { commit('SET_DATE', [...state.originDate]) },
    TOGGLE_MODAL ({ commit }, modalObj) { commit('SET_MODAL', modalObj) }
  }
}
