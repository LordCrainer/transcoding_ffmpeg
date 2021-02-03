import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import io from 'socket.io-client'
// import store from '../store'
import config from '../server/config/vars'
const {
  socket: { socketServer, options }
} = config
const socketInstance = io(socketServer, options)
export default ({ store }) => {
  Vue.use(
    new VueSocketIO({
      debug: false,
      connection: socketInstance,
      vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
      }
    })
  )
}
