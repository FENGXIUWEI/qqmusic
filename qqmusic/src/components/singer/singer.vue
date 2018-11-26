<template>
   <div class="singer" ref="singer">
     <list-view :data="singerList"></list-view>
     <router-view></router-view>
   </div>
</template>

<script>
import ListView from 'base/listview/listview'
import {getSingerList} from 'api/singer.js'
import {ERR_OK} from 'api/config.js'
const HOST_TITLE = '热门'
const HOST_NUM = 10
export default {
  name: 'singer',
  data () {
    return {
      singerList: []
    }
  },
  components: {
    ListView
  },
  mounted () {
    this.timer = setTimeout(() => {
      this._initSingerList()
    }, 20)
  },
  methods: {
    _initSingerList () {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singerList = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger (list) {
      // 定义一个对象来存储改造后的数据
      let map = {
        // 定义热门数据
        hot: {
          title: HOST_TITLE,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOST_NUM) {
          // 将前几条数据放入到热门数据中
          map.hot.items.push({
            name: item.Fsinger_name,
            id: item.Fsinger_mid,
            avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + item.Fsinger_mid + '.jpg?max_age=2592000'
          })
        }
        // 其他数据的设置
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push({
          name: item.Fsinger_name,
          id: item.Fsinger_mid,
          avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + item.Fsinger_mid + '.jpg?max_age=2592000'
        })
      })
      // 为了得到有序列表，我们需要继续处理map
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOST_TITLE) {
          hot.push(val)
        }
      }
      // 让ret进行升序排列
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      // 返回处理好的数据
      return hot.concat(ret)
    }
  }
}
</script>

<style lang="stylus" scoped>
.singer
 position: fixed
 width: 100%
 top: 88px
 bottom: 0
</style>
