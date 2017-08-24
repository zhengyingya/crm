<template>
    <div class="plan-content">
        <tab v-model="tabSelect">
            <tab-item :key="0">业务员计划</tab-item>
            <tab-item :key="1">产品计划</tab-item>
        </tab>
        <swiper v-model="tabSelect" :show-dots="false">
            <swiper-item :key="0">
                <div class="plan-wrap">
                    <div v-for="item in departmentList" class="plan-item">
                    <flexbox :gutter="0">
                        {{item.deptname}}
                    </flexbox>
                    <flexbox :gutter="0">
                        <flexbox-item :span="2/5">
                            前三个月月均销量
                        </flexbox-item>
                        <flexbox-item :span="3/5">
                            {{item.averageamount}}KG
                        </flexbox-item>
                    </flexbox>
                    <flexbox :gutter="0">
                        <flexbox-item :span="2/5">
                            前三个月月均销量
                        </flexbox-item>
                        <flexbox-item :span="3/5">
                            {{item.custplanamount}}KG
                        </flexbox-item>
                    </flexbox>
                </div>
                </div>
            </swiper-item>
            <swiper-item :key="1">
                <div>2 Container</div>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import Panel from '../Panel.vue';
import { Spinner, Flexbox, FlexboxItem, Tab, TabItem, Swiper, SwiperItem } from 'vux';
import http from '../../http/index.js';
import { getQueryString } from '../../utils/commonMethod.js';
import { URL_ASSISTANT_LIST } from '../../constant/url.js';

export default {
    name: 'planContent',
    components: {
        Flexbox,
        FlexboxItem,
        Panel,
        Tab,
        TabItem,
        Swiper,
        SwiperItem
    },
    props: [
        'departmentList',
        'productPlanList'
    ],
    data () {
        return {
            custIds: getQueryString('custIds'),
            custPoolIds: getQueryString('custPoolIds'),
            tabSelect: 0
        }
    },
    created () {
    },
    watch: {
    },
    computed: {
    },
    methods: {
        makeColor (color) {
            return `rgba(${color})`
        }
    }
}
</script>
<style lang="scss">
@import '../../styles/common.scss';
.plan-content {
    .vux-tab .vux-tab-item.vux-tab-selected {
        color: $hd-blue;
        border-bottom: 3px solid $hd-blue;
    }
    .vux-tab-ink-bar {
        background-color: $hd-blue;
    }
}
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.plan-content {
    // padding: pxToRem(10px) pxToRem(20px);
    // color: #fff;
    .plan-wrap {
        padding: 0 pxToRem(20px);
        .plan-item {
            padding: pxToRem(10px) 0;
            border-bottom: 1px solid #E0E0E0;
        }
    }
}
</style>
