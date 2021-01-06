export const state = () => ({
  notification: []
});

export const getters = {
  typingUsers: state => state.users.filter(notification => notification.status)
};

export const mutations = {
  setUser(state, notification) {
    state.notification = notification;
  },
  updateTypingUsers(state, notification) {
    state.typingUsers = [...state.typingUsers, notification];
  },
  newMessage(state, msg) {
    state.messages = [...state.messages, msg];
  },
  updateUsers(state, users) {
    state.users = users;
  },
  clearData(state) {
    state.notification = {};
    state.notification = {};
    state.messages = [];
    state.users = [];
  },
  setTypingStatus(state, notification) {
    const { users } = state;
    const { status, id } = notification;
    const userIndex = users.findIndex(u => u.id === id);
    users[userIndex].status = status;
  }
};

export const actions = {
  socketEmit({ commit }, { action, payload }) {
    this._vm.$socket.emit(action, payload, data => {
      // console.log(data);
    });
  },
  createUser({ commit, dispatch, state }, { data, cb }) {
    const { user } = state;
    const payload = Object.assign(data, user.id);

    dispatch("socketEmit", {
      action: "createUser",
      payload,
      cb
    });
  },
  uploadProgress({ commit, dispatch, state }, msg) {
    const { notification } = state;
    const payload = {
      msg,
      id: notification.id
    };

    dispatch("socketEmit", {
      action: "uploadProgress",
      payload
    });
  },
  joinRoom({ commit, dispatch, state }) {
    const { notification } = state;

    dispatch("socketEmit", {
      action: "joinRoom",
      payload: notification
    });
  },
  leftRoom({ commit, dispatch, state }) {
    dispatch("socketEmit", {
      action: "leftChat",
      payload: null
    });

    commit("clearData");
  },
  typing({ commit, dispatch, state }) {
    const { notification } = state;
    dispatch("socketEmit", {
      action: "typing",
      payload: notification
    });
  },
  addTypingUser({ commit, dispatch, state }, notification) {
    if (!state.typingUsers.some(el => el.id === notification.id)) {
      commit("updateTypingUsers", notification);
    }
  },
  setTypingStatus({ commit, dispatch, state }, status) {
    const { notification } = state;
    const newUser = { ...notification, status };
    dispatch("socketEmit", {
      action: "setTypingStatus",
      payload: newUser
    });
  },
  displayTypingStatus({ commit }, notification) {
    commit("setTypingStatus", notification);
  }
};
