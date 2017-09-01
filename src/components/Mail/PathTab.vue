<template>
  <div class="pathTab" ref="pathTab">
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
    updated () {
        this.$refs.pathTab.scrollLeft = 1000000;
    },
    methods: {
        jump (deptpathids) {
            // this.$router.push({path: `/mail/group?departmentIds=${deptpathids}`})
            this.$emit('getData', deptpathids);
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';
.pathTab {
    display: -webkit-box;
    // display: flex;
    // display: flex;
    // position: fixed;
    width: 100%;
    overflow: scroll;
    box-sizing: border-box;
    padding: pxToRem(20px) pxToRem(20px);
    margin-bottom: pxToRem(10px);
    background: #F0F0F0;
}
</style>
