<template>
    <div class="view-customerlist">
        <div class="filter flex-row">
          <flexbox :gutter="0">
              <flexbox-item :span="1/4">
                  <div class="btn-add" @click="jump('/customer/add')"><i class="iconfont icon-jiahao1 fs-24"/></div>
              </flexbox-item>
              <flexbox-item :span="1/4">
                  <div class="btn-filter" @click="isFilterShow=true;"><i class="iconfont icon-shaixuanguolv fs-24"/></div>
              </flexbox-item>
              <flexbox-item :span="2/4">
                  <div class="btn-search">
                      <search
                        v-model="searchValue"
                        auto-scroll-to-top
                        @on-submit="search"
                        @on-cancel="onCancel"
                        ref="search">
                      </search>
                  </div>
              </flexbox-item>
          </flexbox>
        </div>
        <RightFilter :isFilterShow="isFilterShow" @onHide="onHide" @onConfirm="onConfirm"/>
        <div v-if="!isCustomerDataGet" style="margin-top:280px;left:50%;margin-left:-20px;position:absolute"><spinner slot="value" type="lines" size="40px"/></div>

        <div v-if="isCustomerDataGet&&cusNameGrouplist.length===0" style="position:absolute;margin-top:160px;left:50%;margin-left:-60px;color:#BEBEBE;text-align:center">
            <i class="iconfont icon-zanwushuju" style="font-size:120px"/>
            <div class="fs-22">暂无数据</div>
        </div>

        <mt-index-list>
            <mt-index-section v-for="(item, index) in cusNameGrouplist" :index="item.group" :key="index">
                <div v-for="child in item.groupChild" :key="child.custids" @click="itemClick(child.custids)">
                    <mt-cell :title="child.datatext" style="text-align:left;"></mt-cell>
                </div>
            </mt-index-section>
        </mt-index-list>
    </div>
</template>

<script>
import Panel from '../components/Panel.vue';
import RightFilter from '../components/RightFilter.vue';
import { mapActions, mapState } from 'vuex';
import { Search, Spinner, Flexbox, FlexboxItem } from 'vux';
import http from '../http/index.js';
import { URL_CUSTOMER_LIST } from '../constant/url.js';

export default {
    name: 'customer',
    components: {
        Search,
        Panel,
        Spinner,
        Flexbox,
        FlexboxItem,
        RightFilter
    },
    data () {
        return {
            searchValue: '',
            isFilterShow: false,
            isCustomerDataGet: false,             // 是否从后台获取到客户列表数据
            cusNameGrouplist: [],
            cusNameGrouplistCopy: []              // 原数据做一个备份
        }
    },
    created () {
        this.getCustomerList();
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
    methods: {
        ...mapActions([
            'getAchievementData',
            'getFollowData'
        ]),
        getCustomerList (param) {
            const departmentList = (param && param.deptids) || '';
            const salesmanList = (param && param.userids) || '';
            const monthRecentList = (param && param.monthRecent) || '';
            const custRelationList = (param && param.custRelationCode) || '';
            const custStatusList = (param && param.custStatusCode) || '';
            const username = (param && param.username) || '';
            const deptcode = (param && param.deptcode) || '';
            this.cusNameGrouplist = [];
            this.isCustomerDataGet = false;
            http.post(URL_CUSTOMER_LIST, {
                body: `deptids=${this.filterDepartment}&userids=${this.filterUserIds}&monthRecent=${this.filterMonthRecent}` +
                `&custRelationCode=${this.filterRelation}&custStatusCode=${this.filterStatus}&username=${this.filterUserName}&deptcode=${this.filterDeptcode}`
            }).then((res) => {
                this.isCustomerDataGet = true;
                this.cusNameGrouplist = res.cusNameGrouplist;
                this.cusNameGrouplistCopy = res.cusNameGrouplist;
            })
        },
        jump (path) {
            this.$router.push({path: path});
        },
        onHide () {
            this.isFilterShow = false;
        },
        // 筛选确定按钮点击回调
        onConfirm (param) {
            this.getCustomerList(param);
            this.isFilterShow = false;
        },
        // 客户列表一项点击
        itemClick (custIds) {
            this.$router.push({path: `/customer/detail?custIds=${custIds}&reload=true`});
        },
        // 列表本地搜索
        search () {
            let _cusNameGrouplist = [];
            if (this.searchValue === '') {
                this.cusNameGrouplist = this.cusNameGrouplistCopy;      // 如果搜索关键字为空，则渲染全部数据
            }
            else {
                // 循环进行筛选
                for (let i=0,len=this.cusNameGrouplistCopy.length; i<len; i++) {
                    const groupChild = this.cusNameGrouplistCopy[i].groupChild.filter((data) => {
                        return data.datatext.indexOf(this.searchValue) > -1;
                    });
                    if (groupChild.length > 0) {
                        _cusNameGrouplist.push({
                            group: this.cusNameGrouplistCopy[i].group,
                            groupChild: groupChild
                        })
                    }

                }
                this.cusNameGrouplist = _cusNameGrouplist;
            }
        },
        onCancel () {
            this.cusNameGrouplist = this.cusNameGrouplistCopy;
        }
    }
}
</script>
<style lang="scss">
.mint-indexsection-index {
    text-align: left;
}
.weui-search-bar__label {
    line-height: 26px;
}
</style>
<style scoped lang="scss">
@import '../styles/common.scss';
.view-customerlist {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    .filter {
        position: fixed;
        width: 100%;
        // padding: 0 pxToRem(10px);
        // margin-top: pxToRem(10px);
        height: pxToRem(44px);
        // line-height: pxToRem(40px);
        box-sizing: border-box;
        background: $bg-blue;
        z-index: 100;
        .btn-add, .btn-filter {
            height: pxToRem(44px);
            line-height: pxToRem(44px);
            text-align: center;
            color: #fff;
        }
        .btn-add {
            background: #1790cf;
        }
        .btn-filter {
            background: #C4E1FF;
        }
    }
    .mint-indexlist {
        height: 100%;
        padding-top: pxToRem(44px);
        box-sizing: border-box;
    }
}
</style>
