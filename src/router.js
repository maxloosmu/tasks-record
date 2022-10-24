import { createRouter, createWebHistory } from 'vue-router';

import UserRegister from './pages/UserRegister.vue';
import WorkOverview from './pages/WorkOverview.vue';
import UserLogin from './pages/UserLogin.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/register' },
    {
      path: '/register',
      component: UserRegister,
    },
    {
      path: '/work',
      component: WorkOverview,
    },
    {
      path: '/login',
      component: UserLogin,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
});

export default router;
