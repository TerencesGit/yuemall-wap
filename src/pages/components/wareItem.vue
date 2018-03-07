<template>
  <div class="ware-item">
    <router-link :to="'/ware/detail?id='+ware.id">
        <img :src="ware.mainImg" alt="">
        <p class="ellipsis">{{ware.wareName}}</p>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'wareItem',
  props: ['ware'],
  
}
</script>

<style scoped lang="scss">
     .ware-item {
        width: 50%;
        padding: 0 5px;
        margin-bottom: 10px;
        img {
            display: block;
        }
        p {
            padding: 2px 2px 2px 5px;
            line-height: 1;
            color: #fff;
            background: #000;
        }
    }
</style>

