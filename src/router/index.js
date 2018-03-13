
import Login from '@/pages/base/login'
import Register from '@/pages/base/register'
import Index from '@/pages/index'
import WareDetail from '@/pages/ware/detail'
import WareList from '@/pages/ware/list'
import WareReserve from '@/pages/ware/reserve'
import WareOrder from '@/pages/ware/order'
import WarePay from '@/pages/ware/pay'

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
  {
    path: '/ware/list',
    name: '商品列表页',
    component: WareList
  },
  {
    path: '/ware/reserve',
    name: '商品预定页',
    component: WareReserve
  },
  {
    path: '/ware/order',
    name: '商品订单页',
    component: WareOrder
  },
  {
    path: '/ware/pay',
    name: '商品支付页',
    component: WarePay
  },
]
export default routes
