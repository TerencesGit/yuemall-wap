
import Login from '@/pages/base/login'
import Register from '@/pages/base/register'
import Index from '@/pages/index'
import WareDetail from '@/pages/ware/detail'

const routes = [
  {
    path: '/',
    name: '首页',
    component: Index
  },
  {
    path: '/login',
    name: '欢迎登录',
    component: Login
  },
  {
    path: '/register',
    name: '欢迎注册',
    component: Register
  },
  {
    path: '/ware/detail',
    name: '商品详情页',
    component: WareDetail
  },
]
export default routes
