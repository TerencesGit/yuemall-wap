<template>
	<section>
		<HeaederComp :storeLogo="storeLogo"></HeaederComp>
		<mt-swipe :style="{height: bannerHeight}">
			<mt-swipe-item v-for="(item, index) in bannerList" :key="index">
				<router-link :to="'/ware/detail?id='+item.linkAddr.split('=')[1]">
					<img :src="item.urlAddr" :alt="item.bannerName" :title="item.bannerName" style="height: 100%;">
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
			<ScrollList :scrollWidth="recommendListWidth">
				<WareItem v-for="(ware, index) in recommendWare" :key="index" :ware="ware" :wareWidth="150"></WareItem>
			</ScrollList>
			<!-- <div class="global-city-list" :style="{width: recommendListWidth}">
				<WareHorizontalList :wareData="recommendWare" :listWidth="recommendListWidth"></WareHorizontalList>
			</div> -->
		</div>
		<div class="ware-show local">
			<!-- <ShowTitle :titleName="'本地拍摄'" :moreLink="'/local'"></ShowTitle> -->
			<!-- <WareList v-if="localWareList.length !== 0" :wareData="localWareList"></WareList> -->
			<WarekindHead :warekind="warekindObj.local"></WarekindHead>
			<WareShow :wareData="localWareList"></WareShow>
		</div>
		<div class="ware-show global">
			<!-- <ShowTitle :titleName="'全球旅拍'"></ShowTitle> -->
			<!-- <WareList :wareData="globalWareList"></WareList> -->
			<WarekindHead :warekind="warekindObj.global"></WarekindHead>
			<WareShow :wareData="globalWareList"></WareShow>
		</div>
		<div class="ware-show travel">
			<!-- <ShowTitle :titleName="'旅游线路'"></ShowTitle> -->
			<!-- <WareList :wareData="tripWareList"></WareList> -->
			<WarekindHead :warekind="warekindObj.tourism"></WarekindHead>
			<WareShow :wareData="tripWareList"></WareShow>
		</div>
		<div style="height: 60px;"></div>
		<FooterComp></FooterComp>
	</section>
