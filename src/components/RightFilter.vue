<template>
    <div class="right-filter">
        <popup v-model="isShow" position="right" @on-hide="hide">
            <div class="flex-cloumn height-full">
                <div class="flex-row" style="width:300px;flex:1">
                    <div class="filterlay-left">
                        <div class="item" :class="filterActive==='1'?'active':''" @click="filterActive='1'">
                            办事处
                        </div>
                        <div class="item" :class="filterActive==='2'?'active':''" @click="filterActive='2'">
                            人员
                        </div>
                        <div class="item" :class="filterActive==='3'?'active':''" @click="filterActive='3'">
                            有交易
                        </div>
                        <div class="item" :class="filterActive==='4'?'active':''" @click="filterActive='4'">
                            关系类型
                        </div>
                        <div class="item" :class="filterActive==='5'?'active':''" @click="filterActive='5'">
                            客户状态
                        </div>
                    </div>

                    <div v-if="filterActive==='1'" class="filterlay-right">
                        <div class="item flex-row" @click="chooseDepartment('ALL')">
                            <div style="flex:1">全部</div>
                            <i v-if="filterDepartment==='ALL'" class="iconfont icon-zhengquewancheng"/>
                        </div>
                        <div v-for="item in departmentList" class="item flex-row"  @click="chooseDepartment(item.deptids)">
                            <div style="flex:1">{{item.deptname}}</div>
                            <i v-if="filterDepartment===item.deptids" class="iconfont icon-zhengquewancheng"/>
                        </div>
                    </div>

                    <div v-if="filterActive==='2'" class="filterlay-right">
                        <div class="item flex-row" @click="filterUserIds='ALL'">
                            <div style="flex:1">全部</div>
                            <i v-if="filterUserIds==='ALL'" class="iconfont icon-zhengquewancheng"/>
                        </div>
                        <div v-for="item in salesmanList" class="item flex-row" @click="filterUserIds=item.userids">
                            <div style="flex:1">{{item.names}}</div>
                            <i v-if="filterUserIds===item.userids" class="iconfont icon-zhengquewancheng"/>
                        </div>
                    </div>

                    <div v-if="filterActive==='3'" class="filterlay-right">
                        <div class="item flex-row" @click="filterMonthRecent='ALL'">
                            <div style="flex:1">全部</div>
                            <i v-if="filterMonthRecent==='ALL'" class="iconfont icon-zhengquewancheng"/>
                        </div>
                        <div v-for="item in monthRecentList" class="item flex-row" @click="filterMonthRecent=item.code">
                            <div style="flex:1">{{item.name}}</div>
                            <i v-if="filterMonthRecent===item.code" class="iconfont icon-zhengquewancheng"/>
                        </div>
                    </div>

                    <div v-if="filterActive==='4'" class="filterlay-right">
                        <div class="item flex-row" @click="filterRelation='ALL'">
                            <div style="flex:1">全部</div>
                            <i v-if="filterRelation==='ALL'" class="iconfont icon-zhengquewancheng"/>
                        </div>
                        <div v-for="item in custRelationList" class="item flex-row" @click="filterRelation=item.childcode">
                            <div style="flex:1">{{item.childname}}</div>
                            <i v-if="filterRelation===item.childcode" class="iconfont icon-zhengquewancheng"/>
                        </div>
                    </div>

                    <div v-if="filterActive==='5'" class="filterlay-right">
                        <div class="item flex-row" @click="filterStatus='ALL'">
                            <div style="flex:1">全部</div>
                            <i v-if="filterStatus==='ALL'" class="iconfont icon-zhengquewancheng"/>
                        </div>
                        <div v-for="item in custStatusList" class="item flex-row" @click="filterStatus=item.childcode">
                            <div style="flex:1">{{item.childname}}</div>
                            <i v-if="filterStatus===item.childcode" class="iconfont icon-zhengquewancheng"/>
                        </div>
                    </div>
                </div>

                <div class="filterlay-footer flex-row">
                    <div class="btn-cancel" style="flex:1;" @click="isFilterShow=false;filterType=infoOther.filterType;filterUserIds=infoOther.filterUserIds">取消</div>
                    <div class="btn-confirm" style="flex:1;" @click="filterConfirm">确定</div>
                </div>
            </div>
        </popup>
    </div>
</template>

<script>
import Panel from '../components/Panel.vue';
import { mapActions } from 'vuex';
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
            filterActive: '1',
            filterDepartment: 'ALL',
            filterUserIds: 'ALL',
            filterMonthRecent: 'ALL',
            filterRelation: 'ALL',
            filterStatus: 'ALL',
            departmentList: [],
            salesmanList: [],
            monthRecentList: [],
            custRelationList: [],
            custStatusList: []
        }
    },
    created () {
        http.get(URL_LIST_HEAD).then((res) => {
            this.departmentList = res.departmentList;
            this.salesmanList = res.salesmanList;
            this.monthRecentList = res.monthRecentList;
            this.custRelationList = res.custRelationList;
            this.custStatusList = res.custStatusList;
        })
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
            'getAchievementData',
            'getFollowData'
        ]),
        jump (path) {
            this.$router.push({path: path});
        },
        filterConfirm () {
            this.$emit('onConfirm', {
                deptids: this.filterDepartment,
                userids: this.filterUserIds,
                monthRecent: this.filterMonthRecent,
                custRelationCode: this.filterRelation,
                custStatusCode: this.filterStatus
            })
        },
        hide () {
            console.log('================')
            this.$emit('onHide');
        },
        chooseDepartment (code) {
            this.filterDepartment = code;
        }
    }
}
</script>
<style lang="scss">
</style>
<style scoped lang="scss">
@import '../styles/common.scss';
.right-filter {
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
