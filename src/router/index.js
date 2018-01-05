
import Index from '@/pages/index'
import Login from '@/pages/base/login'
import Register from '@/pages/base/register'

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
]
export default routes
