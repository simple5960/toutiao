import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
//路由表
const routes = [
  {
    //一级路由
    path:'/login',
    name:'login',
    component:()=>import('@/views/login/index')
  },
  {
    path:'/',//一级路由
    component:()=>import('@/views/layout/index'),
    children:[
      {//一级路由下的子路由
        path:'',//首页是默认子路由，所以为空
        name:'home',
        component:()=>import('@/views/home/index')
      },
      {
        path:'/question',
        name:'question',
        component:()=>import('@/views/question/index')
      },
      {
        path:'/video',
        name:'video',
        component:()=>import('@/views/video/index')
      },
      {
        path:'/my',
        name:'my',
        component:()=>import('@/views/my/')
      }
    ]
  },
  {
    path:'/search',
    name:'search',
    component:()=>import('@/views/search')
  }
]

const router = new VueRouter({
  routes
})

export default router
