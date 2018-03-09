<template>
	<section>
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
			<!-- <input-number
			  v-model="baseNum"
			  :min="1"
			  :max="10"
			  @change="handleChange">
			</input-number> -->
			<input-number
			  v-model="baseNum"
			  :min="1"
			  :max="10"
			  @change="handleChange">
			</input-number>
		</div>
	</section>
</template>
<script>
	import { wareSkuOfMonth } from '@/api'
	export default {
		data() {
			return {
				wareId: '',
				skuDate: '',
				selectedDay: '',
				skuData: [],
				endDate: '',
				calendarBg: 'rgb(0, 161, 229)',
				baseNum: 1,
				baseNum1 : 5,
			}
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
					this.selectedDay = cell.date;
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
				console.log(this.baseNum)
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
</style>