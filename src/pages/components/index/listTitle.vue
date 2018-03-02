<template>
	<div class="list-title">
		<h3 class="title-name">{{titleName}}</h3>
		<router-link :to="moreLink" class="more">更多</router-link>
	</div>
</template>
<script>
	export default {
		name: '',
		props: {
			titleName: {
				type: String,
				default: '',
			},
			moreLink: {
				type: String,
				default: '',
			}
		},
	}
</script>
<style scoped lang="scss">
	.list-title {
		display: flex;
		justify-content: space-between;
		padding: 20px 10px;
		background: #fff;
		border-bottom: 1px solid #ebebeb;
		.title-name {
			padding-left: 10px;
			border-left: 3px solid #00aaef;
		}
	}
</style>