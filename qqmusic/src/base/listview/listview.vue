<template>
<scroll :data="data" :listen-scroll="listenScroll"
        :probe-type="probeType" class="listview" ref="listview" >
  <ul>
    <li v-for="(group,index) in data" :key="index" class="list-group" ref="listGroup">
      <h2 class="list-group-title">{{group.title}}</h2>
      <ul>
        <li v-for="item in group.items" :key="item.id" class="list-group-item">
          <!-- v-lazy运用了图片懒加载  -->
          <img v-lazy="item.avatar" class="avatar"/>
          <span class="name">{{item.name}}</span>
        </li>
      </ul>
    </li>
  </ul>
  <!-- 右边字母表的显示 -->
  <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop>
    <ul>
      <li v-for="(item,index) in shortcutList" :data-index="index" :key="item" class="item">{{item}}</li>
    </ul>
  </div>
  <div v-show="!data.length" class="loading-container">
    <loading></loading>
  </div>
</scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {getData} from 'common/js/dom'
// 设置右边字母的高度
const ANCHOR_HEIGHT = 18
export default {
  name: 'list-view',
  props: {
    data: {
      type: Array
    }
  },
  computed: {
    // 计算字母
    shortcutList () {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  data () {
    return {
      scrollY: -1
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
    this.touch = {}
    this.listHeight = []
  },
  methods: {
    // 当手指触摸屏幕的时候触发
    onShortcutTouchStart (e) {
      // 获取点击元素的data-index 中的值
      let anchorIndex = getData(e.target, 'index')
      // 点击的触点对象
      let firstTouch = e.touches[0]
      // 记录初始的Y值位置
      this.touch.y1 = firstTouch.pageY
      // 记录触点位置的元素的index
      this.touch.anchorIndex = anchorIndex
      // 移动到指定的位置
      this._scrollTo(anchorIndex)
    },
    // 滚动时触发的事件
    onShortcutTouchMove (e) {
      // 获取移动到的位置
      let moveTouch = e.touches[0]
      // 获取移动到的Y轴值
      this.touch.y2 = moveTouch.pageY
      // 获取移动后的位置与移动前的位置相隔了几个字母
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      // 获取当前元素的index值
      let anchorIndex = delta + this.touch.anchorIndex
      // 移动到当前元素指定的位置
      this._scrollTo(anchorIndex)
    },
    _scrollTo (index) {
      if (!index && index !== 0) {
        return
      }
      // 设置边界值
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      // 设置ScrollY的位置
      this.scrollY = -this.listHeight[index]
      // 调用Scroll中的方法
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    // 计算右侧每个li距离顶部的高度
    _calculateHeight () {
      // 设置listHeight为空数组
      this.listHeight = []
      // 获取listGroup的dom元素
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      // 获取所有的li元素
      for (let i = 0; i < list.length; i++) {
        // 获取每个li元素
        let item = list[i]
        // 获取每个li的高度
        height += item.clientHeight
        // 每个的高度记录下来，放入到listHeight数组中
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    // 监听data的变化
    data () {
      setTimeout(() => {
        // 若发生变化则执行下面的方法
        this._calculateHeight()
      }, 20)
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      border:1px solid red
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
