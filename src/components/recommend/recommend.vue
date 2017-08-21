<template>
  <scroll class="scroll-container" :dataList="recommendList">
    <div class="recommend-container"> 
      <slider :dataList="sliderList" >
        <ul class="recommend-slider">
         <li v-for="slider in sliderList" class="hook-item-wrap">
           <a :href="slider.linkUrl"><img :src="slider.picUrl" alt="服务器走神了?"></a>
         </li>
        </ul>
      </slider>
     
      <ul class="recommend-list-container">
        <li class="recommend-item" v-for="recommend in recommendList">
          <img class="recommend-item-avator" :src="recommend.imgurl">
          <div class="recommend-item-content">
            <p class="recommend-item-author" v-html="recommend.creator.name"></p>
            <p class="recommend-item-des" v-html="recommend.dissname"></p>
          </div>
        </li>
      </ul>
    </div>
  </scroll>	
</template>
<script type="text/ecmascript-6">
import {getSliderList, getRecommendList} from 'api/recommend';
import Slider from 'base/slider';
import Scroll from 'base/scroll';
export default {
  components: {
    Slider,
    Scroll
  },

  data () {
    return {
      sliderList: [],
      recommendList: []
    };
  },

  // 通常在created 生命周期内调用外部接口方法
  created () {
    getSliderList().then((response) => {
      console.info('打印返回值');
      console.info(response.data);
      this.sliderList = response.data.slider;
    });
    getRecommendList().then((response) => {
      console.info('打印dataList');
      console.info(response);
      this.recommendList = response.data.list;
    });
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  /* flex-grow 并不是我想的那样，比如父元素1000px flex-grow 为1 平分的前提是  里面的内容的高度或者宽度*/
  @import  "~common/stylus/variable"
  .scroll-container
    position: fixed
    top: 96px
    bottom: 0
    overflow: hidden  
  .recommend-container
    .recommend-slider
      display: flex
      li
        a
          display: inline-block
          width: 100%
          img
            width: 100%
    .recommend-list-container
      .recommend-item
        &:first-of-type
          margin-top: 13px
        display: flex
        margin-top: 26px
        align-items: center
        .recommend-item-avator
          flex-basis: 74px
          height: 74px
          margin-left: 25px
        .recommend-item-content
          display: flex
          align-self: stretch
          flex-direction: column
          justify-content: space-around
          margin-left: 25px
          font-size: $font-size-medium
          .recommend-item-author
            color: $color-text
          .recommend-item-des
            color: $color-text-d
</style>