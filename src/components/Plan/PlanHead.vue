<template>
  <div class="plan-head">
      <flexbox :gutter="0">
          <flexbox-item :span="2/5">
              计划月份：
          </flexbox-item>
          <flexbox-item :span="3/5">
              <div @click="openPicker">
                  {{otherinfo.plantime}}
                  <i class="iconfont icon-xiangxiazhankai fs-16"/>
              </div>
          </flexbox-item>
      </flexbox>
      <flexbox :gutter="0">
          <flexbox-item :span="2/5">
              累计发货量差异：
          </flexbox-item>
          <flexbox-item :span="3/5">
              {{otherinfo.totalsubtract}}{{otherinfo.unit}}
          </flexbox-item>
      </flexbox>
      <flexbox :gutter="0">
          <flexbox-item :span="2/5">
              本月考核计划：
          </flexbox-item>
          <flexbox-item :span="3/5">
              {{otherinfo.orgplanamount}}{{otherinfo.unit}}
          </flexbox-item>
      </flexbox>
      <flexbox :gutter="0">
          <flexbox-item :span="2/5">
              本月客户计划：
          </flexbox-item>
          <flexbox-item :span="3/5">
              {{otherinfo.custplanamount}}{{otherinfo.unit}}
          </flexbox-item>
      </flexbox>
  </div>
</template>

<script>
import Panel from '../Panel.vue';
import { Spinner, Flexbox, FlexboxItem, Popup, Search, Picker } from 'vux';
import http from '../../http/index.js';
import { getQueryString } from '../../utils/commonMethod.js';
import { URL_ASSISTANT_LIST } from '../../constant/url.js';

export default {
    name: 'planHead',
    components: {
        Flexbox,
        FlexboxItem,
        Panel,
        Popup,
        Search,
        Picker
    },
    props: [
        'otherinfo',
        'type'
    ],
    data () {
        return {
            custIds: getQueryString('custIds'),
            custPoolIds: getQueryString('custPoolIds'),
        }
    },
    created () {
    },
    watch: {
    },
    computed: {
    },
    methods: {
        // 打开时间选择器
        openPicker () {
            const me = this;
            console.log(me.plantime)
            this.$vux.datetime.show({
                cancelText: '取消',
                confirmText: '确定',
                format: 'YYYY-MM',                  // 供选择的时间格式
                value: me.otherinfo.plantimecn.replace('年', '-').replace('月', ''),       // 初始时间
                onConfirm (val) {
                    console.log('-------', val)
                    me.$emit('changePlantDate', val.replace('-', ''));
                },
                onShow () {
                  console.log('plugin show')
                },
                onHide () {
                  console.log('plugin hide')
                }
            })
        }
    }
}
</script>
<style lang="scss">
@import '../../styles/common.scss';
.plan-head {
    .vux-flexbox-item {
        line-height: pxToRem(30px);
    }
}
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.plan-head {
    background: $hd-blue;
    padding: pxToRem(10px) pxToRem(20px);
    color: #fff;
}
</style>
