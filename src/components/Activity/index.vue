<template>
    <div class="activity">
        <div class="filter flex-row">
          <div class="flex-row" style="flex:1;">
              <span class="fs-16" @click="openPicker">{{infoOther.filterTime}}<i class="iconfont icon-xiangxiazhankai"/></span>
          </div>
          <i class="iconfont icon-shaixuanguolv fs-20" style="flex:1;text-align:right" @click="isFilterShow = true"/>
        </div>

        <div class="list-wrap">
            <mt-datetime-picker
                ref="picker"
                type="date"
                year-format="{value} 年"
                month-format="{value} "
                date-format="{value} "
                v-model="pickerVisible">
            </mt-datetime-picker>

            <popup v-model="isFilterShow" position="right">
                <div class="flex-cloumn height-full">
                    <div class="flex-row" style="width:300px;flex:1">
                        <div class="filterlay-left">
                            <div class="item" :class="filterActive==='1'?'active':''" @click="filterActive='1'">
                                类型
                            </div>
                            <div class="item" :class="filterActive==='2'?'active':''" @click="filterActive='2'">
                                人员
                            </div>
                        </div>

                        <div v-if="filterActive==='1'" class="filterlay-right">
                            <div class="item flex-row" @click="chooseType('ALL')">
                                <div style="flex:1">全部</div>
                                <i v-if="filterType==='ALL'" class="iconfont icon-zhengquewancheng"/>
                            </div>
                            <div v-for="item in infoFollowRecordTypeList.followRecordTypeList" class="item flex-row"  @click="chooseType(item.childcode)">
                                <div style="flex:1">{{item.childname}}</div>
                                <i v-if="filterType===item.childcode" class="iconfont icon-zhengquewancheng"/>
                            </div>
                        </div>

                        <div v-if="filterActive==='2'" class="filterlay-right">
                            <div class="item flex-row" @click="chooseUser('ALL')">
                                <div style="flex:1">全部</div>
                                <i v-if="filterUserIds==='ALL'" class="iconfont icon-zhengquewancheng"/>
                            </div>
                            <div v-for="item in infoSalesmanList.salesmanList" class="item flex-row" @click="chooseUser(item.userids)">
                                <div style="flex:1">{{item.names}}</div>
                                <i v-if="filterUserIds===item.userids" class="iconfont icon-zhengquewancheng"/>
                            </div>
                        </div>
                    </div>

                    <div class="filterlay-footer flex-row">
                        <div class="btn-cancel" style="flex:1;" @click="isFilterShow=false;filterType=infoOther.filterType;filterUserIds=infoOther.filterUserIds">取消</div>
                        <div class="btn-confirm" style="flex:1;" @click="filterConfirm">确定</div>
                    </div>
                </div>
            </popup>

            <Panel>
                <div v-for="(item, index) in infoFollowRecordList.followRecordList">
                    <ListItem :itemData="item" @openComment="openComment" @reloadFollowData="reloadFollowData"/>
                    <div v-if="index < infoFollowRecordList.followRecordList.length-1" class="divider"/>
                </div>
            </Panel>

            <div class="pop-comment" >
                <popup v-model="isCommentShow" height="80%">
                  <div style="height:100%;background:#fff;">
                      <mt-header title="写评论">
                        <router-link to="/" slot="left">
                          <mt-button icon="back" @click="isCommentShow=false;"></mt-button>
                        </router-link>
                        <mt-button slot="right" @click="publish">发布</mt-button>
                      </mt-header>
                      <mt-field placeholder="请输入评论内容" type="textarea" v-model="comment" resize="none"></mt-field>
                  </div>
                </popup>
            </div>

            <div v-if="infoFollowRecordList.followRecordList && infoFollowRecordList.followRecordList.length===0" style="margin-top:80px;color:#BEBEBE;text-align:center">
                <i class="iconfont icon-zanwushuju" style="font-size:120px"/>
                <div class="fs-22">暂无数据</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ListItem from './ListItem.vue';
import Panel from '../Panel.vue';
import { Datetime, Group, Popup } from 'vux'
import http from '../../http/index.js';
import { URL_DISCUSS_SAVE } from '../../constant/url.js';
import { Toast } from 'mint-ui';

