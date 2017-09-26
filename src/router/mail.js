import Mail from '../view/mail/Mail.vue';
import Group from '../view/mail/Group.vue';
import Personal from '../view/mail/Personal.vue';
import Contact from '../view/mail/Contact.vue';
import ContactPage from '../view/mail/ContactPage.vue';

export default [
    {
        path: '/mail',
        name: 'Mail',
        component: Mail
    },
    {
        path: '/mail/group',                // 集团人员列表
        name: 'Group',
        component: Group
    },
    {
        path: '/mail/personal',             // 销售人员主页
        name: 'Personal',
        component: Personal
    },
    {
        path: '/mail/contact',              // 联系人列表
        name: 'Contact',
        component: Contact
    },
    {
        path: '/mail/contactpage',          // 联系人主页
        name: 'ContactPage',
        component: ContactPage
    }
]
