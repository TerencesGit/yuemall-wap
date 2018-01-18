<template>
	<section>
		<div v-title :data-title="$route.name"></div>
		<div class="ware-swipe">
			<mt-swipe>
				<mt-swipe-item v-for="(item, index) in bannerList" :key="index">
					<img :src="item.filePath">
				</mt-swipe-item>
			</mt-swipe>
			<div class="ware-code">
				编号：<span>{{wareDetail.wareCode}}</span>
			</div>
		</div>
		<div class="detail-section">
			<div class="detail-item">
				<h4 class="ware-name">
					{{wareDetail.wareName}}
				</h4>
			</div>
			<div class="detail-item">
				<div class="ware-price">
					<p class="text-price"><i class="icon-rmb">￥</i><strong>{{wareDetail.suggestedPrice}}</strong>
					<span>{{wareDetail.unit}}</span>/起</p>
				</div>
			</div>
			<div class="detail-item feature">
				<label class="features">行程特色：</label>
				<ul class="feature-list">
					<li v-for="(keyword, index) in keyWords" :index="index">{{keyword}}</li>
				</ul>
			</div>
			<div class="detail-item">
				<label class="srccity">出发地：</label>
				<p>{{wareDetail.srcCity}}</p>
			</div>
		</div>
		<div class="detail-section recommend">
			<h3 class="attr-title">店长推荐</h3>
			<div v-html="wareDetail.wareDesc"></div>
		</div>
		<div class="detail-section" v-for="(item, index) in wareAttribute">
			<h3 class="attr-title">{{attrbuteName[index]}}</h3>
			<div v-html="item" class="ware-attr"></div>
		</div>
		<!-- <FooterComp></FooterComp> -->
	</section>
</template>
<script>
	// import HeaederComp from '../components/header'
	// import FooterComp from '../components/footer'
	import { wareDetail, wareAttribut } from '@/api'
	export default {
		data () {
			return {
				store: {},
				providerId: '',
				bannerList: [],
				wareDetail: {},
				wareAttribute: {},
				attrbuteName: {
					QIANZHENGQIANZHU: '签证/签注',
					ZILIFEIYONG: '自理费用',
					YUDINGXUZHI: '预定须知',
					TUIGAIGUIZE: '退改规则',
					CHANPINJIESHAO: '产品介绍',
				},
				keyWords: [],
				kindList: [],
				dstCity: [],
				recommendWare: [],
				checkedIndex: 0,
				globalWareList: [],
				tripWareList: [],
			}
		},
		components: {
			// HeaederComp,
			// FooterComp,
		},
		methods: {
			getWareDetail(wareId) {
				let data = {
					id: wareId
				}
				this.$indicator.open({
				  spinnerType: 'snake'
				})
				wareDetail(data).then(res => {
					this.$indicator.close()
					if(res.data.status === 1) {
						 console.log(res.data.data)
						 this.wareDetail = res.data.data;
						 this.keyWords = this.wareDetail.keyWords.split(',').splice(0,3);
						 this.bannerList = this.wareDetail.wareImgInfos;
					}
				})
			},
			getWareAttribute(wareId) {
				let data = {
					wareId
				}
				this.$indicator.open({
				  spinnerType: 'snake'
				})
				wareAttribut(data).then(res => {
					this.$indicator.close()
					if(res.data.status === 1) {
						console.log(res.data.data)
						this.wareAttribute = res.data.data;
					}
				})
			},
		},
		created() {
			let wareId = this.$route.query.id;
			if(wareId) {
				this.getWareDetail(wareId)
				this.getWareAttribute(wareId)
			}
		}
	}
</script>
<style scoped lang="scss">
	.ware-swipe {
		height: 210px;
		position: relative;
		.mint-swipe-item {
			display: block;
			width: 100%;
		}
		img {
			display: block;
			width: 100%;
			height: auto;
		}
		.ware-code {
			position: absolute;
			right: 10px;
			bottom: 10px;
			z-index:2;
			padding: 1px 8px;
			color: #fff;
			border-radius: 10px;
			background: rgba(0,0,0,.3);
		}
	}
	.detail-section {
		padding: 5px 15px;
		background: #fff;
		&.recommend {
			margin-top: 20px;
		}
		.attr-title {
			padding: 0;
			margin-bottom: 5px;
			font-size: 16px;
			&::before {
				content: '';
				display: inline-block;
				width: 3px;
				height: 12px;
				margin-right: 8px;
				background: #00aaef;
			}
		}
		.detail-item {
			display: flex;
			margin-bottom: 10px;
			&:last-child {
				margin-bottom: 0;
			}
			label {
				width: 80px;
			}
			&.feature {
				padding: 10px 0;
				border-top: 1px solid #ccc;
				border-bottom: 1px solid #ccc;
			}
			.feature-list {
				overflow: hidden;
				white-space: nowrap;
				li {
					display: inline-block;
					margin-right: 5px;
					margin-bottom: 5px;
					padding: 2px 5px;
					font-size: 12px;
					border: 1px solid #ccc;
				}
			}
		}
		.ware-name {
			font-weight: normal;
		}
		.ware-attr {
			padding: 5px 0 15px;
			border-bottom: 1px solid #ccc;
		}
	}
</style>
