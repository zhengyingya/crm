<template>
    <div class="view-deliverplan-cust flex-cloumn">
        <PlanHead :otherinfo="otherinfo" @changePlantDate="changePlantDate" :type="type"/>
        <div v-if="isDataGet" class="plan-content">
            <tab v-model="tabSelect">
                <tab-item :key="0">客户计划</tab-item>
                <tab-item :key="1">产品计划</tab-item>
            </tab>
            <swiper v-model="tabSelect" :show-dots="false">
                <swiper-item :key="0">
                    <div class="plan-wrap">
                        <div v-for="(item, index) in custList" class="plan-item" @click="checkedRow=index;">
                            <flexbox :gutter="0">
                                <flexbox-item :span="9/10">
                                    <flexbox :gutter="0">
                                        {{item.custname}}
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
                                    <i v-if="checkedRow===index" class="iconfont icon-zhengquewancheng fs-26" style="color:#26a2ff"/>
                                </flexbox-item>
                            </flexbox>
                        </div>
                        <flexbox v-if="otherinfo.isCustPlanCanEdit" :gutter="0" class="footer">
                            <flexbox-item :span="1/2" class="btn-static">
                                <div @click="deletePlan" style="background:#d87a80;color:#fff;">删除计划</div>
                            </flexbox-item>
                            <flexbox-item :span="1/2" class="btn-fast">
                                <div @click="editPlan">修改计划</div>
                            </flexbox-item>
                        </flexbox>
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
                        <div v-if="productPlanList.length===0" style="position:absolute;margin-top:60px;left:50%;margin-left:-60px;color:#BEBEBE;text-align:center">
                            <i class="iconfont icon-zanwushuju" style="font-size:120px"/>
                            <div class="fs-22">暂无数据</div>
                        </div>
                    </div>
                </swiper-item>
            </swiper>
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
    name: 'plan',
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
            userids: getQueryString('userids'),
            isDataGet: false,
            tabSelect: 0,
            plantime: '',
            otherinfo: {},
            custList: [],
            productPlanList: [],
            gradeNameList: {},
            checkedRow: -1
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
            http.get(`${URL_CUST_PLAN_SEARCH}?userids=${this.userids||''}&plantime=${this.plantime}`)
            .then((res) => {
                console.log(res);
                this.isDataGet = true;
                this.otherinfo = res.otherinfo;
                this.custList = res.custList;
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
        },
        deletePlan () {

        },
        editPlan () {
            if (this.checkedRow >= 0) {
                this.$router.push({path: `/plan/create?custIds=${this.custList[this.checkedRow].ids}`})
            }
        }
    }
}
</script>
<style lang="scss">
@import '../../styles/common.scss';
.view-deliverplan-cust {
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
}
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.view-deliverplan-cust {
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
        .plan-wrap {
            padding: 0 pxToRem(20px);
            .plan-item {
                padding: pxToRem(10px) 0;
                border-bottom: 1px solid #E0E0E0;
                font-size: 12px;
                .text {
                    color:#9D9D9D
                }
            }
        }
        .footer {
            position: fixed;
            left: 0;
            bottom: 0;
            height: pxToRem(45px);
            line-height: pxToRem(45px);
            border-top: 1px solid #BEBEBE;
            text-align: center;
            .btn-static {
                background: #fff;
            }
            .btn-fast {
                height: 100%;
                background: $blue;
                color: #fff;
            }
        }
    }
}
</style>
