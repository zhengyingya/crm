<template>
    <div class="view-personal">
        <div class="header">
            <blur class="blur" :blur-amount=40 :url="'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504071583757&di=2048d1398fce014840cc7079990490c2&imgtype=0&src=http%3A%2F%2F2e.zol-img.com.cn%2Fproduct%2F64_280x2000%2F410%2Fceneo4LyDg8c.jpg'">
                <img :src="window.cxt + '/jsfile/hybrid/crm/img/avatar.jpeg'/*../../static/image/avatar.jpeg*/">
                <div style="margin-top:10px;">{{personalData.names}}</div>
                <div style="margin-top:10px;">
                    {{personalData.mobile}}
                    <a :href="`tel:${personalData.mobile}}`" style="margin-left:5px;color:#fff;">
                        <i class="iconfont icon-dianhua"/>
                    </a>
                </div>
            </blur>
        </div>

        <mt-navbar v-model="selected">
            <mt-tab-item id="1">工作圈</mt-tab-item>
            <mt-tab-item id="2">业绩</mt-tab-item>
            <mt-tab-item id="3">资料</mt-tab-item>
        </mt-navbar>
        <!-- tab 具体内容 -->
        <mt-tab-container v-model="selected" :swipeable="false">
            <mt-tab-container-item id="1">
                <PersonalRecord :userIds="userIds"/>
            </mt-tab-container-item>
            <!-- 详细信息-->
            <mt-tab-container-item id="2">
                <PersonalAchievement :userIds="userIds" :selected="selected"/>
            </mt-tab-container-item>
          <!-- 协助人 -->
            <mt-tab-container-item id="3">
                <PersonalInfo :personalInfo="personalInfo"/>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
import Panel from '../../components/Panel.vue';
import PersonalRecord from '../../components/Mail/PersonalRecord.vue';
import PersonalInfo from '../../components/Mail/PersonalInfo.vue';
import PersonalAchievement from '../../components/Mail/PersonalAchievement.vue';
import { mapActions } from 'vuex';
import { Spinner, Flexbox, FlexboxItem, Blur } from 'vux';
import { URL_SALESMAN_HEAD, URL_SALESMAN_DETAILS } from '../../constant/url.js';
import { getQueryString } from '../../utils/commonMethod.js';
import http from '../../http/index.js';

export default {
    name: 'group',
    components: {
        Panel,
        Spinner,
        Flexbox,
        FlexboxItem,
        Blur,
        PersonalRecord,
        PersonalInfo,
        PersonalAchievement
    },
    data () {
        return {
            window,
            userIds: getQueryString('userIds') || '',   // 获取userIds
            personalData: {},
            personalInfo: {user:{}, userInfo:{}},
            selected: '1'
        }
    },
    created () {
        this.getHeadData();
        this.getPersonalInfo();
    },
    methods: {
        ...mapActions([
        ]),
        // 获取名片头部数据
        getHeadData () {
            http.get(`${URL_SALESMAN_HEAD}?userIds=${this.userIds}`)
            .then((res) => {
                console.log(res)
                this.personalData = res;
            })
        },
        // 获取个人详情数据
        getPersonalInfo () {
            http.get(`${URL_SALESMAN_DETAILS}?userIds=${this.userIds}`)
            .then((res) => {
                this.personalInfo = res;
            })
        },
        jump (path) {
            this.$router.push({path: path});
        },
        makeColor (color) {
            return `rgba(${color})`
        }
    }
}
</script>
<style lang="scss">
@import '../../styles/common.scss';
.mint-navbar {
    z-index: 2;
    border-bottom: 1px solid #E0E0E0;
}
.mint-tab-container {
    flex: 1;
    overflow: auto;
    // padding-top: pxToRem(4px);
    background: #ECF5FF;
    // padding-bottom: pxToRem(60px);
    .mint-tab-container-wrap, .mint-tab-container-item {
        height: 100%;
    }
}
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.view-personal {
    height: 100%;
    overflow: auto;
    // background-color: #ECF5FF;
    // padding-top: pxToRem(20px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .header {
        .blur {
            padding: pxToRem(20px) 0;
            box-sizing: border-box;
            color: #fff;
        }
        height: pxToRem(200px);
        img {
            height: pxToRem(70px);
            width: pxToRem(70px);
            border-radius: pxToRem(5px);
            border: 2px solid #fff;
        }
    }
}
</style>
