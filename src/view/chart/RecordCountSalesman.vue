<template>
    <div class="view-record-man flex-cloumn">
        <div v-if="!isCustomerDataGet" style="margin-top:280px;left:50%;margin-left:-20px;position:absolute"><spinner slot="value" type="lines" size="40px"/></div>
        <flexbox :gutter="0" style="border-bottom:1px solid #E0E0E0;">
            <flexbox-item :span="1/2" class="text-date">
                <div @click="openPicker" class="text-c" >
                    {{otherinfo.plantimecn}}
                    <i class="iconfont icon-xiangxiazhankai"/>
                </div>
            </flexbox-item>
            <flexbox-item :span="1/2" style="background:#fff;height:50px;margin-left:0;">
            </flexbox-item>
        </flexbox>
        <div v-if="isCustomerDataGet" class="flex-1 text-l" style="100%;overflow:auto">
            <!-- <div>{{custname}}</div> -->
            <div v-for="item in salesmanList" class="cnt-item flex-row" @click="jump(`/mail/personal?userIds=${item.userids}`)">
                <div class="flex-3">
                    <div style="margin-bottom:5px;">{{item.names}}</div>
                    <div class="flex-row text-des"><div class="flex-2">活动记录数：</div><div class="flex-4"><span :style="{color:item.frcount>0?'#26a2ff':''}">{{item.frcount}}</span>条</div></div>
                </div>
                <div class="flex-1 flex-row" style="align-items:center;justify-content:flex-end"><i class="iconfont icon-xiayiyeqianjinchakangengduo"/></div>
            </div>
        </div>

         <div v-if="isCustomerDataGet&&salesmanList.length===0" style="position:absolute;margin-top:160px;left:50%;margin-left:-60px;color:#BEBEBE;text-align:center">
             <i class="iconfont icon-zanwushuju" style="font-size:120px"/>
             <div class="fs-22">暂无数据</div>
         </div>
    </div>
</template>

<script>
import RightFilterProduct from '../../components/Chart/RightFilterProduct';
import { mapActions } from 'vuex';
import { Spinner, Flexbox, FlexboxItem } from 'vux';
import { URL_FT_SALESMAN } from '../../constant/url';
import { getQueryString } from '../../utils/commonMethod.js';
import http from '../../http';

export default {
    name: 'recordCountMan',
    components: {
        RightFilterProduct,
        Spinner,
        Flexbox,
        FlexboxItem
    },
    data () {
        return {
            otherinfo: {},
            plantime: getQueryString('plantime') || '',
            deptIds: getQueryString('deptIds') || '',
            isCustomerDataGet: false,
            isFilterShow: false,
            salesmanList: []
        }
    },
    mounted () {
        this.getAchievementData();
        if (this.creditno) {
            this.$refs.filter.setFilter({
                filterType: 'filterCredit',
                filterValue: this.creditno
            });
        }
    },
    methods: {
        ...mapActions([
        ]),
        jump (path) {
            this.$router.push({path: path});
        },
        getAchievementData () {
            this.isCustomerDataGet = false;
            http.post(URL_FT_SALESMAN, {
                body: `timeMonth=${this.plantime}&deptIds=${this.deptIds}`
            })
            .then((res) => {
                this.isCustomerDataGet = true;
                this.otherinfo = res.otherinfo;
                this.salesmanList = res.salesmanList;
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
                    me.getAchievementData();
                },
                onShow () {
                },
                onHide () {
                }
            })
        },
        onHide () {
            this.isFilterShow = false;
        },
        onConfirm (data) {
            this.userids = data.userids;
            this.username = data.username;
            this.deptids = data.deptids;
            this.deptcode = data.deptcode
            this.creditno = data.creditno;
            this.origin = data.origin;
            this.grade = data.grade;
            this.getAchievementData();
            this.onHide();
        }
    }
}
</script>
<style lang="scss">
    .vux-datetime-confirm {
        color: #26a2ff!important;
    }
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.view-record-man {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    // padding-top: pxToRem(20px);
    box-sizing: border-box;
    .text-date {
        background: #26a2ff;
        padding-left:pxToRem(20px);
        box-sizing:border-box;
        font-weight: bolder;
        height: pxToRem(50px);
        line-height:pxToRem(50px);
        color: #fff;
    }
    .cnt-item {
        padding: pxToRem(10px) pxToRem(20px);
        background: #fff;
        border-bottom: solid 1px #d0d0d0;
        .text-des {
            font-size: 12px;
            color: #BEBEBE;
        }
    }
}
</style>
