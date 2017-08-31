<template>
    <div class="view-mail">
        <Panel>
            <flexbox>
                <flexbox-item>
                    <div @click="jump('/mail/group')">
                        <div class="icon"><i class="iconfont icon-jituanyanxiu fs-48" style="color: #2ec7c9"/></div>
                        <div class="tip">华峰集团人员</div>
                    </div>
                </flexbox-item>
                <div class="divider"/>
                <flexbox-item>
                    <div @click="jump('mail/contact')">
                        <div class="icon"><i class="iconfont icon-kehu1 fs-54" style="color: #b6a2de"/></div>
                        <div class="tip">客户联系人</div>
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
import { URL_GET_PLAN_POWER } from '../../constant/url.js';
import http from '../../http/index.js';

export default {
    name: 'mail',
    components: {
        Panel,
        Spinner,
        Flexbox,
        FlexboxItem
    },
    data () {
        return {
            selected: '1',
            tabMenu: [],
            deliverType: '1',
            receiptType: '1'
        }
    },
    created () {
        this.getPlanPower();
    },
    methods: {
        ...mapActions([
        ]),
        getPlanPower () {

        },
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
.view-mail {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    padding-top: pxToRem(20px);
    box-sizing: border-box;
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
