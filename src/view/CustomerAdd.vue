<template>
    <div class="view-customeradd">
        <div class="wrap">
            <Panel>
                <mt-field label="客户名称" placeholder="请输入客户名称" v-model="name"></mt-field>
                <mt-field label="客户状态" placeholder="潜在客户" readonly class="readonly"></mt-field>
                <!-- <mt-field label="所在地区" class="custom"> -->
                <group >
                    <x-address :title="title" v-model="address" raw-value :list="addressData" value-text-align="left"></x-address>
                </group>
                <mt-field label="详细地址" placeholder="请输入详细地址"></mt-field>
                <!-- </mt-field> -->
            </Panel>

            <Panel>
                <mt-field label="电话" placeholder="请输入电话" v-model="name"></mt-field>
                <mt-field label="传真" placeholder="请输入传真" v-model="name"></mt-field>
                <mt-field label="邮箱" placeholder="请输入邮箱" v-model="name"></mt-field>
                <mt-field label="邮编" placeholder="请输入邮编" v-model="name"></mt-field>
                <mt-field label="网址" placeholder="请输入网址" v-model="name"></mt-field>
            </Panel>

            <Panel>
                <mt-field label="法人代表" placeholder="请输入法人代表" v-model="name"></mt-field>
                <mt-field label="人员规模" placeholder="请输入人员规模" v-model="name"></mt-field>
                <mt-field label="授信额度" placeholder="请输入授信额度" v-model="name"></mt-field>
                <mt-field label="账期天数" placeholder="请输入账期天数" v-model="name"></mt-field>
                <mt-field label="所属行业" placeholder="请输入所属行业" v-model="name"></mt-field>
            </Panel>

            <Panel>
                <mt-field label="货币" placeholder="RMB" readonly class="readonly"></mt-field>
                <mt-field label="客户级别" placeholder="1类" readonly class="readonly"></mt-field>
            </Panel>

            <div class="btn-sub"><mt-button type="primary" style="width:100%;">保存</mt-button></div>
        </div>
    </div>
</template>

<script>
import Panel from '../components/Panel.vue';
import { mapActions } from 'vuex';
import { Group, Search, XAddress, Spinner, Flexbox, ChinaAddressV3Data, FlexboxItem } from 'vux';

export default {
    name: 'customer',
    components: {
        Group,
        Search,
        Panel,
        Spinner,
        Flexbox,
        FlexboxItem,
        XAddress
    },
    data () {
        return {
            addressData: ChinaAddressV3Data,
            title: '所在地区',
            address: [],
            name: ''
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
.view-customeradd {
    .mint-cell-title {
        display: flex;
    }
    .readonly {
        input::-webkit-input-placeholder{
            color: #2c3e50;
        }
        input:-ms-input-placeholder {
            color: #2c3e50;
        }
        input:-ms-input-placeholder {
            color: #2c3e50;
        }
    }
    // .custom {
    //     input {
    //         display: none;
    //     }
    // }
    .weui-cells {
        margin-top: 0;
        font-size: 16px;
        border-top: 0 solid #fff;
        // height: pxToRem(48px);
        // display: flex;
        align-items: center;
        &:before {
            border: 0 solid #fff;
        }
        .weui-cell__hd {
            width: 105px;
            text-align: left;
        }
        .weui-cell {
            padding: pxToRem(13px) pxToRem(10px);
        }
    }
}
.vux-popup-picker-header {
    color: $blue!important;
}
</style>
<style scoped lang="scss">
@import '../styles/common.scss';
.view-customeradd {
    height: 100%;
    overflow: hidden;
    background-color: #ECF5FF;
    // padding-top: pxToRem(20px);
    padding-bottom: pxToRem(50px);
    box-sizing: border-box;
    .wrap {
        height: 100%;
        padding-top: pxToRem(20px);
        box-sizing: border-box;
        overflow: auto;
        .btn-sub {
            padding: 0 pxToRem(10px);
            margin-bottom: pxToRem(20px);
        }
    }
}
</style>
