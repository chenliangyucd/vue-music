<template>
  <div class="slide-left-container" :class="{'slide-left-animation': isSlideLeft, 'slide-right-animation': isSlideRight}" :style="{transform: slideTranslateX}" ref="slideLeftContainer">
    <div class="slide-head">
      <i class="slide-icon icon-back" @click="slideRight"></i>
      <em class="slide-title" v-text="slideTitle"></em>
    </div>
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      slideTitle: {
        type: String,
        default: ''
      }
    },
    mounted () {
      this.$nextTick(() => {
        let clientWidth = document.documentElement.clientWidth + 'px';
        let tpLeft = `@keyframes slide-left{ from {transform: translateX(${clientWidth});} to {transform: translateX(0px);}}`;
        let tpRight = `@keyframes slide-right{ from {transform: translateX(0px);} to {transform: translateX(${clientWidth});}}`;

        let styleSheet = document.styleSheets[0];
        styleSheet.insertRule(tpLeft);
        styleSheet.insertRule(tpRight);
      });
    },
    data () {
      return {
        isSlideLeft: false,
        isSlideRight: false,
        slideTranslateX: 'translateX(10000px)'
      };
    },
    methods: {
      slideLeft () {
        this.isSlideLeft = true;
        this.isSlideRight = false;
      },
      slideRight () {
        this.$emit('eventSlideRight');
        this.isSlideLeft = false;
        this.isSlideRight = true;
      }
    },
    // 对于keep-alive的组件调用时候的回掉函数, 非keep-alive
    deactivated () {
      this.isSlideLeft = false;
      this.isSlideRight = false;
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable';
  .slide-left-container
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    background-color: $color-background
    z-index: 1
    .slide-head
      position: fixed
      top: 0;
      left: 0
      right: 0
      z-index: 1
      padding-top: 12px
      text-align: center
      .slide-icon
        position: absolute
        left: 10px
        top: 12px
        font-size: 20px
        color: #f8ca36
      .slide-title
        vertical-align: center
        color: #fff
        font-size: 18px
        font-style: normal
  .slide-init
    animation: slide-init 0.1S forwards 
  .slide-left-animation
    animation: slide-left 0.5s forwards
  .slide-right-animation
    animation: slide-right 0.5s forwards
</style>