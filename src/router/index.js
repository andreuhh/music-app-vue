import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // able history mode in the browser
  routes,
});

export default router;
