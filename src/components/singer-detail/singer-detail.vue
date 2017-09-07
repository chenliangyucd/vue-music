<template>
  <slide-left v-if="getSinger !== null" ref="slideLeft">
     <base-detail :rank="rank" :slideTitle="slideTitle" :slideAvatorUrl="slideAvatorUrl" @slideLeft="slideLeft"></base-detail>
  </slide-left>
</template>
<script type="text/ecmascript-6">
  import { mapMutations, mapGetters } from 'vuex';
  import SlideLeft from 'base/slide-left/slide-left';
  import BaseDetail from 'components/base-detail/base-detail';
  import {getSingerDetail} from 'api/singer';
  import SongFactory from 'bean/SongFactory';
  import {SET_SONG_LIST} from 'store/mutation-types';
  export default {
    data () {
      return {
        slideTitle: '',
        slideAvatorUrl: '',
        rank: true
      };
    },
    created () {
      if (this.getSinger === null) {
        this.$router.push('/singer');
        return;
      }
      this.slideTitle = this.getSinger.Fsinger_name;
      this.slideAvatorUrl = this.getSinger.avatorUrl;
      getSingerDetail(this.getSinger.Fsinger_mid).then((response) => {
        console.info(response);
        this._dealSongList(response.data.list);
      });
    },
    computed: {
      ...mapGetters(['getSinger'])
    },
    components: {
      SlideLeft,
      BaseDetail
    },
    methods: {
      // 处理生成songlist数据
      _dealSongList (list) {
        let songList = [];
        for (let song of list) {
          let tempSong = {};
          tempSong.songid = song.musicData.songid;
          tempSong.songmid = song.musicData.songmid;
          tempSong.songname = song.musicData.songname;
          tempSong.albumname = song.musicData.albumname;
          tempSong.playurl = song.playurl;
          tempSong.singer = song.musicData.singer;
          songList.push(SongFactory(tempSong));
        }
        // 设置songList
        this[SET_SONG_LIST]({songList});
      },
      slideLeft () {
        this.$router.push('/singer');
      },
      ...mapMutations([SET_SONG_LIST])
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>