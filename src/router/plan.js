import Plan from '../view/plan/Plan.vue';
import PlanCreate from '../view/PlanCreate.vue';
import PlanCustomer from '../view/plan/PlanCustomer.vue';
import DeliverPlan from '../view/plan/DeliverPlan.vue';
import DeliverPlanCust from '../view/plan/DeliverPlanCust.vue';
import CollectionPlanCreate from '../view/plan/CollectionPlanCreate.vue';
import DeliverPlanDeptment from '../view/plan/DeliverPlanDeptment.vue';
import CollectionDeptment from '../view/plan/CollectionDeptment.vue';

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
        path: '/plan/custdeliver',
        name: 'DeliverPlanCust',
        component: DeliverPlanCust
    },
    {
        path: '/plan/deptdeliver',
        name: 'DeliverPlanDeptment',
        component: DeliverPlanDeptment
    },
    {
        path: '/plan/collectioncreate',
        name: 'CollectionPlanCreate',
        component: CollectionPlanCreate
    },
    {
        path: '/plan/collection',
        name: 'CollectionPlanCreate',
        component: CollectionPlanCreate
    },
    {
        path: '/plan/custcollection',
        name: 'CollectionPlanCreate',
        component: CollectionPlanCreate
    },
    {
        path: '/plan/deptcollection',
        name: 'CollectionDeptment',
        component: CollectionDeptment
    }
]
