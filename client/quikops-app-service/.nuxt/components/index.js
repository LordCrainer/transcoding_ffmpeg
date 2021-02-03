export { default as ChatForm } from '../..\\components\\ChatForm.vue'
export { default as Logo } from '../..\\components\\Logo.vue'
export { default as Message } from '../..\\components\\Message.vue'
export { default as Snackbar } from '../..\\components\\Snackbar.vue'
export { default as VuetifyLogo } from '../..\\components\\VuetifyLogo.vue'
export { default as ChannelTable } from '../..\\components\\file\\channel-table.vue'
export { default as InputFile } from '../..\\components\\file\\input-file.vue'
export { default as SelectChannel } from '../..\\components\\file\\select-channel.vue'
export { default as Menu } from '../..\\components\\ui\\menu.vue'
export { default as Stepper } from '../..\\components\\ui\\stepper.vue'

export const LazyChatForm = import('../..\\components\\ChatForm.vue' /* webpackChunkName: "components/chat-form" */).then(c => c.default || c)
export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c)
export const LazyMessage = import('../..\\components\\Message.vue' /* webpackChunkName: "components/message" */).then(c => c.default || c)
export const LazySnackbar = import('../..\\components\\Snackbar.vue' /* webpackChunkName: "components/snackbar" */).then(c => c.default || c)
export const LazyVuetifyLogo = import('../..\\components\\VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => c.default || c)
export const LazyChannelTable = import('../..\\components\\file\\channel-table.vue' /* webpackChunkName: "components/channel-table" */).then(c => c.default || c)
export const LazyInputFile = import('../..\\components\\file\\input-file.vue' /* webpackChunkName: "components/input-file" */).then(c => c.default || c)
export const LazySelectChannel = import('../..\\components\\file\\select-channel.vue' /* webpackChunkName: "components/select-channel" */).then(c => c.default || c)
export const LazyMenu = import('../..\\components\\ui\\menu.vue' /* webpackChunkName: "components/menu" */).then(c => c.default || c)
export const LazyStepper = import('../..\\components\\ui\\stepper.vue' /* webpackChunkName: "components/stepper" */).then(c => c.default || c)
