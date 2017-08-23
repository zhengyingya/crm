<template>
    <div class="right-filter">
        <popup v-model="isShow" position="right" @on-hide="hide">
            <div class="flex-cloumn height-full">
                <div class="flex-row" style="width:300px;flex:1">
                    <div class="filterlay-left">
                        <div class="item" :class="filterActive==='1'?'active':''" @click="setFilter({filterType: 'filterActive', filterValue: '1'})">
                            办事处
                        </div>
                        <div class="item" :class="filterActive==='2'?'active':''" @click="setFilter({filterType: 'filterActive', filterValue: '2'})">
                            人员
                        </div>
                        <div class="item" :class="filterActive==='3'?'active':''" @click="setFilter({filterType: 'filterActive', filterValue: '3'})">
                            有交易
                        </div>
                        <div class="item" :class="filterActive==='4'?'active':''" @click="setFilter({filterType: 'filterActive', filterValue: '4'})">
                            关系类型
                        </div>
                        <div class="item" :class="filterActive==='5'?'active':''" @click="setFilter({filterType: 'filterActive', filterValue: '5'})">
                            客户状态
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

                    <div v-if="filterActive==='2'" class="filterlay-right">
                        <div class="item flex-row" @click="setFilter({filterType: 'filterUserIds', filterValue: 'ALL'});setFilter({filterType: 'filterUserName', filterValue: 'ALL'})">
                            <div style="flex:1">全部</div>
                            <i v-if="filterUserIds==='ALL'" class="iconfont icon-zhengquewancheng"/>
                        </div>
                        <div v-for="item in salesmanList" class="item flex-row" @click="setFilter({filterType: 'filterUserIds', filterValue: item.userids});setFilter({filterType: 'filterUserName', filterValue: item.username});">
                            <div style="flex:1">{{item.names}}</div>
                            <i v-if="filterUserIds===item.userids" class="iconfont icon-zhengquewancheng"/>
                        </div>
                    </div>

                    <div v-if="filterActive==='3'" class="filterlay-right">
                        <div class="item flex-row" @click="setFilter({filterType: 'filterMonthRecent', filterValue: 'ALL'});">
                            <div style="flex:1">全部</div>
                            <i v-if="filterMonthRecent==='ALL'" class="iconfont icon-zhengquewancheng"/>
                        </div>
                        <div v-for="item in monthRecentList" class="item flex-row" @click="setFilter({filterType: 'filterMonthRecent', filterValue: item.code});">
                            <div style="flex:1">{{item.name}}</div>
                            <i v-if="filterMonthRecent===item.code" class="iconfont icon-zhengquewancheng"/>
                        </div>
                    </div>

                    <div v-if="filterActive==='4'" class="filterlay-right">
                        <div class="item flex-row" @click="setFilter({filterType: 'filterRelation', filterValue: 'ALL'});">
                            <div style="flex:1">全部</div>
                            <i v-if="filterRelation==='ALL'" class="iconfont icon-zhengquewancheng"/>
                        </div>
                        <div v-for="item in custRelationList" class="item flex-row" @click="setFilter({filterType: 'filterRelation', filterValue: item.childcode});">
                            <div style="flex:1">{{item.childname}}</div>
                            <i v-if="filterRelation===item.childcode" class="iconfont icon-zhengquewancheng"/>
                        </div>
                    </div>

                    <div v-if="filterActive==='5'" class="filterlay-right">
                        <div class="item flex-row" @click="setFilter({filterType: 'filterStatus', filterValue: 'ALL'});">
                            <div style="flex:1">全部</div>
                            <i v-if="filterStatus==='ALL'" class="iconfont icon-zhengquewancheng"/>
                        </div>
                        <div v-for="item in custStatusList" class="item flex-row" @click="setFilter({filterType: 'filterStatus', filterValue: item.childcode});">
                            <div style="flex:1">{{item.childname}}</div>
                            <i v-if="filterStatus===item.childcode" class="iconfont icon-zhengquewancheng"/>
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
import Panel from '../components/Panel.vue';
import { mapActions, mapState } from 'vuex';
import { Popup } from 'vux';
import http from '../http/index.js';
import { URL_LIST_HEAD } from '../constant/url.js';

export default {
    name: 'rightFilter',
    components: {
        Popup
    },
    props: [
        'isFilterShow',
        'onHide'
    ],
    data () {
        return {
            isShow: false,
            searchValue: '',
            departmentList: [],
            salesmanList: [],
            monthRecentList: [],
            custRelationList: [],
            custStatusList: []
        }
    },
    created () {
        // this.init();
        http.get(URL_LIST_HEAD).then((res) => {
            this.departmentList = res.departmentList;
            this.salesmanList = res.salesmanList;
            this.monthRecentList = res.monthRecentList;
            this.custRelationList = res.custRelationList;
            this.custStatusList = res.custStatusList;
        });
    },
    computed: {
        ...mapState({
            filterActive: (state) => {
                return state.customerFilter.filterActive;
            },
            filterDepartment: (state) => {
                return state.customerFilter.filterDepartment;
            },
            filterDeptcode: (state) => {
                return state.customerFilter.filterDeptcode;
            },
            filterUserIds: (state) => {
                return state.customerFilter.filterUserIds;
            },
            filterUserName: (state) => {
                return state.customerFilter.filterUserName;
            },
            filterMonthRecent: (state) => {
                return state.customerFilter.filterMonthRecent;
            },
            filterRelation: (state) => {
                return state.customerFilter.filterRelation;
            },
            filterStatus: (state) => {
                return state.customerFilter.filterStatus;
            }
        })
    },
    watch: {
        isFilterShow (newVal) {
            this.isShow = newVal;
        }
    },
    methods: {
        ...mapActions([
            'setFilter',
            'getFollowData'
        ]),
        init () {
            this.filterActive = '1';
            this.filterDepartment = 'ALL';
            this.filterDeptcode = 'ALL';
            this.filterUserIds = 'ALL';
            this.filterUserName = 'ALL';
            this.filterMonthRecent = 'ALL';
            this.filterRelation = 'ALL';
            this.filterStatus = 'ALL';
            this.departmentList = [];
            this.salesmanList = [];
            this.monthRecentList = [];
            this.custRelationList = [];
            this.custStatusList = [];
        },
        jump (path) {
            this.$router.push({path: path});
        },
        filterConfirm () {
            this.$emit('onConfirm', {
                deptids: this.filterDepartment,
                userids: this.filterUserIds,
                username: this.filterUserName,
                monthRecent: this.filterMonthRecent,
                custRelationCode: this.filterRelation,
                custStatusCode: this.filterStatus,
                deptcode: this.filterDeptcode
            })
        },
        hide () {
            this.$emit('onHide');
        },
        chooseDepartment (code) {
            // this.filterDepartment = code;
        }
    }
}
</script>
<style lang="scss">
</style>
<style scoped lang="scss">
@import '../styles/common.scss';
.right-filter {
    height: 100%;
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
