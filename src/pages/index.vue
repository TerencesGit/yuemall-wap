<template>
	<section>
		<HeaederComp></HeaederComp>
		<!-- <h1><router-link to="/login">Wap首页</router-link></h1> -->
		<div class="swipe-wrap">
			<mt-swipe>
				<mt-swipe-item v-for="(item, index) in bannerList" :key="index">
					<router-link to="/">
					<!-- {background: 'url('+item.imgUrl+') center center no-repeat'} -->
			      <img :src="item.imgUrl" :alt="item.wareName">
			    </router-link>
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="navbar">
			<ul class="nav-list">
				<li>
					<router-link to="/">
						<img src="../assets/img/nav_native.png" alt="">
						<span>国内摄影</span>
					</router-link>
				</li>
				<li>
					<router-link to="/">
						<img src="../assets/img/nav_oversea.png" alt="">
						<span>国外摄影</span>
					</router-link>
				</li>
				<li>
					<router-link to="/">
						<img src="../assets/img/nav_global.png" alt="">
						<span>全球旅拍</span>
					</router-link>
				</li>
				<li>
					<router-link to="/">
						<img src="../assets/img/nav_tourism.png" alt="">
						<span>旅游</span>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="tabbar">
			<h3 class="tab-title">全球100+旅游目的地</h3>
			<div class="tab-header"></div>
			<div class="tab-body"></div>
		</div>
	</section>
</template>
<script>
	import HeaederComp from '../components/header'
	export default {
		data () {
			return {
				bannerList: [
					{
						wareId: 1000000020170801,
						wareName: '【巴厘岛蜜月旅拍婚纱摄影6天4晚游】一对一司导+接送机+一日全天拍摄+国际五星',
						url: '/detail?wareId=1000000020170801',
						imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097801640378.jpg'
					},
					{
						wareId: 1000000020170801,
						wareName: '【巴厘岛蜜月旅拍婚纱摄影6天4晚游】一对一司导+接送机+一日全天拍摄+国际五星',
						url: '/detail?wareId=1000000020170801',
						imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097801363816.jpg'
					}, 
					{
						wareId: 1000000020170802,
						wareName: '【圣托里尼旅拍婚纱照2日1晚游】 赠送拍摄用车+酒店接送+一对一服务',
						url: '/detail?wareId=1000000020170802',
						// imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/index/banner3.jpg',
						imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097800771313.jpg'
					},
					{
						wareId: 1000000020170803,
						wareName: '【美国塞班岛婚纱照2天1晚】碧海蓝天+悬崖码头+凤凰花',
						url: '/detail?wareId=1000000020170803',
						imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097801001784.jpg'
					},
					{
						wareId: 1000000020170804,
						wareName: '【巴黎旅拍婚纱照2日1晚游】 任选5个景点+全天拍摄用车+一对一服务',
						url: '/detail?wareId=1000000020170804',
						imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097801785379.jpg'
					},
					{
						wareId: 1000000020170805,
						wareName: '【三亚旅拍婚纱照2日1晚游】 赠送拍摄用车+酒店接送+一对一服务',
						url: '/detail?wareId=1000000020170805',
						imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097801493037.jpg'
					}
				],
			}
		},
		components: {
			HeaederComp,
		},
		methods: {
		}
	}
</script>
<style scoped lang="scss">
	h1 {
		text-align: center;
	}
	.swipe-wrap {
		height: 172px;
		.mint-swipe-item {
			display: block;
			width: 100%;
		}
		img {
			display: block;
			width: 100%;
			height: auto;
		}
	}
	.nav-list {
		display: flex;
		background: #fff;
		li {
			flex: 1;
			margin: 5px;
			padding: 5px 10px;
			text-align: center;
			a {
				color: #808080;
				font-size: 12px;
			}
			img {
				display: block;
				width: 100%;
				padding: 5px;
				margin-bottom: 5px;
			}
		}
	}
	.tabbar {
		margin-top: 10px;
		background: #fff;
		.tab-title {
			text-align: center;
			font-weight: normal;
			padding: 10px 0;
		}
	}
</style>
