// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import Router from 'vue-router'
import App from './App'
import routes from './router'
import MintUI from 'mint-ui'
import { Toast, Indicator } from 'mint-ui'
import 'mint-ui/lib/style.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '@/assets/css/main.scss'
import '@/assets/css/theme/default.scss'
import Calendar from './components/pricecalendar'
import InputNumber from './components/input-number'
import Checkbox from './components/checkbox'
import store from './vuex/store'
Vue.use(Router)
Vue.use(MintUI)
Vue.use(Calendar)
Vue.use(InputNumber)
Vue.use(Checkbox)
Vue.directive('title', {
  inserted (el, binding) {
    document.title = el.dataset.title
  }
})
NProgress.configure({ ease: 'ease', speed: 500, minimum: 0.5, showSpinner: false})
const router = new Router({
  routes
})
Vue.config.productionTip = false
Vue.prototype.$catchError = (err) => {
  if(!err.data) {
    Toast('服务器响应错误')
    return;
  }
  if(err.data.code) {
    Toast(err.data.message)
  } else {
    Toast('服务器响应超时')
  }
}
Vue.prototype.$showToast = (message, duration = 1000) => {
  Toast({
    message,
    duration,
  })
}
router.beforeEach((to, from, next) => {
  NProgress.start()
  if(to.meta && to.meta.requireAuth) {
    let checkLogin = async () => {
      const isLogin = await store.dispatch('loadUserInfo')
      if(isLogin === 1) {
        next()
      } else {
        next(`/login?redirect=${to.fullPath}`)
      }
    }
    checkLogin()
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  NProgress.done()
})
axios.interceptors.request.use(config => {
  Indicator.open({
    spinnerType: 'snake'
  })
  return config
}, error => {
  console.log('request error')
  return Promise.reject(error)
})
axios.interceptors.response.use(res => {
  Indicator.close()
  if(res.data.result && res.data.result.redirectUrl) {  
    window.location.href = res.data.result.redirectUrl;
  }
  return res;
}, error => {
  Indicator.close()
  console.log(error)
  return Promise.reject(error)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
