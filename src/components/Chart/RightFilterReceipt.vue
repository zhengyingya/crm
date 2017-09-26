<template>
    <div class="right-filter-receipt">
        <popup v-model="isShow" position="right" @on-hide="hide">
            <div class="flex-cloumn height-full">
                <div class="flex-row" style="width:300px;flex:1">
                    <div class="filterlay-left">
                        <div class="item" :class="filterActive==='1'?'active':''" @click="setFilter({filterType: 'filterActive', filterValue: '1'})">
                            办事处
                        </div>
                        <div class="item" :class="filterActive==='3'?'active':''" @click="setFilter({filterType: 'filterActive', filterValue: '3'})">
                            人员
                        </div>
                        <div class="item" :class="filterActive==='4'?'active':''" @click="setFilter({filterType: 'filterActive', filterValue: '4'})">
                            客户
                        </div>
                    </div>

                    <div v-if="filterActive==='1'" class="filterlay-right">
                        <div class="item flex-row" @click="setFilter({filterType: 'filterDepartment', filterValue: 'ALL'});setFilter({filterType: 'filterDeptcode', filterValue: 'ALL'});">
                            <div style="flex:1">全部</div>
                            <i v-if="filterDepartment==='ALL'" class="iconfont icon-zhengquewancheng"/>
                        </div>
                        <div v-for="item in departmentList" class="item flex-row"  @click="setFilter({filterType: 'filterDepartment', filterValue: item.deptids});setFilter({filterType: 'filterDeptcode', filterValue: item.deptcode});">
                            <div style="flex:1">{{item.deptname}}</div>
                            <i v-if="filterDepartment===item.deptids" class="iconfont icon-zhengquewancheng"/>
                        </div>
                    </div>

                    <div v-if="filterActive==='3'" class="filterlay-right">
                        <div class="item flex-row" @click="setFilter({filterType: 'filterUserIds', filterValue: 'ALL'});setFilter({filterType: 'filterUserName', filterValue: 'ALL'})">
                            <div style="flex:1">全部</div>
                            <i v-if="filterUserIds==='ALL'" class="iconfont icon-zhengquewancheng"/>
                        </div>
                        <div v-for="item in salesmanList" class="item flex-row" @click="setFilter({filterType: 'filterUserIds', filterValue: item.userids});setFilter({filterType: 'filterUserName', filterValue: item.username});">
                            <div style="flex:1">{{item.names}}</div>
                            <i v-if="filterUserIds===item.userids" class="iconfont icon-zhengquewancheng"/>
                        </div>
                    </div>

                    <div v-if="filterActive==='4'" class="filterlay-right">
                        <div class="item flex-row" @click="setFilter({filterType: 'filterCustIds', filterValue: 'ALL'});setFilter({filterType: 'filterCustCode', filterValue: 'ALL'});">
                            <div style="flex:1">全部</div>
                            <i v-if="filterCustIds==='ALL'" class="iconfont icon-zhengquewancheng"/>
                        </div>
                        <div v-for="item in customerList" class="item flex-row" @click="setFilter({filterType: 'filterCustIds', filterValue: item.ids});setFilter({filterType: 'filterCustCode', filterValue: item.custcode});">
                            <div class="one-line" style="flex:1">{{item.custname}}</div>
                            <i v-if="filterCustIds===item.ids" class="iconfont icon-zhengquewancheng"/>
                        </div>
                    </div>
                </div>

                <div class="filterlay-footer flex-row">
                    <div class="btn-cancel" style="flex:1;" @click="hide">取消</div>
                    <div class="btn-confirm" style="flex:1;" @click="filterConfirm">确定</div>
                </div>
            </div>
        </popup>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Popup, XInput } from 'vux';
import http from '../../http/index.js';
import { URL_LIST_HEAD } from '../../constant/url.js';

export default {
    name: 'rightFilterReceipt',
    components: {
        Popup,
        XInput
    },
    props: [
        'isFilterShow',
        'onHide',
        'departmentList',
        'salesmanList',
        "customerList"
    ],
    data () {
        return {
            isShow: false,

            filterActive: '1',
            filterDepartment: 'ALL',
            filterDeptcode: 'ALL',
            filterCustIds: 'ALL',
            filterCustCode: 'ALL',
            filterUserIds: 'ALL',
            filterUserName: 'ALL'
        }
    },
    created () {
    },
    computed: {
    },
    watch: {
        isFilterShow (newVal) {
            this.isShow = newVal;
        }
    },
    methods: {
        ...mapActions([
            'getFollowData'
        ]),
        init () {
            this.filterActive = '1',
            this.filterDepartment = 'ALL',
            this.filterDeptcode = 'ALL',
            this.filterCustIds = 'ALL',
            this.filterCustCode = 'ALL',
            this.filterUserIds = 'ALL',
            this.filterUserName = 'ALL'
        },
        setFilter ({ filterType, filterValue }) {
            this[filterType] = filterValue;
        },
        jump (path) {
            this.$router.push({path: path});
        },
        filterConfirm () {
            this.$emit('onConfirm', {
                userids: this.filterUserIds,
                username: this.filterUserName,
                deptids: this.filterDepartment,
                deptcode: this.filterDeptcode,
                custids: this.filterCustIds,
                custcode: this.filterCustCode
            })
        },
        hide () {
            this.$emit('onHide');
        }
    }
}
</script>
<style lang="scss">
@import '../../styles/common.scss';
.right-filter-dept {
    .weui-cell {
        border: 1px solid #E0E0E0;
        border-radius: pxToRem(5px);
        padding: pxToRem(5px) pxToRem(15px);
        margin-top: pxToRem(5px);
        line-height: pxToRem(16px);
        background: #fff;
        .weui-input {
            height: pxToRem(16px);
        }
    }
}
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.right-filter-receipt {
    // height: 100%;
    .filterlay-left {
        flex: 2;
        border-right: 1px solid #E0E0E0;
        .active {
            background: #FCFCFC;
            color: $blue;
        }
        .item {
            height: pxToRem(40px);
            line-height: pxToRem(40px);
        }
    }
    .filterlay-right {
        flex: 3;
        padding: 0 pxToRem(10px);
        // height: 100%;
        overflow: auto;
        .item {
            height: pxToRem(40px);
            line-height: pxToRem(40px);
            border-bottom: 1px solid #E0E0E0;
            text-align: left;
            > i {
                width: pxToRem(20px);
                text-align:right;
                color: $blue;
                font-weight: bolder;
            }
        }
    }
    .filterlay-footer {
        height: pxToRem(40px);
        line-height: pxToRem(40px);
        border-top: 1px solid #BEBEBE;
        .btn-cancel {
        }
        .btn-confirm {
            background: $blue;
            color: #fff;
        }
    }
}
</style>
