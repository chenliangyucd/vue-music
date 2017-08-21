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
        type: Array,
        required: true
      }
    },
    watch: {
      dataList () {
        if (this.betterScroll === null) {
          this.betterScroll = new BScroll(this.$refs.scrollContainer);
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