<template>
  <div class="rank-container">
   <scroll class="scroll-container" :dataList="topList">
    <ul class="rank-list">
      <li class="rank-item" @click="clickRank(top)" v-for="top in topList">
        <img class="rank-img" :src="top.picUrl">
        <div class="rank-des">
          <p v-for="(song, index) in top.songList" v-html="(index + 1 + ' ') + song.songname + song.singername"></p>
        </div>
      </li>
    </ul>
   </scroll>
   <slide-song-list :slideTitle="top.topTitle" :slideAvatorUrl="top.picUrl" :slideDataList="topDetailList" ref="slidSongList">
     <template scope="props">
        <li class="rank-detail-item">
          <div class="rank-detail-itemleft" v-if="props.index <= 2">
            <i class="rank-trophy" :class="{'rank-trophy0': props.index === 0,'rank-trophy1': props.index === 1,'rank-trophy2': props.index === 2}"></i>
          </div>
          <div class="rank-detail-itemleft" v-if="props.index > 2" v-text="props.index + 1"></div>
          <div class="rank-detail-itemright">
            <div class="rank-detail-name" v-text="props.item.data.songname"></div>
            <div class="rank-detail-info"><span v-for="singer in props.item.data.singer" v-text="singer.name"></span><span v-text="props.item.data.albumname"></span></div>
          </div>
        </li>
     </template>
   </slide-song-list>
  </div>	
</template>
<script type="text/ecmascript-6">
import {getTopList, getMusicList} from 'api/rank';
import Scroll from 'base/scroll';
import SlideSongList from 'base/slide-song-list/slide-song-list';
export default {
  data () {
    return {
      topList: [],
      topDetailList: [],
      top: {}
    };
  },
  components: {
    Scroll,
    SlideSongList
  },
  methods: {
    clickRank (top) {
      console.info(top);
      this.top = top;
      getMusicList(top.id).then((response) => {
        console.info(response);
        this.topDetailList = response.songlist;
        console.info(this.topDetailList);
      });
      this.$refs.slidSongList.slideLeft();
    }
  },
  created () {
    getTopList().then((response) => {
      console.info(response);
      console.info(response.data.topList);
      this.topList = response.data.topList;
    });
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .rank-container
    font-size: $font-size-small
    color: $color-text-l
    .rank-list
      .rank-item
        display: flex
        margin: 25px 25px 0
        .rank-img
          width: 122px
          height: 122px
        .rank-des
          display: flex
          flex-direction: column
          flex-grow: 1
          justify-content: space-around
          padding-left: 25px
          background-color: #333
          p
            width: 160px
            no-wrap()
            @media (max-width: 320px)
              width: 120px
  .rank-detail-item
    display: flex
    margin-top: 30px
    font-size: 0
    .rank-trophy
      width: 25px
      height: 24px
      background-size: 25px 24px
    .rank-trophy0
      bg-image('first', 'png')
    .rank-trophy1
      bg-image('second', 'png')
    .rank-trophy2
      bg-image('third', 'png')  
    .rank-detail-itemleft
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      width: 25px
      margin-right: 30px
      font-size: $font-size-large-x
      color: $color-theme
    .rank-detail-itemright
      flex-grow: 1
    .rank-detail-name
      font-size: $font-size-medium-x
      color: $color-text
    .rank-detail-info
      width: 80%
      margin-top: 10px
      font-size: $font-size-medium-x
      color: $color-text-d
      no-wrap()
</style>