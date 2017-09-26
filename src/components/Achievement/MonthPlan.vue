<template>
  <div class="month-plan">
      <div class="flex-row header fs-18">
          <div class="txt-title">本月计划完成</div>
          <div class="btn-more fs-14" @click="loadMore">更多<i class="iconfont icon-xiayiyeqianjinchakangengduo"/></div>
      </div>
      <Panel>
          <div class="flex-row txt-type" style="border-bottom: 1px solid #E0E0E0">
              {{statusInfo.planObject}}计划
          </div>
          <div class="flex-row" style="border-bottom: 1px solid #E0E0E0">
              <div class="flex-row text-pl" style="flex:1">
                  <DataShow icon="icon-fahuotixing" text="计划发货" :num="monthlyPrincipalPlanInfo.planamountmonth"/>
              </div>
              <div class="divider"/>
              <div style="flex:1">
                  <DataShow icon="icon-fahuo1" text="本月发货" :num="monthlyPrincipalPlanInfo.deliveryamountmonth"/>
              </div>
          </div>
          <div class="flex-row"  style="border-bottom: 1px solid #E0E0E0">
              <div style="flex:1">
                  <ChartShow text="当前完成率" :percent="monthlyPrincipalPlanInfo.finishradiomonthPieChart"/>
              </div>
              <div style="flex:1">
                  <ChartShow text="当前时间进度" :percent="monthlyPrincipalPlanInfo.daysradiomonth"/>
              </div>
          </div>
          <!-- <div class="flex-row" style="border-bottom: 1px solid #E0E0E0">
              <div style="flex:1">
                  <ChartShow text="当前时间进度" :percent="monthlyPrincipalPlanInfo.daysradiomonth"/>
              </div>
          </div> -->
          <div class="flex-row" style="height:80px;line-height:80px;">
              <div class="flex-row text-pl" style="flex:1">
                  <DataShow icon="icon-yifabuhuoyuan" text="昨日发货" :num="monthlyPrincipalPlanInfo.deliveryamountday"/>
              </div>
              <div class="divider"/>
              <div class="flex-row fs-22" style="flex:1;">
                  <div class="left"><i class="iconfont icon-zuori- fs-32"/></div>
                  <div class="flex-cloumn right">
                      <div class="it1 fs-14">数据时点</div>
                      <div class="it2 fs-22">
                          <span style="color:#26a2ff" class="fs-22">{{monthlyPrincipalPlanInfo.dealtime?monthlyPrincipalPlanInfo.dealtime.split(' ')[1]:''}}</span>
                      </div>
                  </div>
              </div>
          </div>
      </Panel>

      <Panel v-if="statusInfo.planObject==='业务员'">
          <div class="flex-row txt-type" style="border-bottom: 1px solid #E0E0E0">
              我协助的客户计划
          </div>
          <div class="flex-row" style="border-bottom: 1px solid #E0E0E0">
              <div class="flex-row text-pl" style="flex:1">
                  <DataShow icon="icon-fahuotixing" text="计划发货" :num="monthlyAssistantPlanInfo.assistantPlanAmountMonth"/>
              </div>
              <div class="divider"/>
              <div style="flex:1">
                  <DataShow icon="icon-fahuo1" text="本月发货" :num="monthlyAssistantPlanInfo.assistantDeliveryAmountMonth"/>
              </div>
          </div>
          <div class="flex-row"  style="border-bottom: 1px solid #E0E0E0">
              <div style="flex:1">
                  <ChartShow text="当前完成率" :percent="monthlyAssistantPlanInfo.assistantFinishRadioMonth"/>
              </div>
          </div>
          <!-- <div class="flex-row">
              <div style="flex:1">
                  <ChartShow text="当前时间进度" :percent="monthlyAssistantPlanInfo.daysradiomonth"/>
              </div>
          </div> -->
      </Panel>

  </div>
</template>

<script>
import Panel from '../Panel.vue';
import DataShow from './DataShow.vue';
import ChartShow from './ChartShow.vue';
import { mapState } from 'vuex';

export default {
    name: 'home',
    components: {
        Panel,
        DataShow,
        ChartShow
    },
    data () {
        return {
        }
    },
    computed: mapState({
        monthlyAssistantPlanInfo: (state) => {
            return state.achievement.monthlyAssistantPlanInfo;
        },
        monthlyPrincipalPlanInfo: (state) => {
            return state.achievement.monthlyPrincipalPlanInfo;
        },
        statusInfo: (state) => {
            return state.achievement.statusInfo;
        }
    }),
    methods: {
        loadMore () {
            location.href = window.cxt + '/crm/report/hybrid';
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';
.month-plan {
    .header {
        padding: pxToRem(10px) pxToRem(10px);
        .txt-title {
            text-align: left;
            flex: 1;
        }
        .btn-more {
            text-align: right;
            flex: 1;
            color: $blue;
            line-height: pxToRem(24px);
        }
    }
    .txt-type {
        height: pxToRem(30px);
        line-height: pxToRem(30px);
        background: $blue;
        padding: 0 pxToRem(20px);
        color: #fff;
    }
    .text-pl {
        height: 80px;
        .left {
            flex: 1;
            line-height: 80px;
            text-align: center;
        }
        .right {
            flex: 3;
            text-align: left;
        }
    }
    .divider {
        width: 1px;
        background-color: #E0E0E0;
    }
    .left {
        flex: 1;
        line-height: 80px;
        text-align: center;
        > i {
            color: #26a2ff;
        }
    }
    .right {
        flex: 2;
        text-align: left;
        .it1 {
            height: 40px;
            line-height: 50px;
        }
        .it2 {
            height: 40px;
            line-height: 30px;
        }
    }
}
</style>
