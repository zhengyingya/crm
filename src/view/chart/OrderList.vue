<template>
    <div class="view-order-list flex-cloumn">
        <div v-if="!isCustomerDataGet" style="margin-top:280px;left:50%;margin-left:-20px;position:absolute"><spinner slot="value" type="lines" size="40px"/></div>
        <flexbox style="border-bottom:1px solid #E0E0E0;">
            <flexbox-item :span="1/2" class="text-date">
                <div @click="openPicker" class="text-c" >
                    {{otherinfo.yearmonthcn}}
                    <i class="iconfont icon-xiangxiazhankai"/>
                </div>
            </flexbox-item>
            <flexbox-item :span="1/2" class="text-c" style="background:#fff;height:50px;line-height:50px;margin-left:0;">
                <div @click="isFilterShow=true;">
                    <i class="iconfont icon-shaixuanguolv fs-20" style="color:#26a2ff"/>
                </div>
            </flexbox-item>
        </flexbox>
        <div v-if="isCustomerDataGet" class="flex-1 text-l" style="100%;overflow:auto">
            <div v-for="item in ordersList" class="cnt-item flex-row" @click="salesOrderIds=item.ids;isPopupShow=true;/*jump(`/chart/orderdetail?salesOrderIds=${item.ids}`)*/">
                <div class="flex-1">
                    <div style="margin-bottom:5px;">日期：{{item.billdate}} &nbsp;&nbsp;订单编号：{{item.socode}}</div>
                    <div class="flex-row text-des"><div class="flex-1">客户名称：</div><div class="flex-3">{{item.custname}}</div></div>
                    <div class="flex-row text-des"><div class="flex-1">订单量：</div><div class="flex-3">{{item.amount}}{{otherinfo.unit}}</div></div>
                </div>
                <div class="flex-row" style="width:20px;align-items:center;justify-content:flex-end"><i class="iconfont icon-xiayiyeqianjinchakangengduo"/></div>
            </div>
        </div>
        <RightFilterOrder :departmentList="departmentList"
                         :isFilterShow="isFilterShow"
                         :customerList="customerList"
                         :salesmanList="salesmanList"
                         @onConfirm="onConfirm"
                         @onHide="onHide"
                         ref="filter"/>

        <OrderDetail :isPopupShow="isPopupShow" :salesOrderIds="salesOrderIds" @onClose="onClose"/>
         <div v-if="isCustomerDataGet&&ordersList.length===0" style="position:absolute;margin-top:160px;left:50%;margin-left:-60px;color:#BEBEBE;text-align:center">
             <i class="iconfont icon-zanwushuju" style="font-size:120px"/>
             <div class="fs-22">暂无数据</div>
         </div>
    </div>
</template>

<script>
import RightFilterOrder from '../../components/Chart/RightFilterOrder';
import OrderDetail from './OrderDetail.vue';
import { mapActions } from 'vuex';
import { Spinner, Flexbox, FlexboxItem } from 'vux';
import { URL_ORDERS_LIST } from '../../constant/url';
import { getQueryString } from '../../utils/commonMethod.js';
import http from '../../http';

export default {
    name: 'viewOrderList',
    components: {
        RightFilterOrder,
        OrderDetail,
        Spinner,
        Flexbox,
        FlexboxItem
    },
    data () {
        return {
            customerList: [],
            otherinfo: {},
            plantime: getQueryString('plantime') || '',
            isCustomerDataGet: false,
            isFilterShow: false,
            departmentList: [],
            productList: [],
            salesmanList: [],
            customerList: [],
            gradeList: [],
            ordersList: [],
            deptcode: '',
            deptids: '',
            username: '',
            userids: '',
            custids: '',
            custname: '',
            socode: '',

            isPopupShow: false,
            salesOrderIds: ''
        }
    },
    created () {
        this.getAchievementData();
    },
    methods: {
        ...mapActions([
        ]),
        jump (path) {
            this.$router.push({path: path});
        },
        getAchievementData () {
            this.isCustomerDataGet = false;
            http.post(URL_ORDERS_LIST, {
                body: `plantime=${this.plantime}&deptcode=${this.deptcode}&deptids=${this.deptids}&username=${this.username}&userids=${this.userids}&` +
                      `custids=${this.custids}&custname=${this.custname}&socode=${this.socode}`
            })
            .then((res) => {
                console.log(res)
                this.isCustomerDataGet = true;
                this.ordersList = res.ordersList;
                this.customerList = res.customerList;
                this.salesmanList = res.salesmanList;
                this.otherinfo = res.otherinfo;
                this.plantime = res.otherinfo.plantime;
                this.departmentList = res.departmentList;
            })
        },
        // 打开时间选择器
        openPicker () {
            const me = this;
            console.log(me.plantime)
            this.$vux.datetime.show({
                cancelText: '取消',
                confirmText: '确定',
                format: 'YYYY-MM',                  // 供选择的时间格式
                value: me.otherinfo.yearmonthcn.replace('年', '-').replace('月', ''),       // 初始时间
                onConfirm (val) {
                    me.plantime = val.replace('-', '');
                    me.$refs.filter.init();
                    me.getAchievementData();
                },
                onShow () {
                },
                onHide () {
                }
            })
        },
        onHide () {
            this.isFilterShow = false;
        },
        onConfirm (data) {
            this.userids = data.userids;
            this.username = data.username;
            this.deptids = data.deptids;
            this.deptcode = data.deptcode
            this.custids = data.custids;
            this.custname = data.custname;
            this.socode = data.socode;
            this.getAchievementData();
            this.onHide();
        },
        onClose () {
            this.isPopupShow = false;
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
.view-order-list {
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
    .cnt-item {
        padding: pxToRem(10px) pxToRem(20px);
        background: #fff;
        border-bottom: solid 1px #d0d0d0;
        .text-des {
            font-size: 12px;
            color: #BEBEBE;
        }
    }
}
</style>
