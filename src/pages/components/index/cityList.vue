<template>
	<div class="global-city-wrap">
		<ul class="dstcity-list clearfix" :style="{width: cityListWidth}">
			<li v-for="(city, index) in cityList" :key="index" v-bind:class="{'active': index === checkedIndex}" @click="checkedCity(index,city.dstCityCode)">
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
		},
		methods: {
			checkedCity(index, code) {
				this.checkedIndex = index;
				this.$emit('cityClick', code)
			},
		},
		computed: {
			cityListWidth() {
				return this.cityList.length * 100 + 'px';
			},
		}
	}
</script>
<style scoped lang="scss">
	$color1: #00A1E5;
	.global-city-wrap {
		width: 100%;
		overflow-x: scroll;
		-webkit-overflow-scrolling: touch;
		&::-webkit-scrollbar {
			display: none;
		}
		.dstcity-list {
			// padding-left: 10px;
			// border-top: 1px solid #ccc;
			// border-bottom: 1px solid #ccc;
			li {
				float: left;
				width: 90px;
				padding: 8px 0;
				margin: 0 5px;
				text-align: center;
				&:first-child {
					margin-left: 0;
				}
				&:last-child {
					a {
						border-right: 0;
					}
				}
				&.active {
					// border-bottom: 2px solid #00aaef;
					a {
						color: #fff;
						border-color: $color1;
						background: #00A1E5;
					}
				}
				a {
					display: block;
					padding: 4px 2px;
					color: #666;
					font-size: 14px;
					border: 1px solid #666;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>