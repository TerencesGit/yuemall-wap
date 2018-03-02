<template>
	<div class="global-city-wrap">
		<ul class="dstcity-list clearfix" :style="{width: listWidth}">
			<li v-for="(city, index) in cityList" :index="city.id" v-bind:class="{'active': index === checkedIndex}" @click="checkedCity(index,city.dstCityCode)">
				<a href="javascript:;">{{city.name}}</a>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'dstcity',
		data() {
			return {
				checkedIndex: 0,
			}
		},
		props: {
			cityList: {
				type: Array,
				default: () => {
					return []
				}
			},
			listWidth: {
				type: String,
				default: ''
			}
		},
		methods: {
			checkedCity(index, code) {
				this.checkedIndex = index;
				this.$emit('cityClick', code)
				// this.getRecommentWareList(this.providerId, code)
			},
		}
	}
</script>
<style scoped lang="scss">
	.global-city-wrap {
		width: 100%;
		overflow-x: scroll;
		-webkit-overflow-scrolling: touch;
		&::-webkit-scrollbar {
			display: none;
		}
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
</style>