<template>
  <div v-if="getShrinkSongPlay" class="song-play-container">
    <div class="song-play-head">
      <i @click="shrinkSongPlay" class="icon-back"></i>
      <span v-text="getSong.songname"></span>
    </div>
    <div class="singer-name">
      <span v-for="singer in getSong.singer" v-text="singer.name"></span>
    </div>
    <div class="album-img-container">
      <img :style="{width: albumImgWidth, height : albumImgHeight}" :src="getSong.albumimgurl">
    </div>
    <div class="song-lyric">
      顺应时代的改变，看那些拙略的表演
    </div>
    <div class="dot-container">
      <i class="dot-long"></i><i class="dot"></i>
    </div>
    <div class="progress-bar-container">
      <div class="progress-time">1:21</div>
      <div class="progress-bar">
        <div class="progress-plan-bar">
          <div class='progress-btn'></div>
        </div>
      </div>
      <div class="progress-time">4:21</div>
    </div>
    <div class="song-play-operate">
      <i class="icon-random"></i>
      <i class="icon-prev" @click="changeSong(-1)"></i>
      <i :class="{'icon-play': !playing,'icon-pause': playing}"  @click="audioPlay"></i>
      <i class="icon-next" @click="changeSong(1)"></i>
      <i class="icon-not-favorite" @click="changeFavorite"></i>
    </div>
    <audio style="display: none;" ref="audio" controls="controls" loop="loop" preload="auto" :src="getSong.playurl">
      你的浏览器不支持audio标签
    </audio>
    <img :src="getSong.albumimgurl" class="song-play-bg">
  </div>
</template>
<script type="text/ecmascript-6">
  import { mapGetters, mapMutations, mapActions } from 'vuex';
  import * as types from 'store/mutation-types';
  export default {
    data () {
      return {
        albumImgHeight: 'auto',
        albumImgWidth: 'auto',
        playing: false
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
    },
    methods: {
      // 点击向下切换
      shrinkSongPlay () {
        this.setShrinkSongPlay({shrinkSongPlay: false});
      },
      // 切换歌曲
      changeSong (num) {
        this.actionChangeSong(num);
        console.info('测试播放', this.playing);
        if (this.playing) {
          this.$nextTick(() => {
            this.$refs.audio.play();
          });
        }
      },
      // 点击切换喜欢的歌曲
      changeFavorite () {
        console.info('execute favorite');
      },
      // 点击播放音乐
      audioPlay () {
        if (this.playing) {
          this.$refs.audio.pause();
          this.playing = false;
        } else {
          this.$refs.audio.play();
          this.playing = true;
        }
      },
      ...mapMutations({setShrinkSongPlay: types.SET_SHRINK_SONG_PLAY}),
      ...mapActions({actionChangeSong: 'changeSong'})
    },
    computed: {
      ...mapGetters(['getShrinkSongPlay', 'getSong'])
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  $song-play-width = 86%
  $progress-height = 6px

  .song-play-container
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 5
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
    /* 进度条begin */
    .progress-bar-container
      display: flex
      width: $song-play-width
      align-items: center
      margin: 14px auto 0
      .progress-time
        font-size: $font-size-small
        color: $color-text
      .progress-bar
        position: relative
        flex-grow: 1
        height: $progress-height
        margin: 0 6px
        background-color: #696969
        .progress-plan-bar
          position: absolute
          top: 0
          left: 0
          height: $progress-height
          width: 20px
          background-color: $color-theme
          .progress-btn
            position: absolute
            top: 0
            bottom: 0
            right: 0
            width: 10px
            height: 10px
            margin: auto 0
            background-color: $color-theme
            border: 3px solid #fff
            border-radius: 50%
    /* 进度条end */
    .song-play-operate
      display: flex
      width: $song-play-width
      margin: 14px auto 0
      color: $color-theme
      font-size: 32px
      justify-content: space-between
      align-items: center
      .icon-play, .icon-pause
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
