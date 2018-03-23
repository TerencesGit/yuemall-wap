<template>
  <section class="pay-page">
      <slef-header :title="'支付中心'"></slef-header>
      <div class="order-detail">
          <div class="order-name">
              <h3>{{orderName}}</h3>
              <p>请在30分钟内完成支付，否则该订单将被自动取消</p>
          </div>
          <div class="order-amount">
              <label>应付金额：</label>
              <span><i class="i-rmb">￥</i>{{totalAmount}}</span>
          </div>
      </div>
      <div class="pay-way">
          <ul class="pay-way-list">
              <li class="pay-item" @click="handlePay('WXP')">
                  <img src="/static/image/logo_wxpay.png" alt="">
              </li>
               <li class="pay-item" @click="handlePay('YBF')">
                  <img src="/static/image/logo_ybfpay1.png" alt="">
                  <span class="tip">推荐</span>
              </li>
          </ul>
      </div>
  </section>
</template>
<script>
import slefHeader from '../myCenter/selfHeader'
import { publicpay, H5Pay, yueInstalmentWap, getOrderInfoByPayId } from '@/api'
export default {
    components: {
        slefHeader
    },
    data() {
        return {
            payId: '',
            orderName: '',
            totalAmount: 0,
        }
    },
    methods: {
            getOrderInfo() {
                let data = {
                    id: this.payId,
                }
                getOrderInfoByPayId(data).then(res => {
                    if(res.data.status === 1) {
                        let result = res.data.data;
                        this.orderName = result.orderName;
                        this.totalAmount = (result.orderInfoPay.amountAll / 100).toFixed(2);
                    } else {
                        this.$showToast('获取订单信息失败', 2000);
                    }
                })
            },
            isWeiXin() {
                const ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    return true;
                } else {
                    return false;
                }
            },
            yuePay() {
                let params = {
                    orderPayId: this.payId
                }
                yueInstalmentWap(params).then(res => {
                    if(res.data.url) {
                        window.location.href = res.data.url;
                    } else {
                        this.$showToast(res.data.msg)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            getOpenId() {
                let data= {
                    id: this.payId,
                    payType: 1,
                    rawUrl: '/#'+this.$route.fullPath,
                }
                publicpay(data).then(res => {
                    if (res.data.data && res.data.data.redirectUrl) {
                        window.location.href = res.data.data.redirectUrl;
                    }
                })
            },
            wxPay() {
                let data= {
                    id: this.payId,
                    payType: 1,
                    rawUrl: '/#'+this.$route.fullPath,
                }
                publicpay(data).then(res => {
                    let self = this;
                    if (res.data.data && res.data.data.redirectUrl) {
                        window.location.href = res.data.data.redirectUrl;
                        return;
                    }
                    if(res.data.status === 1) {
                        // wx.chooseWXPay({
                        //     "appId": res.data.data.appId, //公众号名称，由商户传入
                        //     "timeStamp": res.data.data.timeStamp, //时间戳
                        //     "nonceStr": res.data.data.nonceStr, //随机串
                        //     "package": res.data.data.package,
                        //     "signType": res.data.data.signType, //微信签名方式：
                        //     "paySign": res.data.data.paySign, //微信签名  
                        //     success: function(res) {
                        //         // 支付成功后的回调函数  
                        //         if (res.errMsg == "chooseWXPay:ok") {  
                        //             //支付成功  
                        //             self.$showToast('支付成功')
                        //         } else {  
                        //             self.$showToast(res.errMsg)
                        //         }  
                        //     },  
                        //     cancel: function(res) {  
                        //         //支付取消  
                        //         self.$showToast('支付取消')
                        //     }  
                        // });  
                        WeixinJSBridge.invoke('getBrandWCPayRequest', {
                                "appId": res.data.data.appId, //公众号名称，由商户传入
                                "timeStamp": res.data.data.timeStamp, //时间戳
                                "nonceStr": res.data.data.nonceStr, //随机串
                                "package": res.data.data.package,
                                "signType": res.data.data.signType, //微信签名方式：
                                "paySign": res.data.data.paySign, //微信签名
                            }, function(res) {
                                if (res.err_msg == "get_brand_wcpay_request:ok") {
                                    this.$showToast('支付成功', 1000);
                                    // setTimeout(function() {
                                    //     if (d.data.orderType == 0) { //拍摄
                                    //         window.location.href = '../warp/completeInfo1.html?0?' + d.data.orderId + "?";
                                    //     } else if (d.data.orderType == 1) { //旅游
                                    //         window.location.href = '../warp/completeInfo2.html?1?' + d.data.orderId + "?" + personNumArray.join(",");
                                    //     }
                                    // }, 900);
                                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                                    this.$showToast('支付已取消', 1000);
                                    // window.location.href = '../index.html';
                                } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                                    this.$showToast('支付失败', 1000);
                                    // window.location.href = '../index.html';
                                } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                            }
                        );
                    } else {
                        this.$showToast(res.data.msg, 1000)
                    }
                })
            },
            wxH5Pay() {
                let data = {
                    id: this.payId
                }
                H5Pay(data).then(res => {
                    if(res.data.status === 1 && res.data.url) {
                        window.location.href = res.data.url;
                    } else {
                        this.$showToast(res.data.msg)
                    }
                })
            },
            handlePay(payway) {
                if(payway === 'YBF') {
                    this.yuePay()
                } else if(payway === 'WXP') {
                    if(this.isWeiXin()) {
                        this.wxPay()
                    } else {
                        this.wxH5Pay()
                    }
                }
            },
    },
    created() {
        this.payId = this.$route.query.payId;
        if(this.payId) {
            this.getOrderInfo()
            this.getOpenId()
        } else {
            this.$router.push('/')
        }
    }
}
</script>
<style lang="scss" scoped>
    .order-detail {
        background: #fff;
        .order-name {
            padding: 15px;
            border-bottom: 1px solid #ccc;
            h3 {
                margin-bottom: 10px;
                font-size: 18px;
            }
        }
        .order-amount {
            padding: 15px;
            border-bottom: 1px dashed #ccc;
            label {
                font-size: 16px;
                color:#666;
            }
            span {
                color: #f60;
                font-size: 20px;
                font-weight: bolder;
                .i-rmb {
                    font-size: 12px;
                    font-weight: normal;
                    font-family: 'Microsoft Yahei';
                }
            }
        }
    }
    .pay-way {
        margin-top: 15px;
        background: #fff;
        .pay-way-list {
            .pay-item {
                position: relative;
                height: 55px;
                line-height: 55px;
                padding: 10px 20px;
                border-bottom: 1px solid #ccc;
                &:last-child {
                    border-bottom: 0;
                }
                img {
                    width: 118px;
                }
                .tip {
                    position: absolute;
                    top: 15px;
                    display: inline-block;
                    width: 40px;
                    height: 25px;
                    text-align: center;
                    line-height: 25px;
                    margin-left: 20px;
                    color: #fff;
                    font-size: 12px;
                    border-radius: 5px;
                    background: #f60;
                    &:before {
                        content: '';
                        position: absolute;
                        top: 4px;
                        left: -7px;
                        width: 0;
                        height: 0;
                        border-top: 8px solid transparent;
                        border-right: 10px solid #f60;
                        border-bottom: 8px solid transparent;
                    }
                }
            }
        }
    }
</style>