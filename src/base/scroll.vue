<template>
  <div ref="scrollContainer">
    <slot></slot>
  </div>	
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  export default {
    data () {
      return {
        betterScroll: null
      };
    },
    props: {
      dataList: {
        type: [Array, Map],
        required: true
      },
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      pullDownRefreshThreshold: {
        type: Number,
        default: 90
      },
      pullDownRefreshStop: {
        type: Number,
        default: 40
      },
      // 动态改变容器的top,left值
      dynamic: {
        type: Object,
        default: () => { return {top: 0, left: 0}; }
      }
    },
    mounted () {
      this.$nextTick(() => {
        this._createBetterScroll();
      });
    },
    methods: {
      refresh () {
        this.betterScroll.refresh();
      },
      // 注册滚动事件
      scroll () {
        if (this.probeType === 0) {
          return;
        }
        this.betterScroll.on('scroll', (offset) => {
          this.$emit('scroll', offset);
        });
      },
      // 注册上拉事件
      pullingUp () {
        // if (!this.pullUpLoad) {
        //  return;
        // }
        this.betterScroll.on('pullingUp', () => {
          console.info('scroll pullingUp');
          this.$emit('pullingUp');
        });
      },
      scrollToElement (el, time, offsetX, offsetY, easing) {
        this.betterScroll.scrollToElement(el, time, offsetX, offsetY, easing);
      },
      _createBetterScroll () {
        if (this.betterScroll === null) {
          console.info('execute beeterScroll');
          this.betterScroll = new BScroll(this.$refs.scrollContainer, {
            probeType: this.probeType,
            pullDownRefresh: {threshold: 50, stop: 50},
            pullUpLoad: {threshold: 50}
          });
          this.scroll();
          this.pullingUp();
        }
      }
    },
    watch: {
      dataList () {
        this.$nextTick(() => {
          this.refresh();
        });
      },
      dynamic (dynamic) {
        let flag = false;
        if (dynamic.top) {
          this.$refs.scrollContainer.style.top = dynamic.top;
          flag = true;
        }

        if (dynamic.left) {
          this.$refs.scrollContainer.style.left = dynamic.left;
          flag = true;
        }

        if (flag) {
          this.refresh();
        }
        console.info('hhee');
      }
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>