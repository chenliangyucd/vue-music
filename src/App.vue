<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>  
  </div>
</template>

<script>
/* http://vuemusic.t.imooc.io/#/rank */
import MHeader from 'components/m-header/m-header';
import Tab from 'components/tab/tab';
export default {
  name: 'app',
  components: {
    MHeader,
    Tab
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /* 好神奇的 ~, 这个~到底是什么意思 ,这个~在stylus-loader中文档有说，只要不是在web-modules中的,都建议引入这个路径 */
  @import  "~common/stylus/variable"
  @import  "~common/stylus/index"
  // @import "~animate.css"
  
</style>
