<template>
  <div class="ware-item" :style="{width: wareWidth + 'px'}">
    <router-link :to="'/ware/detail?id='+ware.id">
        <img :src="ware.mainImg" alt="">
        <p class="ellipsis">{{ware.wareName}}</p>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'wareItem',
  props: ['ware', 'wareWidth'],
}
</script>

<style scoped lang="scss">
     .ware-item {
        width: 50%;
        padding: 0 5px;
        img {
            display: block;
            width: 100%;
        }
        p {
            padding: 3px 0 3px 5px;
            color: #fff;
            font-size: 14px;
            background: #000;
        }
    }
</style>

