export const state = () => ({
  ftp: {
    progress: 0,
    status: false
  }
})

export const mutations = {
  SOCKET_updateProgress (state, ftp) {
    state.ftp = ftp
  },
  SOCKET_setFtpStatus (state, status) {
    state.ftp.status = status
  },
  SOCKET_setFtpProgress (state, progress) {
    state.ftp.progress = progress
  }
}

export const actions = {
  socketEmit (_, { action, payload }) {
    let socket
    try {
      socket = this._vm.$socket.emit(action, payload)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("ERROR EMIT UNDEFINED", err)
    }
    return socket
  },
  upload ({ commit, dispatch, state }, { fileId, data }) {
    // const { ftp } = state
    const payload = { data, fileId }
    dispatch("socketEmit", {
      action: "ftp/upload",
      payload
    })
  },
  async connectionFtp ({ commit, dispatch, state }, { status, fileId }) {
    try {
      const { id } = await dispatch("socketEmit", {
        action: "ftp/connection",
        payload: {
          status,
          fileId
        }
      })
      // eslint-disable-next-line no-console
      console.log("CONNECTION FTP", id)
      return id
    } catch (err) {
      throw new Error("ERROR_SOCKET_FTP_CONNECTION: ", err, "response")
    }
  },
  async disconnect ({ commit, dispatch, state }, { fileId }) {
    try {
      const { id } = await dispatch("socketEmit", {
        action: "ftp/disconnect",
        payload: {
          fileId
        }
      })
      return id
    } catch (err) {
      throw new Error("CANNOT DISCONNECTED")
    }
  },
  test ({ commit, dispatch, state }, { status, id }) {
    // const { ftp } = state
    const payload = {
      status,
      id
    }
    dispatch("socketEmit", {
      action: "ftp/test",
      payload
    })
  },
  displayTypingStatus ({ commit }, user) {
    commit("setTypingStatus", user)
  }
}
