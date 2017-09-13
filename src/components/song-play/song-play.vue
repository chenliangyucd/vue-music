<template>
  <div class="song-play-container">
    <div class="song-play-head">
      <i class="icon-back"></i>
      演员
    </div>
    <div class="singer-name">
      薛之谦
    </div>
    <div class="album-img-container">
      <img :style="{width: albumImgWidth, height : albumImgHeight}" src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003y8dsH2wBHlo.jpg?max_age=2592000">
    </div>
    <div class="song-lyric">
      顺应时代的改变，看那些拙略的表演
    </div>
    <div class="dot-container">
      <i class="dot-long"></i><i class="dot"></i>
    </div>
    <div class="progress-bar">
     大家好我是进度条君
    </div>
    <div class="song-play-operate">
      <i class="icon-random"></i>
      <i class="icon-prev"></i>
      <i class="icon-play"></i>
      <i class="icon-next"></i>
      <i class="icon-not-favorite"></i>
    </div>
    <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003y8dsH2wBHlo.jpg?max_age=2592000" class="song-play-bg">
  </div>
</template>
<script type="text/ecmascript-6">
  // import { mapGetters } from 'vuex';
  export default {
    data () {
      return {
        albumImgHeight: 'auto',
        albumImgWidth: 'auto'
      };
    },
    mounted () {
      this.$nextTick(() => {
        let width = document.documentElement.clientWidth;
        let imgWidth = Math.sqrt(width * width / 2) + 'px';
        console.info('打印测试imgWidth', imgWidth);
        this.albumImgHeight = imgWidth;
        this.albumImgWidth = imgWidth;
      });
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .song-play-container
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-color: $color-background
    .song-play-head
      position: relative
      margin-top: 10px
      font-size: $font-size-large
      text-align: center
      .icon-back
        position: absolute
        left: 14px
        transform: rotate(-90deg)
        color: $color-theme
    .singer-name
      margin-top: 14px
      text-align: center
    .album-img-container
      margin-top: 20px
      text-align: center
      img
       border: 10px solid #565555
       border-radius: 100%
       vertical-align: bottom
    .song-lyric
      margin-top: 30px
      color: #8c8c8c
      font-size: $font-size-small
      text-align: center
    .dot-container
      text-align: center
      margin-top: 80px
      .dot-long
        display: inline-block
        width: 24px
        height: 8px
        margin-right: 10px
        border-radius: 4px
        background-color: #dfdfdf
      .dot
        display: inline-block
        width: 8px
        height: 8px
        background-color: #afaeaf
        border-radius: 50%
    .progress-bar
      margin-top: 14px
    .song-play-operate
      display: flex
      width: 86%
      margin: 14px auto 0
      color: $color-theme
      font-size: 32px
      justify-content: space-around
      align-items: center
      .icon-play
        font-size: 46px
    .song-play-bg
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(20px);
</style>
