<template>
	<footer class="fixed-navbar">
		<ul class="nav-list">
			<li class="nav-item">
				<router-link to="/">
					<i class="icon icon-home"></i>
					<span>首页</span>
				</router-link>
			</li>
			<li class="nav-item">
				<router-link to="/register">
					<i class="icon icon-contact"></i>
					<span>联系客服</span>
				</router-link>
			</li>
			<li class="nav-item">
				<router-link to="/login">
					<i class="icon icon-mine"></i>
					<span>我的</span>
				</router-link>
			</li>
		</ul>
	</footer>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>
<style scoped lang="scss">
	.fixed-navbar {
		position: fixed;
		bottom: 0;
		z-index: 99;
		width: 100%;
		background: #fff;
		.nav-list {
			display: flex;
			justify-content: center;
			align-items: center;
			li {
				flex: 1;
				padding: 6px 12px;
				text-align: center;
				a {
					&.router-link-active {
						.icon-home {
							background: url(http://wap.yueshijue.com/selfCenter/assets/img/mine_page/tab_home_active.png) no-repeat;
							background-size: cover;
						}
						.icon-contact {
							background: url(http://wap.yueshijue.com/selfCenter/assets/img/mine_page/tab_contact_active.png) no-repeat;
							background-size: cover;
						}
						.icon-mine {
							background: url(http://wap.yueshijue.com/selfCenter/assets/img/mine_page/tab_mine_active.png) no-repeat;
							background-size: cover;
						}
						span {
							color: #00aaef;
						}
					}
				}
				.icon {
					display: block;
					width: 21px;
					height:21px;
					margin: 0 auto;
					&.icon-home {
						background: url(http://wap.yueshijue.com/selfCenter/assets/img/mine_page/tab_home.png) no-repeat;
						background-size: cover;
					}
					&.icon-contact {
						background: url(http://wap.yueshijue.com/selfCenter/assets/img/mine_page/tab_contact.png) no-repeat;
						background-size: cover;
					}
					&.icon-mine {
						background: url(http://wap.yueshijue.com/selfCenter/assets/img/mine_page/tab_mine.png) no-repeat;
						background-size: cover;
					}
				}
				span {
					position: relative;
					top: 2px;
					color: #666;
					font-size: 12px;
				}
			}
		}
		
	}
</style>