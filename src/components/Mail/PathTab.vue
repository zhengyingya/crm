<template>
  <div class="pathTab">
      <div v-for="(item, index) in deptpathList" class="flex-row">
          <div :style="{color: index !== deptpathList.length - 1?'#26a2ff':''}" @click="jump(item.deptpathids)">{{item.deptpathname}}</div>
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
    methods: {
        jump (deptpathids) {
            this.$router.push({path: `/mail/group?departmentId=${deptpathids}`})
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';
.pathTab {
    display: flex;
    padding: pxToRem(20px) pxToRem(20px);
    margin-bottom: pxToRem(10px);
    background: #F0F0F0;
    .wrap {
        background: #fff;
        overflow: hidden;
        border-radius: pxToRem(5px);
        box-shadow: pxToRem(0px) pxToRem(0px) pxToRem(4px) #C4E1FF;
    }
}
</style>
