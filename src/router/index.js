import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Manage from '@/views/Manage.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/manage',
    component: Manage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // able history mode in the browser
  routes,
  linkExactActiveClass: 'text-yellow-500' // link attivo color giallo
});

export default router;
