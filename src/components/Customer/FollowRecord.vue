<template>
  <div class="follow-record">
      <div
          v-infinite-scroll="loadMore"
          :infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          class="wrap">
          <div v-for="item in recordList" class="item">
               <flexbox :gutter="0" class="head">
                   <flexbox-item :span="1/6" style="color:#26a2ff;">
                       {{ item.names }}
                   </flexbox-item>
                   <flexbox-item :span="2/6" style="color:#ADADAD;">
                       {{ item.typename }}
                   </flexbox-item>
                   <!-- <flexbox-item :span="1/4" style="text-align:right">
                       <i class="iconfont icon-xiangxiazhankai"/>
                   </flexbox-item> -->
               </flexbox>
               <div class="divider"/>
               <div v-html="item.content" class="content"></div>
               <flexbox :gutter="0">
                   <flexbox-item :span="3/4">
                       <span style="color:#ADADAD;">{{ item.addtime }}</span>
                       <span style="color:#26a2ff;margin-left:10px;">删除</span>
                   </flexbox-item>
               </flexbox>
          </div>
          <div v-if="loading" class="flex-row" style="justify-content:center;margin-top:-10px;margin-bottom:5px;"><mt-spinner type="fading-circle" color="#26a2ff"></mt-spinner></div>
          <div v-if="isEnd" class="flex-row" style="justify-content:center;margin-top:-10px;margin-bottom:5px;">没有更多数据了</div>
      </div>
      <flexbox :gutter="0" class="footer">
          <flexbox-item :span="1/2" class="btn-static">
              格式化记录
          </flexbox-item>
          <flexbox-item :span="1/2" class="btn-fast">
              快速记录
          </flexbox-item>
      </flexbox>
  </div>
</template>

<script>
import Panel from '../Panel.vue';
import { Spinner, Flexbox, FlexboxItem } from 'vux';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'followRecord',
    components: {
        Flexbox,
        FlexboxItem,
        Panel
    },
    props: [
        'custIds'
    ],
    created () {
        // this.getCustomerFollowData({custIds: this.custIds, pageNumber: this.pageNumber});
    },
    data () {
        return {
            selected: '1',
            names: ['客户名称', '客户状态', '所在地区', '详细地址', '电话', '传真', '邮箱', '邮编'],
            loading: false,
            isEnd: false,
            pageNumber: 0
        }
    },
    computed: mapState({
        recordList: (state) => {
            return state.customer.recordList;
        },
        totalPage: (state) => {
            return state.customer.totalPage;
        }
    }),
    methods: {
        ...mapActions([
            'getCustomerFollowData'
        ]),
        loadMore () {
            console.log(']]]]]]]]]]]]]', this.pageNumber, this.totalPage)
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

        }
    }
}
</script>
<style lang="scss">
.detail-info {
    .mint-cell-title {
        text-align: left;
        color: #7B7B7B
    }
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
        .divider {
            height: 1px;
            background: #F0F0F0;
        }
        .content {
            text-align: left;
            padding: pxToRem(10px) 0;
        }
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
