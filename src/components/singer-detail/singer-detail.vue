<template>
  <slide-left  ref="slideLeft">
     <base-detail></base-detail>
  </slide-left>
</template>
<script type="text/ecmascript-6">
  import SlideLeft from 'base/slide-left/slide-left';
  import BaseDetail from 'components/base-detail/base-detail';
  export default {
    props: {
      slideTitle: {
        type: String,
        default: ''
      },
      slideAvatorUrl: {
        type: String,
        default: ''
      },
      slideDataList: {
        type: Array,
        default: () => [] //  对象或者数组类的默认值必须通过函数来返回默认值
      }
    },
    components: {
      SlideLeft,
      BaseDetail
    },
    methods: {
      slideLeft () {
        this.$router.push('/singer');
      }
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>