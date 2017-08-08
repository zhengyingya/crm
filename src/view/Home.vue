<template>
  <div class="home">
      <mt-navbar v-model="selected" fixed>
        <mt-tab-item id="1">业绩</mt-tab-item>
        <mt-tab-item id="2">活动记录</mt-tab-item>
      </mt-navbar>

      <!-- tab 具体内容 -->
      <mt-tab-container v-model="selected" :swipeable="false">
          <!-- 业绩 -->
        <mt-tab-container-item id="1">
            <div v-if="!isAchievementDataGet" style="margin-top:280px"><spinner slot="value" type="lines" size="40px"/></div>
            <Achievement v-if="isAchievementDataGet"/>
        </mt-tab-container-item>
        <!-- 活动记录 -->
        <mt-tab-container-item id="2">
            <Activity/>
        </mt-tab-container-item>
      </mt-tab-container>
  </div>
</template>

<script>
import Achievement from '../components/Achievement/index.vue';
import Activity from '../components/Activity/index.vue';
import { mapActions } from 'vuex';
import { Spinner } from 'vux';

export default {
    name: 'home',
    components: {
        Achievement,
        Activity,
        Spinner
    },
    data () {
        return {
            selected: '1',
            isAchievementDataGet: false
        }
    },
    created () {
        // 获取业绩数据
        this.getAchievementData().then((res) => {
            this.isAchievementDataGet = true;
        });
        // 获取活动记录数据
        this.getFollowData({});
    },
    methods: {
        ...mapActions([
            'getAchievementData',
            'getFollowData'
        ])
    }
}
</script>
<style lang="scss">
.mint-tab-item-label {
    font-size: 16px;
}
.home {
    .mint-navbar {
        z-index: 101;
    }
}
</style>
<style scoped lang="scss">
.home {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
}
</style>
