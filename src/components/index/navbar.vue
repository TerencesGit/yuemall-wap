<template>
	<div class="navbar">
		<ul class="nav-list">
			<li v-for="navItem in navData" :index="navItem.id">
				<router-link :to="navItem.href">
					<img :src="navItem.imgSrc" alt="">
					<span>{{navItem.kindName}}</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'navbar',
		props: ['navData'],
	}
</script>
<style scoped lang="scss">
	.navbar {
		.nav-list {
			display: flex;
			background: #fff;
			li {
				flex: 1;
				margin: 5px;
				padding: 0 10px 5px;
				text-align: center;
				a {
					color: #808080;
					font-size: 12px;
				}
				img {
					display: block;
					width: 100%;
					padding: 5px;
				}
			}
		}
	}
</style>