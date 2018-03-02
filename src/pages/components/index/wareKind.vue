<template>
  <div class="warekinds">
      <ul class="warekind-list">
          <li v-for="(item, index) in warekinds" :key="index">
              <router-link :to="item.href">
                <img :src="item.imgSrc" alt="">
              </router-link>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
  name: 'WareKinds',
  props: ['warekinds'],
}
</script>
<style lang="scss" scoped>
    .warekinds {
        padding: 10px;
        background: #fff;
        .warekind-list {
            display: flex;
            flex-wrap: wrap;
            li {
                width: 50%;
                padding: 5px 5px 0;
                img {
                    width: 100%;
                }
            }
        }
    }
</style>

