<template>
  <nav class="tab-container">
    <router-link to="/recommend">推荐</router-link>
    <router-link to="/singer">歌手</router-link>
    <router-link to="/rank">排行</router-link>
    <router-link to="/search">搜索</router-link>
  </nav>
</template>
<script type="text/ecmascript-6">
  export default {};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .tab-container
    color: yellow
    .router-link-active
      color: red
</style>