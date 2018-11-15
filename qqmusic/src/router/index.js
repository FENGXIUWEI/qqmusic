import Vue from 'vue'
import Router from 'vue-router'
import Tab from '@/components/tab/tab'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/tab',
      component: Tab

    }
  ]
})
