<template>
    <div class="view-salestrends flex-cloumn">
        <div class="head">
            <div class="txt-cust">{{salesTrendsData.custName}}</div>
            <div class="btn-menu">
                <div class="btn-wrap">
                    <a class="btn-item" :class="activeMonth===1?'active':''" style="border-radius: 5px 0 0 5px;" @click="activeMonth=1;">近1月</a>
                    <a class="btn-item" :class="activeMonth===3?'active':''" @click="activeMonth=3;">近3月</a>
                    <a class="btn-item" :class="activeMonth===6?'active':''" @click="activeMonth=6;">近6月</a>
                    <a class="btn-item" :class="activeMonth===12?'active':''" @click="activeMonth=12;">近1年</a>
                    <a class="btn-item" :class="activeMonth===0?'active':''" @click="activeMonth=0;" style="border-right: 1px solid #E0E0E0;border-radius: 0 5px 5px 0;">全部</a>
                </div>
            </div>
        </div>
        <div class="body flex-cloumn">
            <!-- <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;"> -->
                <div class="flex-row" style="height:45px;line-height:45px; background-color: #F7F7F7;border-top:1px solid #E0E0E0;border-bottom:1px solid #E0E0E0">
                    <div class="tr" style="width:23%;">更新日期</div>
                    <div style="width:15%">开工率</div>
                    <div style="width:15%">批号</div>
                    <div style="width:25%">库存</div>
                    <div style="width:22%">下月需求</div>
                </div>
                <div style="flex:1;overflow:auto;">
                    <div class="flex-row" v-for="item in salesTrendsData.dataList">
                        <div class="td" style="width:23%;">{{item.addtime}}</div>
                        <div class="td" style="width:15%" >{{item.workrate}}</div>
                        <div class="td" style="width:15%">{{item.batchnumber}}</div>
                        <div class="td" style="width:25%;">{{item.inventory}}</div>
                        <div class="td" style="width:22%;">{{item.requireamount}}</div>
                    </div>
                </div>
            <!-- </x-table> -->
        </div>
    </div>
</template>

<script>
import Panel from '../components/Panel.vue';
import { mapActions } from 'vuex';
import { getQueryString } from '../utils/commonMethod.js';
import http from '../http/index.js';
import { URL_SALES_TRENDS_API } from '../constant/url.js';
import { Spinner, Flexbox, FlexboxItem, Search, XTable } from 'vux';
import { Toast } from 'mint-ui';

export default {
    name: 'salesTrends',
    components: {
        Panel,
        Spinner,
        Flexbox,
        FlexboxItem,
        Search,
        XTable
    },
    data () {
        return {
            custIds: getQueryString('custIds'),
            custName: decodeURI(decodeURI(getQueryString('custName'))),
            salesTrendsData: {},
            activeMonth: 1
        }
    },
    created () {
        this.getSalesData();
    },
    watch: {
        activeMonth (val) {
            this.getSalesData();
        }
    },
    methods: {
        ...mapActions([
            'getAchievementData',
            'getFollowData'
        ]),
        getSalesData () {
            const queryMonth = this.activeMonth===0 ? '&months=ALL' : `&months=${this.activeMonth}`;
            http.get(`${URL_SALES_TRENDS_API}?custIds=${this.custIds}${queryMonth}`).then((res) => {
                console.log(res)
                this.salesTrendsData = res;
            })
        }
    }
}
</script>
<style lang="scss">
@import '../styles/common.scss';
</style>
<style scoped lang="scss">
@import '../styles/common.scss';
.view-salestrends {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    // padding-top: pxToRem(20px);
    .head {
        height: pxToRem(160px);
        background: linear-gradient(0deg, $bg-blue, $blue);
        .txt-cust {
            height: pxToRem(80px);
            line-height: pxToRem(80px);
            color: #fff;
            font-size: 18px;
        }
        .btn-menu {
            font-size: 0;
            .btn-item {
                font-size: 12px;
                display: inline-block;
                border: 1px solid #E0E0E0;
                border-right: 0px solid;
                width: pxToRem(60px);
                height: pxToRem(30px);
                line-height: pxToRem(30px);
                color: $blue;
            }
            .active {
                background: $blue;
                color: #fff;
            }
        }
    }
    .body {
        flex: 1;
        overflow: auto;
        .td {
            display: flex;
            align-items: center;
            justify-content: center;
            width:20%;
            padding: 5px 2px;
            line-height: 25px;
            background: #fff;
            word-break:break-all;
            border-bottom: 1px solid #F7F7F7;
        }
    }
}
</style>
