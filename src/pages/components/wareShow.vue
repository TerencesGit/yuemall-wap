<template>
  <div class="ware-list-wrap">
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
    .ware-list-wrap {
        padding: 10px;
    }
    .ware-list {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        li {
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
    }
</style>


