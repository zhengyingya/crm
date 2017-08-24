<template>
    <div class="view-plan">
        <Panel>
            <flexbox>
                <flexbox-item>
                    <div @click="jump('/plan/customer?type=1')">
                        <div class="icon"><i class="iconfont icon-btn-add fs-48" style="color: #2ec7c9"/></div>
                        <div class="tip">发货计划创建</div>
                    </div>
                </flexbox-item>
                <div class="divider"/>
                <flexbox-item>
                    <div @click="jump('/plan/deliver?type=1')">
                        <div class="icon"><i class="iconfont icon-yifahuo fs-54" style="color: #b6a2de"/></div>
                        <div class="tip">发货计划查询</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </Panel>

        <Panel>
            <flexbox>
                <flexbox-item>
                    <div @click="jump('/plan/customer?type=2')">
                        <div class="icon"><i class="iconfont icon-shoukuan fs-50" style="color: #5ab1ef"/></div>
                        <div class="tip">收款计划创建</div>
                    </div>
                </flexbox-item>
                <div class="divider"/>
                <flexbox-item>
                    <div @click="jump('/customer/pool')">
                        <div class="icon"><i class="iconfont icon-shoukuanma fs-50" style="color: #ffb980"/></div>
                        <div class="tip">收款计划查询</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </Panel>

        <Panel v-if="tabMenu.length>0">
            <flexbox>
                <flexbox-item>
                    <div v-if="tabMenu[0]" @click="jump('/customer/list')">
                        <div class="icon"><i class="iconfont fs-50" :class="tabMenu[0].icon" style="color: #d87a80"/></div>
                        <div class="tip">{{tabMenu[0].text}}</div>
                    </div>
                </flexbox-item>
                <div class="divider"/>
                <flexbox-item>
                    <div v-if="tabMenu[1]" @click="jump('/customer/pool')">
                        <div class="icon"><i class="iconfont fs-50" :class="tabMenu[1].icon" style="color: #8d98b3"/></div>
                        <div class="tip">{{tabMenu[1].text}}</div>
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
            tabMenu: []
        }
    },
    created () {
        this.getPlanPower();
    },
    methods: {
        ...mapActions([
        ]),
        getPlanPower () {
            http.get(URL_GET_PLAN_POWER).then((res) => {
                this.isViewDepartmentPlan = res.isViewDepartmentPlan;
                this.isViewSalesmanPlan = res.isViewSalesmanPlan;
                if (this.isViewDepartmentPlan) {
                    this.tabMenu.push({
                        text: '业务员发货计划查询',
                        icon: 'icon-kehu',
                        path: ''
                    });
                }
                if (this.isViewSalesmanPlan) {
                    this.tabMenu.push({
                        text: '客户发货计划查询',
                        icon: 'icon-kehuguanli1',
                        path: ''
                    });
                }
            })
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
.view-plan {
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
