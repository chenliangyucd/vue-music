<template>
  <ul class="song-list">
    <li class="song-item" v-for="song in songList">
      <div class="song-item-rank" v-if="rank">
        <template v-if="props.index < 3">
          <i class="song-trophy" :class="{'song-trophy0': props.index === 0,'song-trophy1': props.index === 1,'song-trophy2': props.index === 2}"></i>
        </template>
        <template v-else>
          <span v-text="props.index+1"></span>
        </template>
      </div>
      <div class="song-item-content">
        <div class="song-item-name" v-text="song.songname"></div>
        <div class="song-item-info"><span v-for="singer in song.singer" v-text="singer.name"></span><span v-text="song.albumname"></span></div>
      </div>
    </li>
  </ul>	
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    rank: {
      type: Boolean,
      default: false
    },
    songList: {
      type: Array,
      default: []
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .song-list
    font-size: $font-size-medium-x
    padding-left: 38px
    .song-item
      display: flex
      margin-top: 30px
      font-size: 0
      .song-trophy
        width: 25px
        height: 24px
        background-size: 25px 24px
      .song-trophy0
        bg-image('first', 'png')
      .song-trophy1
        bg-image('second', 'png')
      .song-trophy2
        bg-image('third', 'png')  
      .song-item-rank
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        width: 25px
        margin-right: 30px
        font-size: $font-size-large-x
        color: $color-theme
      .song-item-content
        flex-grow: 1
        .song-item-name
          font-size: $font-size-medium-x
          color: $color-text
        .song-item-info
          width: 80%
          margin-top: 10px
          font-size: $font-size-medium-x
          color: $color-text-d
          no-wrap()
</style>