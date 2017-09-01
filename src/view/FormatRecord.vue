<template>
    <div class="view-formatrecord flex-cloumn">
        <div class="cust">{{custName}}</div>
        <div class="cnt-wrap" style="">
            <div class="content">
                <flexbox :gutter="0">
                    <flexbox-item :span="1/5">
                        开工率：
                    </flexbox-item>
                    <flexbox-item :span="3/5">
                        <x-input placeholder="请输入开工率" v-model="workrate"></x-input>
                    </flexbox-item>
                    <flexbox-item :span="1/5" style="text-align:center">
                        %
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="flex-row txt-type fs-16" style="border-bottom: 1px solid #E0E0E0">
                <flexbox :gutter="0">
                    <flexbox-item :span="1/5">
                        我方
                    </flexbox-item>
                    <flexbox-item :span="4/5" style="text-align:right;">
                        <div @click="addMyTableData"><i class="iconfont icon-jiahao1 fs-18"/></div>
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="content">
                <flexbox :gutter="0">
                    <flexbox-item :span="2/11" class="text-c">
                        规格
                    </flexbox-item>
                    <flexbox-item :span="2/11" class="text-c">
                        批号
                    </flexbox-item>
                    <flexbox-item :span="2/11" class="text-c">
                        库存
                    </flexbox-item>
                    <flexbox-item :span="2/11" class="text-c">
                        单位
                    </flexbox-item>
                    <flexbox-item :span="2/11" class="text-c">
                        下月需求
                    </flexbox-item>
                    <flexbox-item :span="1/11" class="text-c">
                        删除
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="content table" v-for="(item, index) in myTableData">
                <flexbox :gutter="0">
                    <flexbox-item :span="2/11" class="text-c one-line">
                        <div @click="isSpecificationsShow=true;currentRow=index;">
                            <span>{{item.inp_specification}}</span>
                            <i class="iconfont icon-xiangxiazhankai" />
                        </div>
                    </flexbox-item>
                    <flexbox-item :span="2/11" class="text-c one-line">
                        <div @click="isBatchShow=true;currentRow=index;">
                            <span>{{item.inp_batchNumber}}</span>
                            <i class="iconfont icon-xiangxiazhankai"/>
                        </div>
                    </flexbox-item>
                    <flexbox-item :span="2/11">
                        <div style="padding:0 5px;"><x-input placeholder="" v-model="item.inp_inventory"></x-input></div>
                    </flexbox-item>
                    <flexbox-item :span="2/11">
                        <div style="padding:0 5px;"><x-input placeholder="" v-model="item.inp_unitPrice"></x-input></div>
                    </flexbox-item>
                    <flexbox-item :span="2/11">
                        <div style="padding:0 5px;"><x-input placeholder="" v-model="item.inp_requireAmount"></x-input></div>
                    </flexbox-item>
                    <flexbox-item :span="1/11" class="text-c">
                        <i class="iconfont icon-jianhao" style="color:#FF0000" @click="onDelete(index)"/>
                    </flexbox-item>
                </flexbox>
            </div>

            <div class="flex-row txt-type fs-16" style="border-bottom: 1px solid #E0E0E0">
                <flexbox :gutter="0">
                    <flexbox-item :span="1/5">
                        竞争对手
                    </flexbox-item>
                    <flexbox-item :span="4/5" style="text-align:right;">
                        <div @click="addHisTableData"><i class="iconfont icon-jiahao1 fs-18"/></div>
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="content">
                <flexbox :gutter="0">
                    <flexbox-item :span="2/9" class="text-c">
                        名称
                    </flexbox-item>
                    <flexbox-item :span="2/9" class="text-c">
                        规格
                    </flexbox-item>
                    <flexbox-item :span="2/9" class="text-c">
                        库存
                    </flexbox-item>
                    <flexbox-item :span="2/9" class="text-c">
                        单价
                    </flexbox-item>
                    <flexbox-item :span="1/9" class="text-c">
                        删除
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="content table" v-for="(item, index) in hisTableData">
                <flexbox :gutter="0">
                    <flexbox-item :span="2/9" class="text-c one-line">
                        <div style="padding:0 5px;"><x-input placeholder="" v-model="item.inp_competitorName"></x-input></div>
                    </flexbox-item>
                    <flexbox-item :span="2/9" class="text-c one-line">
                        <div style="padding:0 5px;"><x-input placeholder="" v-model="item.inp_specification"></x-input></div>
                    </flexbox-item>
                    <flexbox-item :span="2/9">
                        <div style="padding:0 5px;"><x-input placeholder="" v-model="item.inp_inventory"></x-input></div>
                    </flexbox-item>
                    <flexbox-item :span="2/9">
                        <div style="padding:0 5px;"><x-input placeholder="" v-model="item.inp_unitPrice"></x-input></div>
                    </flexbox-item>
                    <flexbox-item :span="1/9" class="text-c">
                        <i class="iconfont icon-jianhao" style="color:#FF0000" @click="onDeleteHisRow(index)"/>
                    </flexbox-item>
                </flexbox>
            </div>

            <div class="btn-sub fs-16" @click="submit">
                保存
            </div>

            <!-- 规格选择弹框 -->
            <popup v-model="isSpecificationsShow">
                <div class="head flex-row">
                    <div class="flex-1 text-l" style="color:#828282" @click="isSpecificationsShow=false;">取消</div>
                    <div class="flex-1 text-r" style="color:#26a2ff" @click="chooseSpecifications">完成</div>
                </div>
                <div class="popup0">
                    <picker :data="specificationsData" v-model="specificationsValue"></picker>
                </div>
            </popup>
            <!-- 批号选择弹框 -->
            <popup v-model="isBatchShow">
                <div class="head flex-row">
                    <div class="flex-1 text-l" style="color:#828282" @click="isBatchShow=false;">取消</div>
                    <div class="flex-1 text-r" style="color:#26a2ff" @click="chooseBatchNumber">完成</div>
                </div>
                <div class="popup0">
                    <picker :data="batchNumberData[currentRow]||[]" v-model="batchNumberValue"></picker>
                </div>
            </popup>
        </div>

    </div>
