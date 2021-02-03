export const state = () => ({
  file: []
})

export const getters = {
  typingUsers: state => state.users.filter(user => user.status)
}

export const mutations = {
  uploadService () {}
}

export const actions = {
  async getIP ({ commit }) {
    const ip = await this.$axios.$get("http://icanhazip.com")
    commit("SET_IP", ip)
  },
  async upload ({ commit }) {
    const ip = await this.$axios.$post("/upload")
    commit("SET_IP", ip)
  }
}
