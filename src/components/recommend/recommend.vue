<template>
  <div class="recommend-container"> 
   recommend
  </div>	
</template>
<script type="text/ecmascript-6">
import {getSliderList, getRecommendList} from 'api/recommend';

export default {
  // 通常在created 生命周期内调用外部接口方法
  created () {
    getSliderList().then(function (data) {
      console.info('打印返回值');
      console.info(data);
    });
    getRecommendList().then(function (dataList) {
      console.info('打印dataList');
      console.info(dataList);
    });
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .recommend-container
    color: #fff
</style>