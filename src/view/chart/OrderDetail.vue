<template>
    <Popup height="100%" position="bottom" v-model="isPopupShow">
        <div class="view-order-detail flex-cloumn">
            <!-- <div v-if="!isCustomerDataGet" style="margin-top:280px;left:50%;margin-left:-20px;position:absolute"><spinner slot="value" type="lines" size="40px"/></div> -->
            <div class="flex-1" style="height:100%;overflow:auto;">
                <div class="cnt-title text-l" v-for="item in ordersList">
                    <div class="flex-row text-des"><div class="flex-1">订单编号：</div><div class="flex-3">{{item.socode}}</div></div>
                    <div class="flex-row text-des"><div class="flex-1">订单日期：</div><div class="flex-3">{{item.billdate?item.billdate.split(' ')[0]:''}}</div></div>
                    <div class="flex-row text-des"><div class="flex-1">客户名称：</div><div class="flex-3">{{item.custname}}</div></div>
                </div>
                <div class="cnt-item text-l" v-for="item in orderdetailsList">
                    <div class="flex-row text-des"><div class="flex-1">规格：</div><div class="flex-3">{{item.specification}}</div></div>
                    <div class="flex-row text-des"><div class="flex-1">批号：</div><div class="flex-3">{{item.batchnumber}}</div></div>
                    <div class="flex-row text-des"><div class="flex-1">产地：</div><div class="flex-3">{{item.originname}}</div></div>
                    <div class="flex-row text-des"><div class="flex-1">等级：</div><div class="flex-3">{{gradeMap[item.grade]}}</div></div>
                    <div class="flex-row text-des"><div class="flex-1">订单量：</div><div class="flex-3">{{item.amount}}</div></div>
                    <div class="flex-row text-des"><div class="flex-1">销售单价：</div><div class="flex-3">{{item.unitprice}}</div></div>
                    <div class="flex-row text-des"><div class="flex-1">销售金额：</div><div class="flex-3">{{item.saleprice}}</div></div>
                </div>
            </div>
            <div class="btn-close" @click="onClose">关&nbsp;&nbsp;闭</div>
        </div>
    </Popup>
</template>

<script>
import RightFilterOrder from '../../components/Chart/RightFilterOrder';
import { mapActions } from 'vuex';
import { Spinner, Flexbox, FlexboxItem, Popup } from 'vux';
import { getQueryString } from '../../utils/commonMethod.js';
import { URL_ORDERS_DETAILS } from '../../constant/url';
import http from '../../http';

export default {
    name: 'viewOrderList',
    components: {
        RightFilterOrder,
        Popup,
        Spinner,
        Flexbox,
        FlexboxItem
    },
    props: [
        'isPopupShow',
        'salesOrderIds'
    ],
    data () {
        return {
            // salesOrderIds: getQueryString('salesOrderIds') || '',
            orderdetailsList: [],
            ordersList: [],
            otherinfo: {},
            gradeMap: {},
            plantime: '',
            isCustomerDataGet: false
        }
    },
    updated () {
        // this.getAchievementData();
    },
    watch: {
        salesOrderIds () {
            this.getAchievementData();
        }
    },
    methods: {
        ...mapActions([
        ]),
        jump (path) {
            this.$router.push({path: path});
        },
        getAchievementData () {
            this.isCustomerDataGet = false;
            http.post(URL_ORDERS_DETAILS, {
                body: `salesOrderIds=${this.salesOrderIds}`
            })
            .then((res) => {
                console.log(res)
                this.isCustomerDataGet = true;
                this.orderdetailsList = res.orderdetailsList;
                this.ordersList = res.ordersList;
                res.gradeList.map((item) => {
                    this.gradeMap[item.childcode] = item.childname;
                })
            })
        },
        onClose () {
            this.$emit('onClose');
        }
    }
}
</script>
<style lang="scss">
    .vux-datetime-confirm {
        color: #26a2ff!important;
    }
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.view-order-detail {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    // padding-top: pxToRem(20px);
    box-sizing: border-box;
    .text-date {
        background: #26a2ff;
        padding-left:pxToRem(20px);
        box-sizing:border-box;
        font-weight: bolder;
        height: pxToRem(50px);
        line-height:pxToRem(50px);
        color: #fff;
    }
    .cnt-title {
        padding: pxToRem(10px) pxToRem(20px);
        background: $hd-blue;
        color: #fff;
    }
    .cnt-item {
        padding: pxToRem(10px) pxToRem(20px);
        background: #fff;
        border-bottom: solid 1px #d0d0d0;
        .text-des {
            font-size: 12px;
            color: #BEBEBE;
            line-height: pxToRem(20px);
        }
    }
    .btn-close {
        height: pxToRem(50px);
        line-height: pxToRem(50px);
        background: $blue;
        color: #fff;
    }
}
</style>