</template>

<script>
import Panel from '../components/Panel.vue';
import { mapActions } from 'vuex';
import { getQueryString } from '../utils/commonMethod.js';
import http from '../http/index.js';
import { URL_GET_PRO_SPECIFICATION, URL_GET_BATCH_NUMBER, URL_SAVE_CUSTOTHERINFO } from '../constant/url.js';
import { PopupPicker, Popup, Picker, Flexbox, FlexboxItem, XInput } from 'vux';
import { Toast, MessageBox } from 'mint-ui';

export default {
    name: 'formatRecord',
    components: {
        Panel,
        PopupPicker,
        Popup,
        Picker,
        Flexbox,
        FlexboxItem,
        XInput
    },
    data () {
        return {
            custIds: getQueryString('custIds'),
            custName: decodeURI(decodeURI(getQueryString('custName'))),
            contactsIds: getQueryString('contactsIds'),
            workrate: '',
            isSpecificationsShow: false,
            isBatchShow: false,
            currentRow: 0,
            specificationsData: [],                 // 规格列表数据
            specificationsValue: [],                // 规格选择的数据
            batchNumberData: [],                    // 批号列表数据
            batchNumberValue: [],                   // 批号列表数据
            myTableData: [],                        // 我方数据数组
            hisTableData: []                        // 竞争对手数据数组
        }
    },
    created () {
        http.get(`${URL_GET_PRO_SPECIFICATION}`).then((res) => {
            const _a = res.map((item) => {
                return {
                    value: item.specification,
                    name: item.specification
                };
            });
            this.specificationsData = [_a];
        });

    },
    methods: {
        ...mapActions([
            'getAchievementData',
            'getFollowData'
        ]),
        getBatchNumber (index, specification) {
            http.get(`${URL_GET_BATCH_NUMBER}?specification=${specification}`).then((res) => {
                console.log(res)
                const _a = res.map((item) => {
                    return {
                        value: item.batchnumber,
                        name: item.batchnumber
                    };
                });
                this.batchNumberData[index] = [_a];
            })
        },
        // 添加我方一行数据
        addMyTableData () {
            this.myTableData.push({
                inp_specification: '',
                inp_batchNumber: '',
                inp_inventory: '',
                inp_unitPrice: '',
                inp_requireAmount: ''
            });
            this.batchNumberData.push([]);
        },
        // 添加竞争对手一行数据
        addHisTableData () {
            this.hisTableData.push({
                inp_competitorName: '',
    			inp_specification: '',
    			inp_inventory: '',
    			inp_unitPrice: ''
            });
        },
        // 选择规格
        chooseSpecifications () {
            this.isSpecificationsShow = false;
            this.myTableData[this.currentRow].inp_specification = this.specificationsValue.join('');
            this.getBatchNumber(this.currentRow, this.specificationsValue.join(''));
        },
        // 选择批号
        chooseBatchNumber () {
            this.isBatchShow = false;
            this.myTableData[this.currentRow].inp_batchNumber = this.batchNumberValue.join('');
        },
        // 删除一行
        onDelete (index) {
            MessageBox.confirm('确定要删除?').then(action => {
                this.myTableData.splice(index, 1);
                this.batchNumberData.splice(index, 1);
            });
        },
        // 删除竞争对手数据一行
        onDeleteHisRow (index) {
            MessageBox.confirm('确定要删除?').then(action => {
                this.hisTableData.splice(index, 1);
            });
        },
        submit () {
            console.log(this.myTableData, this.hisTableData);
            http.post(URL_SAVE_CUSTOTHERINFO, {
                body: `custIds=${this.custIds}&custOtherInfo.workrate=${this.workrate}&dataWe=${JSON.stringify(this.myTableData)}&dataCompetitor=${JSON.stringify(this.hisTableData)}&` +
                      `contactsIds=${this.contactsIds || ''}`
            }).then((res) => {
                Toast({
                  message: res.message,
                  position: 'bottom',
                  duration: 1000
                });
                this.$router.back();
                // location.href = `#/customer/detail?custIds=${this.custIds}`;
            })
        }
    }
}
</script>
<style lang="scss">
@import '../styles/common.scss';
.view-formatrecord {
    .weui-cell {
        border: 1px solid #E0E0E0;
        border-radius: pxToRem(5px);
        padding: pxToRem(5px) pxToRem(15px);
    }
    .vux-flex-row {
        height: pxToRem(40px);
    }
    .table {
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
}
</style>
<style scoped lang="scss">
@import '../styles/common.scss';
.view-formatrecord {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    // padding-top: pxToRem(20px);
    .cust {
        height: pxToRem(60px);
        line-height: pxToRem(60px);
        font-size: 16px;
        color: $blue;
        background: #F0F0F0;//linear-gradient(0deg, $bg-blue, #66B3FF);
    }
    .cnt-wrap {
        background:#fff;
        flex:1;
        height:100%;
        overflow:auto;
        padding-bottom: pxToRem(50px);
        box-sizing: border-box;
        .txt-type {
            height: pxToRem(40px);
            line-height: pxToRem(40px);
            background: rgba(38,162,255,0.7);
            padding: 0 pxToRem(10px);
            color: #fff;
        }
        .content {
            padding: 0 pxToRem(10px);
        }
        .head {
            height: pxToRem(40px);
            line-height: pxToRem(40px);
            padding: 0 pxToRem(20px);
            background: #fbf9fe;
            font-size: 16px;
            z-index: 1000;
        }
        .popup0 {
            // padding-bottom:15px;
            padding-top: 100px;
            height: pxToRem(240px);
            overflow: hidden;
            box-sizing: border-box;
        }
    }
    .btn-sub {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: pxToRem(40px);
        line-height: pxToRem(40px);
        background: $blue;
        color: #fff;
    }
}
</style>
