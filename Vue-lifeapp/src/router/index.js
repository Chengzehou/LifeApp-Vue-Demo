import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const routes = [
  {//主页面
    path: '/',
    component: () => import("@/views/Main.vue"), //懒加载
    redirect: "/home",    //重定向到home页面
    children: [//子路由
      {
        path: "home",
        name: "home",
        component:()=>import("@/views/Home.vue")
      },
      {
        path: "classify",
        name: "classify",
        component:()=>import("@/views/Classify.vue")
      },
      {
        path: "shopcar",
        name: "shopcar",
        component:()=>import("@/views/Shopcar.vue")
      },
      {
        path: "mine",
        name: "mine",
        component:()=>import("@/views/Mine.vue")
      }
    ]
  },
  {//搜索页面路由
    path:'/search',
    name:'search',
    component:()=>import("@/views/Search.vue")
  },
  {//登录注册页面路由
    path:'/login',
    name:'login',
    component:()=>import("@/views/Login.vue")
  },
  {
    path:'/city',
    name:'city',
    component:()=>import("@/views/City.vue")
  },
  {
    path:'/moregoods',
    name:'moregoods',
    component:()=>import("@/views/Moregoods.vue")
  },
  {
    path:'/goodsinfor',
    name:'goodsinfor',
    component:()=>import("@/views/Goodsinfor.vue")
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
