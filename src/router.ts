import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import WhatWillIEat from './views/WhatWillIEat/index.vue';
import GenerateSVG from './views/GenerateSVG/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/what-will-i-eat/index',
      name: 'what-will-i-eat',
      component: WhatWillIEat,
    },
    {
      path: '/generate-svg/index',
      name: 'generate-svg',
      component: GenerateSVG,
    },
  ],
});
