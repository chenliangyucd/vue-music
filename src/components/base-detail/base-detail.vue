<template>
  <div>
    <div class="slide-head" ref="slideHead">
        <i class="slide-icon icon-back" @click="slideLeft"></i>
        <em class="slide-title" v-text="slideTitle"></em>
    </div>
    <div class="slide-content" ref="slideContent">
      <div class="slide-img-container" ref="slideImgContainer">
        <img class="slide-content-img" :src="slideAvatorUrl" alt="服务器挂了">
      </div>
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
  import { mapGetters, mapMutations } from 'vuex';
  import {SET_SONG_LIST} from 'store/mutation-types';
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
        this.dynamic = {top: this.$refs.slideContent.offsetHeight + 'px'};
        console.info('打印slideHead高度', this.$refs.slideHead.clientHeight, this.$refs.slideHead.offsetHeight, this.$refs.slideHead.scrollHeight);
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
        // 清空SongList 数组
        this[SET_SONG_LIST]({songList: []});
        this.$emit('slideLeft');
      },
      scroll (offset) {
        let slideContentHeight = this.$refs.slideContent.offsetHeight;
        let slideHeadHeight = this.$refs.slideHead.offsetHeight;
        if (offset.y < 0) {
          let absY = Math.abs(offset.y);
          let maxHeight = slideContentHeight - slideHeadHeight;
          // 判断是否达到最大高度
          if (absY >= maxHeight) {
            this.$refs.slideCover.style.height = maxHeight + 'px';
            this.$refs.slideImgContainer.style.height = slideHeadHeight + 'px';
            this.$refs.slideImgContainer.style.zIndex = '1';
          } else {
            this.$refs.slideCover.style.height = absY + 'px';
            this.$refs.slideImgContainer.style.height = '100%';
            this.$refs.slideImgContainer.style.zIndex = 'auto';
          }
          this.$refs.slideContent.style.transform = 'none';
        } else {
          this.$refs.slideCover.style.height = 0;
          let radio = (slideContentHeight + offset.y) / slideContentHeight;
          this.$refs.slideContent.style.transform = `scale(${radio}, ${radio})`;
        }
      },
      ...mapMutations([SET_SONG_LIST])
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
   z-index: 3
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
    .slide-img-container
      position: absolute
      top:0
      left:0
      width: 100%
      height: 100%
      overflow:hidden;
      .slide-content-img
        display: block
        width: 100%
        filter: grayscale(.5)
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