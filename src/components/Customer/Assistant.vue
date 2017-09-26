<template>
  <div class="assistant">
      <div class="wrap">
          <div v-for="(item, index) in assistantList" >
              <div class="flex-row item" @click="jump(`/mail/personal?userIds=${item.userids}`)">
                  <flexbox :gutter="0">
                      <flexbox-item :span="1/6">
                          <div class="portrait" :style="{background: makeColor(item.color)}">
                              {{item.shortname}}
                          </div>
                      </flexbox-item>
                      <flexbox-item :span="3/6" class="btn-fast">
                          <flexbox :gutter="0" style="margin-bottom:5px;">
                              {{item.names}}
                          </flexbox>
                            <flexbox :gutter="0" style="color:#26a2ff">
                                {{item.mobile}}
                            </flexbox>
                      </flexbox-item>
                  </flexbox>
              </div>
              <div class="divider" v-if="index !== assistantList.length - 1"/>
          </div>
          <div v-if="assistantList.length===0" style="justify-content:center;margin-top:50px;margin-bottom:5px;color:#BEBEBE;text-align:center">
              <i class="iconfont icon-zanwushuju" style="font-size:120px"/>
              <div class="fs-22">暂无数据</div>
          </div>
      </div>
      <div v-if="!custPoolIds && isUserResponsibleOrAssistanceToCustomer >= 1" class="btn-add" @click="add">添加协助人</div>
  </div>
</template>

<script>
import Panel from '../Panel.vue';
import { Spinner, Flexbox, FlexboxItem } from 'vux';
import http from '../../http/index.js';
import { getQueryString } from '../../utils/commonMethod.js';
import { URL_ASSISTANT_LIST } from '../../constant/url.js';

export default {
    name: 'assistant',
    components: {
        Flexbox,
        FlexboxItem,
        Panel
    },
    props: [
        'isUserResponsibleOrAssistanceToCustomer'
    ],
    data () {
        return {
            custIds: getQueryString('custIds'),
            custPoolIds: getQueryString('custPoolIds'),
            assistantList: [],
            color: ['#FF2D2D', '#02DF82', '#D9B300', '#26a2ff', '#9F35FF']
        }
    },
    created () {
        http.get(`${URL_ASSISTANT_LIST}?custIds=${this.custIds}`).then((res) => {
            this.assistantList = res;
        })
    },
    methods: {
        makeColor (color) {
            return `rgba(${color})`
        },
        add () {
            this.$router.push({path: `/customer/addassistant?custIds=${this.custIds}`});
        },
        openLink (link) {
          location.href = window.cxt + link;
        },
        jump (path) {
            this.$router.push({path: path});
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
.assistant {
    height: 100%;
    background: #fff;
    padding-bottom: pxToRem(50px);
    box-sizing: border-box;
    .wrap {
        height: 100%;
        overflow: auto;
    }
    .btn-add {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: pxToRem(45px);
        background: $blue;
        color: #fff;
        line-height: pxToRem(45px);
        text-align: center;
    }
    .item {
        height: pxToRem(60px);
        align-items: center;
            padding: 0 pxToRem(20px);
        .portrait {
            text-align: center;
            color: #fff;
            width: pxToRem(40px);
            height: pxToRem(40px);
            line-height: pxToRem(40px);
            border-radius: pxToRem(20px);
        }
    }
    .divider {
        height: 1px;
        background: #F0F0F0;
    }
}
</style>
