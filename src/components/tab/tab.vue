<template>
  <nav class="tab-container">
    <router-link tag="div" to="/recommend"><span>推荐</span></router-link>
    <router-link tag="div" to="/singer"><span>歌手</span></router-link>
    <router-link tag="div" to="/rank"><span>排行</span></router-link>
    <router-link tag="div" to="/search"><span>搜索</span></router-link>
  </nav>
</template>
<script type="text/ecmascript-6">
  export default {};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .tab-container
    display: flex
    margin-top: 20px
    color: $color-text-d
    .router-link-active
      color: $color-theme      
      span
        border-bottom: 2px solid $color-theme
    div
      flex-grow: 1
      text-align: center
      span
        display: inline-block
        padding-bottom: 8px

</style>