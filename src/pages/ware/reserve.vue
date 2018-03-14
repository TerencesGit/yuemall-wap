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
			  :max="storageNum"
			  @change="handleChange">
			</input-number>
		</div>
		<div class="ware-service">
			<h3>可额外选购</h3>
			<div class="service-panel">
				<div class="panel-header">
					<h4>附加服务</h4>
				</div>
				
				<div class="panel-body">
					<div v-show="wareServices.length === 0" class="text-center">
						暂无服务
					</div>
					<ul class="service-list" v-show="wareServices.length > 0">
						<li v-for="(item, index) in wareServices" :key="index" class="service-item">
							<div class="item-left">
								<div class="item-name">
									<checkbox v-model="item.checked"></checkbox>
									<span class="service-name">{{item.wareName}}</span>
								</div>
								<div class="item-price">
									<label>单价：</label>
									<span class="service-price"><i>￥</i>{{item.servicePrice}}</span>
								</div>
							</div>
							<input-number 
								v-model="item.serviceNum" 
								:min="1" 
								:max="10" 
								class="item-right"
								@change="handleChange">
							</input-number>
						</li>
					</ul>
				</div>
			</div>
			<div class="service-panel">
				<div class="panel-header">
					<h4>推荐活动</h4>
				</div>
				<div class="panel-body">
					<div v-show="wareActivities.length === 0" class="text-center">
						暂无推荐活动
					</div>
					<ul class="service-list" v-show="wareActivities.length > 0">
						<li v-for="(item, index) in wareActivities" :key="index" class="service-item">
							<div class="item-left">
								<div class="item-name">
									<checkbox v-model="item.checked"></checkbox>
									<span class="service-name">{{item.wareName}}</span>
								</div>
								<div class="item-price">
									<label>单价：</label>
									<span class="service-price"><i>￥</i>{{item.servicePrice}}</span>
								</div>
							</div>
							<input-number 
								v-model="item.serviceNum" 
								:min="1" 
								:max="10" 
								class="item-right"
								@change="handleChange">
							</input-number>
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
				wareActivities: [],
				agreement: false,
				baseNum: 1,
				basePrice: 0,
				storageNum: 1,
				childPrice: 0,
			}
		},
		computed: {
			totalPrice() {
				return this.baseNum * this.basePrice + this.serviceTotalPrice + this.activityTotalPrice;
			},
			serviceTotalPrice() {
				let totalPrice = 0;
				let wareServices = this.wareServices.filter(service => service.checked);
				for(let i = 0; i < wareServices.length; i++) {
					totalPrice += (wareServices[i].servicePrice * wareServices[i].serviceNum);
				}
				return totalPrice;
			},
			activityTotalPrice() {
				let totalPrice = 0;
				let wareActivities = this.wareActivities.filter(activity => activity.checked);
				for(let i = 0; i < wareActivities.length; i++) {
					totalPrice += (wareActivities[i].servicePrice * wareActivities[i].serviceNum);
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
				if(cell.data) {
					console.log(cell.data)
					this.skuDate = cell.date;
					this.selectedDay = cell.date;
					this.basePrice = cell.data.adultPrice;
					this.childPrice = cell.data.childPrice;
					this.storageNum = cell.data.skuStock.storageNum;
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
				this.$indicator.open({
				  spinnerType: 'snake'
				})
				wareService(data).then(res => {
					this.$indicator.close()
					if(res.data.status === 1) {
						this.wareServices = [];
						let wareServiceInfos = res.data.data.wareServiceInfos;
						let wareActivityInfos = res.data.data.wareActivityInfos;
						wareServiceInfos.forEach(service => {
							let serviceObj = {
								id: service.id,
								wareName: service.wareName,
								servicePrice: service.wareSkuInfos[0].adultPrice,
								serviceNum: 1,
								checked: false,
							}
							this.wareServices.push(serviceObj)
						})
						wareActivityInfos.forEach(activity => {
							let activityObj = {
								id: activity.id,
								wareName: activity.wareName,
								servicePrice: activity.wareSkuInfos[0].adultPrice,
								serviceNum: 1,
								checked: false,
							}
							this.wareActivities.push(activityObj)
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
						duration: 1000
					})
					return;
				} else if(!this.agreement) {
					this.$toast({
						message: '请同意预定合同',
						duration: 1000
					})
					return; 
				}
				let _serviceList = this.wareServices.filter(service => service.checked)
				let _activityList = this.wareActivities.filter(activity => activity.checked)
				let wareOrderInfo = {
					wareId: this.wareId,
					skuDate: this.selectedDay,
					adultNum: this.baseNum,
					adultPrice: this.basePrice,
					singleNum: 0,
					childNum: 0,
					childPrice: this.childPrice,
					activityInfos: _activityList,
					serviceInfos: _serviceList,
					// wareName: this.wareDetail.wareName,
					// wareImg: this.wareDetail.wareImgInfos[0].filePath,
					// totalPrice: this.baseNum * this.basePrice,
					// singleAmount: this.singleTotalPrice,
					// cityName: '',
					// homeNum: 1,
					// activityPrice: this.activityTotalPrice,
					servicePrice: this.serviceTotalPrice + this.activityTotalPrice,
					totalAmount: this.totalPrice,
				}
				console.log(wareOrderInfo)
				advanceOrder(wareOrderInfo).then(res => {
					console.log(res)
					sessionStorage.setItem('wareOrderInfo', JSON.stringify(wareOrderInfo))
					this.$router.push('/ware/order?orderId=415177136070425')
					if(res.data.status === 1) {
						let orderInfo = res.data.data;
						sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo))
						// this.$router.push('/ware/reserve?wareId='+this.wareId)
					} else {
						this.$toast({
							message: res.data.msg || '服务器响应失败',
							duration: 1000
						})
					}
				}).catch(err => {
					console.log(err)
					this.$catchError(err)
				})
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
			margin-bottom: 10px;
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
						.item-right {
							margin-top: 15px;
						}
						.item-price {
							margin-left: 30px;
						}
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