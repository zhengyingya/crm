import Mail from '../view/mail/Mail.vue';
import Group from '../view/mail/Group.vue';

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
    }
]
