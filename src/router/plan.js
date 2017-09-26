import Plan from '../view/plan/Plan.vue';
import PlanCreate from '../view/PlanCreate.vue';
import PlanCustomer from '../view/plan/PlanCustomer.vue';
import DeliverPlan from '../view/plan/DeliverPlan.vue';
import DeliverPlanCust from '../view/plan/DeliverPlanCust.vue';
import CollectionPlanCreate from '../view/plan/CollectionPlanCreate.vue';
import DeliverPlanDeptment from '../view/plan/DeliverPlanDeptment.vue';
import Collection from '../view/plan/Collection.vue';
import CollectionDeptment from '../view/plan/CollectionDeptment.vue';
import CollectionCust from '../view/plan/CollectionCust.vue';

export default [
    {
        path: '/plan',
        name: 'Plan',
        component: Plan
    },
    {
        path: '/plan/create',               // 计划创建
        name: 'PlanCreate',
        component: PlanCreate
    },
    {
        path: '/plan/customer',             // 客户列表
        name: 'PlanCustomer',
        component: PlanCustomer
    },
    {
        path: '/plan/deliver',              // 销售人员发货计划
        name: 'DeliverPlan',
        component: DeliverPlan
    },
    {
        path: '/plan/custdeliver',          // 客户发货计划
        name: 'DeliverPlanCust',
        component: DeliverPlanCust
    },
    {
        path: '/plan/deptdeliver',          // 部门发货计划
        name: 'DeliverPlanDeptment',
        component: DeliverPlanDeptment
    },
    {
        path: '/plan/collectioncreate',     // 收款计划创建
        name: 'CollectionPlanCreate',
        component: CollectionPlanCreate
    },
    {
        path: '/plan/collection',           // 销售人员收款计划
        name: 'Collection',
        component: Collection
    },
    {
        path: '/plan/custcollection',       // 客户收款计划
        name: 'CollectionCust',
        component: CollectionCust
    },
    {
        path: '/plan/deptcollection',       // 部门收款计划
        name: 'CollectionDeptment',
        component: CollectionDeptment
    }
]
