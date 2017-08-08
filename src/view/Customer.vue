<template>
    <div class="view-customer">
        <Panel>
            <flexbox>
                <flexbox-item>
                    <div @click="jump('/customer/list')">
                        <div class="icon"><i class="iconfont icon-kehuguanli fs-50"/></div>
                        <div class="tip">客户列表</div>
                    </div>
                </flexbox-item>
                <div class="divider"/>
                <flexbox-item>
                    <div class="icon"><i class="iconfont icon-kehuguanli1 fs-50" style="color: #02DF82"/></div>
                    <div class="tip">公海池客户</div>
                </flexbox-item>
            </flexbox>
        </Panel>
    </div>
</template>

<script>
import Panel from '../components/Panel.vue';
import { mapActions } from 'vuex';
import { Spinner, Flexbox, FlexboxItem } from 'vux';

export default {
    name: 'customer',
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
@import '../styles/common.scss';
.view-customer {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    padding-top: pxToRem(20px);
    .icon {
        height: pxToRem(100px);
        line-height: pxToRem(120px);
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
        // line-height: pxToRem(80px);
        text-align: center;
        color: $blue;
    }
}
</style>
