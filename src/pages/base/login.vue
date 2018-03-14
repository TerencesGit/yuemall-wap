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
				<input type="text" class="form-item-input"  placeholder="请输入密码" v-model.trim="form.password">
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
	import { requestLogin } from '@/api'
	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
				}
			}
		},
		methods: {
			showToast(msg) {
				this.$toast({
					message: msg,
					duration: 1000,
				})
			},
			onSubmit() {
				let self = this;
				if(this.form.username == '') {
					this.showToast('请输入用户名')
				} else if (this.form.password == '') {
					this.showToast('请输入密码')
				} else {
					let data = {
						username: this.form.username,
						password: this.form.password,
						loginType: 1,
						storeId: 23,
					}
					this.$indicator.open({
					  text: '登录中...',
					  spinnerType: 'snake'
					})
					requestLogin(data).then(res => {
						this.$indicator.close()
						if(res.data.status === 1) {
							let userInfo = res.data.data;
							console.log(userInfo)
							self.showToast(res.data.msg)
						} else {
							self.showToast(res.data.msg)
						}
					})
				}
			},
			handleSignup() {
				this.$router.push('/register')
			}
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