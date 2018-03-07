<template>
	<ul class="ware-list clearfix" :style="{width: listWidth}">
		<li v-for="(ware, index) in wareData" class="ware-item" :key="index">
			<router-link :to="'ware/detail?id='+ware.id">
				<img :src="ware.mainImg" alt="">
				<div class="ware-detail">
					<p class="ellipsis">{{ware.wareName}}</p>
					<p class="price text-price">
						<i class="icon-rmb">￥</i><strong>{{ware.suggestedPrice}}</strong>
						<span>{{ware.unit}}</span>/起
					</p>
				</div>
			</router-link>
		</li>
	</ul>
</template>
<script>
	export default {
		name: 'wareHorizontalList',
		props: ['wareData', 'listWidth'],
	}
</script>
<style scoped lang="scss">
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
</style>