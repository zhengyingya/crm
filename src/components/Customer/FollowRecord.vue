<template>
  <div class="follow-record">
      <div
          v-infinite-scroll="loadMore"
          :infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          class="wrap">
          <div v-for="item in recordList" class="item">
               <FollowRecordItem :item="item" @openComment="openComment"/>
          </div>
          <div v-if="loading" class="flex-row" style="justify-content:center;margin-top:-10px;margin-bottom:5px;"><mt-spinner type="fading-circle" color="#26a2ff"></mt-spinner></div>
          <div v-if="isEnd" class="flex-row" style="justify-content:center;margin-top:-10px;margin-bottom:5px;">没有更多数据了</div>
      </div>
      <flexbox :gutter="0" class="footer">
          <flexbox-item :span="1/2" class="btn-static">
              <div @click="jump(`/customer/formatrecord?custIds=${custIds}&custName=${custName}`)">格式化记录</div>
          </flexbox-item>
          <flexbox-item :span="1/2" class="btn-fast">
              <div @click="jump(`/customer/fastrecord?custIds=${custIds}`)">快速记录</div>
          </flexbox-item>
      </flexbox>

      <div class="pop-comment" >
          <popup v-model="isCommentShow" height="80%">
            <div style="height:100%;background:#fff;">
                <mt-header title="写评论">
                  <!-- <router-link to="/" slot="left">
                    <mt-button icon="back" @click="isCommentShow=false;"></mt-button>
                  </router-link> -->
                  <mt-button slot="right" @click="publish">发布</mt-button>
                </mt-header>
                <mt-field placeholder="请输入评论内容" type="textarea" v-model="comment" resize="none"></mt-field>
            </div>
          </popup>
      </div>

  </div>
</template>

<script>
import Panel from '../Panel.vue';
import { Spinner, Flexbox, FlexboxItem, Popover, Popup, TransferDom } from 'vux';
import { mapState, mapActions } from 'vuex';
import { getQueryString } from '../../utils/commonMethod.js';
import http from '../../http/index.js';
import { URL_DELETE_CUSTOMER_FOLLOW_RECORD, URL_SAVE_CUSTFRDISCUSS, URL_DELETE_CUSTFRDISCUSS } from '../../constant/url.js';
import { Toast } from 'mint-ui';
import FollowRecordItem from './FollowRecordItem.vue';

export default {
    name: 'followRecord',
    directives: {
        TransferDom
    },
    components: {
        Flexbox,
        FlexboxItem,
        Panel,
        Popover,
        Popup,
        FollowRecordItem
    },
    props: [
        'custIds',
        'custName'
    ],
    created () {
        // this.getCustomerFollowData({custIds: this.custIds, pageNumber: this.pageNumber});
        if (getQueryString('reload')) {
            console.log('===========')
            this.pageNumber = 0;
            this.getCustomerFollowData({custIds: this.custIds, pageNumber: ++this.pageNumber})
        }
    },
    data () {
        return {
            window,
            names: ['客户名称', '客户状态', '所在地区', '详细地址', '电话', '传真', '邮箱', '邮编'],
            loading: false,
            isEnd: false,
            pageNumber: 0,
            isCommentShow: false,                    // 评论弹框是否显示
            comment: '',                             // 评论内容
            custfrids: ''                            // 当前打开的跟进记录id
        }
    },
    computed: {
        ...mapState({
            recordList: (state) => {
                return state.customer.recordList;
            },
            totalPage: (state) => {
                return state.customer.totalPage;
            },
            cUserIds: (state) => {
                return state.customer.cUserIds;
            }
        })
    },
    methods: {
        ...mapActions([
            'getCustomerFollowData',
            'deleteOneRecord',
            'addOneDiscuss',
            'deleteOneDiscuss'
        ]),
        loadMore () {
            this.loading = true;
            if (this.pageNumber >= this.totalPage) {
                this.isEnd = true;
                this.loading = false;
            }
            else {
                this.getCustomerFollowData({custIds: this.custIds, pageNumber: ++this.pageNumber})
                .then((res) => {
                    this.loading = true;
                });
            }
        },
        jump (path) {
            this.$router.push({path: encodeURI(encodeURI(path))});
        },
        openComment (custfrids) {
            this.isCommentShow = true;
            this.custfrids = custfrids;
        },
        publish () {
            this.isCommentShow = false;
            http.post(URL_SAVE_CUSTFRDISCUSS, {
                body: `custFrDiscuss.custfrids=${this.custfrids}&custFrDiscuss.content=${this.comment}`
            }).then((res) => {
                // Toast({
                //   message: res.status===200?'',
                //   position: 'bottom',
                //   duration: 1000
                // });
                this.addOneDiscuss({
                    ids: this.custfrids,
                    content: this.comment,
                    discussIds: res.discussIds,
                    names: res.cUserName
                });
                this.custfrids = '';
            })
        }
    }
}
</script>
<style lang="scss">
@import '../../styles/common.scss';
.follow-record {
    .mint-cell-title {
        text-align: left;
        color: #7B7B7B
    }
    .vux-popover {
        top: -5px!important;
        left: -30px!important;
        animation: mymove .3s 1;
    }
    @keyframes mymove {
        from {left:pxToRem(30px);width:pxToRem(10px);}
        to {left:pxToRem(-30px)!important;width:pxToRem(80px);}
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
}
.vux-previewer {
    opacity: 0;
}
.pswp--open {
    opacity: 1!important;
    animation: pswpOpacity 1s 1;
}
.pre-close {
    animation: pswpOpacityOut .5s 1;
}
@keyframes pswpOpacityOut {
    from {opacity: 1;}
    to {opacity: 0;}
}
@keyframes pswpOpacity {
    from {opacity: 0;}
    to {opacity: 1;}
}
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.follow-record {
    height: 100%;
    padding-bottom: pxToRem(50px);
    box-sizing: border-box;
    // overflow: auto;
    .wrap {
        height: 100%;
        overflow: auto;
    }
    .item {
        // height: pxToRem(50px);
        padding: pxToRem(10px) pxToRem(20px);
        margin-bottom: pxToRem(20px);
        background: #fff;
        .head {
            height: pxToRem(20px);
            line-height: pxToRem(20px);
            margin-bottom: pxToRem(10px);
        }
        .pic {
            margin-top: pxToRem(10px);
            flex-wrap: wrap;
            .img {
                width: pxToRem(100px);
                height: pxToRem(100px);
                margin-right: pxToRem(10px);
                margin-bottom: pxToRem(10px);
            }
        }
        .divider {
            height: 1px;
            background: #F0F0F0;
        }
        .content {
            text-align: left;
            padding: pxToRem(10px) 0;
            word-break: break-all;
        }
    }
    .discuss-wrap {
        width: 100%;
        // margin-left: 10%;
        margin-top: pxToRem(20px);
        background: #F0F0F0;
        border-radius: pxToRem(5px);
        padding: pxToRem(5px) pxToRem(10px);
    }
    .footer {
        position: fixed;
        bottom: 0;
        height: pxToRem(45px);
        line-height: pxToRem(45px);
        border-top: 1px solid #BEBEBE;
        text-align: center;
        .btn-static {
            background: #fff;
        }
        .btn-fast {
            height: 100%;
            background: $blue;
            color: #fff;
        }
    }
}
</style>
