export const state = () => ({
  ftp: {
    progress: 0,
    status: false
  }
});

export const mutations = {
  SOCKET_updateProgress(state, ftp) {
    state.ftp = ftp;
  },
  SOCKET_setFtpStatus(state, status) {
    state.ftp.status = status;
  },
  SOCKET_setFtpProgress(state, progress) {
    state.ftp.progress = progress;
  }
};

export const actions = {
  socketEmit(_, { action, payload }) {
    let socket;
    try {
      socket = this._vm.$socket.emit(action, payload);
    } catch (err) {
      console.log("ERROR EMIT UNDEFINED", err);
    }
    return socket;
  },
  upload({ commit, dispatch, state }, { file_id, data }) {
    const { ftp } = state;
    const payload = { data, file_id };
    dispatch("socketEmit", {
      action: "ftp/upload",
      payload
    });
  },
  async connectionFtp({ commit, dispatch, state }, { status, file_id }) {
    let response;
    try {
      const { id } = await dispatch("socketEmit", {
        action: "ftp/connection",
        payload: {
          status,
          file_id
        }
      });
      console.log("CONNECTION FTP", id);
      return id;
    } catch (err) {
      throw new Error("ERROR_SOCKET_FTP_CONNECTION: ", err, "response");
    }
    return response;
  },
  async disconnect({ commit, dispatch, state }, { file_id }) {
    try {
      const { id } = await dispatch("socketEmit", {
        action: "ftp/disconnect",
        payload: {
          file_id
        }
      });
    } catch (err) {
      console.log("ERROR_DISCONNECTED_SOCKET", err);
    }
  },
  test({ commit, dispatch, state }, { status, id }) {
    const { ftp } = state;
    const payload = {
      status,
      id
    };
    dispatch("socketEmit", {
      action: "ftp/test",
      payload
    });
  },
  displayTypingStatus({ commit }, user) {
    commit("setTypingStatus", user);
  }
};
