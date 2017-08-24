<template>
    <div class="view-chart">
        <Panel>
            <div class="flex-row txt-type" style="border-bottom: 1px solid #E0E0E0">
                月计划完成
            </div>
            <flexbox :gutter="0" style="border-bottom:1px solid #E0E0E0;">
                <flexbox-item :span="1/3">
                    <div @click="jump('/plan/customer')" style="border-right:1px solid #E0E0E0;">
                        <div class="icon"><i class="iconfont icon-kehuguanli1 fs-40" style="color: #2ec7c9"/></div>
                        <div class="tip">客户</div>
                    </div>
                </flexbox-item>
                <!-- <div class="divider"/> -->
                <flexbox-item :span="1/3">
                    <div @click="jump('/customer/pool')" style="border-right:1px solid #E0E0E0;">
                        <div class="icon"><i class="iconfont icon-chanpinleibie fs-40" style="color: #b6a2de"/></div>
                        <div class="tip">产品</div>
                    </div>
                </flexbox-item>
                <!-- <div class="divider"/> -->
                <flexbox-item :span="1/3">
                    <div @click="jump('/customer/pool')">
                        <div class="icon"><i class="iconfont icon-fabuxindaichanpin fs-44" style="color: #5ab1ef;line-height:72px"/></div>
                        <div class="tip">信贷号</div>
                    </div>
                </flexbox-item>
            </flexbox>
            <flexbox :gutter="0">
                <flexbox-item :span="1/3">
                    <div @click="jump('/plan/customer')" style="border-right:1px solid #E0E0E0;">
                        <div class="icon"><i class="iconfont icon-kehu fs-40" style="color: #ffb980"/></div>
                        <div class="tip">人员</div>
                    </div>
                </flexbox-item>
                <!-- <div class="divider"/> -->
                <flexbox-item :span="1/3">
                    <div @click="jump('/customer/pool')" style="border-right:1px solid #E0E0E0;">
                        <div class="icon"><i class="iconfont icon-fangwuxiezhen fs-44" style="color: #d87a80"/></div>
                        <div class="tip">办事处</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </Panel>

        <Panel>
            <div class="flex-row txt-type" style="border-bottom: 1px solid #E0E0E0">
                统计
            </div>
            <flexbox :gutter="0" style="border-bottom:1px solid #E0E0E0;">
                <flexbox-item :span="1/3">
                    <div @click="jump('/plan/customer')" style="border-right:1px solid #E0E0E0;">
                        <div class="icon"><i class="iconfont icon-pingjiajilu fs-40" style="color: #8d98b3"/></div>
                        <div class="tip">活动记录</div>
                    </div>
                </flexbox-item>
                <!-- <div class="divider"/> -->
                <flexbox-item :span="1/3">
                    <div @click="jump('/customer/pool')" style="border-right:1px solid #E0E0E0;">
                        <div class="icon"><i class="iconfont icon-shoukuan fs-40" style="color: #e5cf0d"/></div>
                        <div class="tip">发货收款</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </Panel>

        <Panel>
            <div class="flex-row txt-type" style="border-bottom: 1px solid #E0E0E0">
                订单
            </div>
            <flexbox :gutter="0" style="border-bottom:1px solid #E0E0E0;">
                <flexbox-item :span="1/3">
                    <div @click="jump('/plan/customer')" style="border-right:1px solid #E0E0E0;">
                        <div class="icon"><i class="iconfont icon-xlqxwwc fs-40" style="color: #97b552"/></div>
                        <div class="tip">未发货跟踪</div>
                    </div>
                </flexbox-item>
                <flexbox-item :span="1/3">
                    <div @click="jump('/customer/pool')" style="border-right:1px solid #E0E0E0;">
                        <div class="icon"><i class="iconfont icon-dingdan fs-46" style="color: #95706d;line-height:72px"/></div>
                        <div class="tip">订单查询</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </Panel>
    </div>
</template>

<script>
import Panel from '../../components/Panel.vue';
import { mapActions } from 'vuex';
import { Spinner, Flexbox, FlexboxItem } from 'vux';

export default {
    name: 'plan',
    components: {
        Panel,
        Spinner,
        Flexbox,
        FlexboxItem
    },
    data () {
        return {
            selected: '1',
            isAchievementDataGet: false
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
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.view-chart {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    padding-top: pxToRem(20px);
    padding-bottom: pxToRem(50px);
    box-sizing: border-box;
    .txt-type {
        height: pxToRem(35px);
        line-height: pxToRem(35px);
        background: rgba(38,162,255,0.7);
        padding: 0 pxToRem(20px);
        color: #fff;
        font-weight: bolder;
    }
    .icon {
        height: pxToRem(60px);
        line-height: pxToRem(80px);
        text-align: center;
        color: #F00078;
    }
    .divider {
        width: 1px;
        height: pxToRem(140px);
        background-color: #E0E0E0;
    }
    .tip {
        height: pxToRem(40px);
        line-height: pxToRem(40px);
        // line-height: pxToRem(80px);
        text-align: center;
        color: $blue;
    }
}
</style>
