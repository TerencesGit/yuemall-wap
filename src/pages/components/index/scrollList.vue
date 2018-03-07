<template>
  <div class="scroll-wrap">
    <div class="scroll-list" :style="{width: scrollWidth}">
        <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'scrollList',
  props: ['scrollWidth'],
  
}
</script>
<style lang="scss" scoped>
  .scroll-wrap {
    width: 100%;
    padding: 15px 10px;
		overflow-x: scroll;
    .scroll-list {
      display: flex;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
</style>


