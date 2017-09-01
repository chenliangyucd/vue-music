<template>
  <transition name="slideleft">
    <div class="slide-container">
      <slot></slot>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  export default {
    methods: {
      slide (routerName) {
        this.$router.push(routerName);
      }
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"
 .slide-container
   position: fixed
   top: 0
   left: 0
   right: 0
   bottom: 0
   z-index: 1
   background-color: $color-background
 .slideleft-enter-active, .slideleft-leave-active
   transition: all .3s
 .slideleft-enter, .slideleft-leave-to
   transform: translate3d(100%, 0, 0)
</style>