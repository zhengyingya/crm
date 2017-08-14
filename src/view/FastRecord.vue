<template>
    <div class="view-formatrecord flex-cloumn">
        <Panel style="height: 100">
            <div>
                <div class="title">文字</div>
                <mt-field placeholder="请输入评论内容" type="textarea" v-model="comment" rows="5"></mt-field>
            </div>
            <div>
                <div class="title">语音</div>
                <div class="audio-wrap">
                    <div class="btn-record"><i class="iconfont icon-yuyin"/></div>
                </div>
            </div>
            <div>
                <div class="title">图片</div>
                <div class="flex-row img-wrap">
                    <img v-for="item in imgs" :src="item">
                    </img>
                    <div class="btn-add">
                        <i class="iconfont icon-tianjia"></i>
                        <input class="img-inp" id="fileBtn" type="file" @change="imgUpload" accept="image/*" capture="camera" multiple="multiple"/>
                    </div>
                </div>
            </div>
        </Panel>
        <Panel>
            <div class="btn-save" @click="save">保存</div>
        </Panel>
    </div>
</template>

<script>
import Panel from '../components/Panel.vue';
import { mapActions } from 'vuex';
import { getQueryString } from '../utils/commonMethod.js';
import http from '../http/index.js';
import { URL_GET_PRO_SPECIFICATION, URL_GET_BATCH_NUMBER, URL_SAVE_CUSTOTHERINFO, URL_SAVE_CUST_RECORD, URL_SAVE_UPLOAD_IMAGE } from '../constant/url.js';
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
            comment: '',
            imgs: [],
            imagePath: []
        }
    },
    created () {
    },
    methods: {
        ...mapActions([
        ]),
        imgUpload (e) {
            const me = this;
            const files = e.target.files;
            for (let i=0,len=files.length; i<len; i++) {
                var reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.onload = function(e) {                   // 获取上传图片的base64，传给后台时用
                    me.imgs.push(this.result);
                };
            }
            // console.log(me.imgs)
        },
        async uploadServer (baseStr) {
            const res = await http.post(URL_SAVE_UPLOAD_IMAGE, {
                body: `baseStr=${baseStr}`
            });
            this.imagePath.push(res.imagePathName);
            console.log('--------', this.imagePath)
        },
        async save () {
            // console.log(this.custIds)
            // await this.uploadServer(this.imgs[0]);
            for (let i=0,len=this.imgs.length; i<len; i++) {
                await this.uploadServer(this.imgs[i]);
            }
            // this.imgs.map((item) => {
            //     this.uploadServer(item);
            // });
            console.log(']]]]]', this.imagePath)
            http.post(URL_SAVE_CUST_RECORD, {
                body: `custFollowRecord.custids=${this.custIds}&custFollowRecord.contactsids=&custFollowRecord.followtype=98&custFollowRecord.content=${this.comment}&` +
                    `images=${JSON.stringify(this.imagePath)}`
            }).then((res) => {
                console.log(res);
            })
        }
    }
}
</script>
<style lang="scss">
@import '../styles/common.scss';
.view-formatrecord {
    .mint-field-core {
        resize: none;
    }
    .panel > .wrap {
        border-radius: 0!important;
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
        background: rgba(38, 162, 255, 0.7);
        text-align: left;
        padding: 0 pxToRem(20px);
        color: #fff;
    }
    .audio-wrap {
        padding: pxToRem(20px) pxToRem(20px);

        .btn-record {
            height: pxToRem(30px);
            line-height: pxToRem(30px);
            border-radius: pxToRem(10px);
            background: #F0F0F0	;
            i {
                color: $blue;
            }
        }
    }
    .img-wrap {
        padding: pxToRem(20px);
        flex-wrap: wrap;
        .btn-add {
            position: relative;
            margin-top: -4px;
            i {
                display: block;
                font-size: 80px;
                height: 80px;
                cursor: pointer;
            }
        }
        >img {
            width: 80px;
            height: 80px;
            margin-right: pxToRem(30px);
            margin-bottom: pxToRem(20px);
        }
        .img-inp {
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            width: 80px;
            height: 80px;
        }
    }
    .btn-save {
        height: pxToRem(40px);
        line-height: pxToRem(40px);
        background: $blue;
        color: #fff;
    }
}
</style>
