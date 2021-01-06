import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _505bf60a = () => interopDefault(import('..\\pages\\appChat\\index.vue' /* webpackChunkName: "pages/appChat/index" */))
const _4ae1cf64 = () => interopDefault(import('..\\pages\\file\\index.vue' /* webpackChunkName: "pages/file/index" */))
const _41d0c3dc = () => interopDefault(import('..\\pages\\ftp\\index.vue' /* webpackChunkName: "pages/ftp/index" */))
const _3d17e13f = () => interopDefault(import('..\\pages\\appChat\\chat.vue' /* webpackChunkName: "pages/appChat/chat" */))
const _042d9340 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _505bf60a,
    name: "appChat"
  }, {
    path: "/file",
    component: _4ae1cf64,
    name: "file"
  }, {
    path: "/ftp",
    component: _41d0c3dc,
    name: "ftp"
  }, {
    path: "/appChat/chat",
    component: _3d17e13f,
    name: "appChat-chat"
  }, {
    path: "/",
    component: _042d9340,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
