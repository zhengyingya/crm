import Plan from '../view/plan/Plan.vue';
import PlanCreate from '../view/PlanCreate.vue';
import PlanCustomer from '../view/plan/PlanCustomer.vue';
import DeliverPlan from '../view/plan/DeliverPlan.vue';
import CollectionPlanCreate from '../view/plan/CollectionPlanCreate.vue';

export default [
    {
        path: '/plan',
        name: 'Plan',
        component: Plan
    },
    {
        path: '/plan/create',
        name: 'PlanCreate',
        component: PlanCreate
    },
    {
        path: '/plan/customer',
        name: 'PlanCustomer',
        component: PlanCustomer
    },
    {
        path: '/plan/deliver',
        name: 'DeliverPlan',
        component: DeliverPlan
    },
    {
        path: '/plan/collectioncreate',
        name: 'CollectionPlanCreate',
        component: CollectionPlanCreate
    }
]
