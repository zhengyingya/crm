<template>
    <div class="view-monthly-cust flex-cloumn">
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
            <div v-for="item in customerList" class="cnt-item"  @click="jump(`/customer/detail?custIds=${item.ids}`)">
                <div style="margin-bottom:5px;">{{item.custname}}</div>
                <div class="flex-row text-des"><div class="flex-1">计划发货量：</div><div class="flex-3">{{item.planamount}}{{otherinfo.unit}}</div></div>
                <div class="flex-row text-des"><div class="flex-1">实际发货量：</div><div class="flex-3">{{item.deliveryamount}}{{otherinfo.unit}}</div></div>
                <div class="flex-row text-des"><div class="flex-1">完成进度：</div><div class="flex-3">{{item.progress}}%</div></div>
            </div>
        </div>
        <RightFilterCust :departmentList="departmentList"
                         :isFilterShow="isFilterShow"
                         :productList="productList"
                         :salesmanList="salesmanList"
                         @onConfirm="onConfirm"
                         @onHide="onHide"
                         ref="filter"/>
    </div>
</template>

<script>
import RightFilterCust from '../../components/Chart/RightFilterCust';
import { mapActions } from 'vuex';
import { Spinner, Flexbox, FlexboxItem } from 'vux';
import { URL_REPORT_ACHIEVE_CUST } from '../../constant/url';
import { getQueryString } from '../../utils/commonMethod.js';
import http from '../../http';

export default {
    name: 'monthlyPlanCust',
    components: {
        RightFilterCust,
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
            deptcode: '',
            username: '',
            batchnumber: getQueryString('batchnumber') || '',
            creditno: getQueryString('creditno') || '',
            custcode: getQueryString('custcode') || ''
        }
    },
    mounted () {
        this.getAchievementData();
        if (this.batchnumber) {
            this.$refs.filter.setFilter({
                filterType: 'filterBatchnumber',
                filterValue: this.batchnumber
            });
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
            http.post(URL_REPORT_ACHIEVE_CUST, {
                body: `plantime=${this.plantime}&deptcode=${this.deptcode}&username=${this.username}&` +
                      `batchnumber=${this.batchnumber}&creditno=${this.creditno}&custcode=${this.custcode}`
            })
            .then((res) => {
                this.isCustomerDataGet = true;
                this.customerList = res.customerList;
                this.salesmanList = res.salesmanList;
                this.otherinfo = res.otherinfo;
                this.plantime = res.otherinfo.yearmonthen;
                this.departmentList = res.departmentList;
                this.customerList = res.customerList;
                this.productList = res.productList;
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
            this.deptcode = data.deptcode;
            this.username = data.username;
            this.batchnumber = data.batchnumber;
            this.creditno = data.creditno;
            this.custcode = data.custcode;
            this.getAchievementData();
            this.onHide();
        }
    }
}
</script>
<style lang="scss">
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.view-monthly-cust {
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
