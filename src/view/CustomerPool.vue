<template>
    <div class="view-customerpoll">
        <div class="filter flex-row">
          <search
            v-model="searchValue"
            auto-scroll-to-top
            @on-submit="search"
            @on-cancel="onCancel"
            ref="search">
          </search>
        </div>
        <div v-if="!isCustomerDataGet" style="margin-top:280px;left:50%;margin-left:-20px;position:absolute"><spinner slot="value" type="lines" size="40px"/></div>

        <div v-if="isCustomerDataGet&&cusNameGrouplist.length===0" style="position:absolute;margin-top:160px;left:50%;margin-left:-60px;color:#BEBEBE;text-align:center">
            <i class="iconfont icon-zanwushuju" style="font-size:120px"/>
            <div class="fs-22">暂无数据</div>
        </div>

        <mt-index-list>
            <mt-index-section v-for="item in cusNameGrouplist" :index="item.group" :key="item.group">
                <div v-for="child in item.groupChild" @click="itemClick(child.custPoolIds)">
                    <mt-cell :title="child.datatext" style="text-align:left;"></mt-cell>
                </div>
            </mt-index-section>
        </mt-index-list>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Search, Spinner, Flexbox, FlexboxItem } from 'vux';
import http from '../http/index.js';
import { URL_CUSTPOOL_LIST, URL_CUSTPOLL_DETAIL_VIEW} from '../constant/url.js';

export default {
    name: 'customerPoll',
    components: {
        Search,
        Spinner,
        Flexbox,
        FlexboxItem
    },
    data () {
        return {
            searchValue: '',                      // 搜索框输入值
            isCustomerDataGet: false,             // 是否从后台获取到客户列表数据
            cusNameGrouplist: [],
            cusNameGrouplistCopy: []
        }
    },
    created () {
        this.getCustomerList();
    },
    methods: {
        getCustomerList (param) {
            this.isCustomerDataGet = false;
            http.post(URL_CUSTPOOL_LIST).then((res) => {
                this.isCustomerDataGet = true;
                this.cusNameGrouplist = res;
                this.cusNameGrouplistCopy = res;
            })
        },
        jump (path) {
            this.$router.push({path: path});
        },
        // 客户列表一项点击
        itemClick (custPoolIds) {
            http.get(`${URL_CUSTPOLL_DETAIL_VIEW}?custPoolIds=${custPoolIds}`).then((res) => {
                this.$router.push({path: `/customer/detail?custPoolIds=${custPoolIds}&custIds=${res.custIds}&reload=true`});
            })
        },
        // 列表本地搜索
        search () {
            const _cusNameGrouplist = [];
            if (this.searchValue === '') {                          // 如果搜索输入为空，还原全值
                this.cusNameGrouplist = this.cusNameGrouplistCopy;
            }
            else {
                for (let i=0,len=this.cusNameGrouplistCopy.length; i<len; i++) {
                    // 根据搜索值进行筛选
                    const groupChild = this.cusNameGrouplistCopy[i].groupChild.filter((data) => {
                        return data.datatext.indexOf(this.searchValue) > -1;
                    });
                    if (groupChild.length > 0) {
                        // 组装数据
                        _cusNameGrouplist.push({
                            group: this.cusNameGrouplistCopy[i].group,
                            groupChild: groupChild
                        })
                    }
                }
                this.cusNameGrouplist = _cusNameGrouplist;
            }
        },
        onCancel () {
            this.cusNameGrouplist = this.cusNameGrouplistCopy;      // 取消搜索，数据还原
        }
    }
}
</script>
<style lang="scss">
.mint-indexsection-index {
    text-align: left;
}
.weui-search-bar__label {
    line-height: 26px;
}
</style>
<style scoped lang="scss">
@import '../styles/common.scss';
.view-customerpoll {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    .filter {
        position: fixed;
        width: 100%;
        // padding: 0 pxToRem(10px);
        // margin-top: pxToRem(10px);
        height: pxToRem(44px);
        // line-height: pxToRem(40px);
        box-sizing: border-box;
        background: $bg-blue;
        z-index: 100;
        .btn-add, .btn-filter {
            height: pxToRem(44px);
            line-height: pxToRem(44px);
            text-align: center;
            color: #fff;
        }
        .btn-add {
            background: #1790cf;
        }
        .btn-filter {
            background: #C4E1FF;
        }
    }
    .mint-indexlist {
        height: 100%;
        padding-top: pxToRem(44px);
        box-sizing: border-box;
    }
}
</style>
