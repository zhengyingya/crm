<!-- 联系人详情主页 -->
<template>
    <div class="view-contact-page">
        <div class="header">
            <blur class="blur" :blur-amount=40 :url="'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504071583757&di=2048d1398fce014840cc7079990490c2&imgtype=0&src=http%3A%2F%2F2e.zol-img.com.cn%2Fproduct%2F64_280x2000%2F410%2Fceneo4LyDg8c.jpg'">
                <img src="../../static/image/avatar.jpeg">
                <div style="margin-top:10px;">{{personalData.contactsName}}</div>
                <div v-if="personalData.contactsMobile" style="margin-top:10px;">
                    {{personalData.contactsMobile}}
                    <a :href="`tel:${personalData.contactsMobile}}`" style="margin-left:5px;color:#fff;">
                        <i class="iconfont icon-dianhua"/>
                    </a>
                </div>
                <div style="margin-top:10px;">
                    {{personalData.custName}}
                </div>
            </blur>
        </div>

        <mt-navbar v-model="selected">
            <mt-tab-item id="1">跟进记录</mt-tab-item>
            <mt-tab-item id="2">详细信息</mt-tab-item>
        </mt-navbar>
        <!-- tab 具体内容 -->
        <mt-tab-container v-model="selected" :swipeable="false">
            <mt-tab-container-item id="1">
                <ContactRecord :custIds="personalData.custIds" :custName="personalData.custName" :contactsIds="contactsIds"/>
            </mt-tab-container-item>
            <!-- 详细信息-->
            <mt-tab-container-item id="2">
                <ContactInfo :contactInfo="contactInfo" :custIds="personalData.custIds" :custName="personalData.custName" :contactsIds="contactsIds"/>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
import Panel from '../../components/Panel.vue';
import PathTab from '../../components/Mail/PathTab.vue';
import ContactRecord from '../../components/Mail/ContactRecord.vue';
import ContactInfo from '../../components/Mail/ContactInfo.vue';
import PersonalAchievement from '../../components/Mail/PersonalAchievement.vue';
import { mapActions } from 'vuex';
import { Spinner, Flexbox, FlexboxItem, Blur } from 'vux';
import { URL_CONTACT_HEAD, URL_CONTACT_DETAILS } from '../../constant/url.js';
import { getQueryString } from '../../utils/commonMethod.js';
import http from '../../http/index.js';

export default {
    name: 'contactPage',
    components: {
        Panel,
        Spinner,
        Flexbox,
        FlexboxItem,
        PathTab,
        Blur,
        ContactRecord,
        ContactInfo,
        PersonalAchievement
    },
    data () {
        return {
            contactsIds: getQueryString('contactsIds') || '',
            personalData: {},
            contactInfo: {},
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
        getHeadData () {
            http.get(`${URL_CONTACT_HEAD}?contactsIds=${this.contactsIds}`)
            .then((res) => {
                console.log(res)
                this.personalData = res;
            })
        },
        getPersonalInfo () {
            http.get(`${URL_CONTACT_DETAILS}?contactsIds=${this.contactsIds}`)
            .then((res) => {
                this.contactInfo = res.contacts;
            })
        },
        refresh (departmentIds) {
            this.departmentIds = departmentIds;
            this.getGroupData();
            // this.$router.push({path: '/mail/group?departmentIds=' + departmentIds});
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
    padding-top: pxToRem(4px);
    background: #ECF5FF;
    // padding-bottom: pxToRem(60px);
    .mint-tab-container-wrap, .mint-tab-container-item {
        height: 100%;
    }
}
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.view-contact-page {
    height: 100%;
    overflow: auto;
    // background-color: #ECF5FF;
    // padding-top: pxToRem(20px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .header {
        .blur {
            padding-top: pxToRem(30px);
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