export default {
    name: 'activity',
    components: {
        ListItem,
        Panel,
        Datetime,
        Group,
        Popup
    },
    data () {
        return {
            filterActive: '1',                        // 筛选选中项
            pickerVisible: '',
            value1: '2015-11',
            isFilterShow: false,
            filterType: 'ALL',
            filterUserIds: 'ALL',
            isCommentShow: false,                     // 评论弹框是否显示
            comment: '',                              // 评论内容
            custids: ''                               // 被评论者id
        }
    },
    computed: mapState({
        infoFollowRecordList: (state) => {
            return state.achievement.infoFollowRecordList;
        },
        infoOther: (state) => {
            if (state.achievement.infoOther) {
                this.filterType = state.achievement.infoOther.filterType;
                this.filterUserIds = state.achievement.infoOther.filterUserIds;
            }
            return state.achievement.infoOther;
        },
        infoFollowRecordTypeList: (state) => {
            return state.achievement.infoFollowRecordTypeList;
        },
        infoSalesmanList: (state) => {
            return state.achievement.infoSalesmanList;
        }
    }),
    methods: {
        ...mapActions([
            'getAchievementData',
            'getFollowData'
        ]),
        // 打开时间选择器
        openPicker () {
            const me = this;
            this.$vux.datetime.show({
                cancelText: '取消',
                confirmText: '确定',
                format: 'YYYY-MM',                  // 供选择的时间格式
                value: this.infoOther.yearmonthcn.replace('年', '-').replace('月', ''),       // 初始时间
                onConfirm (val) {
                    me.getFollowData({filterTime: val.replace('-', ''), filterType: this.filterType, filterUserIds: this.filterUserIds});
                },
                onShow () {
                  console.log('plugin show')
                },
                onHide () {
                  console.log('plugin hide')
                }
            })
        },
        change () {

        },
        chooseType (val) {
            this.filterType = val;
        },
        chooseUser (val) {
            this.filterUserIds = val;
        },
        filterConfirm () {
            this.getFollowData({filterTime: this.infoOther.filterTime, filterType: this.filterType, filterUserIds: this.filterUserIds});
            this.isFilterShow = false;
        },
        openComment (custids) {
            this.isCommentShow = true;
            this.custids = custids;
            document.querySelector('.pop-comment .mint-field-core').focus();
        },
        publish () {
            http.post(`${URL_DISCUSS_SAVE}`, {
                    body: `custFrDiscuss.custfrids=${this.custids}&custFrDiscuss.content=${this.comment}`
                }).then((res) => {
                if (res.statusCode === 200) {
                    Toast({
                      message: '评论成功',
                      position: 'bottom',
                      duration: 1000
                    });
                    this.getFollowData({filterTime: this.infoOther.filterTime, filterType: this.filterType, filterUserIds: this.filterUserIds});
                }
            });
            this.isCommentShow = false;
        },
        reloadFollowData () {
            this.getFollowData({filterTime: this.infoOther.filterTime, filterType: this.filterType, filterUserIds: this.filterUserIds});
        }
    }
}

</script>
<style lang="scss">
@import '../../styles/common.scss';
.vux-datetime-confirm {
    color: $blue!important;
}
.pop-comment {
    .mint-header-title {
        font-size: 16px;
    }
    .mint-field, .mint-field-core {
        margin-top: pxToRem(-30px);
        padding-top: pxToRem(30px);
        box-sizing: border-box;
    }
    .mint-cell:last-child {
        background-image: none;
    }
    .mint-field, .mint-cell-wrapper, .mint-cell-value, .mint-field-core {
        height: pxToRem(180px);
        // padding-top: pxToRem(10px);
    }
    .mint-field-core {
        resize: none;
    }
    .mint-header {
        height: pxToRem(50px);
        z-index: 10;
    }
}
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.activity {
    height: 100%;
    padding-top: pxToRem(46px);
    padding-bottom:  pxToRem(80px);
    .filter {
        position: fixed;
        width: 100%;
        padding: 0 pxToRem(10px);
        // margin-top: pxToRem(10px);
        height: pxToRem(50px);
        line-height: pxToRem(50px);
        box-sizing: border-box;
        background: $bg-blue;
        z-index: 100;
    }
    .list-wrap {
        padding-top: pxToRem(50px);
        .txt-date {
            flex: 2;
            text-align: left;
        }
        .txt-name {
            flex: 1;
            padding-right: pxToRem(10px);
            text-align: right;
        }
        .divider {
            border-bottom: 1px solid #E0E0E0;
        }
        .filterlay-left {
            flex: 2;
            border-right: 1px solid #E0E0E0;
            .active {
                background: #FCFCFC;
                color: $blue;
            }
            .item {
                height: pxToRem(40px);
                line-height: pxToRem(40px);
            }
        }
        .filterlay-right {
            flex: 3;
            padding: 0 pxToRem(10px);
            .item {
                height: pxToRem(40px);
                line-height: pxToRem(40px);
                border-bottom: 1px solid #E0E0E0;
                text-align: left;
                > i {
                    width: pxToRem(20px);
                    text-align:right;
                    color: $blue;
                    font-weight: bolder;
                }
            }
        }
        .filterlay-footer {
            height: pxToRem(40px);
            line-height: pxToRem(40px);
            border-top: 1px solid #BEBEBE;
            .btn-cancel {
            }
            .btn-confirm {
                background: $blue;
                color: #fff;
            }
        }
    }
}
</style>
