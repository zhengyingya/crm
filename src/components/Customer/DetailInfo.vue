<template>
  <div class="detail-info">
      <Panel>
          <mt-field v-for="name in names" :label="name + '：'">ddddddddsssssssss</mt-field>
          <!-- <mt-field label="客户名称：">dddddddd</mt-field>
          <mt-field label="客户名称：">dddddddd</mt-field>
          <mt-field label="客户名称：">dddddddd</mt-field>
          <mt-field label="客户名称：">dddddddd</mt-field>
          <mt-field label="客户名称：">dddddddd</mt-field> -->
      </Panel>
  </div>
</template>

<script>
import Panel from '../Panel.vue';
import { Spinner, Flexbox, FlexboxItem } from 'vux';
export default {
    name: 'detailInfo',
    components: {
        Flexbox,
        FlexboxItem,
        Panel
    },
    data () {
        return {
            selected: '1',
            names: ['客户名称', '客户状态', '所在地区', '详细地址', '电话', '传真', '邮箱', '邮编']
        }
    },
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
.detail-info {
    height: 100%;
}
</style>
