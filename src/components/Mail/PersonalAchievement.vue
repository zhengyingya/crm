<template>
  <div class="personal-achievement flex-cloumn">
      <flexbox style="border-bottom:1px solid #E0E0E0;">
          <flexbox-item :span="1/3" class="text-date">
              <div @click="openPicker">
                  {{currentMonth}}
                  <i class="iconfont icon-xiangxiazhankai"/>
              </div>
          </flexbox-item>
          <flexbox-item :span="2/3" class="text-c" style="background:#fff;height:50px;line-height:50px;margin-left:0;">销售目标完成情况</flexbox-item>
      </flexbox>
      <div class="content flex-1">
          <div class="amount">
              <flexbox style="text-align:center;border-bottom:1px solid #F0F0F0">
                  <flexbox-item>
                      <div style="margin-bottom:5px;">月销售目标</div>
                      <div><span style="color:#26a2ff;" :class="planAmount&&planAmount.toString().length>=8?'fs-16':'fs-22'">{{planAmount}}</span>{{unit}}</div>
                  </flexbox-item>
                  <div class="divider"/>
                  <flexbox-item>
                      <div style="margin-bottom:5px;">月完成总量</div>
                      <div><span style="color:#26a2ff;" :class="completedAmount&&completedAmount.toString().length>=8?'fs-16':'fs-22'">{{completedAmount}}</span>{{unit}}</div>
                  </flexbox-item>
              </flexbox>
              <ChartShow text="完成率" :percent="planAmount===0?0:completedAmount*100/planAmount" :selected="selected"/>
          </div>
          <div class="amount">
              <flexbox style="text-align:center;border-bottom:1px solid #F0F0F0">
                  <flexbox-item>
                      <div style="margin-bottom:5px;">年销售目标</div>
                      <div><span style="color:#26a2ff;" :class="planamountyear&&planamountyear.toString().length>=8?'fs-16':'fs-22'">{{planamountyear}}</span>{{unit}}</div>
                  </flexbox-item>
                  <div class="divider"/>
                  <flexbox-item>
                      <div style="margin-bottom:5px;">年完成总量</div>
                      <div><span style="color:#26a2ff;" :class="deliveryamountyear&&deliveryamountyear.toString().length>=8?'fs-16':'fs-22'">{{completedAmount}}</span>{{unit}}</div>
                  </flexbox-item>
              </flexbox>
              <ChartShow text="完成率" :percent="planamountyear===0?0:deliveryamountyear*100/planamountyear" :selected="selected"/>
          </div>
      </div>
  </div>
</template>

<script>
import Panel from '../Panel.vue';
import ChartShow from '../Achievement/ChartShow.vue';
import { Spinner, Flexbox, FlexboxItem, Popover, Popup, TransferDom } from 'vux';
import { mapState, mapActions } from 'vuex';
import { getQueryString } from '../../utils/commonMethod.js';
import http from '../../http/index.js';
import { URL_BUSINESS_DETAIL } from '../../constant/url.js';
import { Toast } from 'mint-ui';
import PersonalRecordItem from './PersonalRecordItem.vue';

export default {
    name: 'personalAchievement',
    components: {
        Flexbox,
        FlexboxItem,
        Panel,
        Popover,
        Popup,
        PersonalRecordItem,
        ChartShow
    },
    props: [
        'selected',
        'userIds'
    ],
    created () {
        this.getBusinessDetail();
    },
    data () {
        return {
            currentMonth: '',
            planAmount: '',
            completedAmount: '',
            planamountyear: '',
            deliveryamountyear: '',
            unit: 'KG'
        }
    },
    computed: {
    },
    methods: {
        ...mapActions([
            'initSalesmanFollowData',
            'getSalesmanFollowData',
            'deleteOneRecord',
            'addOneSalesmanDiscuss',
            'deleteOneDiscuss'
        ]),
        getBusinessDetail () {
            http.get(`${URL_BUSINESS_DETAIL}?month=${this.currentMonth}&salesManIds=${this.userIds}`)
            .then((res) => {
                console.log(res);
                this.currentMonth = res.currentMonth;
                this.planAmount = res.planAmount;
                this.completedAmount = res.completedAmount;
                this.planamountyear = res.planamountyear;
                this.deliveryamountyear = res.deliveryamountyear;
                this.unit = res.unit;
            })
        },
        // 打开时间选择器
        openPicker () {
            const me = this;
            console.log(me.month)
            this.$vux.datetime.show({
                cancelText: '取消',
                confirmText: '确定',
                format: 'YYYY-MM',                  // 供选择的时间格式
                value: me.currentMonth.substr(0, 4) + '-' + me.currentMonth.substr(4, 2),       // 初始时间
                onConfirm (val) {
                    me.currentMonth = val.replace('-', '');
                    me.getBusinessDetail();
                },
                onShow () {
                },
                onHide () {
                }
            })
        },
    }
}
</script>
<style lang="scss">
@import '../../styles/common.scss';
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.personal-achievement {
    height: 100%;
    // padding-bottom: pxToRem(50px);
    background: #fff;
    text-align: left;
    overflow: auto;
    .text-date {
        background: #7e9cc7;
        padding-left:20px;
        box-sizing:border-box;
        font-weight: bolder;
        height: 50px;
        line-height:50px;
        color: #fff;
    }
    .content {
        padding: pxToRem(20px);
        // padding-top: pxToRem(70px);
        box-sizing: border-box;
        height: 100%;
        overflow: auto;
    }
    .amount {
        border: 1px solid #8ba8ce;
        border-radius: 4px;
        text-align: center;
        margin-bottom: pxToRem(20px);
    }
    .divider {
        width: 1px;
        height: pxToRem(80px);
        background-color: #F0F0F0;
    }
}
</style>
