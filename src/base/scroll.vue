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
      }
    },
    methods: {
      refresh () {
        console.info('老子是refreshTest');
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
      scrollToElement (el, time, offsetX, offsetY, easing) {
        this.betterScroll.scrollToElement(el, time, offsetX, offsetY, easing);
      }
    },
    watch: {
      dataList () {
        if (this.betterScroll === null) {
          this.betterScroll = new BScroll(this.$refs.scrollContainer, {
            probeType: this.probeType
          });
          this.scroll();
        }

        this.$nextTick(() => {
          this.betterScroll.refresh();
        });
      }
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>