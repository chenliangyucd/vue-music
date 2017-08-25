<template>
  <div class="rank-container">
   <scroll class="scroll-container" :dataList="topList">
    <ul class="rank-list">
      <li class="rank-item" v-for="top in topList">
        <img class="rank-img" :src="top.picUrl">
        <div class="rank-des">
          <p v-for="(song, index) in top.songList" v-html="(index + 1 + ' ') + song.songname + song.singername"></p>
        </div>
      </li>
    </ul>
   </scroll>
  </div>	
</template>
<script type="text/ecmascript-6">
import {getTopList} from 'api/rank';
import Scroll from 'base/scroll';
export default {
  data () {
    return {
      topList: []
    };
  },
  components: {
    Scroll
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

</style>