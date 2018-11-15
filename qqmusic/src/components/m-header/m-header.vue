<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">QQ Music</h1>
    <router-link tag="div" class="mine" to="/tag">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'm-header'
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .m-header
    height:3.75rem
    text-align:center
    position:relative
    padding-top:0.5rem
    font-size:0rem
    .icon
      display: inline-block
      width:3.0625rem
      height:3.3125rem
      bg-image('logo')
      background-size: 3.0625rem 3.3125rem
      vertical-align:bottom
    .text
      display: inline-block
      font-size:1.5rem
      height:3.3125rem
      line-height:3.3125rem
      color:$color-theme
      vertical-align:bottom
      margin-left:0.9375rem
    .mine
     position:absolute
     right:1.3125rem
     top:0.5rem
     bottom:0rem
     height:3.3125rem
     .icon-mine
       font-size:2rem
       line-height: 3.3125rem
       color:$color-theme
</style>
