<template>
  <div class="personal-info">
      <div class="line">
          <div class="text-1">邮箱</div>
          <div class="text-2">{{personalInfo.user.email}}</div>
      </div>
      <div class="line">
          <div class="text-1">电话</div>
          <div class="text-2">{{personalInfo.userInfo.telephone}}</div>
      </div>
      <div class="line">
          <div class="text-1">手机</div>
          <div class="text-2">{{personalInfo.user.mobile}}</div>
      </div>
      <div class="line">
          <div class="text-1">自我介绍</div>
          <div class="text-2">{{personalInfo.user.description}}</div>
      </div>
      <div class="line">
          <div class="text-1">业务专长</div>
          <div class="text-2">{{personalInfo.user.speciality}}</div>
      </div>
  </div>
</template>

<script>
import Panel from '../Panel.vue';
import { Spinner, Flexbox, FlexboxItem, Popover, Popup, TransferDom } from 'vux';
import { mapState, mapActions } from 'vuex';
import { getQueryString } from '../../utils/commonMethod.js';
import http from '../../http/index.js';
import { URL_SALESMAN_FOLLOW_RECORD, URL_SAVE_CUSTFRDISCUSS, URL_DELETE_CUSTFRDISCUSS, URL_DING_JSAPI_AUTHOR } from '../../constant/url.js';
import { Toast } from 'mint-ui';
import PersonalRecordItem from './PersonalRecordItem.vue';

export default {
    name: 'personalInfo',
    components: {
        Flexbox,
        FlexboxItem,
        Panel,
        Popover,
        Popup,
        PersonalRecordItem
    },
    props: [
        'personalInfo'
    ],
    created () {
        // this.getCustomerFollowData({custIds: this.custIds, pageNumber: this.pageNumber});
        if (getQueryString('reload')) {
            this.initFollowData();
            this.pageNumber = 0;
            // this.getCustomerFollowData({custIds: this.custIds, pageNumber: ++this.pageNumber})
        }
        this.getDingJsapiAuthor();
    },
    data () {
        return {

        }
    },
    computed: {
    },
    methods: {
        ...mapActions([
            'initSalesmanFollowData',
            'getSalesmanFollowData',
            'deleteOneRecord',
            'addOneSalesmanDiscuss',
            'deleteOneDiscuss'
        ]),
    }
}
</script>
<style lang="scss">
@import '../../styles/common.scss';
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.personal-info {
    height: 100%;
    padding: pxToRem(20px);
    // padding-bottom: pxToRem(50px);
    box-sizing: border-box;
    background: #fff;
    text-align: left;
    // overflow: auto;
    .line {
        height: pxToRem(60px);
        border-bottom: 1px solid #E0E0E0;
        .text-1 {
            line-height: pxToRem(30px);
        }
        .text-2 {
            line-height: pxToRem(30px);
            color: #8E8E8E;
        }
    }
}
</style>
