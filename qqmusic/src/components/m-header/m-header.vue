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
  /* 38/49*/
  .m-header
    height:3.0rem
    text-align:center
    position:relative
    padding-top:0.5rem
    font-size:0rem
    .icon
      display: inline-block
      width:2.375rem
      height:2.5rem
      bg-image('logo')
      background-size: 2.375rem 2.5rem
      vertical-align:bottom
    .text
      display: inline-block
      font-size:1.25rem
      height:2.5rem
      line-height:2.5rem
      color:$color-theme
      vertical-align:bottom
      margin-left:0.9375rem
    .mine
     position:absolute
     right:0.875rem
     top:0.5rem
     bottom:0rem
     height:2.5rem
     .icon-mine
       font-size:1.25rem
       line-height: 2.5rem
       color:$color-theme
</style>
