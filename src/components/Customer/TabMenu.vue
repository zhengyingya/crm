<template>
  <div class="cus-tab-menu">
      <flexbox :gutter="0">
          <flexbox-item :span="1/5" class="item" style="border-right:1px solid #d0d0d0;">
              <i class="iconfont icon-yonghu-xianxing"/>
              <div>联系人</div>
              <div>0</div>
          </flexbox-item>
          <flexbox-item :span="1/5" class="item" style="border-right:1px solid #d0d0d0;">
              <i class="iconfont icon-yonghu-xianxing"/>
              <div>联系人</div>
              <div>0</div>
          </flexbox-item>
          <flexbox-item :span="1/5" class="item" style="border-right:1px solid #d0d0d0;">
              <i class="iconfont icon-yonghu-xianxing"/>
              <div>联系人</div>
              <div>0</div>
          </flexbox-item>
          <flexbox-item :span="1/5" class="item" style="border-right:1px solid #d0d0d0;">
              <i class="iconfont icon-yonghu-xianxing"/>
              <div>联系人</div>
              <div>0</div>
          </flexbox-item>
          <flexbox-item :span="1/5" class="item">
              <i class="iconfont icon-yonghu-xianxing"/>
              <div>联系人</div>
              <div>0</div>
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
    data () {
        return {
            selected: '1'
        }
    },
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
