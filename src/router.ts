import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import WhatWillIEat from './views/WhatWillIEat/index.vue';
import GenerateSVG from './views/GenerateSVG/index.vue';
import Blogs from './views/Blogs/index.vue';
import BlogsDetail from './views/Blogs/$id.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/what-will-i-eat/index',
      name: 'what-will-i-eat',
      component: WhatWillIEat
    },
    {
      path: '/generate-svg/index',
      name: 'generate-svg',
      component: GenerateSVG
    },
    {
      path: '/blogs/:id',
      name: 'blogs',
      component: Blogs,
      children: [{ path: '', component: BlogsDetail }]
    }
  ]
});
