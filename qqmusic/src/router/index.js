import Vue from 'vue'
import Router from 'vue-router'
import Tab from 'components/tab/tab'
import Singer from 'components/singer/singer'
import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/tab',
      component: Tab
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
