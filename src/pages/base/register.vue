<template>
	<div class="page">
		<div v-title :data-title="$route.name"></div>
		<div class="login-form">
			<div class="form-item bg-white">
				<label for="" class="form-item-label">
					<img src="../../assets/img/user.png" class="icon">
				</label>
				<input type="text" class="form-item-input"  placeholder="请输入手机号" v-model.trim="form.username">
			</div>
			<div class="form-item bg-white">
				<label for="" class="form-item-label">
					<img src="../../assets/img/lock.png" class="icon">
				</label>
				<input type="password" class="form-item-input"  placeholder="请输入密码" v-model.trim="form.password">
			</div>
			<div class="form-item bg-white">
				<label for="" class="form-item-label">
					<img src="../../assets/img/lock.png" class="icon">
				</label>
				<input type="password" class="form-item-input"  placeholder="请再次输入密码" v-model.trim="form.password2">
			</div>
			<div class="form-item bg-white">
				<label for="" class="form-item-label">
					<img src="../../assets/img/yzm.png" class="icon">
				</label>
				<input type="text" class="form-item-input"  placeholder="请输入验证码" v-model.trim="form.authCode">
				<canvas id="canvasCode" width="80px" height="30px" class="canvas-code" @click="drawCode"></canvas>
			</div>
			<div class="form-item bg-white smscode">
				<label for="" class="form-item-label">
					<img src="../../assets/img/yzm.png" class="icon">
				</label>
				<input type="text" class="form-item-input"  placeholder="请输入手机验证码" v-model.trim="form.smsCode">
				<mt-button type="primary"class="small-size" @click.native="sendCode" :disabled="disabled">{{buttonText}}</mt-button>
			</div>
			<div class="form-button">
				<mt-button size="large" type="primary" @click.native="onSubmit">立即注册</mt-button>
			</div>
			<div class="form-button">
				<mt-button size="large" type="default" plain @click.native="handleSignin">去登录</mt-button>
			</div>
		</div>
	</div>
</template>
<script>
	import Utils from '@/assets/js/utils'
	import { requestRegister, smsverificode } from '@/api'
	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
					password2: '',
					authCode: '',
					smsCode: '',
				},
				authCode: '',
				buttonText: '获取验证码',
				disabled: false,
			}
		},
		methods: {
			showToast(msg) {
				this.$toast({
					message: msg,
					duration: 1000,
				})
			},
			drawCode () {
        this.authCode = Utils.canvasCode('canvasCode')
      },
      countDown () {
			  let count = 10;
			  var timer;
			  timer = setInterval(() => {
			      if (count === 0) {
			        clearInterval(timer)
			        count = 10;
			        this.disabled = false
			        this.buttonText = '重新获取'
			      } else {
			        count--;
			        this.buttonText = `重新获取${count--}s`
			      }
			    }, 1000)
		  },
      sendCode() {
      	if(!this.form.username.match(/^(13|14|15|17|18)\d{9}$/)) {
					this.showToast('请输入正确手机号')
					return;
				}
				this.disabled = true;
				this.countDown()
      	let data = {
      		phone: this.form.username,
      	}
      	smsverificode(data).then(res => {
      		console.log(res)
      		if(res.data.status === 1) {
      			this.showToast('短信验证码已发送')
      			this.countDown()
      		} else {
      			this.showToast(res.data.msg)
      		}
      	})
      },
			onSubmit() {
				let self = this;
				if(!this.form.username.match(/^(13|14|15|17|18)\d{9}$/)) {
					this.showToast('请输入正确手机号')
					return;
				} else if (this.form.password.length < 6) {
					this.showToast('密码不少于6位')
					return;
				} else if(this.form.password !== this.form.password2) {
					this.showToast('两次密码输入不一致')
					return;
				} else if(this.form.authCode == ''){
					this.showToast('请输入验证码')
					return;
				} else if(this.form.authCode.toUpperCase() !== this.authCode.toUpperCase()){
					this.showToast('验证码输入错误')
					return;
				} else if (this.form.smsCode.length === 0) {
					this.showToast('请输入手机验证码')
					return;
				}
				let data = {
					username: this.form.username,
					password: this.form.password,
					registerType: 1,
					storeId: 23,
					code: this.form.smsCode,
				}
				this.$indicator.open({
				  text: '正在注册...',
				  spinnerType: 'snake'
				})
				requestRegister(data).then(res => {
					this.$indicator.close()
					if(res.data.status === 1) {
						let userInfo = res.data.data;
						self.showToast(res.data.msg)
					} else {
						self.showToast(res.data.msg)
					}
				})
			},
			handleSignin() {
				this.$router.push('/login')
			}
		},
		mounted () {
      this.drawCode()
    }
	}
</script>
<style scoped lang="scss">
	.page {
		padding-top: 30px;
	}
	.icon {
		width: 20px;
	}
	.form-button {
		margin: 15px 10px;
	}
</style>