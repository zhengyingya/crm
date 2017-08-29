<template>
    <div class="view-collection-dept flex-cloumn">
        <flexbox :gutter="0" class="plan-head">
            <flexbox-item :span="1/4">
                计划月份：
            </flexbox-item>
            <flexbox-item :span="3/4">
                <div @click="openPicker">
                    {{otherinfo.plantimecn}}
                    <i class="iconfont icon-xiangxiazhankai fs-16"/>
                </div>
            </flexbox-item>
        </flexbox>
        <div v-if="isDataGet" class="plan-content">
            <div class="plan-wrap">
                <div v-for="item in deptReceiptList" class="plan-item" @click="jump(`/plan/collection?deptcode=${item.deptcode}&plantime=${plantime}`)">
                    <flexbox :gutter="0">
                        <flexbox-item :span="9/10">
                            <flexbox :gutter="0">
                                {{item.deptname}}
                            </flexbox>
                            <flexbox :gutter="0" class="text">
                                <flexbox-item :span="2/5">
                                    计划收款金额
                                </flexbox-item>
                                <flexbox-item :span="3/5">
                                    {{item.plandeptreceiptamount}}元
                                </flexbox-item>
                            </flexbox>
                            <flexbox :gutter="0" class="text">
                                <flexbox-item :span="2/5">
                                    实际收款金额
                                </flexbox-item>
                                <flexbox-item :span="3/5">
                                    {{item.funddeptreceiptamount}}元
                                </flexbox-item>
                            </flexbox>
                        </flexbox-item>
                        <flexbox-item :span="1/10">
                            <i class="iconfont icon-xiayiyeqianjinchakangengduo"/>
                        </flexbox-item>
                    </flexbox>
                </div>
            </div>
        </div>
        <div v-if="isDataGet && deptReceiptList.length===0" style="position:absolute;margin-top:150px;left:50%;margin-left:-60px;color:#BEBEBE;text-align:center">
            <i class="iconfont icon-zanwushuju" style="font-size:120px"/>
            <div class="fs-22">暂无数据</div>
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
import { URL_DEPARTMENT_RECEIPT_SEARCH } from '../../constant/url.js';
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
            deptReceiptList: [],
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
        // 获取计划数据
        getPlanData () {
            this.isDataGet = false;
            http.get(`${URL_DEPARTMENT_RECEIPT_SEARCH}?plantime=${this.plantime}`)
            .then((res) => {
                console.log(res);
                this.isDataGet = true;
                this.otherinfo = res.otherinfo;
                this.deptReceiptList = res.deptReceiptList;
            })
        },
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
                    me.plantime = val.replace('-', '');
                    me.getPlanData();
                },
                onShow () {
                },
                onHide () {
                }
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
.view-collection-dept {
    height: 100%;
    overflow: auto;
    // padding-top: pxToRem(20px);
    box-sizing: border-box;
    .plan-head {
        background: $hd-blue;
        padding: pxToRem(20px) pxToRem(20px);
        color: #fff;
        font-size: 16px;
        box-sizing: border-box;
    }
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
