<template>
  <div class="detail-info">
      <div class="wrap">
          <Panel>
              <!-- <mt-field v-for="name in names" :label="name + '：'">ddddddddsssssssss</mt-field> -->
              <mt-field label="客户名称：" readonly>{{cust.custname}}</mt-field>
              <mt-field label="客户状态：" readonly>{{custStatusList[cust.custstatus]}}</mt-field>
              <mt-field label="所在地区：" readonly>{{cust.region}}</mt-field>
              <mt-field label="详细地址：" readonly>{{cust.address}}</mt-field>
              <mt-field label="电话：" readonly>{{cust.telno}}</mt-field>
              <mt-field label="传真：" readonly>{{cust.fax}}</mt-field>
              <mt-field label="邮箱：" readonly>{{cust.email}}</mt-field>
              <mt-field label="邮编：" readonly>{{cust.postcode}}</mt-field>
              <mt-field label="网址：" readonly>{{cust.website}}</mt-field>
              <mt-field label="法人代表：" readonly>{{cust.chieftain}}</mt-field>
              <mt-field label="人员规模：" readonly>{{cust.scale}}人</mt-field>
              <mt-field label="授信额度：" readonly>{{cust.creditlimit}}</mt-field>
              <mt-field label="帐期天数：" readonly>{{cust.paymentdays}}天</mt-field>
              <mt-field label="所属行业：" readonly>{{cust.business}}</mt-field>
              <mt-field label="货币：" readonly>{{currencyList[cust.currency]}}</mt-field>
              <mt-field label="客户级别：" readonly>{{custLevelList[cust.custlevel]}}</mt-field>
          </Panel>
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
