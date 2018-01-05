
import Index from '@/pages/index'
import Login from '@/pages/base/login'

const routes = [
  {
    path: '/',
    name: '首页',
    component: Index
  },
  {
    path: '/login',
    name: '登录',
    component: Login
  },
]
export default routes
