<template>
  <div class="follow-record">
      <div
          v-infinite-scroll="loadMore"
          :infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
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
      </div>
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
        this.getCustomerFollowData({custIds: this.custIds, pageNumber: this.pageNumber});
    },
    data () {
        return {
            selected: '1',
            names: ['客户名称', '客户状态', '所在地区', '详细地址', '电话', '传真', '邮箱', '邮编'],
            loading: false,
            pageNumber: 1
        }
    },
    computed: mapState({
        recordList: (state) => {
            return state.customer.recordList;
        }
    }),
    methods: {
        ...mapActions([
            'getCustomerFollowData'
        ]),
        loadMore () {
            console.log(']]]]]]]]]]]]]')
            this.getCustomerFollowData({custIds: this.custIds, pageNumber: this.pageNumber++});
            this.loading = true;
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
}
</style>
