import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue'),
    children:[
      {
        path: '/',
        name: 'home',
        component: () => import('../views/home/home.vue'),
      },
      {
        path: '/articleList',
        name: 'articleList',
        component: () => import('../views/article/articleList.vue'),
      },
      {
        path: '/edit',
        name: 'edit',
        component: () => import('../views/article/edit.vue'),
      },
      {
        path: '/articleDetail/:id',
        name: 'articleDetail',
        component: () => import('../views/article/articleDetail.vue'),
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user/user.vue'),
      },
      {
        path: '/statistics',
        name: 'statistics',
        component: () => import('../views/statistics/statistics.vue'),
      },
      {
        path: '/game',
        name: 'game',
        component: () => import('../views/game/game.vue'),
      },
      {
        path: '/aboutMe',
        name: 'aboutMe',
        component: () => import('../views/aboutMe/aboutMe.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login/register.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  let box = document.getElementById('mainContent')
  if(box){
    box.scrollTo(0,0);
  }
  next()
})

export default router
