import Chart from '../view/chart/Chart.vue';
import MonthlyPlanCust from '../view/chart/MonthlyPlanCust.vue';
import MonthlyPlanProduct from '../view/chart/MonthlyPlanProduct.vue';
import MonthlyPlanCredit from '../view/chart/MonthlyPlanCredit.vue';
import MonthlyPlanMan from '../view/chart/MonthlyPlanMan.vue';
import MonthlyPlanDepartment from '../view/chart/MonthlyPlanDepartment.vue';
import RecordCountDepartment from '../view/chart/RecordCountDepartment.vue';
import RecordCountSalesman from '../view/chart/RecordCountSalesman.vue';
import ReceiptCount from '../view/chart/ReceiptCount.vue';
import Shipments from '../view/chart/Shipments.vue';
import OrderList from '../view/chart/OrderList.vue';
import OrderDetail from '../view/chart/OrderDetail.vue';

export default [
    {
        path: '/chart',
        name: 'Chart',
        component: Chart
    },
    {
        path: '/chart/monthlyplancust',
        name: 'MonthlyPlanCust',
        component: MonthlyPlanCust
    },
    {
        path: '/chart/monthlyplanproduct',
        name: 'MonthlyPlanProduct',
        component: MonthlyPlanProduct
    },
    {
        path: '/chart/monthlyplancredit',
        name: 'MonthlyPlanCredit',
        component: MonthlyPlanCredit
    },
    {
        path: '/chart/monthlyplanman',
        name: 'MonthlyPlanMan',
        component: MonthlyPlanMan
    },
    {
        path: '/chart/monthlyplandepartment',
        name: 'MonthlyPlanDepartment',
        component: MonthlyPlanDepartment
    },
    {
        path: '/chart/recordcountdepartment',
        name: 'RecordCountDepartment',
        component: RecordCountDepartment
    },
    {
        path: '/chart/recordcountman',
        name: 'RecordCountSalesman',
        component: RecordCountSalesman
    },
    {
        path: '/chart/receiptcount',
        name: 'ReceiptCount',
        component: ReceiptCount
    },
    {
        path: '/chart/shipment',
        name: 'Shipments',
        component: Shipments
    },
    {
        path: '/chart/orderlist',
        name: 'OrderList',
        component: OrderList
    },
    {
        path: '/chart/orderdetail',
        name: 'OrderDetail',
        component: OrderDetail
    }
]
