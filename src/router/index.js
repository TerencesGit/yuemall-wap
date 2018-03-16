
import Login from '@/pages/base/login'
import Register from '@/pages/base/register'
import Index from '@/pages/index'
import WareDetail from '@/pages/ware/detail'
import WareList from '@/pages/ware/list'
import WareReserve from '@/pages/ware/reserve'
import WareAgreement from '@/pages/ware/agreement'
import WareOrder from '@/pages/ware/order'
import WarePay from '@/pages/ware/pay'
import WareSearch from '@/pages/ware/search'

import myCenter from '@/pages/myCenter/myCenter'
import selfInfo from '@/pages/myCenter/selfInfo'
import nickName from '@/pages/myCenter/nickName'
import email from '@/pages/myCenter/email'
import phone from '@/pages/myCenter/phone'
import deliverAddress from '@/pages/myCenter/deliverAddress'
import edit from '@/pages/myCenter/editAddress'
import addAddress from '@/pages/myCenter/addAddress'
import selfOrder from '@/pages/myCenter/self-order'
import orderDetail from '@/pages/myCenter/order-detail'
import checkSchedule from '@/pages/myCenter/check-schedule'
import safetyNotice from '@/pages/myCenter/safety-notice'
import proSnapshot from '@/pages/myCenter/pro-snapshot'
import selfGifts from '@/pages/myCenter/self-gifts'
import selfEnshrine from '@/pages/myCenter/self-enshrine'
import selfNotice from '@/pages/myCenter/self-notice'
import selfHelp from '@/pages/myCenter/self-help'

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
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
    path: '/ware/agreement',
    name: '商品预定协议页',
    component: WareAgreement
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
  {
    path: '/ware/search',
    name: '点击搜索',
    component: WareSearch
  },
  { path: '/myCenter', name: '个人中心', component: myCenter},
  { path: '/myCenter/selfInfo', name: 'selfInfo', component: selfInfo },
  { path: '/myCenter/nickname',name: 'nickName',component: nickName },
  { path: '/myCenter/email',name: 'email',component: email },
  { path: '/myCenter/phone', name: 'phone', component: phone },
  { path: '/myCenter/deliverAddress', name: 'deliverAddress', component: deliverAddress},
  { path: '/myCenter/deliverAddress/edit', name: 'edit', component: edit },
  { path: '/myCenter/deliverAddress/addAddress', name: 'addAddress', component: addAddress },
  { path: '/myCenter/selfOrder', name: 'selfOrder', component: selfOrder },
  { path: '/myCenter/selfOrder/orderDetail', name: 'orderDetail', component: orderDetail },
  { path: '/myCenter/selfOrder/checkSchedule', name: 'checkSchedule', component: checkSchedule },
  { path: '/myCenter/selfOrder/safetyNotice', name: 'safetyNotice', component: safetyNotice },
  { path: '/myCenter/selfOrder/proSnapshot', name: 'proSnapshot', component: proSnapshot },
  { path: '/myCenter/selfGifts', name: 'selfGifts', component: selfGifts },
  { path: '/myCenter/selfEnshrine', name: 'selfEnshrine', component: selfEnshrine },
  { path: '/myCenter/selfNotice', name: 'selfNotice', component: selfNotice },
  { path: '/myCenter/selfHelp', name: 'selfHelp', component: selfHelp },
]
export default routes
