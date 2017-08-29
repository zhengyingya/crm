<template>
    <div class="view-group">
        <PathTab :deptpathList="deptpathList"/>
        <div class="title-bar text-l">部门／公司</div>
        <div class="list-wrap">
            <flexbox :gutter="0" v-for="item in deptList" class="item">
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
            </flexbox>
        </div>
        <div class="title-bar text-l">联系人</div>
        <div class="list-wrap">
            <flexbox :gutter="0" v-for="item in userList" class="item">
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
            </flexbox>
        </div>
    </div>
</template>

<script>
import Panel from '../../components/Panel.vue';
import PathTab from '../../components/Mail/PathTab.vue';
import { mapActions } from 'vuex';
import { Spinner, Flexbox, FlexboxItem } from 'vux';
import { URL_ORGUSER_LIST } from '../../constant/url.js';
import http from '../../http/index.js';

export default {
    name: 'group',
    components: {
        Panel,
        Spinner,
        Flexbox,
        FlexboxItem,
        PathTab
    },
    data () {
        return {
            userList: [],
            deptList: [],
            deptpathList: []
        }
    },
    created () {
        this.getGroupData();
    },
    methods: {
        ...mapActions([
        ]),
        getGroupData () {
            http.get(URL_ORGUSER_LIST)
            .then((res) => {
                console.log(res)
                this.deptpathList = res.deptpathList;
                this.userList = res.userList;
                this.deptList = res.deptList;
            })
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
.view-group {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    padding-top: pxToRem(20px);
    box-sizing: border-box;
    .title-bar {
        height: pxToRem(30px);
        line-height: pxToRem(30px);
        background: #E0E0E0;
        color: #6C6C6C;
        padding: 0 pxToRem(20px);
        margin-top: pxToRem(20px);
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