</template>
<script>
	import HeaederComp from './components/index/header'
	import FooterComp from './components/index/footer'
	import Navbar from './components/index/navbar'
	import ScrollCityList from './components/index/cityList'
	import ShowTitle from './components/index/listTitle'
	import WareList from  './components/index/wareList'
	import WareKinds from './components/index/wareKind'
	import WareShow from './components/wareShow.vue'
	import WarekindHead from './components/index/warekindHead.vue'
	import ScrollList from './components/index/scrollList'
	import WareItem from './components/wareItem.vue'
	import { findStoreByWapDoMain, findmerchantStoreBystoreId, bannermobilelist, kindlist, dstcity,
					 recommendware, locallist, warelist, findWareListByKind } from '@/api'
	export default {
		data () {
			return {
				storeId: '',
				storeLogo: '',
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
				warekindObj: {
					local: {
						name: '本地拍摄',
						subTitle: 'local photo',
						moreUrl: '/ware/list?kindId=415193834363537',
					},
					global: {
						name: '全球旅拍',
						subTitle: 'global photo',
						moreUrl: '/ware/list?kindId=415057355555522',
					},
					tourism: {
						name: '旅游线路',
						subTitle: 'tourism',
						moreUrl: '/ware/list?kindId=415057355808314',
					}
				}
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
			WarekindHead,
			ScrollCityList,
			WareItem,
			ScrollList,
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
					if(res.data.status === 1) {
						this.storeId = res.data.data;
						sessionStorage.setItem('storeId', this.storeId)
						this.getMerchantStore()
					}
				})
			},
			getMerchantStore() {
				let data = {
					id: this.storeId
				}
				findmerchantStoreBystoreId(data).then(res => {
					if(res.data.status === 1) {
						let store = res.data.data;
						document.title = store.storeName;
						// this.storeId = store.merchantId;
						this.storeLogo = store.storeLogo;
						this.getBannerList()
						this.getKindList()
						this.getDstCity()
						// sessionStorage.setItem('store', JSON.stringify(store))
						
						this.getLocalWareList()
						this.getGlobalWareList()
						this.getTripWareList()
					} else {
						this.showToast(res.data.msg)
					}
				})
			},
			getBannerList() {
				let data = {
					merchantId: this.storeId
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
			getKindList() {
				let data = {
					storeId: this.storeId
				}
				let _kindListOrder = [
					{
						id: 715060598102532,
						kindName: '国内旅拍',
						href: '/ware/list?kindId=715060598102532',
						imgSrc: '/static/image/warekind1.jpg',
					},
					// {
					// 	id: 715060598613714,
					// 	kindName: '国外旅拍',
					// 	href: '/ware/list?kindId=715060598613714',
					// 	imgSrc: '/static/image/warekind2.jpg',
					// },
					{
						id: 415057355555522,
						kindName: '全球旅拍',
						href: '/ware/list?kindId=415057355555522',
						imgSrc: '/static/image/warekind2.jpg',
					},
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
			getDstCity() {
				let data = {
					providerId: this.storeId
				}
				dstcity(data).then(res => {
					if(res.data.status === 1) {
						this.dstCity = res.data.data;
						this.dstCity[0].checked = true;
						this.cityCode = this.dstCity[0].dstCityCode;
						this.getRecommentWareList()
					} else {
						this.showToast(res.data.msg)
					}
				})
			},
			handleCityClick(cityCode) {
				if(this.cityCode === cityCode) return;
				this.cityCode = cityCode;
				this.getRecommentWareList()
			},
			getRecommentWareList() {
				let data = {
					providerId: this.storeId,
					dstCityCode: this.cityCode,
				}
				this.$indicator.open({
				  spinnerType: 'snake'
				})
				recommendware(data).then(res => {
					this.$indicator.close()
					if(res.data.status === 1) {
						this.recommendWare = res.data.data;
					} else {
						this.showToast(res.data.msg)
					}
				})
			},
			getLocalWareList() {
				let data = {
					providerId: this.storeId,
					wareKind: 415193834363537,
					dstCityCode: '',
					page: this.page,
				}
				findWareListByKind(data).then(res => {
					if(res.data.status === 1) {
						this.localWareList = res.data.data.wares;
						// console.log(res.data.data)
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
					providerId: this.storeId,
					wareKind: 415057355555522,
					dstCityCode: '',
					page: this.page,
				}
				findWareListByKind(data).then(res => {
					this.$indicator.close()
					if(res.data.status === 1) {
						this.globalWareList = res.data.data.wares;
					} else {
						this.showToast(res.data.msg)
					}
				})
			},
			getTripWareList() {
				let data = {
					providerId: this.storeId,
					wareKind: 415057355808314,
					dstCityCode: '',
					page: this.page,
				}
				findWareListByKind(data).then(res => {
					if(res.data.status === 1) {
						this.tripWareList = res.data.data.wares;
					} else {
						this.showToast(res.data.msg)
					}
				})
			},
		},
		computed: {
			cityListWidth() {
				return this.dstCity.length * 90 + 'px';
			},
			recommendListWidth() {
				return this.recommendWare.length * 160 + 'px';
			}
		},
		mounted() {
			this.bannerHeight = (document.body.clientWidth * 700 / 1920) + 'px';
			window.onresize = () => {
				this.bannerHeight = (document.body.clientWidth * 700 / 1920) + 'px';
			}
		},
		created() {
			this.getStore()
		} 
	}
</script>
<style scoped lang="scss">
	$color1: #00A1E5;
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
				font-size: 22px;
				text-align: center;
				padding-top: 10px;
				margin-bottom: 5px;
				span {
					&:first-child {
						color: $color1;
					}
				}
			}
			h4 {
				color: #333;
				font-size: 12px;
				font-weight: normal;
			}
		}
		.global-city-list {
			display: flex;
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
