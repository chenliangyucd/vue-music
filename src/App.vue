<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <song-play></song-play>
  </div>
</template>

<script>
/* http://vuemusic.t.imooc.io/#/rank */
import MHeader from 'components/m-header/m-header';
import Tab from 'components/tab/tab';
import SongPlay from 'components/song-play/song-play';
export default {
  name: 'app',
  components: {
    MHeader,
    Tab,
    SongPlay
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /* 好神奇的 ~, 这个~到底是什么意思 ,这个~在stylus-loader中文档有说，只要不是在web-modules中的,都建议引入这个路径 */
  @import  "~common/stylus/variable"
  @import  "~common/stylus/index"
  // @import "~animate.css"

</style>
