<template>
  <div class="detail-info">
      <div class="wrap">
          <!-- <Panel> -->
              <!-- <mt-field v-for="name in names" :label="name + '：'">ddddddddsssssssss</mt-field> -->
              <div class="item"> <label class="flex-1">客户名称：</label><span class="flex-3">{{cust.custname}}</span></div>
              <div class="item"> <label class="flex-1">客户状态：</label><span class="flex-3">{{custStatusList[cust.custstatus]}}</span></div>
              <div class="item"> <label class="flex-1">所在地区：</label><span class="flex-3">{{cust.region}}</span></div>
              <div class="item"> <label class="flex-1">详细地址：</label><span class="flex-3">{{cust.address}}</span></div>
              <div class="item"> <label class="flex-1">电话：</label><span class="flex-3">{{cust.telno}}</span></div>
              <div class="item"> <label class="flex-1">传真：</label><span class="flex-3">{{cust.fax}}</span></div>
              <div class="item"> <label class="flex-1">邮箱：</label><span class="flex-3">{{cust.email}}</span></div>
              <div class="item"> <label class="flex-1">邮编：</label><span class="flex-3">{{cust.postcode}}</span></div>
              <div class="item"> <label class="flex-1">网址：</label><span class="flex-3">{{cust.website}}</span></div>
              <div class="item"> <label class="flex-1">法人代表：</label><span class="flex-3">{{cust.chieftain}}</span></div>
              <div class="item"> <label class="flex-1">人员规模：</label><span class="flex-3">{{cust.scale}}人</span></div>
              <div class="item"> <label class="flex-1">授信额度：</label><span class="flex-3">{{cust.creditlimit}}</span></div>
              <div class="item"> <label class="flex-1">帐期天数：</label><span class="flex-3">{{cust.paymentdays}}天</span></div>
              <div class="item"> <label class="flex-1">所属行业：</label><span class="flex-3">{{cust.business}}</span></div>
              <div class="item"> <label class="flex-1">货币：</label><span class="flex-3">{{currencyList[cust.currency]}}</span></div>
              <div class="item"> <label class="flex-1">客户级别：</label><span class="flex-3">{{custLevelList[cust.custlevel]}}</span></div>
          <!-- </Panel> -->
      </div>
      <div class="btn-edit" @click="edit">编辑资料</div>
  </div>
</template>

<script>
import Panel from '../Panel.vue';
import { Spinner, Flexbox, FlexboxItem } from 'vux';
import { mapState, mapActions } from 'vuex';
import { getQueryString } from '../../utils/commonMethod.js';
import { URL_DETAIL_INFO } from '../../constant/url.js';
import http from '../../http/index.js';

export default {
    name: 'detailInfo',
    components: {
        Flexbox,
        FlexboxItem,
        Panel
    },
    props: [
        'custIds'
    ],
    data () {
        return {
            selected: '1',
            names: ['客户名称', '客户状态', '所在地区', '详细地址', '电话', '传真', '邮箱', '邮编']
        }
    },
    created () {
        this.getCustomerDetailInfo({custIds: this.custIds});
    },
    computed: mapState({
        cust: (state) => {
            return state.customer.cust;
        },
        custLevelList: (state) => {
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
            'getCustomerDetailInfo'
        ]),
        edit () {
            this.$router.push({path: '/customer/add?custIds=' + this.custIds});
        }
    }
}
</script>
<style lang="scss">
.detail-info {
    .mint-cell-title {
        text-align: left;
        color: #7B7B7B
    }
}
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.detail-info {
    height: 100%;
    padding-bottom: pxToRem(50px);
    box-sizing: border-box;
    .wrap {
        height: 100%;
        overflow: auto;
        background: #fff;
        padding: 0 pxToRem(20px);
        text-align: left;
        font-size: 16px;
        .item {
            border-bottom: 1px solid #F0F0F0;
            display: flex;
            // height: pxToRem(50px);
            line-height: pxToRem(50px);
        }
    }
    .btn-edit {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: pxToRem(45px);
        background: $blue;
        color: #fff;
        line-height: pxToRem(45px);
        text-align: center;
    }
}
</style>
