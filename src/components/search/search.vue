<template>
  <div class="search-container">
    <v-input class="search-input"></v-input>
    <div class="hot-search-container">
      <h2 class="hot-search-title">热门搜索</h2>
      <ul class="hot-search-list">
        <li class="hot-search-item">123131</li>
        <li class="hot-search-item">12</li>
      </ul>
      <ul class="hot-search-list">
        <li class="hot-search-item">123131</li>
        <li class="hot-search-item">1231</li>
      </ul>
    </div>
  </div>	
</template>
<script type="text/ecmascript-6">
import VInput from 'base/v-input';
export default {
  components: {
    VInput
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
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
      .hot-search-list
        display: flex;
        margin-top: 12px
        &:first-of-type
          margin-top: 24px
        .hot-search-item
          padding: 6px 12px
          background-color: #333
          border-radius: 6px
          +.hot-search-item
            margin-left: 10px
</style>