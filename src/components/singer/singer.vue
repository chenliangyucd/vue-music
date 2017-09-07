<template>
  <div class="singer-container">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <scroll class="scroll-container" @scroll="scroll" :dataList="singerMap" :probeType="3" ref="scrollContainer">
      <div ref="singerList">
        <template v-for="(findex, index) in findexList">
          <h2 class="singer-title" v-html="findex == '热'?'热门':findex" :data-findex="findex"></h2>
          <ul>
            <li class="singer-item" @click="clickSinger(singer)" v-for="singer in singerMap.get(findex)">
              <img class="singer-avator" :src="singer.avatorUrl"><span class="singer-name" v-html="singer.Fsinger_name"></span>
            </li>
          </ul>
        </template>
      </div>
    </scroll>
    <ul class="singer-index">
      <li :class="{'singer-index-active': findex === activeFindex}" @click="clickSingerIndex(findex)" v-for="(findex, index) in findexList" v-html="findex">
      </li>
    </ul>
    <slide-song-list :slideTitle="singer.Fsinger_name" :slideAvatorUrl="singer.avatorUrl" :slideDataList="singerDetailList" @eventSlideRight="eventSlideRight" ref="slidSongList">
       <template scope="props">
          <li class="singer-detail-item">
            <div class="singer-detail-songname" v-text="props.item.musicData.songname">
            </div>
            <div class="singer-detail-albumname" v-text="singer.Fsinger_name + ' ' + props.item.musicData.albumname">
            </div>
          </li>
        </template>
    </slide-song-list>
  </div>	
</template>
<script type="text/ecmascript-6">
import { getSingerList } from 'api/singer';
import SlideSongList from 'base/slide-song-list/slide-song-list';
import { mapGetters, mapMutations } from 'vuex';
import {SET_SINGER} from 'store/mutation-types';
import Scroll from 'base/scroll';
export default {
  data () {
    return {
      activeFindex: -1,
      singerMap: new Map(),
      findexDistance: new Map(),
      findexList: [],
      singer: {},
      singerDetailList: []
    };
  },
  components: {
    Scroll,
    SlideSongList
  },
  computed: {
    ...mapGetters(['getSinger'])
  },
  created () {
    getSingerList().then((response) => {
      this._dealSingerList(response.data.list);
    });
  },
  destroyed () {
    console.info('destroy');
  },
  methods: {
    clickSinger (singer) {
      this.singer = singer;
      console.info(singer);
      this.SET_SINGER({singer});
      // getSingerDetail(singer.Fsinger_mid).then((response) => {
      //  console.info(response);
      //  this.singerDetailList = response.data.list;
      // });
      this.$router.push('/singer/singerDetail');
      // this.$refs.slidSongList.slideLeft();
    },
    clickSingerIndex (findex) {
      // this.$refs.scrollContainer.refresh();
      let singerList = this.$refs.singerList;
      let el = singerList.querySelector('h2[data-findex=\'' + findex + '\']');
      this.$refs.scrollContainer.scrollToElement(el, 1000);
      this.activeFindex = findex;
    },
    /* 对歌手数据的处理 */
    _dealSingerList (singerList) {
      const preUrl = 'https://y.gtimg.cn/music/photo_new/T001R300x300M000';
      const singerMap = new Map();
      let [findex, singerFindexList] = [];
      let [hotSingers, findexList] = [[], []];

      for (let i = 0; i < singerList.length; i++) {
        findex = singerList[i].Findex;
        singerFindexList = singerMap.get(findex);

        if (singerFindexList == null) {
          singerFindexList = [];
          findexList.push(findex);
          singerMap.set(findex, singerFindexList);
        }

        if (i < 10) {
          hotSingers.push(singerList[i]);
        }

        singerList[i].avatorUrl = preUrl + singerList[i].Fsinger_mid + '.jpg';
        singerFindexList.push(singerList[i]);
      }

      findexList.sort((a, b) => {
        return a.charCodeAt(0) - b.charCodeAt(0);
      });
      // 生成 findexList
      findexList.unshift('热');
      singerMap.set('热', hotSingers);
      this.singerMap = singerMap;
      this.findexList = findexList;

      // 生成距离
      this.$nextTick(() => {
        let singerList = this.$refs.singerList;
        let elLists = singerList.querySelectorAll('h2[data-findex]');
        let findexDistance = new Map();
        let [findex, distance] = [];

        for (let i = 0; i < elLists.length; i++) {
          findex = elLists[i].dataset.findex;
          distance = {min: elLists[i].offsetTop, max: elLists[i + 1] ? elLists[i + 1].offsetTop : Number.POSITIVE_INFINITY};
          findexDistance.set(findex, distance);
        }
        this.findexDistance = findexDistance;
      });
    },
    scroll (offset) {
      let [distance, offsetY] = [null, Math.abs(offset.y)];
      for (let key of this.findexDistance.keys()) {
        distance = this.findexDistance.get(key);
        if (distance.min <= offsetY && offsetY < distance.max) {
          this.activeFindex = key;
          break;
        }
      }
    },
    eventSlideRight () {
      // 子组件不能操作父组件里传递过来的数据
      this.singerDetailList = [];
    },
    ...mapMutations([SET_SINGER])
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .fade-enter-active, .fade-leave-active
    transition: all .3s
  .fade-enter, .fade-leave-to
    transform: translate3d(100%, 0, 0)
  .singer-container
    color: $color-text-d
    font-size: 12px
    .singer-index
      position: fixed
      top: 160px
      right: 0
      width: 20px
      padding: 14px 0
      line-height: 16px
      font-size: 12px
      text-align: center
      background-color: #181818
      border-radius: 20px
      opacity: 0.7
      .singer-index-active
        color: $color-theme
    .singer-title
      &:first-of-type
        margin-top: 0
      margin-top: 25px
      padding-left: 24px
      line-height: 36px
      background-color: #333
    .singer-item
      padding-left: 36px;
      margin-top: 25px
      .singer-avator
        width: 62px
        height: 62px
        border-radius: 62px
        vertical-align: middle
      .singer-name
        margin-left: 25px
        vertical-align: middle
  .singer-detail-item
    margin-top: 32px
    .singer-detail-songname
      color: $color-text
    .singer-detail-albumname
      margin-top: 10px
      width: 90%
      no-wrap()
      color: $color-text-d
</style>