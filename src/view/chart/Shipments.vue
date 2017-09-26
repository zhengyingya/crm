<template>
    <div class="view-shipment flex-cloumn">
        <!-- <div v-if="!isCustomerDataGet" style="margin-top:280px;left:50%;margin-left:-20px;position:absolute"><spinner slot="value" type="lines" size="40px"/></div> -->
        <div class="header">
            <flexbox>
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
        </div>
        <div class="text-total">合计未发货量：{{totalunderliveryamount}}{{otherinfo.unit}}</div>
        <div class="flex-1" style="height:100%;overflow:auto;">
            <mt-loadmore :top-method="loadTop" ref="loadmore">
                <div
                v-infinite-scroll="loadMore"
                :infinite-scroll-disabled="loading"
                infinite-scroll-distance="30"
                class="wrap">
                    <div v-for="item in ordersList" class="cnt-item text-l">
                         <div>{{item.custname}}</div>
                         <div class="flex-row text-des"><div class="flex-1">日期：</div><div class="flex-3">{{item.billdate}}</div></div>
                         <div class="flex-row text-des"><div class="flex-1">订单编号：</div><div class="flex-3">{{item.socode}}</div></div>
                         <div class="flex-row text-des"><div class="flex-1">产品信息：</div><div class="flex-3">{{item.batchnumber}}</div></div>
                         <div class="flex-row text-des"><div class="flex-1">未发货量：</div><div class="flex-3">{{item.undeliveryamount}}{{otherinfo.unit}}</div></div>
                    </div>
                    <div v-if="loading" class="flex-row" style="justify-content:center;margin-top:10px;margin-bottom:5px;"><mt-spinner type="fading-circle" color="#26a2ff"></mt-spinner></div>
                    <div v-if="isEnd" class="flex-row" style="justify-content:center;margin-top:10px;margin-bottom:5px;">没有更多数据了</div>
                    <div v-if="isNodata" style="justify-content:center;margin-top:50px;margin-bottom:5px;color:#BEBEBE;text-align:center">
                        <i class="iconfont icon-zanwushuju" style="font-size:120px"/>
                        <div class="fs-22">暂无数据</div>
                    </div>
                </div>
            </mt-loadmore>
        </div>
        <RightFilterReceipt :departmentList="departmentList"
                         :isFilterShow="isFilterShow"
                         :customerList="customerList"
                         :salesmanList="salesmanList"
                         @onConfirm="onConfirm"
                         @onHide="onHide"
                         ref="filter"/>


         <!-- <div v-if="isCustomerDataGet&&dateList.length===0" style="position:absolute;margin-top:160px;left:50%;margin-left:-60px;color:#BEBEBE;text-align:center">
             <i class="iconfont icon-zanwushuju" style="font-size:120px"/>
             <div class="fs-22">暂无数据</div>
         </div> -->
    </div>
</template>

<script>
import RightFilterReceipt from '../../components/Chart/RightFilterReceipt';
import { mapActions } from 'vuex';
import { Spinner, Flexbox, FlexboxItem } from 'vux';
import { URL_SHIPMENTS_HEAD, URL_SHIPMENT_DATA } from '../../constant/url';
import http from '../../http';

export default {
    name: 'viewShipment',
    components: {
        RightFilterReceipt,
        Spinner,
        Flexbox,
        FlexboxItem
    },
    data () {
        return {
            otherinfo: {},
            plantime: '',
            ordersList: [],
            isCustomerDataGet: false,
            isFilterShow: false,
            departmentList: [],
            salesmanList: [],
            customerList: [],
            deptcode: '',
            deptids: '',
            username: '',
            userids: '',
            custids: '',
            custcode: '',

            pulluptime: '',
            pulldowntime: '',
            totalunderliveryamount: 0,
            refreshtype: 'pullup',
            pageSize: 10,
            pageNumber: 0,
            totalPage: Number.MAX_VALUE,
            loading: false,
            isEnd: false,
            isNodata: false
        }
    },
    created () {
        this.getAchievementData();
        // this.pageData();
    },
    methods: {
        ...mapActions([
        ]),
        init () {
            this.pulluptime = '';
            this.pulldowntime = '';
            this.totalunderliveryamount = 0;
            this.refreshtype = 'pullup';
            this.pageSize = 10;
            this.pageNumber = 0;
            this.totalPage = Number.MAX_VALUE;
            this.loading = false;
            this.isEnd = false;
            this.isNodata = false;
            this.ordersList = [];
        },
        jump (path) {
            this.$router.push({path: path});
        },
        getAchievementData () {
            this.isCustomerDataGet = false;
            http.post(URL_SHIPMENTS_HEAD, {
                body: `plantime=${this.plantime}&deptcode=${this.deptcode}&deptids=${this.deptids}&username=${this.username}&userids=${this.userids}&` +
                      `custids=${this.custids}&custcode=${this.custcode}`
            })
            .then((res) => {
                this.isCustomerDataGet = true;
                this.customerList = res.customerList;
                this.salesmanList = res.salesmanList;
                this.otherinfo = res.otherinfo;
                this.plantime = res.otherinfo.plantime;
                this.departmentList = res.departmentList;
            })
        },
        pageData () {
            http.post(URL_SHIPMENT_DATA, {
                body: `plantime=${this.plantime}&deptcode=${this.deptcode}&deptids=${this.deptids}&username=${this.username}&userids=${this.userids}&` +
                      `custids=${this.custids}&custcode=${this.custcode}&` +
                      `pulluptime=${this.pulluptime}&pulldowntime=${this.pulldowntime}totalunderliveryamount=${this.totalunderliveryamount}&` +
                          `refreshtype=${this.refreshtype}&pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
            })
            .then((res) => {
                console.log(res);
                this.pulldowntime = res.otherinfo.pulldowntime;
                this.pulluptime = res.otherinfo.pulluptime;
                this.totalunderliveryamount = this.totalunderliveryamount + res.otherinfo.totalundeliveryamount;
                this.totalPage = res.splitPage.totalPage;
                this.ordersList = this.ordersList.concat(res.ordersList);
                this.loading = false;
                if (res.splitPage && res.splitPage.totalPage === 0) {
                    this.isNodata = true;
                }
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
                    me.init();
                    me.getAchievementData();
                    me.pageData();
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
        },
        loadTop () {

        },
        loadMore () {
            this.loading = true;
            if (this.totalPage === 0) {
                this.isNodata = true;
                this.loading = false;
            }
            else if (this.pageNumber >= this.totalPage) {
                this.isEnd = true;
                this.loading = false;
            }
            else {
                this.pageData({contactsIds: this.contactsIds, pageNumber: ++this.pageNumber})
                // .then((res) => {
                //     this.loading = false;
                //     if (res.splitPage && res.splitPage.totalPage === 0) {
                //         this.isNodata = true;
                //     }
                // });
            }
        },
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
.view-shipment {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    // padding-top: pxToRem(20px);
    box-sizing: border-box;
    .header {
        border-bottom:1px solid #E0E0E0;
        height: pxToRem(50px);
    }
    .text-total {
        height: pxToRem(50px);
        line-height: pxToRem(50px);
        padding-left:pxToRem(20px);
        background: #fff;
        text-align: left;
        border-bottom: solid 1px #d0d0d0;
    }
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
