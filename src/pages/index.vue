<template>
	<section>
		<HeaederComp :store="store"></HeaederComp>
		<!-- <h1><router-link to="/login">Wap首页</router-link></h1> -->
		<div class="swipe-wrap">
			<mt-swipe>
				<mt-swipe-item v-for="(item, index) in bannerList" :key="index">
					<router-link to="/">
					<!-- {background: 'url('+item.imgUrl+') center center no-repeat'} -->
			      <img :src="item.urlAddr" :alt="item.bannerName" :title="item.bannerName">
			    </router-link>
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="navbar">
			<ul class="nav-list">
				<li v-for="kind in kindList" :index="kind.id">
					<router-link to="/">
						<img :src="kind.imgSrc" alt="">
						<span>{{kind.kindName}}</span>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="tabbar">
			<h3 class="tab-title">全球100+旅游目的地</h3>
			<div class="tab-header">
				<ul class="dstcity-list clearfix" :style="{width: cityListWidth}">
					<li v-for="(city, index) in dstCity" :index="city.id" v-bind:class="{'active': index === checkedIndex}" @click="checkedCity(index,city.dstCityCode)">
						<a href="javascript:;">{{city.name}}</a>
					</li>
				</ul>
			</div>
			<div class="tab-body">
				<ul class="ware-list clearfix" :style="{width: recommendListWidth}">
					<li v-for="ware in recommendWare" class="ware-item">
						<router-link to="/">
							<img :src="ware.mainImg" alt="">
							<div class="ware-detail">
								<p class="ellipsis">{{ware.wareName}}</p>
								<p class="price">
									<i class="icon-rmb">￥</i><span>{{ware.suggestedPrice}}</span>
									<span>{{ware.unit}}</span>/起
								</p>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="local-photo">
			<div class="warelist-header">
				<h3 class="title">本地拍摄</h3>
				<router-link to="/">更多</router-link>
			</div>
			<div class="warelist-body">
				<ul class="ware-list">
					<li></li>
				</ul>
			</div>
		</div>
		<div class="global-photo">
			<div class="warelist-header">
				<h3 class="title">全球旅拍</h3>
				<router-link to="/">更多</router-link>
			</div>
			<div class="warelist-body">
				<ul class="ware-list">
					<li v-for="ware in globalWareList" :index="ware.id" class="ware-item">
						<img :src="ware.mainImg" class="ware-img">
						<div class="ware-detail">
							<h4 class="ware-name">{{ware.wareName}}</h4>
							<ul class="ware-keywords clearfix">
								<li v-for="item in ware.keyWords.split(',')">{{item}}</li>
							</ul>
							<p><i class="icon-rmb">￥</i><span>{{ware.suggestedPrice}}</span>起</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="travel-photo">
			<div class="warelist-header">
				<h3 class="title">旅游线路</h3>
				<router-link to="/">更多</router-link>
			</div>
			<div class="warelist-body">
				<ul class="ware-list">
					<li v-for="ware in tripWareList" :index="ware.id" class="ware-item">
						<img :src="ware.mainImg" class="ware-img">
						<div class="ware-detail">
							<h4 class="ware-name">{{ware.wareName}}</h4>
							<ul class="ware-keywords clearfix">
								<li v-for="item in ware.keyWords.split(',')">{{item}}</li>
							</ul>
							<p><i class="icon-rmb">￥</i><span>{{ware.suggestedPrice}}</span>起</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<FooterComp></FooterComp>
	</section>
