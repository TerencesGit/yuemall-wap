<template>
	<footer class="fixed-navbar">
		<ul class="nav-list">
			<li class="nav-item">
				<router-link to="/index">
					<!-- <i class="icon icon-home"></i> -->
					<span>首页</span>
				</router-link>
			</li>
			<li class="nav-item">
				<a href="tel:18500137582">
					<!-- <i class="icon icon-contact"></i> -->
					<span>联系客服</span>
				</a>
			</li>
			<li class="nav-item">
				<router-link to="/myCenter">
					<!-- <i class="icon icon-mine"></i> -->
					<span>我的</span>
				</router-link>
			</li>
		</ul>
	</footer>
</template>
<script>
	export default {
		name: 'indexFooter',
	}
</script>
<style scoped lang="scss">
	.fixed-navbar {
		position: fixed;
		bottom: 0;
		z-index: 99;
		width: 100%;
		background: rgba(0,0,0,.9);
		.nav-list {
			display: flex;
			justify-content: center;
			align-items: center;
			li {
				flex: 1;
				text-align: center;
				line-height: 40px;
				border-right: 1px solid rgb(10,10,10);
				a {
					display: block;
					width: 100%;
					height: 100%;
					&.router-link-active {
						background: rgb(0, 161, 229);
					}
					// padding: 15px 12px;
				}
				// a {
				// 	&.router-link-active {
				// 		.icon-home {
				// 			background: url(http://wap.yueshijue.com/selfCenter/assets/img/mine_page/tab_home_active.png) no-repeat;
				// 			background-size: cover;
				// 		}
				// 		.icon-contact {
				// 			background: url(http://wap.yueshijue.com/selfCenter/assets/img/mine_page/tab_contact_active.png) no-repeat;
				// 			background-size: cover;
				// 		}
				// 		.icon-mine {
				// 			background: url(http://wap.yueshijue.com/selfCenter/assets/img/mine_page/tab_mine_active.png) no-repeat;
				// 			background-size: cover;
				// 		}
				// 		span {
				// 			color: #00aaef;
				// 		}
				// 	}
				// }
				// .icon {
				// 	display: block;
				// 	width: 21px;
				// 	height:21px;
				// 	margin: 0 auto;
				// 	&.icon-home {
				// 		background: url(http://wap.yueshijue.com/selfCenter/assets/img/mine_page/tab_home.png) no-repeat;
				// 		background-size: cover;
				// 	}
				// 	&.icon-contact {
				// 		background: url(http://wap.yueshijue.com/selfCenter/assets/img/mine_page/tab_contact.png) no-repeat;
				// 		background-size: cover;
				// 	}
				// 	&.icon-mine {
				// 		background: url(http://wap.yueshijue.com/selfCenter/assets/img/mine_page/tab_mine.png) no-repeat;
				// 		background-size: cover;
				// 	}
				// }
				span {
					position: relative;
					top: 2px;
					color: #fff;
					font-size: 14px;
				}
			}
		}
	}
</style>