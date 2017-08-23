<template>
  <div class="singer-container">
    <scroll class="scroll-container" @scroll="scroll" :dataList="singerMap" :probeType="3" ref="scrollContainer">
      <div ref="singerList">
        <template v-for="(findex, index) in findexList">
          <h2 class="singer-title" v-html="findex == '热'?'热门':findex" :data-findex="findex"></h2>
          <ul>
            <li class="singer-item" v-for="singer in singerMap.get(findex)">
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
  </div>	
</template>
<script type="text/ecmascript-6">
import {getSingerList} from 'api/singer';
import Scroll from 'base/scroll';
export default {
  data () {
    return {
      activeFindex: null,
      singerMap: new Map(),
      findexDistance: new Map(),
      findexList: []
    };
  },
  components: {
    Scroll
  },
  created () {
    getSingerList().then((response) => {
      this._dealSingerList(response.data.list);
    });
  },
  methods: {
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
      let findex, singerFindexList;
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
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
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
</style>