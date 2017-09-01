<template>
    <div class="view-plancreate flex-cloumn">
        <div class="header" style="position:fixed;width:100%;">
            <Flexbox :gutter="0" class="head-line">
                <FlexboxItem :span="1/4">
                    客户：
                </FlexboxItem>
                <FlexboxItem :span="3/4">
                    {{customer.custname}}
                </FlexboxItem>
            </Flexbox>
            <Flexbox :gutter="0" class="head-line">
                <FlexboxItem :span="1/4">
                    计划月份：
                </FlexboxItem>
                <FlexboxItem :span="3/4">
                    <div @click="openPicker">{{otherinfo.plantimecn}}
                        <i class="iconfont icon-xiangxiazhankai fs-16" style="font-weight:bolder"/>
                    </div>
                </FlexboxItem>
            </Flexbox>
            <Flexbox :gutter="0" class="head-line">
                <FlexboxItem :span="1/4">
                    提示：
                </FlexboxItem>
                <FlexboxItem :span="3/4">
                    {{otherinfo.info}}
                </FlexboxItem>
            </Flexbox>
        </div>

        <div class="wrap plandata-wrap">
            <div v-for="(item, key) in products" style="margin-bottom:10px;">
                <div class="txt-key">{{key}}</div>
                <div v-for="(one, index) in item">
                    <mt-cell-swipe
                        :right="[
                        {
                          content: '删除',
                          style: { width: '50px', background: 'red', color: '#fff',display:'flex',alignItems:'center',justifyContent:'center' },
                          handler () {
                              deleteHandler(key, index)
                          }
                      }
                      ]">
                      <div class="flex-cloumn" style="width:100%;">
                        <flexbox :gutter="0">
                            <flexbox-item :span="2/3" class="btn-add">
                                <div class="row">
                                    <span>规格：</span><span>{{one.specification}}</span>
                                    <span>批号：</span><span>{{one.batchnumber}}</span>
                                </div>
                            </flexbox-item>
                            <flexbox-item :span="1/3" class="btn-add">
                                <div class="row" @click="isQualityShow=true;currentRow=index;currentKey=key;">
                                    <div class="text-r" style="color:#26a2ff">
                                        {{one.gradecode?gradeNameList[one.gradecode]:otherinfo.defaultgradename}} {{one.weightunit}}
                                        <i class="iconfont icon-xiayiyeqianjinchakangengduo"/>
                                    </div>
                                </div>
                            </flexbox-item>
                        </flexbox>
                        <flexbox :gutter="0" class="row row1">
                            <flexbox-item :span="1/4">
                                数量
                            </flexbox-item>
                            <flexbox-item :span="3/4">
                                <x-input placeholder="" v-model="one.amount"></x-input>
                            </flexbox-item>
                        </flexbox>
                        <flexbox :gutter="0" class="row row1">
                            <flexbox-item :span="1/4">
                                参考价
                            </flexbox-item>
                            <flexbox-item :span="3/4">
                                <x-input placeholder="" v-model="one.baseprice"></x-input>
                            </flexbox-item>
                        </flexbox>
                      </div>
                    </mt-cell-swipe>
                </div>
            </div>
        </div>
        <flexbox :gutter="0" class="footer">
            <flexbox-item :span="1/3" class="btn-add">
                <div @click="isPopupShow=true;">添加产品</div>
            </flexbox-item>
            <flexbox-item :span="1/3" class="btn-clear">
                <div @click="products={}">清空列表</div>
            </flexbox-item>
            <flexbox-item :span="1/3" class="btn-save">
                <div @click="save">保存计划</div>
            </flexbox-item>
        </flexbox>
        <AddProduct :isPopupShow="isPopupShow"
                    :productGrouplist="productGrouplist"
                    :specificationList="specificationList"
                    @onHide="onHide"
                    @addProduct="addProduct"/>

        <!-- 批号选择弹框 -->
        <popup v-model="isQualityShow">
            <div class="head flex-row">
                <div class="flex-1 text-l" style="color:#828282" @click="isQualityShow=false;">取消</div>
                <div class="flex-1 text-r" style="color:#26a2ff" @click="chooseQuality">完成</div>
            </div>
            <div class="popup0">
                <picker :data="QualityList" v-model="qualityValue"></picker>
            </div>
        </popup>
    </div>
