<template>
    <div class="view-receipt-count flex-cloumn">
        <div v-if="!isCustomerDataGet" style="margin-top:280px;left:50%;margin-left:-20px;position:absolute"><spinner slot="value" type="lines" size="40px"/></div>
        <flexbox style="border-bottom:1px solid #E0E0E0;">
            <flexbox-item :span="1/2" class="text-date">
                <div @click="openPicker" class="text-c" >
                    {{otherinfo.plantime}}
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
            <div v-for="item in dateList" class="cnt-item" @click="jump(`/chart/orderlist?plantime=${item.yearmonthen}`)">
                <div style="margin-bottom:5px;">{{item.monthcn}}</div>
                <div class="flex-row text-des"><div class="flex-1">发货量：</div><div class="flex-3">{{item.deliveryamount}}{{otherinfo.unit}}</div></div>
                <div class="flex-row text-des"><div class="flex-1">开票量：</div><div class="flex-3">{{item.invoiceamount||item.invoiceAmount}}{{otherinfo.unit}}</div></div>
                <div class="flex-row text-des"><div class="flex-1">收款金额：</div><div class="flex-3">{{item.receiptmoney}}</div></div>
            </div>
        </div>
        <RightFilterReceipt :departmentList="departmentList"
                         :isFilterShow="isFilterShow"
                         :customerList="customerList"
                         :salesmanList="salesmanList"
                         @onConfirm="onConfirm"
                         @onHide="onHide"
                         ref="filter"/>


         <div v-if="isCustomerDataGet&&dateList.length===0" style="position:absolute;margin-top:160px;left:50%;margin-left:-60px;color:#BEBEBE;text-align:center">
             <i class="iconfont icon-zanwushuju" style="font-size:120px"/>
             <div class="fs-22">暂无数据</div>
         </div>
    </div>
</template>

<script>
import RightFilterReceipt from '../../components/Chart/RightFilterReceipt';
import { mapActions } from 'vuex';
import { Spinner, Flexbox, FlexboxItem } from 'vux';
import { URL_RECEIPT_COUNT } from '../../constant/url';
import http from '../../http';

export default {
    name: 'viewReceiptCount',
    components: {
        RightFilterReceipt,
        Spinner,
        Flexbox,
        FlexboxItem
    },
    data () {
        return {
            customerList: [],
            otherinfo: {},
            plantime: '',
            isCustomerDataGet: false,
            isFilterShow: false,
            departmentList: [],
            productList: [],
            salesmanList: [],
            customerList: [],
            gradeList: [],
            deptcode: '',
            deptids: '',
            username: '',
            userids: '',
            custids: '',
            custcode: ''
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
            http.post(URL_RECEIPT_COUNT, {
                body: `plantime=${this.plantime}&deptcode=${this.deptcode}&deptids=${this.deptids}&username=${this.username}&userids=${this.userids}&` +
                      `custids=${this.custids}&custcode=${this.custcode}`
            })
            .then((res) => {
                console.log(res)
                this.isCustomerDataGet = true;
                this.dateList = res.dateList;
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
                format: 'YYYY',                  // 供选择的时间格式
                value: me.otherinfo.plantime,       // 初始时间
                onConfirm (val) {
                    me.plantime = val;
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
            this.custcode = data.custcode;
            this.getAchievementData();
            this.onHide();
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
.view-receipt-count {
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
