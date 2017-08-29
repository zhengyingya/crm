<template>
    <div class="view-deliverplan-dept flex-cloumn">
        <PlanHead :otherinfo="otherinfo" @changePlantDate="changePlantDate" :type="type"/>
        <div v-if="isDataGet" class="plan-content">
            <!-- <tab v-model="tabSelect" >
                <tab-item :key="0">部门计划</tab-item>
                <tab-item :key="1">产品计划</tab-item>
            </tab> -->
            <mt-navbar v-model="tabSelect">
                <mt-tab-item id="1">部门计划</mt-tab-item>
                <mt-tab-item id="2">产品计划</mt-tab-item>
            </mt-navbar>
            <!-- tab 部门计划 -->
            <mt-tab-container v-model="tabSelect" :swipeable="false">
                <mt-tab-container-item id="1" class="plan-wrap">
                    <div v-for="item in departmentList" class="plan-item" @click="jump(`/plan/deliver?deptcode=${item.deptcode}&plantime=${plantime}`)">
                        <flexbox :gutter="0">
                            <flexbox-item :span="9/10">
                                <flexbox :gutter="0">
                                    {{item.deptname}}
                                </flexbox>
                                <flexbox :gutter="0" class="text">
                                    <flexbox-item :span="2/5">
                                        前三个月月均销量：
                                    </flexbox-item>
                                    <flexbox-item :span="3/5">
                                        {{item.averageamount}}KG
                                    </flexbox-item>
                                </flexbox>
                                <flexbox :gutter="0" class="text">
                                    <flexbox-item :span="2/5">
                                        本月计划发货：
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
            <!-- <div class="plan-wrap" v-if="tabSelect===0">
                    <div v-for="item in departmentList" class="plan-item" @click="jump(`/plan/custdeliver?userids=${item.userids}`)">
                        <flexbox :gutter="0">
                            {{item.deptname}}
                        </flexbox>
                        <flexbox :gutter="0" class="text">
                            <flexbox-item :span="2/5">
                                前三个月月均销量：
                            </flexbox-item>
                            <flexbox-item :span="3/5">
                                {{item.averageamount}}KG
                            </flexbox-item>
                        </flexbox>
                        <flexbox :gutter="0" class="text">
                            <flexbox-item :span="2/5">
                                本月计划发货：
                            </flexbox-item>
                            <flexbox-item :span="3/5">
                                {{item.custplanamount}}KG
                            </flexbox-item>
                        </flexbox>
                    </div>
                </div>
            <div class="plan-wrap" v-if="tabSelect===1">
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
                </div> -->
        </div>
        <div v-if="!isDataGet" style="margin-top:280px;left:50%;margin-left:-20px;position:absolute"><spinner slot="value" type="lines" size="40px"/></div>
    </div>
</template>

<script>
import Panel from '../../components/Panel.vue';
import PlanHead from '../../components/Plan/PlanHead.vue';
import PlanContent from '../../components/Plan/PlanContent.vue';
import { getQueryString } from '../../utils/commonMethod.js';
import { mapActions } from 'vuex';
import { URL_DEPARTMENT_PLAN_SEARCH, URL_SALESMAN_PLAN_SEARCH, URL_CUST_PLAN_SEARCH } from '../../constant/url.js';
import http from '../../http/index.js';
import { Spinner, Flexbox, FlexboxItem, Tab, TabItem, Swiper, SwiperItem } from 'vux';

export default {
    name: 'deliverPlanDeptment',
    components: {
        Panel,
        PlanHead,
        PlanContent,
        Spinner,
        Flexbox,
        FlexboxItem,
        Tab,
        TabItem,
        Swiper,
        SwiperItem
    },
    data () {
        return {
            type: getQueryString('type'),
            isDataGet: false,
            tabSelect: '1',
            plantime: '',
            otherinfo: {},
            departmentList: [],
            productPlanList: [],
            gradeNameList: {}
        }
    },
    created () {
        this.getPlanData();
    },
    methods: {
        ...mapActions([
        ]),
        getPlanData () {
            this.isDataGet = false;
            http.get(`${URL_DEPARTMENT_PLAN_SEARCH}?plantime=${this.plantime}`)
            .then((res) => {
                console.log(res);
                this.isDataGet = true;
                this.otherinfo = res.otherinfo;
                this.departmentList = res.departmentList;
                this.productPlanList = res.productPlanList;
                let _gradeNameList = {};
                res.gradeList.map((item) => {
                    _gradeNameList[item.childcode] = item.childname;
                });
                this.gradeNameList = _gradeNameList;
            })
        },
        jump (path) {
            this.$router.push({path: path});
        },
        changePlantDate (val) {
            this.plantime = val;
            this.getPlanData();
        }
    }
}
</script>
<style lang="scss">
@import '../../styles/common.scss';
.view-deliverplan-dept {
    .vux-tab .vux-tab-item.vux-tab-selected {
        color: $hd-blue;
        border-bottom: 3px solid $hd-blue;
    }
    .vux-tab {
        // display: inline-block;
    }
    .vux-tab-item {
        height: 44px;
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
    .mint-tab-item {
        border-bottom: 1px solid #d0d0d0;
    }
}
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.view-deliverplan-dept {
    height: 100%;
    overflow: auto;
    // padding-top: pxToRem(20px);
    box-sizing: border-box;
    .plan-content {
        // padding: pxToRem(10px) pxToRem(20px);
        // color: #fff;
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        .plan-wrap {
            padding: 0 pxToRem(20px);
            box-sizing: border-box;
            height: 100%;
            overflow: auto;
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
}
</style>
