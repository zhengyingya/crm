<template>
    <div class="view-customerdetail">
        <div class="header">
            <div class="fs-20 name">常熟市安瑞坊</div>
            <div class="flex-row" style="margin-bottom: 40px;">
                <div class="flex-row" style="flex:1;justify-content:flex-end;">
                    <div class="btn-head">
                        <i class="iconfont icon-hot fs-12"/>
                        <span>关注</span>
                    </div>
                </div>
                <div class="flex-row" style="flex:1;justify-content:flex-start;">
                    <div class="btn-head btn-more">
                        <i class="iconfont icon-caozuo fs-12"/>
                        <span>更多</span>
                    </div>
                </div>
            </div>
            <TabMenu/>
        </div>

        <mt-navbar v-model="selected">
            <mt-tab-item id="1">跟进记录</mt-tab-item>
            <mt-tab-item id="2">详细信息</mt-tab-item>
            <mt-tab-item id="3">协助人</mt-tab-item>
        </mt-navbar>
        <!-- tab 具体内容 -->
        <mt-tab-container v-model="selected" :swipeable="false">
            <!-- 业绩 -->
          <mt-tab-container-item id="2">
              <DetailInfo/>
          </mt-tab-container-item>
          <!-- 活动记录 -->
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
import TabMenu from '../components/Customer/TabMenu.vue';
import { mapActions } from 'vuex';
import { Spinner, Flexbox, FlexboxItem } from 'vux';
import { getQueryString } from '../utils/commonMethod.js';

export default {
    name: 'customer',
    components: {
        Panel,
        Spinner,
        Flexbox,
        FlexboxItem,
        TabMenu,
        DetailInfo
    },
    data () {
        return {
            selected: '1',
            isAchievementDataGet: false,
            custids: getQueryString('getQueryString')
        }
    },
    created () {
        
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
.view-customerdetail {
    .mint-navbar {
        z-index: 101;
    }
}
.mint-tab-container {
    flex: 1;
    overflow: auto;
    padding-top: pxToRem(10px);
    padding-bottom: pxToRem(60px);
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
            margin: 0 pxToRem(10px);
        }
        .btn-more {
            background: rgba(0, 0, 0, 0.1);
            // opacity: 0.2;
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
