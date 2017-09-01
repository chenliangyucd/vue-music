<template>
  <div>
    <div class="slide-head">
        <i class="slide-icon icon-back" @click="slideLeft"></i>
        <em class="slide-title" v-text="slideTitle"></em>
    </div>
    <div class="slide-content">
      <img class="slide-content-img" :src="slideAvatorUrl" alt="服务器挂了">
      <div class="slide-content-mask"></div>
      <div class="slide-random-play">
        <i class="slide-icon icon-play"></i>随机播放全部
      </div>
    </div>
    <!-- 要是做到通用的这块需要自己封装bean类-->
    <ul class="slide-detail-list">
      <slot v-for="(item, index) in songList" :item="item" :index="index">
      </slot>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import SongList from 'components/song-list/song-list';
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
      songList: {
        type: Array,
        default: () => [] //  对象或者数组类的默认值必须通过函数来返回默认值
      }
    },
    components: {
      SongList
    },
    methods: {
      slideLeft () {
        this.$router.push('/singer');
      }
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"
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
    .slide-content-img
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