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
            <mt-index-section v-for="item in cusNameGrouplist" :index="item.group">
                <div v-for="child in item.groupChild" @click="itemClick(child.custids)">
                    <mt-cell :title="child.datatext"></mt-cell>
                </div>
            </mt-index-section>
        </mt-index-list>
    </div>
</template>

<script>
import Panel from '../components/Panel.vue';
import RightFilter from '../components/RightFilter.vue';
import { mapActions } from 'vuex';
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
            cusNameGrouplist: []
        }
    },
    created () {
        this.getCustomerList();
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
            this.isCustomerDataGet = false;
            http.post(URL_CUSTOMER_LIST, {
                body: `deptids=${departmentList}&userids=${salesmanList}&monthRecent=${monthRecentList}&custRelationCode=${custRelationList}&custStatusCode=${custStatusList}`
            }).then((res) => {
                this.isCustomerDataGet = true;
                this.cusNameGrouplist = res.cusNameGrouplist;
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
            console.log('===============================', param)
            this.getCustomerList(param);
            this.isFilterShow = false;
        },
        // 客户列表一项点击
        itemClick (custIds) {
            this.$router.push({path: `/customer/detail?custIds=${custIds}`});
        }
    }
}
</script>
<style lang="scss">
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
}
</style>
