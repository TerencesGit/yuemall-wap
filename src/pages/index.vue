<template>
	<section>
		<div v-title :data-title="$route.name"></div>
		<HeaederComp :store="store"></HeaederComp>
		<mt-swipe style="height: 172px;">
			<mt-swipe-item v-for="(item, index) in bannerList" :key="index">
				<router-link to="/">
		      <img :src="item.urlAddr" :alt="item.bannerName" :title="item.bannerName">
		    </router-link>
			</mt-swipe-item>
		</mt-swipe>
		<Navbar :navData="kindList"></Navbar>
		<div class="global-city">
			<h3 class="global-title">全球100+旅游目的地</h3>
			<ScrollCityList :cityList="dstCity" :listWidth="cityListWidth" @cityClick="handleCityClick"></ScrollCityList>
			<div class="global-city-list">
				<WareHorizontalList :wareData="recommendWare" :listWidth="recommendListWidth"></WareHorizontalList>
			</div>
		</div>
		<div class="ware-show local">
			<ShowTitle :titleName="'本地拍摄'" :moreLink="'/local'"></ShowTitle>
			<div class="warelist-body">
				<ul class="ware-list">
					<li></li>
				</ul>
			</div>
		</div>
		<div class="ware-show global">
			<ShowTitle :titleName="'全球旅拍'"></ShowTitle>
			<WareList :wareData="globalWareList"></WareList>
		</div>
		<div class="ware-show travel">
			<ShowTitle :titleName="'旅游线路'"></ShowTitle>
			<WareList :wareData="tripWareList"></WareList>
		</div>
		<div style="height: 30px;"></div>
		<FooterComp></FooterComp>
	</section>
</template>
<script>
	import HeaederComp from '../components/index/header'
	import FooterComp from '../components/index/footer'
	import Navbar from '../components/index/navbar'
	import ScrollCityList from '../components/index/cityList'
	import ShowTitle from '../components/index/listTitle'
	import WareList from '../components/index/wareList'
	import WareHorizontalList from '../components/index/wareHorizontalList'
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
			Navbar,
			ShowTitle,
			WareList,
			WareHorizontalList,
			ScrollCityList,
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
				this.$indicator.open({
				  spinnerType: 'snake'
				})
				bannermobilelist(data).then(res => {
					this.$indicator.close()
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
			handleCityClick(cityCode) {
				this.getRecommentWareList(this.providerId, cityCode)
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
				this.$indicator.open({
				  spinnerType: 'snake'
				})
				let data = {
					kindCode: 'tripphoto-TP',
					providerId: this.providerId,
				}
				warelist(data).then(res => {
					this.$indicator.close()
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
	.mint-swipe {
		img {
			display: block;
			width: 100%;
			height: auto;
		}
	}
	.global-city {
		margin-top: 10px;
		background: #fff;
		.global-title {
			text-align: center;
			font-weight: normal;
			padding: 10px 0;
		}
		.global-city-list {
			width: 100%;
			overflow-x: scroll;
			.ware-list {
				&::-webkit-scrollbar {
					display: none;
				}
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
						color: #666;
					}
				}
			}
		}
	}
	.text-price {
		color: #f00;
	}
	.ware-show {
		margin-top: 10px;
		background: #fff;
	}
</style>
