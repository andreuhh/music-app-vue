import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
// import Home from '@/views/Home.vue';
// import About from '@/views/About.vue';
// import Manage from '@/views/Manage.vue';
// import Song from '@/views/Song.vue';

// dynamic route imports 
const Home = () => import('@/views/Home.vue');
const Manage = () => import('@/views/Manage.vue');
const Song = () => import('@/views/Song.vue');
const About = () => import('@/views/About.vue')

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'about',
    path: '/about',
    component: About,
  },
  {
    name: 'manage',
    // alias: '/manage',
    path: '/manage-music',
    meta: {
      requiresAuth: true,
    },
    component: Manage,
    beforeEnter: (to, from, next) => {
      next();
    },
  },
  {
    path: '/manage',
    redirect: { name: 'manage' },
  },
  {
    name: 'song',
    path: '/song/:id',
    component: Song,
  },
  {
    path: '/:catchAll(.*)*', // gestione errore
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // able history mode in the browser
  routes,
  linkExactActiveClass: 'text-yellow-500', // link attivo color giallo
});

// GUARDS
router.beforeEach((to, from, next) => {
  // console.log(to.matched);

  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }

  if (store.state.auth.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
});

export default router;
