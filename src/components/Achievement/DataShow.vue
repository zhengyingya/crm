<template>
  <div class="data-show flex-row">
      <div class="left"><i class="iconfont fs-26" :class="!icon||icon===''?'icon-fahuotixing':icon"/></div>
      <div class="flex-cloumn right">
          <div class="it1 fs-14">{{text}}</div>
          <div class="it2 fs-22">
              <span style="color:#26a2ff" :class="num&&num.toString().length>=8?'fs-16':'fs-22'">{{num}}</span>
              <span style="font-size:14px;color:#9D9D9D">KG</span>
          </div>
      </div>
  </div>
</template>

<script>
import Panel from '../Panel.vue';
export default {
    name: 'dataShow',
    components: {
        Panel
    },
    props: [
        'icon',
        'text',
        'num'
    ],
    data () {
        return {
            selected: '1'
        }
    },
}
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';
.data-show {
    width: 100%;
    .head {
        display: flex;
    }
    .left {
        flex: 1;
        line-height: 80px;
        text-align: center;
        > i {
            color: #26a2ff;
        }
    }
    .right {
        flex: 2;
        text-align: left;
        .it1 {
            height: 40px;
            line-height: 50px;
        }
        .it2 {
            height: 40px;
            line-height: 30px;
        }
    }
}
</style>
