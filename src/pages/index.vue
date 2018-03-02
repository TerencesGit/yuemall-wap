<template>
	<section>
		<HeaederComp></HeaederComp>
		<mt-swipe :style="{height: bannerHeight}">
			<mt-swipe-item v-for="(item, index) in bannerList" :key="index">
				<router-link to="/">
		      <img :src="item.urlAddr" :alt="item.bannerName" :title="item.bannerName">
		    </router-link>
			</mt-swipe-item>
		</mt-swipe>
		<!-- <Navbar :navData="navList"></Navbar> -->
		<WareKinds :warekinds="warekinds"></WareKinds>
		<div class="global-city">
			<div class="title">
				<h3 class="global-title">
					<span>全球100+</span>
					<span>目的地</span>
				</h3>
				<h4 class="text-center uppercase">global 100+ destination</h4>
			</div>
			<ScrollCityList :cityList="dstCity" :listWidth="cityListWidth" @cityClick="handleCityClick"></ScrollCityList>
			<div class="global-city-list">
				<WareHorizontalList :wareData="recommendWare" :listWidth="recommendListWidth"></WareHorizontalList>
			</div>
		</div>
		<div class="ware-show local">
			<ShowTitle :titleName="'本地拍摄'" :moreLink="'/local'"></ShowTitle>
			<WareList v-if="localWareList.length !== 0" :wareData="localWareList"></WareList>
		</div>
		<div class="ware-show global">
			<ShowTitle :titleName="'全球旅拍'"></ShowTitle>
			<!-- <WareList :wareData="globalWareList"></WareList> -->
			<WareShow :wareData="globalWareList"></WareShow>
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
	import HeaederComp from './components/index/header'
	import FooterComp from './components/index/footer'
	import Navbar from './components/index/navbar'
	import ScrollCityList from './components/index/cityList'
	import ShowTitle from './components/index/listTitle'
	import WareList from './components/index/wareList'
	import WareKinds from './components/index/wareKind'
	import WareShow from './components/wareShow.vue'
	import WareHorizontalList from './components/index/wareHorizontalList'
	import { findStoreByWapDoMain, findmerchantStoreBystoreId, bannermobilelist, kindlist, dstcity,
					 recommendware, locallist, warelist } from '@/api'
	export default {
		data () {
			return {
				providerId: '',
				bannerList: [],
				navList: [],
				dstCity: [],
				recommendWare: [],
				checkedIndex: 0,
				localWareList: [],
				globalWareList: [],
				tripWareList: [],
				cityCode: '',
				page: {
					currentPage: 1,
					paegSize: 10,
				},
				bannerHeight: '172px',
				warekinds: [],
			}
		},
		components: {
			HeaederComp,
			FooterComp,
			Navbar,
			ShowTitle,
			WareList,
			WareShow,
			WareKinds,
			WareHorizontalList,
			ScrollCityList,
		},
		methods: {
			showToast(msg) {
				this.$toast({
					message: msg,
					duration: 1000,
				})
			},
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
						let store = res.data.data;
						document.title = store.storeName;
						this.providerId = res.data.data.merchantId;
						this.getBannerList(this.providerId)
						this.getKindList(this.providerId)
						this.getDstCity(this.providerId)
						sessionStorage.setItem('store', JSON.stringify(store))
						sessionStorage.setItem('providerId', this.providerId)
						this.getLocalWareList()
						this.getGlobalWareList()
						this.getTripWareList()
					} else {
						this.showToast(res.data.msg)
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
						this.bannerList = res.data.data;
					} else {
						this.showToast(res.data.msg)
					}
				})
			},
			getKindList(providerId) {
				let data = {
					providerId
				}
				let _kindListOrder = [
					{
						id: 715060598102532,
						kindName: '国内旅拍',
						href: '/ware/list?kindId=715060598102532',
						imgSrc: '/static/image/warekind1.jpg',
					},
					{
						id: 715060598613714,
						kindName: '国外旅拍',
						href: '/ware/list?kindId=715060598613714',
						imgSrc: '/static/image/warekind2.jpg',
					},
					// {
					// 	id: 415057355555522,
					// 	kindName: '一价全包',
					// 	href: '/ware/list?kindId=415057355555522',
					// 	imgSrc: '/static/image/warekind3.jpg',
					// },
					{
						id: 415193834363537,
						kindName: '本地拍',
						href: '/ware/list?kindId=415193834363537',
						imgSrc: '/static/image/warekind3.jpg',
					},
					{
						id: 415057355808314,
						kindName: '旅游',
						href: '/ware/list?kindId=415057355808314',
						imgSrc: '/static/image/warekind4.jpg',
					},
				]
				this.warekinds = _kindListOrder;
				// kindlist(data).then(res => {
				// 	if(res.data.status === 1) {
				// 		this.navList = res.data.data;
				// 		this.navList.forEach((kind, index) => {
				// 			kind.imgSrc = kindImgSrc[index];
				// 			kind.href = '/ware/list?kindId=' + kind.id;
				// 		})
				// 		let _nav = JSON.stringify(this.navList);
				// 		this.navList[1] = JSON.parse(_nav)[3];
				// 		this.navList[3] = JSON.parse(_nav)[1];
				// 	} else {
				// 		this.showToast(res.data.msg)
				// 	}
				// })
			},
			getDstCity(providerId) {
				let data = {
					providerId
				}
				dstcity(data).then(res => {
					if(res.data.status === 1) {
						this.dstCity = res.data.data;
						this.dstCity[0].checked = true;
						this.cityCode = this.dstCity[0].dstCityCode;
						this.getRecommentWareList(providerId, this.cityCode)
					} else {
						this.showToast(res.data.msg)
					}
				})
			},
			handleCityClick(cityCode) {
				if(this.cityCode === cityCode) return;
				this.cityCode = cityCode;
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
					} else {
						this.showToast(res.data.msg)
					}
				})
			},
			getLocalWareList() {
				let data = {
					providerId: this.providerId
				}
				locallist(data).then(res => {
					if(res.data.status === 1) {
						this.localWareList = res.data.data;
						console.log(res.data.data)
					} else {
						this.showToast(res.data.msg)
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
					page: this.page,
				}
				warelist(data).then(res => {
					this.$indicator.close()
					if(res.data.status === 1) {
						this.globalWareList = res.data.data.splice(0, 10);
					} else {
						this.showToast(res.data.msg)
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
						this.tripWareList = res.data.data.splice(0, 10);
					} else {
						this.showToast(res.data.msg)
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
		mounted() {
			this.bannerHeight = (document.body.clientWidth / 2.18) + 'px';
			window.onresize = () => {
				this.bannerHeight = (document.body.clientWidth / 2.18) + 'px';
			}
		},
		created() {
			this.getStore()
		} 
	}
</script>
<style scoped lang="scss">
	$color1: #00aaef;
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
		.title {
			margin: 10px 0;
			.global-title {
				font-size: 18px;
				text-align: center;
				padding-top: 10px;
				span {
					&:first-child {
						color: $color1;
					}
				}
			}
			h4 {
				color: #999;
				font-weight: normal;
			}
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