</template>

<script>
import AddProduct from '../components/Plan/AddProduct.vue';
import { mapActions } from 'vuex';
import { getQueryString } from '../utils/commonMethod.js';
import http from '../http/index.js';
import { URL_ADD_CUST_PLAN, URL_PRODUCT_LIST, URL_SAVE_CUST_PLAN } from '../constant/url.js';
import { Spinner, Flexbox, FlexboxItem, Search, Picker, Popup, XInput } from 'vux';
import { Toast } from 'mint-ui';

export default {
    name: 'planCreate',
    components: {
        Spinner,
        Flexbox,
        FlexboxItem,
        Search,
        AddProduct,
        Picker,
        Popup,
        XInput
    },
    data () {
        return {
            custIds: getQueryString('custIds'),
            plantime: getQueryString('plantime'),
            // custName: decodeURI(decodeURI(getQueryString('custName'))),
            customer: {},
            otherinfo: {},
            isPopupShow: false,
            isQualityShow: false,
            productGrouplist: [],
            specificationList: [],
            origincodeList: {},                         // 公司所在地名与代码对应表
            products: {},
            QualityList: [[{value:'01',name: '一等品'}, {value:'02',name: '二等品'}, {value:'03',name: '等外品'}]],
            qualityValue: [],
            amount: '',
            baseprice: '',
            currentRow: '',                             // 当前行数
            currentKey: '',                             // 当前块的关键字，例如浙江省或者重庆市
        }
    },
    created () {
        this.getPlanData();
        this.getProductList();
    },
    watch: {
    },
    methods: {
        ...mapActions([
            'getAchievementData',
            'getFollowData'
        ]),
        getPlanData () {
            http.get(`${URL_ADD_CUST_PLAN}?custIds=${this.custIds}&plantime=${this.plantime||''}`).then((res) => {
                console.log(res)
                this.otherinfo = res.otherinfo;
                this.customer = res.customer;
                this.plantime = res.otherinfo.plantime;
                this.products = {};
                let _gradeNameList = {};
                res.gradeNameList.map((item) => {
                    _gradeNameList[item.childcode] = item.childname;
                });
                this.gradeNameList = _gradeNameList;
                res.custPlanList.map((item) => {
                    this.products[item.originname] = item.originlist;
                    this.origincodeList[item.originname] = item.origincode;
                })
                console.log('========', this.origincodeList)
                // this.custPlanList = res.custPlanList;
            })
        },
        getProductList () {
            http.get(`${URL_PRODUCT_LIST}?custIds=${this.custIds}`).then((res) => {
                this.productGrouplist = res.productGrouplist;
                // this.specificationList = res.specificationList;
                let _a = res.specificationList.map((item) => {
                    return {
                        value: item.specification,
                        name: item.specification
                    };
                });
                _a.unshift({
                    value: 'all',
                    name: '全部'
                });
                this.specificationList = [_a];
            })
        },
        // 打开时间选择器
        openPicker () {
            const me = this;
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
        onHide () {
            this.isPopupShow = false;
        },
        // 添加一个新产品
        addProduct (data) {
            data.map((item) => {
                const { specification, batchnumber, province } = item;
                if (!this.products[province]) {
                    this.products[province] = [];
                }
                this.products[province].push({
                    specification,
                    batchnumber,
                    gradecode: '',
                    amount: '1',
                    baseprice: '0',
                    weightunit: 'KG'
                })
            })
        },
        chooseQuality () {
            this.products[this.currentKey][this.currentRow].gradecode = this.qualityValue.join('');
            this.isQualityShow = false;
            console.log(this.products)
        },
        save () {
            let data = [];
            for (let key in this.products) {
                this.products[key].map((item2) => {
                    data.push({
                        sp_custmark: `规格:${item2.specification}; 批号:${item2.batchnumber}`,
                        sp_grade: this.gradeNameList[item2.gradecode],
                        inp_specification: item2.specification,
                        inp_batchnumber: item2.batchnumber,
                        inp_origincode: this.origincodeList[key],
                        inp_grade: item2.gradecode,
                        inp_amount: item2.amount,
                        inp_baseprice: item2.baseprice,
                        inp_weightunit: item2.weightunit
                    })
                })
            }
            http.post(URL_SAVE_CUST_PLAN, {
                body: `custPlan.plantime=${this.otherinfo.plantime}&custPlan.custids=${this.custIds}&data=${JSON.stringify(data)}`
            }).then((res) => {
                console.log(res)
                Toast({
                  message: res.message,
                  position: 'bottom',
                  duration: 1000
                });
                this.$router.back();
                // this.$router.replace({path: `/customer/detail?custIds=${this.custIds}&reload=true`});
            })
        },
        deleteHandler (key, index) {
            this.products[key].splice(index, 1);
            this.products = JSON.parse(JSON.stringify(this.products));
        }
    }
}
</script>
<style lang="scss">
@import '../styles/common.scss';
.view-plancreate {
    .weui-cell__ft {
        display: none;
    }
    .weui-cell {
        border: 1px solid #E0E0E0;
        border-radius: pxToRem(5px);
        padding: pxToRem(5px) pxToRem(15px);
        line-height: pxToRem(16px);
        .weui-input {
            height: pxToRem(16px);
        }
    }
    .mint-cell {
        min-height: 0;
        .mint-cell-wrapper {
            background-image: none;
            // border-bottom: 1px solid #F0F0F0;
            height: pxToRem(35px);
            padding: pxToRem(5px) pxToRem(20px);
            text-align: left;
            font-size: 14px;
        }
    }
    .plandata-wrap {
        .mint-cell .mint-cell-wrapper {
            height: auto;
            .mint-cell-title {
                display: none;
            }
            .mint-cell-value {
                width: 100%;
            }
        }
    }
}
</style>
<style scoped lang="scss">
@import '../styles/common.scss';
.view-plancreate {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    padding-top: pxToRem(120px);
    padding-bottom: pxToRem(45px);
    box-sizing: border-box;
    .header {
        position:fixed;
        width:100%;
        margin-top: pxToRem(-120px);
        background: #66B3FF;
        z-index: 101;
        .head-line {
            height: pxToRem(40px);
            padding: 0 pxToRem(20px);
            // background: #fff;
            color: #fff;
            font-size: 14px;
        }
    }
    .wrap {
        height: 100%;
        overflow: auto;
        background: #fff;
        .txt-key {
            height: pxToRem(35px);
            line-height: pxToRem(35px);
            background: #E0E0E0;
            text-align: left;
            padding: 0 pxToRem(20px);
            color: #4F4F4F;
        }
        .row {
            height: pxToRem(35px);
            line-height: pxToRem(35px);
            // padding: 0 pxToRem(20px);
            background: #fff;
            box-sizing: border-box;
        }
        .row1 {
            padding: 0;
        }
    }
    .footer {
        position: fixed;
        bottom: 0;
        height: pxToRem(45px);
        line-height: pxToRem(45px);
        border-top: 1px solid #BEBEBE;
        border-bottom: 1px solid #BEBEBE;
        // box-sizing: border-box;
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
    .head {
        height: pxToRem(40px);
        line-height: pxToRem(40px);
        padding: 0 pxToRem(20px);
        border-top: 1px solid #d0d0d0;
        background: #fbf9fe;
        font-size: 16px;
        z-index: 1000;
    }
}
</style>
