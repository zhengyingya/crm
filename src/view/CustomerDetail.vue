<template>
    <div class="view-customerdetail">
        <div class="header">
            <div class="fs-20 name">{{detailViewData.custName}}</div>
            <div class="flex-row" style="margin-bottom: 40px;">
                <div class="flex-row" style="flex:1;justify-content:flex-end;">
                    <div class="btn-head" :class="isUserFocusCustomer>=1?'':'btn-more'">
                        <i class="iconfont icon-wujiaoxing fs-12" style="font-weight:900"/>
                        <span>关注</span>
                    </div>
                </div>
                <div class="flex-row" style="flex:1;justify-content:flex-start;position:relative">
                    <popover placement="bottom" :gutter="-30">
                       <div slot="content" class="popover-demo-content">
                           <div class="flex-row popmenu" v-if="isUserResponsibleOrAssistanceToCustomer>=1">
                               <i class="iconfont icon-jiahao1 flex-1"/>
                               <div class="flex-2" style="text-align:left;" @click="openComment">添加计划</div>
                           </div>
                           <div class="flex-row popmenu" v-if="isUserResponsibleOrAssistanceToCustomer>=1">
                               <i class="iconfont icon-jiahao1 flex-1"/>
                               <div class="flex-2" style="text-align:left;" @click="openComment">添加联系人</div>
                           </div>
                           <div class="flex-row popmenu" v-if="isCustomerCanDelete">
                               <i class="iconfont icon-jianhao flex-1"/>
                               <div class="flex-2" style="text-align:left;" @click="openComment">删除</div>
                           </div>
                       </div>
                       <div class="flex-row" style="flex:1;justify-content:flex-start;">
                           <div class="btn-head btn-more">
                               <i class="iconfont icon-caozuo fs-12"/>
                               <span>更多</span>
                           </div>
                       </div>
                   </popover>
                </div>
            </div>
            <TabMenu :detailViewData="detailViewData"/>
        </div>

        <mt-navbar v-model="selected">
            <mt-tab-item id="1">跟进记录</mt-tab-item>
            <mt-tab-item id="2">详细信息</mt-tab-item>
            <mt-tab-item id="3">协助人</mt-tab-item>
        </mt-navbar>
        <!-- tab 具体内容 -->
        <mt-tab-container v-model="selected" :swipeable="false">
            <mt-tab-container-item id="1">
                <FollowRecord :custIds="custIds"/>
            </mt-tab-container-item>
            <!-- 详细信息-->
          <mt-tab-container-item id="2">
              <DetailInfo/>
          </mt-tab-container-item>
          <!-- 协助人 -->
          <mt-tab-container-item id="3">
              <Assistant/>
          </mt-tab-container-item>
        </mt-tab-container>

        <flexbox :gutter="0" class="footer">
            <flexbox-item :span="1/2">
                格式化记录
            </flexbox-item>
            <flexbox-item :span="1/2" class="btn-fast">
                快速记录
            </flexbox-item>
        </flexbox>
    </div>
</template>

<script>
import Panel from '../components/Panel.vue';
import DetailInfo from '../components/Customer/DetailInfo.vue';
import FollowRecord from '../components/Customer/FollowRecord.vue';
import Assistant from '../components/Customer/Assistant.vue';
import TabMenu from '../components/Customer/TabMenu.vue';
import { mapActions } from 'vuex';
import { Spinner, Flexbox, FlexboxItem, Popover } from 'vux';
import { getQueryString } from '../utils/commonMethod.js';
import http from '../http/index.js';
import { URL_CUSTOMER_DETAIL_VIEW, URL_CUSTOMER_FOLLOW_RECORD } from '../constant/url.js';

export default {
    name: 'customer',
    components: {
        Panel,
        Spinner,
        Flexbox,
        FlexboxItem,
        TabMenu,
        DetailInfo,
        FollowRecord,
        Assistant,
        Popover
    },
    data () {
        return {
            selected: '1',
            isAchievementDataGet: false,
            custIds: getQueryString('custIds'),
            detailViewData: {},
            contactsCount: 0,                               // 联系人个数
            isUserFocusCustomer: 0,                         // 是否关注
            isUserResponsibleOrAssistanceToCustomer: 0,     // 是否显示添加计划和添加联系人
            isCustomerCanDelete: false                          // 是否显示删除
        }
    },
    created () {
        http.get(`${URL_CUSTOMER_DETAIL_VIEW}?custIds=${this.custIds}`).then((res) => {
            console.log(res)
            this.detailViewData = res;
            this.contactsCount = res.contactsCount;
            this.isCustomerPrincipal = res.isCustomerPrincipal;
            this.isUserFocusCustomer = res.isUserFocusCustomer;
            this.isUserResponsibleOrAssistanceToCustomer = res.isUserResponsibleOrAssistanceToCustomer;
            this.isCustomerCanDelete = res.isCustomerCanDelete;
        })
    },
    methods: {
        ...mapActions([
            'getAchievementData',
            'getFollowData'
        ]),
        jump (path) {
            this.$router.push({path: path});
        }
    }
}
</script>
<style lang="scss">
@import '../styles/common.scss';
.mint-tab-item-label {
    font-size: 14px;
}
.view-customerdetail {
    .mint-navbar {
        z-index: 101;
    }
    .vux-popover-arrow-up {
        border-bottom: 5px solid #fff;
    }
    .vux-popover {
        background-color: #BEBEBE;
        left: -20px!important;
    }
}
.mint-tab-container {
    flex: 1;
    overflow: auto;
    padding-top: pxToRem(4px);
    // padding-bottom: pxToRem(60px);
    .mint-tab-container-wrap, .mint-tab-container-item {
        height: 100%;
    }
}
</style>
<style scoped lang="scss">
@import '../styles/common.scss';
.view-customerdetail {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    display: flex;
    flex-direction: column;
    // padding-top: pxToRem(20px);
    .header {
        background: #66B3FF;
        padding-top: pxToRem(30px);
        color: #F0F0F0;
        .name {
            margin-bottom: pxToRem(10px);
        }
        .btn-head {
            border-radius: pxToRem(15px);
            padding: pxToRem(5px) pxToRem(12px);
            font-size: 12px;
            background: #FFD306;
            // color: #d0d0d0;
            // font-weight: bold;
            margin: 0 pxToRem(10px);
        }
        .btn-more {
            background: rgba(0, 0, 0, 0.1);
            // opacity: 0.2;
        }
        .popover-demo-content {
            border-radius: pxToRem(4px);
            overflow: hidden;
        }
        .popmenu {
            line-height:pxToRem(40px);
            height:pxToRem(40px);
            width:pxToRem(120px);
            justify-content:center;
            background-color:#FCFCFC;
            color: #000;
        }
    }
    .footer {
        height: pxToRem(45px);
        line-height: pxToRem(45px);
        border-top: 1px solid #BEBEBE;
        text-align: center;
        .btn-fast {
            height: 100%;
            background: $blue;
            color: #fff;
        }
    }
}
</style>
