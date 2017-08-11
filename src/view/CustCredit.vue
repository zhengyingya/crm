<template>
    <div class="view-custcredit flex-cloumn">
        <div class="head text-l">
            <div><span class="txt1">信贷编号：</span>{{custCredit.creditno}}</div>
            <div><span class="txt1">信贷名称：</span>{{custCredit.custname}}</div>
            <div><span class="txt1">信贷额度：</span>{{custCredit.creditlimit}}</div>
            <div v-for="item in custcreditnoList">
                <div><span class="txt1">期初欠款：</span><span class="txt2">{{item.bdebt}}</span><span>{{item.belongto}}</span></div>
                <div><span class="txt1">期末欠款：</span><span class="txt2">{{item.edebt}}</span><span>{{item.belongto}}</span></div>
            </div>
            <div><span class="txt1">统计时间：</span>{{custCredit.datatime}}</div>
        </div>
        <div class="neck">
            关联客户信息
        </div>
        <div class="body flex-1 text-l" style="height:100%;overflow:auto;">
            <div v-for="item in creditnoDetailsList" style="color:#7B7B7B;background:#fff;padding:10px 20px;margin-bottom:15px;">
                <div class="title">
                    客户编号：{{item.custcode}}/{{item.custname}}
                </div>
                <div v-for="(one, index) in item.details" class="fs-12">
                    <div class="flex-row">
                        <div style="line-height:18px;">{{index+1}}.</div>
                        <div class="flex-1">
                            <div>{{one.datatime}} {{one.belongto}}</div>
                            <div class="flex-row">
                                <div class="flex-1">期初欠款：<span style="color:#FF5151">{{one.bdebt}}</span></div>
                                <div class="flex-1">期末欠款：<span style="color:#FF5151">{{one.edebt}}</span></div>
                            </div>
                            <div class="flex-row">
                                <div class="flex-1">发货额：<span>{{one.devmoney}}</span></div>
                                <div class="flex-1">开票额：<span>{{one.invoicemoney}}</span></div>
                            </div>
                            <div class="flex-row">
                                <div class="flex-1">收款额：<span>{{one.receiptmoney}}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Panel from '../components/Panel.vue';
import { mapActions } from 'vuex';
import { getQueryString } from '../utils/commonMethod.js';
import http from '../http/index.js';
import { URL_CUST_CREDIT } from '../constant/url.js';
import { Spinner, Flexbox, FlexboxItem, Search } from 'vux';
import { Toast } from 'mint-ui';

export default {
    name: 'addContact',
    components: {
        Panel,
        Spinner,
        Flexbox,
        FlexboxItem,
        Search
    },
    data () {
        return {
            custIds: '6631B5B27DD44910BF7BDAC2E02F1AD3',//getQueryString('custIds'),
            custName: decodeURI(decodeURI(getQueryString('custName'))),
            custCredit: {},
            custcreditnoList: []
        }
    },
    created () {
        http.get(`${URL_CUST_CREDIT}?custIds=${this.custIds}&monthTime=201707`).then((res) => {
            console.log(res)
            // this.contactsNameGroupList = res.contactsNameGroupList;
            this.custCredit = res.custCredit;
            this.custcreditnoList = res.custcreditnoList;
            this.creditnoDetailsList = res.creditnoDetailsList;
        })
    },
    methods: {
        ...mapActions([
            'getAchievementData',
            'getFollowData'
        ])
    }
}
</script>
<style lang="scss">
@import '../styles/common.scss';
</style>
<style scoped lang="scss">
@import '../styles/common.scss';
.view-custcredit {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    // padding-top: pxToRem(20px);
    .head {
        padding: pxToRem(20px) 0;
        padding-left: pxToRem(20px);
        background: #66B3FF;
        color: #fff;
        .txt1 {
            margin-right: pxToRem(10px);
        }
        .txt2 {
            margin-right: pxToRem(10px);
            color: #FF5151;
            font-weight: bold;
        }
    }
    .neck {
        height: pxToRem(45px);
        line-height: pxToRem(45px);
        padding-left: pxToRem(20px);
        text-align: left;
        color: #fff;
        font-weight: bold;
        background: #C4E1FF;
        box-shadow: 10px 10px 20px #C4E1FF;
    }
    .body {
        // padding: pxToRem(20px) pxToRem(20px);
        padding-top: 0;
        .title {
            // height: pxToRem(30px);
            padding: pxToRem(10px) 0;
            color: #5B5B5B;
            // background: #E0E0E0;
        }
    }
}
</style>
