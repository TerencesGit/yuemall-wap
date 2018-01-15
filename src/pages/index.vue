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
			<div class="tab-header"></div>
			<div class="tab-body"></div>
		</div>
	</section>
</template>
<script>
	import HeaederComp from '../components/header'
	import { findStoreByWapDoMain, findmerchantStoreBystoreId, bannermobilelist, kindlist } from '@/api'
	export default {
		data () {
			return {
				store: {},
				bannerList: [],
				kindList: [],
			}
		},
		components: {
			HeaederComp,
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
						console.log(res.data.data)
						this.store = res.data.data;
						let merchantId = res.data.data.merchantId
						this.getBannerList(merchantId)
						this.getKindList(merchantId)
						let store = JSON.stringify(res.data.data);
						sessionStorage.setItem('store', store)
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
						console.log(res.data.data)
						this.kindList = res.data.data;
						this.kindList.forEach((kind, index) => {
							kind.imgSrc = kindImgSrc[index];
						})
					}
				})
			},
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
