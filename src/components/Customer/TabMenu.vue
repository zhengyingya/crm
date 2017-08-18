<template>
  <div class="cus-tab-menu">
      <flexbox :gutter="0">
          <flexbox-item :span="custPoolIds?1/4:1/5" class="item" style="border-right:1px solid #d0d0d0;">
              <div @click="jump(`/customer/contactlist?custIds=${custIds}`)">
                  <i class="iconfont icon-yonghu-xianxing fs-18"/>
                  <div class="fs-12">联系人</div>
                  <div>{{detailViewData.contactsCount}}</div>
              </div>
          </flexbox-item>
          <flexbox-item v-if="!custPoolIds" :span="1/5" class="item" style="border-right:1px solid #d0d0d0;">
              <i class="iconfont icon-xiaoliangshuliang fs-18"/>
              <div class="fs-12">历史销量</div>
              <div>{{detailViewData.salesVolume}}</div>
          </flexbox-item>
          <flexbox-item :span="custPoolIds?1/4:1/5" class="item" style="border-right:1px solid #d0d0d0;">
              <i class="iconfont icon-icon-text-fn-historyrecord fs-18"/>
              <div class="fs-12">计划</div>
              <div>完成</div>
          </flexbox-item>
          <flexbox-item :span="custPoolIds?1/4:1/5" class="item" style="border-right:1px solid #d0d0d0;">
              <div @click="jump(`/customer/custcredit?custIds=${custIds}`)">
                  <i class="iconfont icon-jiangbei01 fs-18"/>
                  <div class="fs-12">授信</div>
                  <div>评价</div>
              </div>
          </flexbox-item>
          <flexbox-item :span="custPoolIds?1/4:1/5" class="item">
              <div @click="jump(`/customer/salestrends?custIds=${custIds}`)">
                  <i class="iconfont icon-jingying fs-18"/>
                  <div class="fs-12">经营动态</div>
                  <div class="one-line" style="padding:0 5px;">{{detailViewData.latestFollowRecordDate}}</div>
              </div>
          </flexbox-item>
      </flexbox>
      <!-- <div class="item">
          <i class="iconfont icon-yonghu-xianxing"/>
          <div>联系人</div>
          <div>0</div>
      </div> -->
  </div>
</template>

<script>
import { Spinner, Flexbox, FlexboxItem } from 'vux';
export default {
    name: 'tabMenu',
    components: {
        Flexbox,
        FlexboxItem
    },
    props: [
        'detailViewData',
        'custIds',
        'custPoolIds'
    ],
    data () {
        return {
            selected: '1'
        }
    },
    methods: {
        jump (path) {
            this.$router.push({path});
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';
.cus-tab-menu {
    .item {
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        background: rgba(142, 142, 142, 0.1);
        height: pxToRem(70px);
    }
}
</style>
