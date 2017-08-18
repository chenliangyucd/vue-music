<template>
  <div class="recommend-container"> 
    <slider :dataList="sliderList" >
      <ul class="recommend-slider">
       <li v-for="slider in sliderList">
         <a :href="slider.linkUrl"><img :src="slider.picUrl" alt="服务器走神了?"></a>
       </li>
      </ul>
    </slider>

    <div ref="recommendList" style="height: 300px;overflow: hidden;">
   
    <ul class="recommend-list-container">
      <li v-for="recommend in recommendList">
        <div class="recommend-item">
          <img class="recommend-item-avator" :src="recommend.imgurl">
          <div class="recommend-item-content">
            <p class="recommend-item-author" v-html="recommend.creator.name"></p>
            <p class="recommend-item-des" v-html="recommend.dissname"></p>
          </div>
        </div>
      </li>
    </ul>
    </div>
  </div>	
</template>
<script type="text/ecmascript-6">
import {getSliderList, getRecommendList} from 'api/recommend';
import Slider from 'base/slider';
import BScroll from 'better-scroll';
export default {
  components: {
    Slider
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
      setTimeout(() => {
        let scroll = new BScroll(this.$refs.recommendList, {
          scrollY: true,
          click: true
        });
        console.info(scroll);
      }, 1000);
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
  @import  "~common/stylus/variable"
  .recommend-container
    .recommend-slider
      display: flex;
      li
        flex-grow: 1
        img
          width: 100%
    .recommend-list-container
      .recommend-item
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