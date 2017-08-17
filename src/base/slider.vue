<template>
  <div class="slider-wraper">
     <div class="slider-container">
        <slot></slot>
     </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import  "~common/stylus/variable"
  .slider-wraper
    color: $color-theme
    .slider-container
      color: $color-theme

</style>
