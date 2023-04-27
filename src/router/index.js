import Vue from 'vue'
import VueRouter from 'vue-router'
import Connection from '../views/Connection.vue'
import Home from '../views/Home.vue'
import DiscussionCanals from "../components/DiscussionCanals.vue"
import PrivateChat from "../components/PrivateChat.vue"

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Connection',
      component: Connection
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
    },
    {
      path: '/discussionCanals',
      name: 'DiscussionCanals',
      component: DiscussionCanals
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
    },
    {
      path: '/privateChat',
      name: 'PrivateChat',
      component: PrivateChat
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
    },
  ]
})