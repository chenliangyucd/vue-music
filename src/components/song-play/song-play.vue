<template>
  <div v-if="songPlay" :class="{'song-shrink-container': !shrinkSongPlay, 'song-play-container': shrinkSongPlay}">
    <div v-show="shrinkSongPlay" class="song-play-container">
      <div class="song-play-head">
        <i @click="clickShrink" class="icon-back"></i>
        <span v-text="getSong.songname"></span>
      </div>
      <div class="singer-name">
        <span v-for="singer in getSong.singer" v-text="singer.name"></span>
      </div>
      <div class="album-img-container">
        <img :style="{'width': albumImgWidth, 'height': albumImgHeight, 'animation-play-state': animationPlayState}" class="animation-circle" :src="getSong.albumimgurl">
      </div>
      <div class="song-lyric">
        顺应时代的改变，看那些拙略的表演
      </div>
      <div class="dot-container">
        <i class="dot-long"></i><i class="dot"></i>
      </div>
      <div class="progress-bar-container">
        <div class="progress-time" v-text="currentShowTime"></div>
        <div class="progress-bar" ref="progressBar">
          <div class="progress-plan-bar" :style="{width: progressPlanWidth}">
            <div class='progress-btn'></div>
          </div>
        </div>
        <div class="progress-time" v-text="durationShowTime"></div>
      </div>
      <div class="song-play-operate">
        <i class="icon-random"></i>
        <i class="icon-prev" @click="changeSong(-1)"></i>
        <i :class="{'icon-play': !playing,'icon-pause': playing}"  @click="audioPlay"></i>
        <i class="icon-next" @click="changeSong(1)"></i>
        <i class="icon-not-favorite" @click="changeFavorite"></i>
      </div>
      <img class="song-play-bg" :src="getSong.albumimgurl">
    </div>
    <div class="song-shrink-content" v-show="!shrinkSongPlay" @click="clickMagnify">
      <div class="song-shrink-left">
        <img :style="{'animation-play-state': animationPlayState}" class="song-shrink-img animation-circle" :src="getSong.albumimgurl">
        <div class="song-shrink-info">
          <div class="song-shrink-songname" v-text="getSong.songname">
          </div>
          <div class="song-shrink-singername">
            <span v-for="singer in getSong.singer" v-text="singer.name"></span>
          </div>
        </div>
      </div>
      <div class="song-shrink-right">
      <i :class="{'icon-play': !playing,'icon-pause': playing}"  @click.stop="audioPlay"></i><i class="icon-playlist"></i>
      </div>
    </div>
    <audio style="display: none;" ref="audio" @timeupdate="timeupdate" @canplay="canplay" preload="auto" :src="getSong.playurl">
      你的浏览器不支持audio标签
    </audio>
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
        progressPlanWidth: '16px',
        progressButtonLength: 16,
        progressBarWidth: 0,
        duration: 0,
        currentTime: 0,
        durationShowTime: '0:00',
        currentShowTime: '0:00',
        playing: false
      };
    },
    mounted () {
      this.$nextTick(() => {
        // 初始化图片宽度高度
        let width = document.documentElement.clientWidth;
        let imgWH = Math.sqrt(width * width / 2) + 'px';

        this.albumImgHeight = imgWH;
        this.albumImgWidth = imgWH;

        // 初始化progressBar的宽度
        // this.progressBarWidth = this.$refs.progressBar.clientWidth;
        // console.info('打印progressBarWidth', this.progressBarWidth);
      });
    },
    methods: {
      canplay () {
        this.duration = this.$refs.audio.duration;
        this.durationShowTime = this._getFormatTime(this.$refs.audio.duration);
        if (this.playing) {
          this.$refs.audio.play();
        }
      },
      // 在这里计算比例值，
      timeupdate () {
        this.currentTime = this.$refs.audio.currentTime;
        this.currentShowTime = this._getFormatTime(this.$refs.audio.currentTime);
        let ratio = 0;
        if (this.duration > 0) {
          ratio = this.currentTime / this.duration;
        }
        if (this.songPlay && this.shrinkSongPlay) {
          let len = (this.$refs.progressBar.clientWidth - this.progressButtonLength) * ratio + this.progressButtonLength;
          this.progressPlanWidth = len + 'px';
        }
      },
      clickMagnify () {
        this.setShrinkSongPlay({shrinkSongPlay: true});
      },
      // 点击向下切换
      clickShrink () {
        this.setShrinkSongPlay({shrinkSongPlay: false});
      },
      // 切换歌曲
      changeSong (num) {
        this.actionChangeSong(num);
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
      _getFormatTime (second) {
        let minute = Math.floor(second / 60);
        second = Math.floor(second - minute * 60) + '';
        second = second.padStart(2, '0');
        return minute + ':' + second;
      },
      ...mapMutations({setShrinkSongPlay: types.SET_SHRINK_SONG_PLAY}),
      ...mapActions({actionChangeSong: 'changeSong'})
    },
    computed: {
      animationPlayState () {
        if (this.playing) {
          return 'running';
        } else {
          return 'paused';
        }
      },
      ...mapGetters({shrinkSongPlay: 'getShrinkSongPlay', songPlay: 'getSongPlay', getSong: 'getSong'})
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  $song-play-width = 86%
  $progress-height = 6px

  .song-shrink-container
    position: fixed
    left: 0
    right: 0
    bottom: 0
    height: 60px
    z-index: 5
    .song-shrink-content
      display: flex
      height: 100%
      background-color: #2d2d2d
      justify-content: space-between
      align-items: center
      .song-shrink-left
        display: flex
        margin-left: 18px
        .song-shrink-img
          width: 42px
          height: 42px
          border-radius: 50%
        .song-shrink-info
          display: flex
          justify-content: space-around
          flex-direction: column
          margin-left: 10px
          .song-shrink-singername
            color: #656565
            font-size: $font-size-small-s
      .song-shrink-right
        font-size: 0;
        color: $color-theme
        margin-right: 10px
        i
          font-size: 32px
        i + i
          margin-left: 18px
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
        width: 25px
        flex-basis: 25px
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
      filter: blur(20px)
  @keyframes circle
    from
      transform: rotate(0deg)
    to
      transform: rotate(360deg)
  .animation-circle
    animation: circle 60s infinite forwards

</style>
