<template>
	<header class="index-header">
		<div class="site-logo">
			<img :src="storeLogo" class="logo">
		</div>
		<div class="searchbar">
			<div class="searchbar-inner">
				<i class="mintui mintui-search"></i>
				<input type="search" placeholder="搜索目的地" class="mint-searchbar-core">
			</div>
		</div>
	</header>
</template>
<script>
	export default {
		name: 'IndexHeader',
		props: ['storeLogo'],
		data() {
			return {
				value: '搜索目的地',
			}
		},
		methods: {
		},
	}
</script>
<style scoped lang="scss">
	.index-header {
		display: flex;
		width: 100%;
		height: 56px;
		padding: 10px 15px;
		.site-logo {
			width: 100px;
			height: 32px;
			margin-right: 20px;
			.logo {
				width: 100%;
				height: 100%;
			}
		}
		.searchbar {
			flex: 1;
			.searchbar-inner {
				display: flex;
				flex: 1;
				height: 32px;
				padding: 4px 6px;
				background: #fff;
				border-radius: 15px;
				.mintui-search {
					margin: 5px 10px 0 0;
				}
			}
		}
	}
</style>