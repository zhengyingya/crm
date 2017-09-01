<template>
  <div class="contact-info">
      <div class="wrap">
          <div class="line">
              <div class="text-1">联系人姓名</div>
              <div class="text-2">{{contactInfo.name}}</div>
          </div>
          <div class="line">
              <div class="text-1">公司名称</div>
              <div class="text-2">{{contactInfo.custname}}</div>
          </div>
          <div class="line">
              <div class="text-1">职务</div>
              <div class="text-2">{{contactInfo.position}}</div>
          </div>
          <div class="line">
              <div class="text-1">电话</div>
              <div class="text-2">{{contactInfo.telephone}}</div>
          </div>
          <div class="line">
              <div class="text-1">手机</div>
              <div class="text-2">{{contactInfo.mobile}}</div>
          </div>
          <div class="line">
              <div class="text-1">地址</div>
              <div class="text-2">{{contactInfo.address}}</div>
          </div>
          <div class="line">
              <div class="text-1">生日</div>
              <div class="text-2">{{contactInfo.birthday}}</div>
          </div>
          <div class="line">
              <div class="text-1">兴趣爱好</div>
              <div class="text-2">{{contactInfo.hobbies}}</div>
          </div>
          <div class="line">
              <div class="text-1">教育背景</div>
              <div class="text-2">{{contactInfo.education}}</div>
          </div>
          <div class="line">
              <div class="text-1">其他描述</div>
              <div class="text-2">{{contactInfo.description}}</div>
          </div>
      </div>
      <div class="footer" @click="jump(`/customer/addcontact?custIds=${custIds}&custName=${custName}&contactsIds=${contactsIds}`)">编辑资料</div>
  </div>
</template>

<script>
import Panel from '../Panel.vue';
import { Spinner, Flexbox, FlexboxItem, Popover, Popup, TransferDom } from 'vux';
import { mapState, mapActions } from 'vuex';
import { getQueryString } from '../../utils/commonMethod.js';
import http from '../../http/index.js';
import { } from '../../constant/url.js';
import { Toast } from 'mint-ui';
import PersonalRecordItem from './PersonalRecordItem.vue';

export default {
    name: 'contactInfo',
    components: {
        Flexbox,
        FlexboxItem,
        Panel,
        Popover,
        Popup,
        PersonalRecordItem
    },
    props: [
        'contactInfo',
        'custIds',
        'custName',
        'contactsIds'
    ],
    created () {
    },
    data () {
        return {

        }
    },
    computed: {
    },
    methods: {
        ...mapActions([
        ]),
        jump (path) {
            this.$router.push({path: encodeURI(encodeURI(path))});
        }
    }
}
</script>
<style lang="scss">
@import '../../styles/common.scss';
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.contact-info {
    height: 100%;
    // padding-bottom: pxToRem(50px);
    box-sizing: border-box;
    background: #fff;
    text-align: left;
    // overflow: auto;
    .wrap {
        height: 100%;
        overflow: auto;
        padding: pxToRem(20px);
        padding-bottom: pxToRem(50px);
        box-sizing: border-box;
        .line {
        height: pxToRem(60px);
        background: #fff;
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
    .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: pxToRem(45px);
        line-height: pxToRem(45px);
        background: $blue;
        color: #fff;
        border-top: 1px solid #BEBEBE;
        text-align: center;
        .btn-fast {
            height: 100%;
            background: $blue;
            color: #fff;
        }
    }
}
</style>
