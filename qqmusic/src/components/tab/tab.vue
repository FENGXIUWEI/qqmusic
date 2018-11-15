<template>
  <div class="tab">
    <router-link tag="div" to="/recommend" class="tab-item">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" to="/singer" class="tab-item">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" to="/rank" class="tab-item">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" to="/search" class="tab-item">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'tab'
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.tab
  width:100%;
  font-size:0
  .tab-item
    display:inline-block
    width: 25%
    text-align:center
    vertical-align:bottom
    height:1.84rem
    box-sizing:content
    line-height:1.84rem
    .tab-link
      font-size:0.776rem
      color:#919191
      padding-bottom:0.5rem
      cursor: text
    &.router-link-active
      .tab-link
       color:$color-theme
       border-bottom:0.125rem solid $color-theme
</style>
