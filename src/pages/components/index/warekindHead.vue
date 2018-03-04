<template>
  <div class="warekind-header">
    <h3 class="warekind-title">
      <span class="title1">{{warekind.name.substring(0,2)}}</span><span class="title2">{{warekind.name.substring(2,4)}}</span>
    </h3>
    <h4 class="warekind-subtitle">{{warekind.subTitle}}</h4>
    <div class="link">
      <router-link to="/" class="more-link">更多>></router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'warekindHead',
  props: ['warekind'],
}
</script>
<style scoped lang="scss">
  $color1: #00aaef;
  .warekind-header {
    position: relative;
    padding: 10px 0;
    .warekind-title {
      margin: 5px auto;
      text-align: center;
      font-size: 20px;
      .title1 {
        color: $color1;
      }
      .title2 {

      }
    }
    .warekind-subtitle {
      text-align: center;
      text-transform: uppercase;
      font-weight: normal;
      color: #666;
    }
    .link {
      position: absolute;
      right: 0;
      bottom: 10px;
      .more-link {
        margin-right: 10px;
        padding: 3px 6px;
        color: #fff;
        font-size: 14px;
        background: $color1;
      }
    }
  }
</style>


