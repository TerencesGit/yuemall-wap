<template>
	<header class="header">
		<div class="logo">
			<img src="http://fileserver.yueshijue.com/fileService/uploads/2017/11/25/15116064165923.png" alt="">
		</div>
		<div class="searchbar">
			<input type="text" placeholder="搜索目的地">
		</div>
	</header>
</template>
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
			input {
				width: 100%;
				padding: 0 15px;
				line-height: 30px;
				border-radius: 15px;
			}
		}
	}
</style>