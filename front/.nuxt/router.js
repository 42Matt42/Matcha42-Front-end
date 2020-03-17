import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0a215fde = () => interopDefault(import('..\\pages\\activate\\index.vue' /* webpackChunkName: "pages_activate_index" */))
const _17cf3328 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages_inspire" */))
const _8f0e0bb2 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages_login_index" */))
const _65d65d2e = () => interopDefault(import('..\\pages\\password\\index.vue' /* webpackChunkName: "pages_password_index" */))
const _33ff0861 = () => interopDefault(import('..\\pages\\register\\index.vue' /* webpackChunkName: "pages_register_index" */))
const _ec557efe = () => interopDefault(import('..\\pages\\reset\\index.vue' /* webpackChunkName: "pages_reset_index" */))
const _62940af4 = () => interopDefault(import('..\\pages\\welcome.vue' /* webpackChunkName: "pages_welcome" */))
const _f6ee7c46 = () => interopDefault(import('..\\pages\\login\\logout\\index.vue' /* webpackChunkName: "pages_login_logout_index" */))
const _5db78590 = () => interopDefault(import('..\\pages\\login\\matchme\\index.vue' /* webpackChunkName: "pages_login_matchme_index" */))
const _5d3a27de = () => interopDefault(import('..\\pages\\login\\mycrush\\index.vue' /* webpackChunkName: "pages_login_mycrush_index" */))
const _c06ed2f8 = () => interopDefault(import('..\\pages\\login\\profile\\index.vue' /* webpackChunkName: "pages_login_profile_index" */))
const _47336866 = () => interopDefault(import('..\\pages\\login\\mycrush\\mylikes\\index.vue' /* webpackChunkName: "pages_login_mycrush_mylikes_index" */))
const _de2c6318 = () => interopDefault(import('..\\pages\\login\\mycrush\\myviews\\index.vue' /* webpackChunkName: "pages_login_mycrush_myviews_index" */))
const _7f1c36ae = () => interopDefault(import('..\\pages\\login\\profile\\mygeoloc\\index.vue' /* webpackChunkName: "pages_login_profile_mygeoloc_index" */))
const _6e51220f = () => interopDefault(import('..\\pages\\login\\profile\\mypics\\index.vue' /* webpackChunkName: "pages_login_profile_mypics_index" */))
const _36d00281 = () => interopDefault(import('..\\pages\\login\\profile\\settings\\index.vue' /* webpackChunkName: "pages_login_profile_settings_index" */))
const _50674a62 = () => interopDefault(import('..\\pages\\login\\profile\\settings\\newpass\\index.vue' /* webpackChunkName: "pages_login_profile_settings_newpass_index" */))
const _cfd4df60 = () => interopDefault(import('..\\pages\\login\\chat\\_username\\index.vue' /* webpackChunkName: "pages_login_chat__username_index" */))
const _79d87efa = () => interopDefault(import('..\\pages\\login\\user\\_username\\index.vue' /* webpackChunkName: "pages_login_user__username_index" */))
const _673696e4 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _1f90331e = () => interopDefault(import('..\\pages\\_\\index.vue' /* webpackChunkName: "pages___index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/activate",
    component: _0a215fde,
    name: "activate"
  }, {
    path: "/inspire",
    component: _17cf3328,
    name: "inspire"
  }, {
    path: "/login",
    component: _8f0e0bb2,
    name: "login"
  }, {
    path: "/password",
    component: _65d65d2e,
    name: "password"
  }, {
    path: "/register",
    component: _33ff0861,
    name: "register"
  }, {
    path: "/reset",
    component: _ec557efe,
    name: "reset"
  }, {
    path: "/welcome",
    component: _62940af4,
    name: "welcome"
  }, {
    path: "/login/logout",
    component: _f6ee7c46,
    name: "login-logout"
  }, {
    path: "/login/matchme",
    component: _5db78590,
    name: "login-matchme"
  }, {
    path: "/login/mycrush",
    component: _5d3a27de,
    name: "login-mycrush"
  }, {
    path: "/login/profile",
    component: _c06ed2f8,
    name: "login-profile"
  }, {
    path: "/login/mycrush/mylikes",
    component: _47336866,
    name: "login-mycrush-mylikes"
  }, {
    path: "/login/mycrush/myviews",
    component: _de2c6318,
    name: "login-mycrush-myviews"
  }, {
    path: "/login/profile/mygeoloc",
    component: _7f1c36ae,
    name: "login-profile-mygeoloc"
  }, {
    path: "/login/profile/mypics",
    component: _6e51220f,
    name: "login-profile-mypics"
  }, {
    path: "/login/profile/settings",
    component: _36d00281,
    name: "login-profile-settings"
  }, {
    path: "/login/profile/settings/newpass",
    component: _50674a62,
    name: "login-profile-settings-newpass"
  }, {
    path: "/login/chat/:username?",
    component: _cfd4df60,
    name: "login-chat-username"
  }, {
    path: "/login/user/:username?",
    component: _79d87efa,
    name: "login-user-username"
  }, {
    path: "/",
    component: _673696e4,
    name: "index"
  }, {
    path: "/*",
    component: _1f90331e,
    name: "all"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
