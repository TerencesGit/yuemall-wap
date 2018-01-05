// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import Router from 'vue-router'
import App from './App'
import routes from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '@/assets/css/main.scss'

Vue.use(Router)
Vue.use(MintUI)

NProgress.configure({ ease: 'ease', speed: 500, minimum: 0.5, showSpinner: false})
const router = new Router({
	routes
})
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach((to, from) => {
  NProgress.done()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
