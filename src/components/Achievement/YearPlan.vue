<template>
  <div class="year-plan">
      <div class="flex-row header fs-18">
          <div class="txt-title">本年计划完成</div>
          <div class="btn-more fs-14" @click="loadMore">更多<i class="iconfont icon-xiayiyeqianjinchakangengduo"/></div>
      </div>
      <Panel>
          <div class="flex-row txt-type" style="border-bottom: 1px solid #E0E0E0">
              {{statusInfo.planObject}}计划
          </div>
          <div class="flex-row">
              <div style="flex:1">
                  <YearChartShow :barDataList="yearlyPrincipalPlanInfo.barDataList" :barItemList="yearlyPrincipalPlanInfo.barItemList"/>
              </div>
          </div>
          <div class="flex-row" style="margin-bottom: 10px">
              <div style="flex:1">1-{{yearlyPrincipalPlanInfo.lastMonth}}月完成率
                  <span style="color:#26a2ff">{{yearlyPrincipalPlanInfo.monthradioyear}}%</span>
              </div>
              <div style="flex:1">年进度
                  <span style="color:#26a2ff">{{yearlyPrincipalPlanInfo.finishradioyear}}%</span>
              </div>
          </div>
          <!-- <div class="flex-row"  style="border-bottom: 1px solid #E0E0E0">
              <div style="flex:1">
                  <ChartShow :text="`1-${yearlyPrincipalPlanInfo.lastMonth}月完成率`" :percent="yearlyPrincipalPlanInfo.monthradioyear"/>
              </div>
          </div>
          <div class="flex-row">
              <div style="flex:1">
                  <ChartShow text="年进度" :percent="yearlyPrincipalPlanInfo.finishradioyear"/>
              </div>
          </div> -->
      </Panel>

      <Panel v-if="statusInfo.planObject==='业务员'">
          <div class="flex-row txt-type" style="border-bottom: 1px solid #E0E0E0">
              我协助的客户计划
          </div>
          <div class="flex-row" style="border-bottom: 1px solid #E0E0E0">
              <div style="flex:1">
                  <YearChartShow :barDataList="yearlyAssistantPlanInfo.barDataList" :barItemList="yearlyAssistantPlanInfo.barItemList"/>
              </div>
          </div>
          <!-- <div class="flex-row"  style="border-bottom: 1px solid #E0E0E0">
              <div style="flex:1">
                  <ChartShow :text="`1-${yearlyAssistantPlanInfo.lastMonth}月完成率`" :percent="yearlyAssistantPlanInfo.monthradioyear"/>
              </div>
          </div>
          <div class="flex-row">
              <div style="flex:1">
                  <ChartShow text="年进度" :percent="yearlyAssistantPlanInfo.finishradioyear"/>
              </div>
          </div> -->
      </Panel>
  </div>
</template>

<script>
import Panel from '../Panel.vue';
import DataShow from './DataShow.vue';
import ChartShow from './ChartShow.vue';
import YearChartShow from './YearChartShow.vue';
import { mapState } from 'vuex';

export default {
    name: 'year-plan',
    components: {
        Panel,
        DataShow,
        ChartShow,
        YearChartShow
    },
    data () {
        return {
        }
    },
    computed: mapState({
        yearlyPrincipalPlanInfo: (state) => {
            return state.achievement.yearlyPrincipalPlanInfo;
        },
        yearlyAssistantPlanInfo: (state) => {
            return state.achievement.yearlyAssistantPlanInfo
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
.year-plan {
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
}
</style>
