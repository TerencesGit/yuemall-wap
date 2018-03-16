<template>
  <section class="pay-page">
      <div class="order-detail">
          <div class="order-name">
              <h3>{{wareName}}</h3>
              <p>请在30分钟内完成支付，否则该订单将被自动取消</p>
          </div>
          <div class="order-amount">
              <label>应付金额：</label>
              <span><i>￥</i>{{wareOrderInfo.totalAmount}}</span>
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
import { publicpay, H5Pay, yueInstalmentWap } from '@/api'
export default {
  data() {
      return {
          wareName: '',
          payId: '',
          wareOrderInfo: {}
      }
  },
  methods: {
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
                  this.$showToast('服务器响应错误')
              }
          }).catch(err => {
              console.log(err)
          })
        },
        wxPay() {
          let data= {
              id: this.payId,
              payType: 1
          }
          publicpay(data).then(res => {
              if(res.data.status === 1) {
                   WeixinJSBridge.invoke('getBrandWCPayRequest', {
                        "appId": res.data.appId, //公众号名称，由商户传入
                        "timeStamp": res.data.timeStamp, //时间戳
                        "nonceStr": res.data.nonceStr, //随机串
                        "package": res.data.package,
                        "signType": res.data.signType, //微信签名方式：
                        "paySign": res.data.paySign, //微信签名
                    }, function(res) {
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            this.$showToast('支付成功');
                            // setTimeout(function() {
                            //     if (d.data.orderType == 0) { //拍摄
                            //         window.location.href = '../warp/completeInfo1.html?0?' + d.data.orderId + "?";
                            //     } else if (d.data.orderType == 1) { //旅游
                            //         window.location.href = '../warp/completeInfo2.html?1?' + d.data.orderId + "?" + personNumArray.join(",");
                            //     }
                            // }, 900);
                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            this.$showToast('支付已取消');
                            // window.location.href = '../index.html';
                        } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                            this.$showToast('支付失败');
                            // window.location.href = '../index.html';
                        } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    }
                );
              } else {
                this.$showToast(res.data.msg)
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
      if(this.$store.getters.isLogin === 1) {
        this.wareName = sessionStorage.getItem('wareName');
        this.wareOrderInfo = JSON.parse(sessionStorage.getItem('wareOrderInfo'));
        this.payId = this.$route.query.payId;
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
                i {
                    font-size: 12px;
                    font-weight: normal;
                }
            }
        }
    }
    .pay-way {
        margin-top: 15px;
        background: #fff;
        .pay-way-list {
            .pay-item {
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
                    position: relative;
                    top: -10px;
                    padding: 2px 8px;
                    margin-left: 10px;
                    color: #fff;
                    border-radius: 5px;
                    background: #f60;
                    &:before {
                        content: '';
                        position: absolute;
                        top: 7px;
                        left: -4px;
                        width: 8px;
                        height: 8px;
                        background: #f60;
                        transform: rotate(45deg);
                    }
                }
            }
        }
    }
</style>