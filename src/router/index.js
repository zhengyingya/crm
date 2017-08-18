import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '../view/Home.vue'
import customer from './customer.js';
import plan from './plan.js';

Vue.use(Router)

export default new Router({
  routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        }

    ].concat(customer, plan)
})
