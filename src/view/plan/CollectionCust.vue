<template>
    <div class="view-collection-cust flex-cloumn">
        <flexbox :gutter="0" class="plan-head">
            <flexbox-item :span="2/5">
                计划月份：
            </flexbox-item>
            <flexbox-item :span="3/5">
                <div @click="openPicker">
                    {{otherinfo.plantimecn}}
                    <i class="iconfont icon-xiangxiazhankai fs-16"/>
                </div>
            </flexbox-item>
        </flexbox>
        <div v-if="isDataGet" class="plan-content">
            <div class="plan-wrap">
                <div v-for="(item, index) in custReceiptList" class="plan-item" @click="checkedRow=index;">
                    <flexbox :gutter="0">
                        <flexbox-item :span="9/10">
                            <flexbox :gutter="0">
                                {{item.custname}}
                            </flexbox>
                            <flexbox :gutter="0" class="text">
                                <flexbox-item :span="2/5">
                                    计划收款金额
                                </flexbox-item>
                                <flexbox-item :span="3/5">
                                    {{item.planreceiptamount}}元
                                </flexbox-item>
                            </flexbox>
                            <flexbox :gutter="0" class="text">
                                <flexbox-item :span="2/5">
                                    实际收款金额
                                </flexbox-item>
                                <flexbox-item :span="3/5">
                                    {{item.fundreceiptamount}}元
                                </flexbox-item>
                            </flexbox>
                        </flexbox-item>
                        <flexbox-item :span="1/10">
                            <i v-if="otherinfo.isCustPlanCanEdit && checkedRow===index" class="iconfont icon-zhengquewancheng fs-26" style="color:#26a2ff"/>
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
        </div>
        <div v-if="isDataGet && custReceiptList.length===0" style="position:absolute;margin-top:150px;left:50%;margin-left:-60px;color:#BEBEBE;text-align:center">
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
import { URL_CUST_RECEIPT_SEARCH } from '../../constant/url.js';
import http from '../../http/index.js';
import { Spinner, Flexbox, FlexboxItem } from 'vux';
import { Toast, MessageBox } from 'mint-ui';

export default {
    name: 'collectionCust',
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
            userids: getQueryString('userids'),
            plantime: getQueryString('plantime') || '',
            isDataGet: false,
            otherinfo: {},
            custReceiptList: [],
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
            http.get(`${URL_CUST_RECEIPT_SEARCH}?plantime=${this.plantime}&userids=${this.userids||''}`)
            .then((res) => {
                console.log(res);
                this.isDataGet = true;
                this.otherinfo = res.otherinfo;
                this.custReceiptList = res.custReceiptList;
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
                yearRow: '{value}年',
                monthRow: '{value}月',
                value: me.otherinfo.plantimecn.replace('年', '-').replace('月', ''),       // 初始时间
                onConfirm (val) {
                    me.plantime = val.replace('-', '');
                    me.getPlanData();
                },
                onShow () {
                  console.log('plugin show')
                },
                onHide () {
                  console.log('plugin hide')
                }
            })
        },
        jump (path) {
            this.$router.push({path: path});
        },
        changePlantDate (val) {

        },
        deletePlan () {
            MessageBox.confirm('确定要删除?')
            .then(action => {
                http.post(URL_CUST_RECEIPT_PLAN_DELETE, {
                    body: `ids=${this.custReceiptList[this.checkedRow].ids}`
                })
                .then((res) => {
                    Toast({
                        message: res.message,
                        position: 'bottom',
                        duration: 1000
                    });
                    this.$router.back();
                })
            });
        },
        editPlan () {
            if (this.checkedRow >= 0) {
                this.$router.push({path: encodeURI(encodeURI(`/plan/collectioncreate?custIds=${this.custReceiptList[this.checkedRow].custids}&custname=${this.custReceiptList[this.checkedRow].custname}`))})
            }
        }
    }
}
</script>
<style lang="scss">
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.view-collection-cust {
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
</style>
