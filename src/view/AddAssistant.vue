<template>
    <div class="view-addassistant">
        <div class="wrap">
            <div v-for="(item, index) in salesmanList">
                <div class="flex-row item">
                    <flexbox :gutter="0">
                        <flexbox-item :span="1/6">
                            <div class="portrait" :style="{background: makeColor(item.color)}">
                                {{item.shortname}}
                            </div>
                        </flexbox-item>
                        <flexbox-item :span="3/6" class="btn-fast">
                            <flexbox :gutter="0" style="margin-bottom:5px;">
                                {{item.names}}
                            </flexbox>
                              <flexbox :gutter="0" style="color:#26a2ff">
                                  {{item.mobile}}
                              </flexbox>
                        </flexbox-item>
                        <flexbox-item :span="2/6" style="text-align:right;">
                            <i class="iconfont fs-24" :class="item.ischecked?'icon-fuxuankuang i-checked': 'icon-fuxuan01 i-uncheck'"
                                @click="item.ischecked = !item.ischecked"/>
                        </flexbox-item>
                    </flexbox>
                </div>
                <div class="divider" v-if="index !== salesmanList.length - 1"/>
            </div>
        </div>
        <div class="btn-sub"><mt-button type="primary" style="width:100%;" @click="submit">保存</mt-button></div>
    </div>
</template>

<script>
import Panel from '../components/Panel.vue';
import { mapActions } from 'vuex';
import { getQueryString } from '../utils/commonMethod.js';
import http from '../http/index.js';
import { URL_ADD_ASSISTANT_VIEW, URL_SAVE_ASSISTANT } from '../constant/url.js';
import { Spinner, Flexbox, FlexboxItem } from 'vux';
import { Toast } from 'mint-ui';

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
            custIds: getQueryString('custIds'),
            custPoolIds: getQueryString('custPoolIds'),
            salesmanList: [],
            value: ''
        }
    },
    created () {
        http.get(`${URL_ADD_ASSISTANT_VIEW}?custIds=${this.custIds}`).then((res) => {
            console.log(res)
            this.salesmanList = res.salesmanList;
        })
    },
    methods: {
        ...mapActions([
            'getAchievementData',
            'getFollowData'
        ]),
        makeColor (color) {
            return `rgba(${color})`
        },
        submit () {
            const checkList = this.salesmanList.filter((item) => {
                return item.ischecked;
            });
            const userNameArrStr = checkList.map((item) => {
                return item.username;
            });
            http.post(URL_SAVE_ASSISTANT, {
                body: `userNameArrStr=${userNameArrStr.join(',')}&custIds=${this.custIds}`
            }).then((res) => {
                Toast({
                  message: res.message,
                  position: 'bottom',
                  duration: 1000
                });
                this.$router.push({path: `/customer/detail?custIds=${this.custIds}`});
            })
        }
    }
}
</script>
<style lang="scss">
</style>
<style scoped lang="scss">
@import '../styles/common.scss';
.view-addassistant {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    // padding-top: pxToRem(20px);
    .wrap {
        height: 100%;
        // padding-top: pxToRem(20px);
        box-sizing: border-box;
        overflow: auto;
        .btn-sub {
            padding: 0 pxToRem(10px);
            margin-bottom: pxToRem(20px);
        }
    }
    .btn-sub {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: pxToRem(45px);
        background: $blue;
        color: #fff;
        line-height: pxToRem(45px);
        text-align: center;
        cursor: pointer;
    }
    .item {
        height: pxToRem(60px);
        align-items: center;
        background: #fff;
        padding: 0 pxToRem(20px);
        .portrait {
            text-align: center;
            color: #fff;
            width: pxToRem(40px);
            height: pxToRem(40px);
            line-height: pxToRem(40px);
            border-radius: pxToRem(20px);
        }
        .i-checked {
            color: $blue;
        }
        .i-uncheck {
            color: #d0d0d0;
        }
    }
    .divider {
        height: 1px;
        background: #F0F0F0;
    }
}
</style>
