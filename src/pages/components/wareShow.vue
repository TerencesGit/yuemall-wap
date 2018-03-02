<template>
  <div class="ware-show">
      <ul class="ware-list">
          <li v-for="(item, index) in wareData" :key="index">
              <router-link :to="'/ware/detail?id='+item.id">
                  <img :src="item.mainImg" alt="">
                  <p class="ellipsis">{{item.wareName}}</p>
              </router-link>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
  name: 'WareShow',
  props: ['wareData'],
}
</script>
<style lang="scss" scoped>
    .ware-show {
        padding: 10px;
    }
    .ware-list {
        display: flex;
        flex-wrap: wrap;
        li {
            width: 50%;
            padding: 5px 5px 0;
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
    }
</style>


