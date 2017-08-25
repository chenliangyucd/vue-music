<template>
  <div class="search-container">
    <v-input class="search-input" @input="input" @clear="_clearSearchList" ref="searchInput"></v-input>
    <div class="hot-search-container">
      <div v-show="searchSwitch">
        <h2 class="hot-search-title">热门搜索</h2>
        <ul  class="hot-search-list">
          <li class="hot-search-item" @click="searchHotkey(hot.k)" v-for="hot in hotkey" v-html="hot.k"></li>
        </ul>
      </div>
      <scroll class="search-scroll" v-show="!searchSwitch" @pullingUp="pullingUp" :pullUpLoad="true" :dataList="searchList">
        <ul class="search-list">
          <li v-for="search in searchList" class="search-item">
            <i class="icon icon-music"></i><span v-text="search.songname"></span>
          </li>
        </ul>
      </scroll>
    </div>
  </div>	
</template>
<script type="text/ecmascript-6">
import VInput from 'base/v-input';
import Scroll from 'base/scroll';
import {getHotSearchList, search} from 'api/search';
export default {
  components: {
    VInput,
    Scroll
  },
  data () {
    return {
      hotkey: [],
      searchList: [],
      searchSwitch: true
    };
  },
  watch: {
    searchList (searchList) {
      if (searchList.length > 0) {
        this.searchSwitch = false;
      } else {
        this.searchSwitch = true;
      }
    }
  },
  created () {
    getHotSearchList().then((response) => {
      let hotkey = response.data.hotkey;
      let end = hotkey.length > 10 ? 10 : hotkey.length;
      this.hotkey = hotkey.slice(0, end);
    });
  },
  methods: {
    searchHotkey (query) {
      this.$refs.searchInput.setValue(query);
      this.input(query);
    },
    input: function (query) {
      //  query, page, zhida, perpage)
      if (typeof query === 'string' && query.length <= 0) {
        this._clearSearchList();
        return;
      }
      search(query, 1, 1, 20).then((response) => {
        console.info(response);
        this.searchList = response.data.song.list;
      });
    },
    pullingUp () {
      console.info('pullingup');
    },
    _clearSearchList () {
      this.searchList = [];
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  /* 不要老去想margin-left margin-top 也要活用 margin-right margin-bottom */
  .search-container
    color: #696969
    .search-input
      height: 40px
      margin: 30px 25px 0
      border-radius: 4px
    .hot-search-container
      margin: 20px 0 0 25px
      .hot-search-title
        font-size: 16px
        margin-bottom: 24px
      .hot-search-list
        .hot-search-item
          display: inline-block
          padding: 6px 12px
          background-color: #333
          border-radius: 6px
          margin: 0 12px 20px 0
      .search-scroll
        scroll-container(170px)
      .search-list       
        margin-left: 30px
        overflow: hidden
        .search-item 
          margin-top: 24px
          .icon
            vertical-align: middle
          span
            margin-left: 20px
            vertical-align: middle
</style>