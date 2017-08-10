import Customer from '../view/Customer.vue'
import CustomerList from '../view/CustomerList.vue'
import CustomerAdd from '../view/CustomerAdd.vue'
import CustomerDetail from '../view/CustomerDetail.vue'
import AddAssistant from '../view/AddAssistant.vue'
import ContactList from '../view/ContactList.vue'
import AddContact from '../view/AddContact.vue'
import CustCredit from '../view/CustCredit.vue'
import SalesTrends from '../view/SalesTrends.vue'

export default [
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
    },
    {
        path: '/customer/contactlist',
        name: 'ContactList',
        component: ContactList
    },
    {
        path: '/customer/addcontact',
        name: 'AddContact',
        component: AddContact
    },
    {
        path: '/customer/custcredit',
        name: 'CustCredit',
        component: CustCredit
    },
    {
        path: '/customer/salestrends',                  // 经营动态
        name: 'SalesTrends',
        component: SalesTrends
    }
]
