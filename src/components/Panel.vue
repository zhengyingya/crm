<template>
  <div class="panel">
      <div class="wrap">
          <slot/>
      </div>
  </div>
</template>

<script>
export default {
    name: 'home',
    components: {
    },
    data () {
        return {
            selected: '1'
        }
    },
}
</script>

<style scoped lang="scss">
@import '../styles/common.scss';
.panel {
    padding: 0 pxToRem(10px);
    margin-bottom: pxToRem(20px);
    .wrap {
        background: #fff;
        overflow: hidden;
        border-radius: pxToRem(5px);
        box-shadow: pxToRem(0px) pxToRem(0px) pxToRem(4px) #C4E1FF;
    }
}
</style>
