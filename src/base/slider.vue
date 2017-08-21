<template>
  <div class="slider-wrapper" ref="sliderWrapper">
    <div ref="sliderContainer">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    dataList: {
      type: [Object, Array],
      required: true
    }
  },
  watch: {
    dataList (dataList, olddataList) {
      this.$refs.sliderContainer.style.width = (dataList.length * 100) + '%';
      let itemWidth = (1 / dataList.length * 100) + '%';
      setTimeout(() => {
        let hookItemWraps = this.$refs.sliderContainer.querySelectorAll('.hook-item-wrap');
        for (let i = 0; i < hookItemWraps.length; i++) {
          hookItemWraps[i].style.width = itemWidth;
        }
      }, 20);
    }
  },
  mounted () {
    setTimeout(() => {}, 20);
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import  "~common/stylus/variable"
  .slider-wrapper
    position: relative 
    overflow: hidden
    color: $color-theme

</style>
