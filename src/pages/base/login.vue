<template>
	<div class="page">
		<div v-title :data-title="$route.name"></div>
		<div class="login-form">
			<div class="form-item bg-white">
				<label for="" class="form-item-label">
					<img src="../../assets/img/user.png" class="icon">
				</label>
				<input type="text" class="form-item-input"  placeholder="请输入用户名" v-model.trim="form.username">
			</div>
			<div class="form-item bg-white">
				<label for="" class="form-item-label">
					<img src="../../assets/img/lock.png" class="icon">
				</label>
				<input type="password" class="form-item-input"  placeholder="请输入密码" v-model.trim="form.password">
			</div>
			<div class="form-button">
				<mt-button size="large" type="primary" @click.native="onSubmit">登录</mt-button>
			</div>
			<div class="form-button">
				<mt-button size="large" type="default" plain @click.native="handleSignup">新用户注册</mt-button>
			</div>
		</div>
	</div>
</template>
<script>
	import { findStoreByWapDoMain, requestLogin } from '@/api'
	export default {
		data() {
			return {
				storeId: '',
				form: {
					username: '',
					password: '',
				}
			}
		},
		methods: {
			getStore() {
				findStoreByWapDoMain().then(res => {
					if(res.data.status === 1) {
						this.storeId = res.data.data;
						sessionStorage.setItem('storeId', this.storeId)
					} else {
						this.$showToast('获取商户信息失败')
					}
				})
			},
			onSubmit() {
				if(this.form.username.length === 0) {
					this.$showToast('请输入用户名')
				} else if (this.form.password.length === 0) {
					this.$showToast('请输入密码')
				} else {
					let data = {
						username: this.form.username,
						password: this.form.password,
						storeId: this.storeId,
						loginType: 1,
					}
					requestLogin(data).then(res => {
						if(res.data.status === 1) {
							this.$store.dispatch('changeLogin', 1)
							this.$store.dispatch('saveUserInfo', res.data.data)
							sessionStorage.setItem('isLogin', 1)
							this.$showToast('登录成功')
							if(this.$fromPath.indexOf('register') !== 1) {
								this.$router.replace(this.$fromPath)
							} else {
								this.$router.replace('/')
							}
						} else {
							this.$showToast(res.data.msg)
						}
					})
				}
			},
			handleSignup() {
				this.$router.push('/register')
			}
		},
		created() {
			this.storeId = sessionStorage.getItem('storeId');
			if(!this.storeId) this.getStore()
		}
	}
</script>
<style scoped lang="scss">
	.page {
		padding-top: 30px;
	}
	.icon {
		width: 18px;
	}
	.form-button {
		margin: 15px 10px;
	}
	.form-item {
		padding: 0 15px;
		.form-item-label {
			img {
				margin: 8px 15px 0 0;
			}
		}
	}
</style>