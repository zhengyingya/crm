<template>
    <div class="view-collection flex-cloumn">
        <flexbox :gutter="0" v-if="isDataGet">
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
        <div v-if="isDataGet" class="plan-content">
            <div class="plan-wrap">
                <div v-for="item in departmentList" class="plan-item">
                    <flexbox :gutter="0">
                        {{item.deptname}}
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
                            前三个月月均销量
                        </flexbox-item>
                        <flexbox-item :span="3/5">
                            {{item.custplanamount}}KG
                        </flexbox-item>
                    </flexbox>
                </div>
            </div>
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
import { URL_SALESMAN_RECEIPT_SEARCH } from '../../constant/url.js';
import http from '../../http/index.js';
import { Spinner, Flexbox, FlexboxItem } from 'vux';

export default {
    name: 'plan',
    components: {
        Panel,
        PlanHead,
        PlanContent,
        Spinner,
        Flexbox,
        FlexboxItem
    },
    data () {
        return {
            type: getQueryString('type'),
            isDataGet: false,
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
            const url = this.type === '1' ? URL_DEPARTMENT_PLAN_SEARCH
                        : this.type === '2' ? URL_SALESMAN_PLAN_SEARCH
                        : URL_CUST_PLAN_SEARCH;

            http.get(`${URL_SALESMAN_RECEIPT_SEARCH}?plantime=${this.plantime}`)
            .then((res) => {
                console.log(res);
                this.isDataGet = true;
                this.otherinfo = res.otherinfo;
                this.departmentList = this.type === '1'? res.departmentList
                                      : this.type === '2' ? res.salesmanList
                                      : [];
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

        }
    }
}
</script>
<style lang="scss">
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.view-collection {
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
    }
}
</style>
