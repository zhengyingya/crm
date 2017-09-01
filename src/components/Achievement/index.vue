<template>
  <div class="achievement">
      <div class="header fs-16">
          <div class="txt-date">今天&nbsp;&nbsp;&nbsp;{{statusInfo.nowDateMMdd}}&nbsp;&nbsp;&nbsp;{{statusInfo.nowDateWeekDay}}</div>
          <div class="txt-name" @click="unReadClick">
              {{statusInfo.userRealName}}
              <div v-if="count>0" class="p-ab dot" style="margin-left:-5px;">
                  <mt-badge size="small" type="error">{{count}}</mt-badge>
              </div>
          </div>
      </div>
      <MonthPlan/>
      <YearPlan/>
      <!-- <echart :options="option"></echart> -->
  </div>
</template>

<script>
import MonthPlan from './MonthPlan.vue';
import YearPlan from './YearPlan.vue';
import { mapState } from 'vuex';
import { URL_FOLLOW_RECORD_COUNT } from '../../constant/url.js';
import http from '../../http/index.js';

export default {
    name: 'home',
    components: {
        MonthPlan,
        YearPlan
    },
    data () {
        return {
            count: 0
        }
    },
    created () {
        http.get(`${URL_FOLLOW_RECORD_COUNT}`).then((res) => {
            this.count = res.count;
        })
    },
    computed: mapState({
        statusInfo: (state) => {
            return state.achievement.statusInfo;
        }
    }),
    methods: {
        unReadClick () {
            if (this.count > 0) {
                // window.location.href = window.cxt + '/crm/index/hybrid/haveUnReadDiscussFollowRecordList';
                this.$router.push({path: '/unread'});
            }
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../styles/common.scss';
.achievement {
    height: 100%;
    padding-top: pxToRem(46px);
    padding-bottom:  pxToRem(80px);
    .header {
        display: flex;
        padding: pxToRem(10px) pxToRem(10px);
        .txt-date {
            flex: 2;
            text-align: left;
        }
        .txt-name {
            position: relative;
            flex: 1;
            padding-right: pxToRem(15px);
            text-align: right;
            .dot {
                transform: scale(.8, .8);
                right: 0;
                top: pxToRem(-5px);
            }
         }
    }
}
</style>
