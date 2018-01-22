<template>
	<header class="header">
		<div class="logo">
			<img :src="store.storeLogo" alt="">
		</div>
		<div class="searchbar">
			<div class="searchbar-inner">
				<i class="mintui mintui-search"></i>
				<input type="search" placeholder="搜索目的地" class="mint-searchbar-core">
			</div>
			<!-- <mt-search v-model="value" :result.sync="result"></mt-search> -->
		</div>
	</header>
</template>
<script>
	export default {
		data() {
			return {
				value: '搜索目的地',
			}
		},
		props: ['store'],
	}
</script>
<style scoped lang="scss">
	.header {
		display: flex;
		padding: 5px 15px;
		.logo {
			width: 100px;
			img {
				width: 100%;
			}
		}
		.searchbar {
			flex: 1;
			margin: 5px 0  0 10px;
			.searchbar-inner {
				display: flex;
				flex: 1;
				height: 28px;
    		padding: 4px 6px;
    		background: #fff;
    		border-radius: 15px;
    		.mintui-search {
    			margin: 2px 5px 0 0;
    		}
			}
		}
	}
</style>