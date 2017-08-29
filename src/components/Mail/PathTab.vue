<template>
  <div class="pathTab">
      <div v-for="(item, index) in deptpathList" class="flex-row">
          <div>{{item.deptpathname}}</div>
          <i v-if="index !== deptpathList.length - 1" class="iconfont icon-xiayiyeqianjinchakangengduo" style="margin-top:2px;"/>
      </div>
  </div>
</template>

<script>
export default {
    name: 'pathTab',
    components: {
    },
    props: [
        'deptpathList'
    ],
    data () {
        return {
        }
    },
}
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';
.pathTab {
    display: flex;
    padding: pxToRem(20px) pxToRem(20px);
    margin-bottom: pxToRem(20px);
    background: #E0E0E0;
    .wrap {
        background: #fff;
        overflow: hidden;
        border-radius: pxToRem(5px);
        box-shadow: pxToRem(0px) pxToRem(0px) pxToRem(4px) #C4E1FF;
    }
}
</style>
