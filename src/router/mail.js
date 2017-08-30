import Mail from '../view/mail/Mail.vue';
import Group from '../view/mail/Group.vue';
import Personal from '../view/mail/Personal.vue';

export default [
    {
        path: '/mail',
        name: 'Mail',
        component: Mail
    },
    {
        path: '/mail/group',
        name: 'Group',
        component: Group
    },
    {
        path: '/mail/personal',
        name: 'Personal',
        component: Personal
    }
]
