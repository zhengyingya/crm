<template>
    <div class="view-collectionplan-create">
        <div class="header">
            <div class="fs-20 name">{{custName}}</div>
            <flexbox :gutter="0">
                <flexbox-item :span="4/5">
                    <div @click="openPicker">
                        收款计划月份：{{otherinfo.plantimecn}}
                        <i class="iconfont icon-xiangxiazhankai fs-16"/>
                    </div>
                </flexbox-item>
                <flexbox-item :span="3/5">

                </flexbox-item>
            </flexbox>
            <flexbox :gutter="0">
                <flexbox-item>
                    {{otherinfo.info||'本月暂无该客户收款计划'}}
                </flexbox-item>
            </flexbox>
        </div>
        <div class="body">
            <flexbox :gutter="0">
                <flexbox-item :span="1/4">
                    收款金额：
                </flexbox-item>
                <flexbox-item :span="3/5">
                    <x-input placeholder="" v-model="collectionValue"></x-input>
                </flexbox-item>
                <flexbox-item :span="3/5" style="margin-left:10px;">
                    元
                </flexbox-item>
            </flexbox>
        </div>
        <flexbox :gutter="0" class="footer">
            <flexbox-item :span="1/2" class="btn-clear">
                <div @click="onDelete">删除</div>
            </flexbox-item>
            <flexbox-item :span="1/2" class="btn-save">
                <div @click="save">保存</div>
            </flexbox-item>
        </flexbox>
    </div>
</template>

<script>
import Panel from '../../components/Panel.vue';
import { mapActions } from 'vuex';
import { getQueryString } from '../../utils/commonMethod.js';
import http from '../../http/index.js';
import { Spinner, Flexbox, FlexboxItem, XInput } from 'vux';
import { URL_ADD_CUST_RECEIPT_PLAN, URL_CUST_RECEIPT_PLAN_SAVE, URL_CUST_RECEIPT_PLAN_DELETE } from '../../constant/url.js';
import { Toast, MessageBox } from 'mint-ui';

export default {
    name: 'plan',
    components: {
        Panel,
        Spinner,
        Flexbox,
        FlexboxItem,
        XInput
    },
    data () {
        return {
            custIds: getQueryString('custIds'),
            custName: decodeURI(decodeURI(getQueryString('custName'))),
            collectionValue: '',
            custReceiptPlanIds: '',
            planReceiptAmount: '',
            otherinfo: {},
            plantime: ''
        }
    },
    created () {
        this.getCustReceiptPlan()
    },
    methods: {
        ...mapActions([
        ]),
        getCustReceiptPlan () {
            http.get(`${URL_ADD_CUST_RECEIPT_PLAN}?custIds=${this.custIds}&plantime=${this.plantime}`)
            .then((res) => {
                this.collectionValue = res.planReceiptAmount;
                this.custReceiptPlanIds = res.custReceiptPlanIds || '';
                this.otherinfo = res.otherinfo;
                this.plantime = res.otherinfo.planmonth;
            })
        },
        jump (path) {
            this.$router.push({path: path});
        },
        // 打开时间选择器
        openPicker () {
            const me = this;
            this.$vux.datetime.show({
                cancelText: '取消',
                confirmText: '确定',
                format: 'YYYY-MM',                  // 供选择的时间格式
                value: me.otherinfo.plantimecn.replace('年', '-').replace('月', ''),       // 初始时间
                onConfirm (val) {
                    me.plantime = val.replace('-', '');
                    me.getCustReceiptPlan();
                },
                onShow () {
                  console.log('plugin show')
                },
                onHide () {
                  console.log('plugin hide')
                }
            })
        },
        // 保存计划
        save () {
            http.post(URL_CUST_RECEIPT_PLAN_SAVE, {
                body: `custReceiptPlan.planmonth=${this.plantime}&custReceiptPlan.custids=${this.custIds}&` +
                      `custReceiptPlan.ids=${this.custReceiptPlanIds}&custReceiptPlan.planreceiptamount=${this.collectionValue}`
            })
            .then((res) => {
                Toast({
                  message: res.message,
                  position: 'bottom',
                  duration: 1000
                });
                this.$router.back();
            })
        },
        // 删除计划
        onDelete () {
            if (this.custReceiptPlanIds) {
                MessageBox.confirm('确定要删除?')
                .then(action => {
                    http.post(URL_CUST_RECEIPT_PLAN_DELETE, {
                        body: `ids=${this.custReceiptPlanIds}`
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
            }
        }
    }
}
</script>
<style lang="scss">
@import '../../styles/common.scss';
.vux-datetime-confirm {
    color: $blue!important;
}
.view-collectionplan-create {
    .weui-cell {
        border: 1px solid #E0E0E0;
        border-radius: pxToRem(5px);
        padding: pxToRem(5px) pxToRem(15px);
    }
    .weui-cell__ft {
        display: none;
    }
    .weui-cell {
        padding: pxToRem(5px);
        .weui-input {
            height: pxToRem(16px);
        }
    }
    .vux-flex-row {
        height: pxToRem(35px);
    }
}
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.view-collectionplan-create {
    height: 100%;
    overflow: auto;
    // padding-top: pxToRem(20px);
    box-sizing: border-box;
    .header {
        background: #66B3FF;
        padding: 0 pxToRem(20px);
        padding-top: pxToRem(30px);
        color: #F0F0F0;
        overflow: hidden;
        .name {
            margin-bottom: pxToRem(10px);
        }
    }
    .body {
        padding: pxToRem(20px);
    }
    .footer {
        position: fixed;
        bottom: 0;
        height: pxToRem(45px);
        line-height: pxToRem(45px);
        border-top: 1px solid #BEBEBE;
        text-align: center;
        .btn-add {
            background: #fff;
        }
        .btn-clear {
            background: #d87a80;
            color: #fff;
        }
        .btn-save {
            height: 100%;
            background: #2ec7c9;
            color: #fff;
        }
    }
}
</style>