</template>
<script>
	import HeaederComp from '../components/header'
	import FooterComp from '../components/footer'
	import { findStoreByWapDoMain, findmerchantStoreBystoreId, bannermobilelist, kindlist, dstcity,
					 recommendware, locallist, warelist } from '@/api'
	export default {
		data () {
			return {
				store: {},
				providerId: '',
				bannerList: [],
				kindList: [],
				dstCity: [],
				recommendWare: [],
				checkedIndex: 0,
				globalWareList: [],
				tripWareList: [],
			}
		},
		components: {
			HeaederComp,
			FooterComp,
		},
		methods: {
			getStore() {
				findStoreByWapDoMain().then(res => {
					console.log(res)
					if(res.data.status === 1) {
						let storeId = res.data.data;
						this.getMerchantStore(storeId)
					}
				})
			},
			getMerchantStore(storeId) {
				let data = {
					id: storeId
				}
				findmerchantStoreBystoreId(data).then(res => {
					if(res.data.status === 1) {
						this.store = res.data.data;
						let merchantId = this.providerId = res.data.data.merchantId;
						this.getBannerList(merchantId)
						this.getKindList(merchantId)
						this.getDstCity(merchantId)
						let store = JSON.stringify(res.data.data);
						sessionStorage.setItem('store', store)
						this.getGlobalWareList()
						this.getTripWareList()
					}
				})
			},
			getBannerList(merchantId) {
				let data = {
					merchantId
				}
				bannermobilelist(data).then(res => {
					if(res.data.status === 1) {
						console.log(res.data)
						this.bannerList = res.data.data;
					}
				})
			},
			getKindList(providerId) {
				let data = {
					providerId
				}
				let kindImgSrc = [
					'http://wap.yueshijue.com/assets/img/gnsy.png',
					'http://wap.yueshijue.com/assets/img/ly.png',
					'http://wap.yueshijue.com/assets/img/qqlp.png',
					'http://wap.yueshijue.com/assets/img/gwsy.png',
				]
				kindlist(data).then(res => {
					if(res.data.status === 1) {
						this.kindList = res.data.data;
						this.kindList.forEach((kind, index) => {
							kind.imgSrc = kindImgSrc[index];
						})
					}
				})
			},
			getDstCity(providerId) {
				let data = {
					providerId
				}
				dstcity(data).then(res => {
					if(res.data.status === 1) {
						this.dstCity = res.data.data.reverse();
						this.dstCity[0].checked = true;
						this.getRecommentWareList(providerId, this.dstCity[0].dstCityCode)
					}
				})
			},
			checkedCity(index, code) {
				this.checkedIndex = index;
				this.getRecommentWareList(this.providerId, code)
			},
			getRecommentWareList(providerId, dstCityCode) {
				let data = {
					providerId,
					dstCityCode
				}
				recommendware(data).then(res => {
					if(res.data.status === 1) {
						this.recommendWare = res.data.data;
					}
				})
			},
			getGlobalWareList() {
				let data = {
					kindCode: 'tripphoto-TP',
					providerId: this.providerId,
				}
				warelist(data).then(res => {
					if(res.data.status === 1) {
						console.log(res.data.data)
						this.globalWareList = res.data.data;
					}
				})
			},
			getTripWareList() {
				let data = {
					kindCode: 'trip-T',
					providerId: this.providerId,
				}
				warelist(data).then(res => {
					if(res.data.status === 1) {
						console.log(res.data.data)
						this.tripWareList = res.data.data;
					}
				})
			},
		},
		computed: {
			cityListWidth() {
				return this.dstCity.length * 80 + 'px';
			},
			recommendListWidth() {
				return this.recommendWare.length * 170 + 'px';
			}
		},
		created() {
			this.getStore()
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
			padding: 0 10px 5px;
			text-align: center;
			a {
				color: #808080;
				font-size: 12px;
			}
			img {
				display: block;
				width: 100%;
				padding: 5px;
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
		.tab-header {
			width: 100%;
			overflow-x: scroll;
			.dstcity-list {
				border-top: 1px solid #ccc;
				border-bottom: 1px solid #ccc;
				li {
					float: left;
					width: 80px;
					padding: 8px 0;
					text-align: center;
					&:last-child {
						a {
							border-right: 0;
						}
					}
					&.active {
						border-bottom: 2px solid #00aaef;
						a {
							color: #00aaef;
						}
					}
					a {
						display: block;
						color: #666;
						border-right: 1px solid #ccc;
					}
				}
			}
		}
		.tab-body {
			width: 100%;
			overflow-x: scroll;
			.ware-list {
				li {
					float: left;
					width: 150px;
					margin: 15px 0 15px 15px;
					border: 1px solid #ddd;
					img {
						width: 100%;
						height: 83px;
					}
					.ware-detail {
						padding: 3px 5px;
					}
				}
			}
		}
	}
	.warelist-header {
		display: flex;
		justify-content: space-between;
		padding: 20px 10px;
		background: #fff;
		border-bottom: 1px solid #ebebeb;
		.title {
			padding-left: 10px;
			border-left: 3px solid #00aaef;
		}
	}
	.warelist-body {
		padding: 15px;
		.ware-list {
			.ware-item {
				display: flex;
				padding-bottom: 10px;
				margin-bottom: 20px;
				border-bottom: 1px solid #ccc;
				.ware-img {
					width: 128px;
					height: 92px;
					margin-right: 10px;
				}
				.ware-detail {
					flex: 1;
					.ware-name {
						font-weight: normal;
					}
					.ware-keywords {
						li {
							float: left;
							margin: 3px 6px 0 0;
							padding: 1px 3px;
							font-size: 12px;
							border: 1px solid #ccc;
						}
					}
				}
			}
		}
	}
	.local-photo, .global-photo, .travel-photo {
		margin-top: 10px;
		background: #fff;
	}
</style>
