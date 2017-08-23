<template>
  <div class="m-head">
    <i class="m-logo"></i>CLY Music
  </div>	
</template>
<script type="text/ecmascript-6">
export default {};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 疑问@import ~  和不带 ~ 区别在哪*/
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .m-head
    height: 50px
    line-height: 50px
    color: $color-theme
    text-align: center
    .m-logo 
      display: inline-block
      width: 30px
      height: 32px
      vertical-align: middle
      bg-image('logo', 'png')
      background-size: 30px 32px
      margin-right: 12px;
</style>