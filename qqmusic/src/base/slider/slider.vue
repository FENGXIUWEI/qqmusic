<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active:currentIndex === index}" v-for="(item, index) in dots" :key="item"></span>
    </div>
  </div>
</template>

<script>
import {addClass} from 'common/js/dom'
import BScroll from 'better-scroll'
export default {
  name: 'slider',
  data () {
    return {
      // 初始选中的坐标
      currentIndex: 0,
      // 小圆点设置
      dots: []
    }
  },
  props: {
    // 循环效果
    loop: {
      type: Boolean,
      default: true
    },
    // 自动播放
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 播放间隔时间
    interval: {
      type: Number,
      default: 4000
    }
  },
  // 模板渲染成html时进行调用
  mounted () {
    setTimeout(() => {
      // 设置宽度
      this._setWidth()
      // 初始化小圆点
      this._initDots()
      // 初始化 BScroll组件
      this._initBscroll()
      // 如果是自动轮播的时候，需要执行_play方法
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    // 窗口改变时执行的事件
    window.addEventListener('resize', () => {
      // 如果图片切换效果还未加载，直接返回
      if (!this.scroll) {
        return
      }
      // 重新初始化宽度
      this._setWidth(true)
      // 执行刷新事件
      this.scroll.refresh()
    })
  },
  destroyed () {
    // 页面销毁时clearTimeOut
    clearTimeout(this.timer)
  },
  methods: {
    _setWidth (isResize) {
      // 获取sliderGroup下子元素
      this.children = this.$refs.sliderGroup.children
      let width = 0
      // 获取容器的宽度
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        // 获取每个子元素
        let child = this.children[i]
        child.style.width = sliderWidth + 'px'
        // 给dom对象添加class
        addClass(child, 'slider-item')
        width += sliderWidth
      }
      // 首次进入的时候需要多设置2个空余的位置
      if (this.loop && !isResize) {
        width += sliderWidth * 2
      }
      // 给sliderGroup 设置宽度
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots () {
      // 创建一个含有 this.children.length 个空值的数组
      this.dots = new Array(this.children.length)
    },
    _initBscroll () {
      // 实例化BScroll
      this.scroll = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        // 关闭或者打开惯性运动的执行
        snap: {
          loop: this.loop,
          // 循环
          threshold: 0.3,
          speed: 400
          // 轮播间隔
        }
      })
      // 滚动结束的事件
      this.scroll.on('scrollEnd', () => {
        // 获取当前的位置
        this.currentIndex = this.scroll.getCurrentPage().pageX
        // 如果是自动轮播的时候，需要执行_play方法
        if (this.autoPlay) {
          this._play()
        }
      })
      // 滚动开始的事件
      this.scroll.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    // 图片播放的设置
    _play () {
      let pageIndex = this.currentIndex + 1
      this.timer = setTimeout(() => {
        // 切换到那一页
        this.scroll.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  }
}

</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
.slider
  min-height: 1px
  .slider-group
    position: relative
    overflow:hidden
    white-space:nowrap
    .slider-item
      float:left
      box-sizing: border-box
      overflow:hidden
      width:100%
      a
       display:block
       overflow:hidden
       width:100%
       text-decoration:none
      img
       display:block
       width:100%
  .dots
    position:absolute
    text-align:center
    font-size:0
    left:0px
    right:0px
    bottom:12px
    .dot
      display:inline-block
      width:8px
      margin:0 4px
      height:8px
      border-radius:50%
      background:$color-text-l
      &.active
       width:20px
       border-radius:5px
       background:$color-text-l1
</style>
