<template>
  <div>
    <div class="slide-head">
        <i class="slide-icon icon-back" @click="slideLeft"></i>
        <em class="slide-title" v-text="slideTitle"></em>
    </div>
    <div class="slide-content" ref="slideContent">
      <img class="slide-content-img" :src="slideAvatorUrl" alt="服务器挂了">
      <div class="slide-random-play">
        <i class="slide-icon icon-play"></i>随机播放全部
      </div>
      <div class="slide-cover" ref="slideCover"></div>
    </div>
    <!-- 要是做到通用的这块需要自己封装bean类 -->
    <scroll class="scroll-container" @scroll="scroll" :probeType="3" :dynamic="dynamic" :dataList="getSongList">
      <song-list :rank="rank"></song-list>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
  import SongList from 'components/song-list/song-list';
  import Scroll from 'base/scroll';
  import { mapGetters } from 'vuex';
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
      rank: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        dynamic: null
      };
    },
    mounted () {
      this.$nextTick(() => {
        this.dynamic = {top: this.$refs.slideContent.clientHeight + 'px'};
      });
    },
    components: {
      SongList,
      Scroll
    },
    computed: {
      ...mapGetters(['getSongList'])
    },
    methods: {
      slideLeft () {
        this.$emit('slideLeft');
      },
      scroll (offset) {
        if (offset.y < 0) {
          let absY = Math.abs(offset.y);
          this.$refs.slideCover.style.height = absY + 'px';
        } else {
          this.$refs.slideCover.style.height = 0;
        }
      }
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"
 .scroll-container
   overflow: visible
 .slide-head
   position: fixed
   top: 0;
   left: 0
   right: 0
   z-index: 1
   height: 30px
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
 .slide-content
    position: relative
    width: 100%
    padding-top: 70%
    overflow: hidden
    .slide-cover
      position: absolute
      left: 0
      right: 0
      bottom: 0
      height: 0
      background-color: $color-background
    .slide-content-img
      position: absolute
      top: 0
      left: 0
      width: 100%
      filter:grayscale(.5)
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
</style>