<template>
    <div class="plan-content">
        <!-- <tab v-model="tabSelect">
            <tab-item :key="0">业务员计划</tab-item>
            <tab-item :key="1">产品计划</tab-item>
        </tab>
        <swiper v-model="tabSelect" :show-dots="false">
            <swiper-item :key="0">
                <div class="plan-wrap">
                    <div v-for="item in salesmanList" class="plan-item" @click="jump(`/plan/custdeliver?userids=${item.userids}`)">
                        <flexbox :gutter="0">
                            {{item.names}}
                        </flexbox>
                        <flexbox :gutter="0" class="text">
                            <flexbox-item :span="2/5">
                                前三个月月均销量
                            </flexbox-item>
                            <flexbox-item :span="3/5">
                                {{item.averageamount}}KG
                            </flexbox-item>
                        </flexbox>
                        <flexbox :gutter="0" class="text">
                            <flexbox-item :span="2/5">
                                本月计划发货
                            </flexbox-item>
                            <flexbox-item :span="3/5">
                                {{item.custplanamount}}KG
                            </flexbox-item>
                        </flexbox>
                    </div>
                </div>
            </swiper-item>
            <swiper-item :key="1">
                <div class="plan-wrap">
                    <div v-for="item in productPlanList" class="plan-item">
                        <flexbox :gutter="0">
                            {{item.specification}};{{item.batchnumber}}
                        </flexbox>
                        <flexbox :gutter="0" class="text">
                            <flexbox-item :span="2/5">
                                产地：
                            </flexbox-item>
                            <flexbox-item :span="3/5">
                                {{item.originname}}
                            </flexbox-item>
                        </flexbox>
                        <flexbox :gutter="0" class="text">
                            <flexbox-item :span="2/5">
                                等级：
                            </flexbox-item>
                            <flexbox-item :span="3/5">
                                {{gradeNameList[item.grade]}}
                            </flexbox-item>
                        </flexbox>
                        <flexbox :gutter="0" class="text">
                            <flexbox-item :span="2/5">
                                发货数量：
                            </flexbox-item>
                            <flexbox-item :span="3/5">
                                {{item.amount}}KG
                            </flexbox-item>
                        </flexbox>
                    </div>
                </div>
            </swiper-item>
        </swiper> -->

        <mt-navbar v-model="tabSelect">
            <mt-tab-item id="1">业务员计划</mt-tab-item>
            <mt-tab-item id="2">产品计划</mt-tab-item>
        </mt-navbar>
        <!-- tab 部门计划 -->
        <mt-tab-container v-model="tabSelect" :swipeable="false">
            <mt-tab-container-item id="1" class="plan-wrap">
                <div v-for="item in salesmanList" class="plan-item" @click="jump(`/plan/custdeliver?userids=${item.userids}&plantime=${plantime}`)">
                    <flexbox :gutter="0">
                        <flexbox-item :span="9/10">
                            <flexbox :gutter="0">
                                {{item.names}}
                            </flexbox>
                            <flexbox :gutter="0" class="text">
                                <flexbox-item :span="2/5">
                                    前三个月月均销量
                                </flexbox-item>
                                <flexbox-item :span="3/5">
                                    {{item.averageamount}}KG
                                </flexbox-item>
                            </flexbox>
                            <flexbox :gutter="0" class="text">
                                <flexbox-item :span="2/5">
                                    本月计划发货
                                </flexbox-item>
                                <flexbox-item :span="3/5">
                                    {{item.custplanamount}}KG
                                </flexbox-item>
                            </flexbox>
                        </flexbox-item>
                        <flexbox-item :span="1/10">
                            <i class="iconfont icon-xiayiyeqianjinchakangengduo"/>
                        </flexbox-item>
                    </flexbox>
                </div>
            </mt-tab-container-item>
            <!-- 产品计划-->
          <mt-tab-container-item id="2" class="plan-wrap">
              <div v-for="item in productPlanList" class="plan-item">
                  <flexbox :gutter="0">
                      {{item.specification}};{{item.batchnumber}}
                  </flexbox>
                  <flexbox :gutter="0" class="text">
                      <flexbox-item :span="2/5">
                          产地：
                      </flexbox-item>
                      <flexbox-item :span="3/5">
                          {{item.originname}}
                      </flexbox-item>
                  </flexbox>
                  <flexbox :gutter="0" class="text">
                      <flexbox-item :span="2/5">
                          等级：
                      </flexbox-item>
                      <flexbox-item :span="3/5">
                          {{gradeNameList[item.grade]}}
                      </flexbox-item>
                  </flexbox>
                  <flexbox :gutter="0" class="text">
                      <flexbox-item :span="2/5">
                          发货数量：
                      </flexbox-item>
                      <flexbox-item :span="3/5">
                          {{item.amount}}KG
                      </flexbox-item>
                  </flexbox>
              </div>
              <div v-if="productPlanList.length===0" style="position:absolute;margin-top:60px;left:50%;margin-left:-60px;color:#BEBEBE;text-align:center">
                  <i class="iconfont icon-zanwushuju" style="font-size:120px"/>
                  <div class="fs-22">暂无数据</div>
              </div>
          </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
import Panel from '../Panel.vue';
import { Spinner, Flexbox, FlexboxItem, Tab, TabItem, Swiper, SwiperItem } from 'vux';
import http from '../../http/index.js';
import { getQueryString } from '../../utils/commonMethod.js';
import { URL_ASSISTANT_LIST } from '../../constant/url.js';

export default {
    name: 'planContent',
    components: {
        Flexbox,
        FlexboxItem,
        Panel,
        Tab,
        TabItem,
        Swiper,
        SwiperItem
    },
    props: [
        'salesmanList',
        'productPlanList',
        'gradeNameList',
        'type',
        'custids',
        'plantime'
    ],
    data () {
        return {
            custIds: getQueryString('custIds'),
            custPoolIds: getQueryString('custPoolIds'),
            tabSelect: '1'
        }
    },
    created () {
    },
    watch: {
    },
    computed: {
    },
    methods: {
        jump (path) {
            this.$router.push({path: path});
        }
    }
}
</script>
<style lang="scss">
@import '../../styles/common.scss';
.plan-content {
    .vux-tab .vux-tab-item.vux-tab-selected {
        color: $hd-blue;
        border-bottom: 3px solid $hd-blue;
    }
    .vux-tab-ink-bar {
        background-color: $hd-blue;
    }
    .vux-slider {
        height: 100%;
        > .vux-swiper {
            height: 100%!important;
            overflow: auto;
        }
    }
    .mint-tab-container {
        flex: 1;
        overflow: auto;
        width: 100%;
        padding-top: pxToRem(4px);
        // padding-bottom: pxToRem(60px);
        .mint-tab-container-wrap, .mint-tab-container-item {
            height: 100%;
        }
    }
}
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.plan-content {
    // padding: pxToRem(10px) pxToRem(20px);
    // color: #fff;
    flex: 1;
    display: flex;
    flex-direction: column;
    .plan-wrap {
        padding: 0 pxToRem(20px);
        box-sizing: border-box;
        .plan-item {
            padding: pxToRem(10px) 0;
            border-bottom: 1px solid #E0E0E0;
            font-size: 12px;
            .text {
                color:#9D9D9D
            }
        }
    }
}
</style>
