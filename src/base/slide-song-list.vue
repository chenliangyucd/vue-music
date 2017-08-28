<template>
  <slide-left :slideTitle="slideTitle" @eventSlideRight="eventSlideRight" ref="slideLeft">
    <div class="slide-detail-head">
      <img class="slide-detail-img" :src="slideAvatorUrl" alt="服务器挂了">
      <div class="slide-detail-mask"></div>
      <div class="slide-random-play">
        <i class="slide-icon icon-play"></i>随机播放全部
      </div>
    </div>
    <ul class="slide-detail-list">
      <slot v-for="item in slideDataList" :item="item">
      </slot>
    </ul>
  </slide-left>
</template>
<script type="text/ecmascript-6">
  import SlideLeft from './slide-left';
  export default {
    props: {
      slideTitle: {
        type: String,
        default: ''
      },
      slideAvatorUrl: {
        type: String,
        default: ''
      },
      slideDataList: {
        type: Array,
        default: () => [] //  对象或者数组类的默认值必须通过函数来返回默认值
      }
    },
    methods: {
      slideLeft () {
        this.$refs.slideLeft.slideLeft();
      },
      slideRight () {
        this.$refs.slideLeft.slideRight();
      },
      eventSlideRight () {
        this.$emit('eventSlideRight');
      }
    },
    components: {
      SlideLeft
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"
 .slide-detail-head
    position: relative
    height: 260px
    overflow: hidden
    .slide-detail-img
      width: 100%
    .slide-detail-mask
      position: absolute
      top: 0
      left: 0
      bottom: 0
      right: 0
      background-color: rgba(126, 134, 133, 0.7)
    .slide-random-play
      position: absolute
      left: 0
      right: 0
      bottom: 20px
      margin: auto
      width: 168px
      height: 30px
      line-height: 30px
      border: 1px solid #ffcd32
      color: #ffcd32
      text-align: center;
      border-radius: 20px
      .slide-icon
        font-size: 18px
        vertical-align: middle
        margin-right: 5px
  .slide-detail-list
    font-size: $font-size-medium-x
    padding-left: 38px
</style>