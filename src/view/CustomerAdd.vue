<template>
    <div class="view-customeradd">
        <div class="wrap">
            <Panel>
                <div class="d-n">{{cust}}</div>
                <mt-field label="客户名称" placeholder="请输入客户名称" v-model="custname"></mt-field>
                <mt-field label="客户状态" :placeholder="custIds?custStatusList[cust.custstatus]:'潜在客户'" readonly class="readonly"></mt-field>
                <!-- <mt-field label="所在地区" class="custom"> -->
                <group>
                    <x-address :title="title" v-model="region" raw-value :list="addressData" value-text-align="left"></x-address>
                </group>
                <mt-field label="详细地址" placeholder="请输入详细地址" v-model="address"></mt-field>
                <!-- </mt-field> -->
            </Panel>

            <Panel>
                <mt-field label="电话" placeholder="请输入电话" v-model="telno"></mt-field>
                <mt-field label="传真" placeholder="请输入传真" v-model="fax"></mt-field>
                <mt-field label="邮箱" placeholder="请输入邮箱" v-model="email"></mt-field>
                <mt-field label="邮编" placeholder="请输入邮编" v-model="postcode"></mt-field>
                <mt-field label="网址" placeholder="请输入网址" v-model="website"></mt-field>
            </Panel>

            <Panel>
                <mt-field label="法人代表" placeholder="请输入法人代表" v-model="chieftain"></mt-field>
                <mt-field label="人员规模" placeholder="请输入人员规模" v-model="scale"></mt-field>
                <mt-field label="授信额度" placeholder="请输入授信额度" v-model="creditlimit"></mt-field>
                <mt-field label="账期天数" placeholder="请输入账期天数" v-model="paymentdays"></mt-field>
                <mt-field label="所属行业" placeholder="请输入所属行业" v-model="business"></mt-field>
            </Panel>

            <Panel>
                <mt-field label="货币" :placeholder="custIds?currencyList[cust.currency]:'RMB'" readonly class="readonly"></mt-field>
                <mt-field label="客户级别" :placeholder="custIds?custLevelList[cust.custlevel]:'1类'" readonly class="readonly"></mt-field>
            </Panel>

            <div class="btn-sub"><mt-button type="primary" style="width:100%;" @click="submit">保存</mt-button></div>
        </div>
    </div>
</template>

<script>
import Panel from '../components/Panel.vue';
import { mapActions, mapState } from 'vuex';
import { getQueryString } from '../utils/commonMethod.js';
import { Group, Search, XAddress, Spinner, Flexbox, ChinaAddressV3Data, FlexboxItem, Value2nameFilter as value2name } from 'vux';
import http from '../http/index.js';
import { URL_CUSTOMER_DETAIL_VIEW, URL_UPDATE_DETAIL_INFO } from '../constant/url.js';
import { Toast } from 'mint-ui';

export default {
    name: 'customer',
    components: {
        Group,
        Search,
        Panel,
        Spinner,
        Flexbox,
        FlexboxItem,
        XAddress
    },
    data () {
        return {
            addressData: ChinaAddressV3Data,
            title: '所在地区',
            address: '',
            custname: '',
            region: [],
            name: '',
            telno: '',
            fax: '',
            email: '',
            postcode: '',
            website: '',
            chieftain: '',
            scale: '',
            creditlimit: '',
            paymentdays: '',
            business: '',
            custIds: getQueryString('custIds')
        }
    },
    created () {
        if (this.custIds) {
            this.getCustomerDetailInfo({custIds: this.custIds});
        }
    },
    computed: mapState({
        cust: function (state) {
            const cust = state.customer.cust;
            this.custname = cust.custname || '';
            this.region = cust.region ? cust.region.split(' ') : [];
            this.address = cust.address || '';
            this.telno = cust.telno || '';
            this.fax = cust.fax || '';
            this.email = cust.email || '';
            this.postcode = cust.postcode || '';
            this.website = cust.website || '';
            this.chieftain = cust.chieftain || '';
            this.scale = cust.scale || '';
            this.creditlimit = cust.creditlimit || '';
            this.paymentdays = cust.paymentdays || '';
            this.business = cust.business || '';
            return state.customer.cust;
        },
        custLevelList: function (state) {
            return state.customer.custLevelList;
        },
        custStatusList: (state) => {
            return state.customer.custStatusList;
        },
        currencyList: (state) => {
            return state.customer.currencyList;
        }
    }),
    methods: {
        ...mapActions([
            'getAchievementData',
            'getFollowData',
            'getCustomerDetailInfo'
        ]),
        jump (path) {
            this.$router.push({path: path});
        },
        // 保存
        submit () {
            console.log(']]]]]]', this.region)
            let query = '';
            if (this.custIds) {
                query += `customer.ids=${this.custIds}&`;
            }
            query += `customer.custname=${this.custname}&customer.region=${value2name(this.region, ChinaAddressV3Data)}&customer.address=${this.address}&`;
            query += `customer.telno=${this.telno}&customer.fax=${this.fax}&customer.email=${this.email}&customer.postcode=${this.postcode}&customer.website=${this.website}&`;
            query += `customer.chieftain=${this.chieftain}&customer.scale=${this.scale}&customer.creditlimit=${this.creditlimit}&customer.paymentdays=${this.paymentdays}&customer.business=${this.business}`;
            http.post(`${this.custIds?URL_UPDATE_DETAIL_INFO:URL_UPDATE_DETAIL_INFO}`, {
                body: query
            }).then((res) => {
                Toast({
                  message: res.message,
                  position: 'bottom',
                  duration: 1000
                });
                this.$router.replace({path: `/customer/detail?custIds=${this.custIds}`});
            })
        }
    }
}
</script>
<style lang="scss">
@import '../styles/common.scss';
.mint-cell-wrapper {
    background-image: none;
    border-bottom: 1px solid #F0F0F0;
}
.vux-cell-box:before {
    border-top: 0 solid!important;
}
.view-customeradd {
    .mint-cell-title {
        display: flex;
    }
    .readonly {
        input::-webkit-input-placeholder{
            color: #2c3e50;
        }
        input:-ms-input-placeholder {
            color: #2c3e50;
        }
        input:-ms-input-placeholder {
            color: #2c3e50;
        }
    }
    .vux-popup-picker-value {
        color: #000;
    }
    // .custom {
    //     input {
    //         display: none;
    //     }
    // }
    .weui-cells {
        margin-top: 0;
        font-size: 16px;
        border-top: 0 solid #fff;
        // height: pxToRem(48px);
        // display: flex;
        align-items: center;
        &:before {
            border: 0 solid #fff;
        }
        .weui-cell__hd {
            width: 105px;
            text-align: left;
        }
        .weui-cell {
            padding: pxToRem(13px) pxToRem(10px);
        }
    }
}
.vux-popup-picker-header {
    color: $blue!important;
}
</style>
<style scoped lang="scss">
@import '../styles/common.scss';
.view-customeradd {
    height: 100%;
    overflow: hidden;
    background-color: #ECF5FF;
    // padding-top: pxToRem(20px);
    // padding-bottom: pxToRem(50px);
    box-sizing: border-box;
    .wrap {
        height: 100%;
        padding-top: pxToRem(20px);
        box-sizing: border-box;
        overflow: auto;
        .btn-sub {
            padding: 0 pxToRem(10px);
            margin-bottom: pxToRem(20px);
        }
    }
}
</style>
