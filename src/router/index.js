import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Manage from '@/views/Manage.vue';

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
    //alias: '/manage',
    path: '/manage-music',
    component: Manage,
    beforeEnter: (to, from, next) => {
      console.log('Manage Route Guard');
      next();
    },
  },
  {
    path: '/manage',
    redirect: {name: 'manage'},
  },
  {
    path: '/:catchAll(.*)*', // gestione errore
    redirect: {name: 'home'}
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // able history mode in the browser
  routes,
  linkExactActiveClass: 'text-yellow-500' // link attivo color giallo
});

// GUARDS
 router.beforeEach((to, from, next) => {
  next();
 });

export default router;
