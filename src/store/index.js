import Vue from 'vue'
import Vuex from 'vuex'
import achievement from './module/achievement.js';
import customer from './module/customer.js';
import customerFilter from './module/customerFilter.js';
import mail from './module/mail.js';
import contactPage from './module/contactPage.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        achievement,
        customer,
        customerFilter,
        mail,
        contactPage
    }
})
