<template>
    <div class="view-contact flex-cloumn">
        <!-- <PathTab :deptpathList="contactsList" @getData="refresh"/> -->
        <div class="flex-1 content-wrap">
            <div v-if="custList.length>0" class="title-bar text-l" style="margin-top:0">
                <i class="iconfont icon-caidan"/>
                <span>公司</span>
            </div>
            <div class="list-wrap" v-for="item in custList" @click="refresh(item.ids)">
                <flexbox :gutter="0" class="item">
                    <flexbox-item :span="5/6" class="btn-fast">
                        <flexbox :gutter="0" style="margin-bottom:5px;">
                            {{item.custname}}
                        </flexbox>
                    </flexbox-item>
                    <flexbox-item :span="1/6" class="btn-fast text-r">
                        <mt-badge size="small">{{item.contactscount}}</mt-badge>
                        <i class="iconfont icon-xiayiyeqianjinchakangengduo fs-16"/>
                    </flexbox-item>
                </flexbox>
            </div>
            <div v-if="contactsList.length>0" class="title-bar text-l">
                <i class="iconfont icon-caidan"/>
                <span>联系人</span>
            </div>
            <div class="list-wrap" v-for="item in contactsList" @click="jump(`/mail/personal?userIds=${item.ids}`)">
                <flexbox :gutter="0" class="item">
                    <flexbox-item :span="1/6">
                        <div class="portrait" :style="{background: makeColor(item.color)}">
                            {{item.shortname}}
                        </div>
                    </flexbox-item>
                    <flexbox-item :span="4/6" class="btn-fast">
                        <flexbox :gutter="0" style="margin-bottom:5px;">
                            {{item.name}}
                        </flexbox>
                      <flexbox :gutter="0" style="color:#26a2ff">
                          {{item.mobile}}
                      </flexbox>
                    </flexbox-item>
                    <flexbox-item :span="1/6" class="btn-fast text-r">
                        <i class="iconfont icon-xiayiyeqianjinchakangengduo"/>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
    </div>
</template>

<script>
import Panel from '../../components/Panel.vue';
import PathTab from '../../components/Mail/PathTab.vue';
import { mapActions } from 'vuex';
import { Spinner, Flexbox, FlexboxItem } from 'vux';
import { URL_CONTACT_LIST } from '../../constant/url.js';
import { getQueryString } from '../../utils/commonMethod.js';
import http from '../../http/index.js';

export default {
    name: 'view-contact',
    components: {
        Panel,
        Spinner,
        Flexbox,
        FlexboxItem,
        PathTab
    },
    data () {
        return {
            custIds: getQueryString('custIds') || '',
            custList: [],
            deptList: [],
            contactsList: []
        }
    },
    created () {
        this.getGroupData();
    },
    methods: {
        ...mapActions([
        ]),
        getGroupData () {
            http.get(`${URL_CONTACT_LIST}?custIds=${this.custIds}`)
            .then((res) => {
                console.log(res)
                this.contactsList = res.contactsList;
                this.custList = res.custList;
                this.deptList = res.deptList;
            })
        },
        refresh (custIds) {
            this.custIds = custIds;
            this.getGroupData();
            // this.$router.push({path: '/mail/group?departmentIds=' + departmentIds});
        },
        jump (path) {
            this.$router.push({path: path});
        },
        makeColor (color) {
            return `rgba(${color})`
        }
    }
}
</script>
<style lang="scss">
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.view-contact {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    // padding-top: pxToRem(20px);
    box-sizing: border-box;
    .title-bar {
        height: pxToRem(30px);
        line-height: pxToRem(30px);
        background: #F0F0F0;
        color: #6C6C6C;
        padding: 0 pxToRem(20px);
        margin-top: pxToRem(10px);
    }
    .content-wrap {
        overflow: auto;
    }
    .list-wrap {
        .item {
            height: pxToRem(60px);
            align-items: center;
            padding: 0 pxToRem(20px);
            box-sizing: border-box;
            border-bottom: 1px solid #F0F0F0;
            background: #fff;
            .portrait {
                text-align: center;
                color: #fff;
                width: pxToRem(40px);
                height: pxToRem(40px);
                line-height: pxToRem(40px);
                border-radius: pxToRem(20px);
            }
        }
    }
}
</style>
