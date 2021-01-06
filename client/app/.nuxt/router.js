import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4bd6cae2 = () => interopDefault(import('../pages/appChat/index.vue' /* webpackChunkName: "pages/appChat/index" */))
const _2e448269 = () => interopDefault(import('../pages/file/index.vue' /* webpackChunkName: "pages/file/index" */))
const _3f20eeeb = () => interopDefault(import('../pages/ftp/index.vue' /* webpackChunkName: "pages/ftp/index" */))
const _34017b10 = () => interopDefault(import('../pages/appChat/chat.vue' /* webpackChunkName: "pages/appChat/chat" */))
const _2dfb1658 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/app/services/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/appChat",
    component: _4bd6cae2,
    name: "appChat"
  }, {
    path: "/file",
    component: _2e448269,
    name: "file"
  }, {
    path: "/ftp",
    component: _3f20eeeb,
    name: "ftp"
  }, {
    path: "/appChat/chat",
    component: _34017b10,
    name: "appChat-chat"
  }, {
    path: "/",
    component: _2dfb1658,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
