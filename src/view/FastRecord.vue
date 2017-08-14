<template>
    <div class="view-formatrecord flex-cloumn">
        <mt-field placeholder="请输入评论内容" type="textarea" v-model="comment" rows="5"></mt-field>
        <div></div>
        <div>
            <div class="title">图片</div>
            <div class="flex-row img-wrap">
                <i class="iconfont icon-tianjia fs-60"/>
                <input id="fileBtn" type="file" onchange="upload('#fileBtn', '#img');" accept="image/*" capture="camera"/>
            </div>
        </div>
    </div>
</template>

<script>
import Panel from '../components/Panel.vue';
import { mapActions } from 'vuex';
import { getQueryString } from '../utils/commonMethod.js';
import http from '../http/index.js';
import { URL_GET_PRO_SPECIFICATION, URL_GET_BATCH_NUMBER, URL_SAVE_CUSTOTHERINFO } from '../constant/url.js';
import { PopupPicker, Popup, Picker, Flexbox, FlexboxItem, XInput } from 'vux';
import { Toast, MessageBox } from 'mint-ui';

export default {
    name: 'fastRecord',
    components: {
        Panel,
        PopupPicker,
        Popup,
        Picker,
        Flexbox,
        FlexboxItem,
        XInput
    },
    data () {
        return {
            custIds: getQueryString('custIds'),
            comment: ''
        }
    },
    created () {
    },
    methods: {
        ...mapActions([
        ])
    }
}
</script>
<style lang="scss">
@import '../styles/common.scss';
.view-formatrecord {
    .mint-field-core {
        resize: none;
    }
}
</style>
<style scoped lang="scss">
@import '../styles/common.scss';
.view-formatrecord {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    .title {
        height: pxToRem(30px);
        line-height: pxToRem(30px);
        background: $blue;
        text-align: left;
        padding: 0 pxToRem(20px);
        color: #fff;
    }
    .img-wrap {
        padding: pxToRem(20px);
        > i {
            cursor: pointer;
        }
    }
}
</style>
