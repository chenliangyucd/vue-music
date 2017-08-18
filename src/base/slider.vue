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
      console.info((dataList.length * 100) + '%');
      this.$refs.sliderContainer.style.width = (dataList.length * 100) + '%';
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
