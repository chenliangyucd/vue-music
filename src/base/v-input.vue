<template>
  <div class="v-input-wrap" ref="v-input-wrap">
    <i class="v-input-icon v-input-search icon-search" ref="v-input-search"></i>
    <input class="v-input" @focus="focus" @blur="blur" @input="input" :name="name" :type="type" ref="v-input">
    <i v-show="showDelete" @click="clearInput" class="v-input-icon v-input-delete icon-delete" ref="v-input-delete"></i>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      name: {
        type: String
      },
      type: {
        type: String,
        default: 'text'
      }
    },
    data () {
      return {
        showDelete: false
      };
    },
    methods: {
      focus () {
        this._showDeletIcon();
      },
      blur () {
        this._showDeletIcon();
      },
      input () {
        this._showDeletIcon();
      },
      clearInput () {
        this.$refs['v-input'].value = '';
        this._showDeletIcon();
      },
      _showDeletIcon () {
        if (this.$refs['v-input'].value.length > 0) {
          this.showDelete = true;
        } else {
          this.showDelete = false;
        }
      }
    },
    // 对于vue中节点渲染好的事件
    mounted () {
      this.$nextTick(() => {

      });
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .v-input-wrap
    position: relative 
    display: flex
    background-color: #333
    align-items: center
    font-size: 0
    .v-input
      flex-grow: 1
      margin-right: 4px
      height: 24px
      justify-content: center
      border: 0
      color: #fff
      font-size: 14px
      background-color: #333
    .v-input-icon
      width: 18px
      height: 18px
      text-align: center
      font-size: 18px
    .v-input-search
      width: 24px
      height: 24px
      margin-left: 10px
      color: #222  
      font-size: 24px
    .v-input-delete
      margin: 6px
      color: #2f2f2f
      border-radius: 50%
      background-color: #222
</style>