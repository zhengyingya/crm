<template>
    <div class="view-plancustomer">
        <div style="height:44px;">
            <flexbox :gutter="0">
                <flexbox-item :span="1/3">
                    <div class="btn-filter" @click="isTypeShow=true;">
                        <span>{{typeMap[typeValue]}}</span>
                        <i class="iconfont icon-xiangxiazhankai fs-16"/>
                    </div>
                </flexbox-item>
                <flexbox-item :span="2/3">
                    <search
                      v-model="searchValue"
                      auto-scroll-to-top
                      @on-submit="search"
                      @on-cancel="onCancel"
                      ref="search">
                    </search>
                </flexbox-item>
            </flexbox>
        </div>
        <mt-index-list>
            <mt-index-section v-for="item in custList" :index="item.group" :key="item.group">
                <div v-for="child in item.groupChild" @click="planType==='1'?jump(`/plan/create?custIds=${child.custids}&custName=${child.datatext}`):jump(`/plan/collectionCreate?custIds=${child.custids}&custName=${child.datatext}`)">
                    <mt-cell :title="child.datatext" style="text-align:left;"></mt-cell>
                </div>
            </mt-index-section>
        </mt-index-list>

        <div v-if="isCustomerDataGet&&custList.length===0" style="position:absolute;top:160px;left:50%;margin-left:-60px;color:#BEBEBE;text-align:center">
            <i class="iconfont icon-zanwushuju" style="font-size:120px"/>
            <div class="fs-22">暂无数据</div>
        </div>

        <!-- 类别弹出框 -->
        <popup v-model="isTypeShow">
            <div class="popup-head flex-row">
                <div class="flex-1 text-l" style="color:#828282" @click="isTypeShow=false;">取消</div>
                <div class="flex-1 text-r" style="color:#26a2ff" @click="chooseType">完成</div>
            </div>
            <div class="popup0">
                <picker :data="typeData" v-model="typeValue"></picker>
            </div>
        </popup>
    </div>
</template>

<script>
import Panel from '../../components/Panel.vue';
import { mapActions } from 'vuex';
import { getQueryString } from '../../utils/commonMethod.js';
import http from '../../http/index.js';
import { URL_PLAN_CUSTLIST } from '../../constant/url.js';
import { Spinner, Flexbox, FlexboxItem, Search, Popup, Picker } from 'vux';
import { Toast } from 'mint-ui';

export default {
    name: 'planCustomer',
    components: {
        Panel,
        Spinner,
        Flexbox,
        FlexboxItem,
        Search,
        Popup,
        Picker
    },
    data () {
        return {
            planType: getQueryString('type'),
            typeData: [[{
                value: '01',
                name: '本人负责'
            },{
                value: '02',
                name: '本人关注'
            },{
                value: '03',
                name: '本人协助'
            }]],
            typeMap: {
                '01': '本人负责',
                '02': '本人关注',
                '03': '本人协助'
            },
            typeValue: [],
            searchValue: '',
            isTypeShow: false,
            custList: {},
            custListCopy: {},
            isCustomerDataGet: true
        }
    },
    created () {
        this.getCustList();
    },
    methods: {
        ...mapActions([
            'getAchievementData',
            'getFollowData'
        ]),
        getCustList () {
            this.isCustomerDataGet = false;
            http.get(`${URL_PLAN_CUSTLIST}?custtypecode=${this.typeValue.join('')}`).then((res) => {
                this.isCustomerDataGet = true;
                this.custList = res.custNameGroupList;
                this.custListCopy = res.custNameGroupList;
            })
        },
        // 列表本地搜索
        search () {
            let _custList = [];
            if (this.searchValue === '') {
                this.custList = this.custListCopy;
            }
            else {
                for (let i=0,len=this.custListCopy.length; i<len; i++) {
                    const groupChild = this.custListCopy[i].groupChild.filter((data) => {
                        return data.datatext.indexOf(this.searchValue) > -1;
                    });
                    if (groupChild.length > 0) {
                        _custList.push({
                            group: this.custListCopy[i].group,
                            groupChild: groupChild
                        })
                    }
                }
                this.custList = _custList;
            }
        },
        onCancel () {
            this.custList = this.custListCopy;
        },
        openLink (link) {
          location.href = window.cxt + link;
        },
        jump (path) {
            this.$router.push({path: encodeURI(encodeURI(path))});
        },
        chooseType () {
            this.getCustList();
            this.isTypeShow = false;
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
.view-plancustomer {
    .vux-flex-row {
        height: pxToRem(40px);
    }
}
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.view-plancustomer {
    height: 100%;
    overflow: auto;
    background-color: #fff;
    position: relative;
    .btn-filter {
        text-align: center;
        height: pxToRem(44px);
        line-height: pxToRem(44px);
        background: $hd-blue;
        color: #fff;
    }
    .popup-head {
        height: pxToRem(40px);
        line-height: pxToRem(40px);
        padding: 0 pxToRem(20px);
        border-top: 1px solid #d0d0d0;
        background: #fbf9fe;
        font-size: 16px;
        z-index: 1000;
    }
}
</style>
