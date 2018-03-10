<template>
	<section class="reserve-page">
		<div v-title :data-title="$route.name"></div>
		<div class="page-title">
			<h3>选择日期和人数</h3>
			<i class="square bg-red"></i>
			<span>基础</span>
		</div>
		<div class="ware-price-calendar">
			<price-calendar 
				:data="skuData"
				:firstDayOfWeek="0"
				:endDate="endDate"
				:headerBg="calendarBg"
				:selectedDay="selectedDay"
				@dayClick="dayClick"
				@prevMonth="handlePrevMonth"
				@nextMonth="handleNextMonth">
			</price-calendar>
		</div>
		<div class="ware-base">
			<label>基础</label>
			<input-number
			  v-model="baseNum"
			  :min="1"
			  :max="10"
			  @change="handleChange">
			</input-number>
		</div>
		<div class="ware-service">
			<h3>可额外选购</h3>
			<div class="service-panel">
				<div class="panel-header">
					<h4>服务</h4>
				</div>
				<div class="panel-body">
					<ul class="service-list">
						<li v-for="(item, index) in wareServices" :key="index" class="service-item">
							<div><checkbox v-model="item.checked"></checkbox><span class="service-name">{{item.wareName}}</span></div>
							<div><label>单价：</label><span class="service-price"><i>￥</i>{{item.servicePrice}}</span></div>
							<input-number v-model="item.serviceNum" :min="1" :max="10" @change="handleChange"></input-number>
						</li>
					</ul>
				</div>
			</div>
		</div>
		
		<div class="fixed-footer">
			<div class="agreement">
				<checkbox v-model="agreement"></checkbox>
				<span class="agreement-text">我已阅读并同意预订合同及产品所述全部内容</span>
			</div>
			<div class="reserve">
				<div class="total-price">
					<span>总计：<i class="amount">￥{{totalPrice}}</i></span>
				</div>
				<button class="reserve-button" @click="handleReserve">立即预定</button>
			</div>
		</div>
	</section>
</template>
<script>
	import { wareSkuOfMonth, wareService, advanceOrder } from '@/api'
	export default {
		data() {
			return {
				wareId: '',
				skuDate: '',
				selectedDay: '',
				skuData: [],
				endDate: '',
				calendarBg: 'rgb(0, 161, 229)',
				wareServices: [],
				agreement: false,
				baseNum: 1,
				basePrice: 0,
			}
		},
		computed: {
			totalPrice() {
				return this.baseNum * this.basePrice + this.serviceTotalPrice;
			},
			serviceTotalPrice() {
				let totalPrice = 0;
				let wareServices = this.wareServices.filter(service => service.checked);
				for(let i = 0; i < wareServices.length; i++) {
					totalPrice += (wareServices[i].servicePrice * wareServices[i].serviceNum);
				}
				return totalPrice;
			},
		},
		methods: {
			currentDate() {
				let date = new Date();
				let year = date.getFullYear(),
						month = String(date.getMonth() + 1).replace(/^(\d)$/, '0$1'),
						day = String(date.getDate()).replace(/^(\d)$/, '0$1');
				return year + '-' + month + '-' + day;
			},
			dayClick(cell) {
				console.log(cell)
				if(cell.data) {
					this.skuDate = cell.date;
					this.selectedDay = cell.date;
					this.basePrice = cell.data.adultPrice;
					this.getWareService()
				}
			},
			handlePrevMonth(date) {
				this.skuDate = date;
				this.getWareSkuData()
			},
			handleNextMonth(date) {
				this.skuDate = date;
				this.getWareSkuData()
			},
			handleChange(val) {
				// console.log(val)
				// console.log(this.baseNum)
			},
			getWareSkuData() {
				let data = {
					wareId: this.wareId,
					skuDate: this.skuDate,
				}
				wareSkuOfMonth(data).then(res => {
					if(res.data.status === 1) {
						this.skuData = res.data.data.currentMonthSku;
						this.endDate = res.data.data.sellSkuPeriod.maxDate;
					} else {
						this.$toast({
							message: res.data.msg
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getWareService() {
				let data = {
					id: this. wareId,
					skuDate: this.skuDate,
				}
				wareService(data).then(res => {
					if(res.data.status === 1) {
						this.wareServices = [];
						let wareServiceInfos = res.data.data.wareServiceInfos;
						wareServiceInfos.forEach(ware => {
							let serviceObj = {
								id: ware.id,
								wareName: ware.wareName,
								servicePrice: ware.wareSkuInfos[0].adultPrice,
								serviceNum: 1,
								checked: false,
							}
							this.wareServices.push(serviceObj)
						})
					} else {
						this.$toast({
							message: res.data.msg,
							duration: 1000,
						})
					}
				})
			},
			handleReserve () {
				if(!this.selectedDay) {
					this.$toast({
						message: '请选择预定日期',
					}) 
				} else if(!this.agreement) {
					this.$toast({
						message: '请同意预定合同',
					}) 
				}
			}
		},
		created() {
			this.wareId = this.$route.query.wareId;
			this.skuDate = this.currentDate();
			this.getWareSkuData()
		}
	}
</script>
<style scoped lang="scss">
	$color1: rgb(0, 161, 229);
	.reserve-page {
		padding-bottom: 80px;
	}
	.page-title {
		padding: 10px 15px;
		margin-top: 15px;
		background: #fff;
		h3 {
			display: inline-block;
			margin-right: 15px;
			font-weight: normal;
		}
		i.square {
			display: inline-block;
			width: 11px;
			height: 11px;
		}
		.bg-red {
			background: #E60012;
		}
	}
	.ware-base {
		display: flex;
		justify-content: space-between;
		padding: 5px 10px;
		background: #fff;
		label {
			line-height: 30px;
		}
	}
	.ware-service {
		margin-top: 15px;
		padding: 15px;
		background: #fff;
		h3 {
			padding-left: 5px;
			margin-bottom: 15px;
			line-height: 1;
			border-left: 3px solid $color1;
		}
		.service-panel {
			border-radius: 5px;
			border: 1px solid #ccc;
			.panel-header {
				h4 {
					padding: 6px 12px;
					font-size: 14px;
					background: #f0f0f0;
					
				}
			}
			.panel-body {
				padding: 15px;
				.service-list {
					.service-item {
						display: flex;
						justify-content: space-between;
						padding-bottom: 5px;
						line-height: 30px;
						margin-bottom: 10px;
						border-bottom: 1px solid #ccc;
						.service-name {
							margin-left: 10px;
						}
						.service-price {
							color: #f00;
						}
					}
				}
			}
		}
	}
	.fixed-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #fff;
		.agreement {
			height: 30px;
			padding: 5px 15px;
			background: #ffc;
			.agreement-text {
				margin-left: 6px;
			}
		}
		.reserve {
			display: flex;
			justify-content: space-between;
			height: 50px;
			padding-left: 15px;
			.total-price {
				line-height: 50px;
				.amount {
					color: #f00;
				}
			}
			.reserve-button {
				height: 50px;
				padding: 10px 25px;
				color: #fff;
				background: #f00;
			}
		}
	}
</style>