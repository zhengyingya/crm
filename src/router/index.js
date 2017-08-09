import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '../view/Home.vue'
import Customer from '../view/Customer.vue'
import CustomerList from '../view/CustomerList.vue'
import CustomerAdd from '../view/CustomerAdd.vue'
import CustomerDetail from '../view/CustomerDetail.vue'
import AddAssistant from '../view/AddAssistant.vue'

Vue.use(Router)

export default new Router({
  routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/customer',
            name: 'Customer',
            component: Customer
        },
        {
            path: '/customer/list',
            name: 'CustomerList',
            component: CustomerList
        },
        {
            path: '/customer/add',
            name: 'CustomerAdd',
            component: CustomerAdd
        },
        {
            path: '/customer/detail',
            name: 'CustomerDetail',
            component: CustomerDetail
        },
        {
            path: '/customer/addassistant',
            name: 'AddAssistant',
            component: AddAssistant
        }
    ]
})
