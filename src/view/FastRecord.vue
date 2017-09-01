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
                    <div class="btn-record" @click="isAudioShow=true;"><i class="iconfont icon-yuyin"/></div>
                    <div v-for="item in audioIdList" class="flex-row audio-item" @click="playAudio(item.mediaId)">
                        <i class="iconfont icon-yuyin1"/>
                        <span class="fs-18" style="color:#8E8E8E;margin-left:20px;">{{item.duration}}''</span>
                        <i class="iconfont icon-cuo btn-del" @click.stop="delAudio(item.mediaId)"/>
                    </div>
                </div>
            </div>
            <div>
                <div class="title">图片</div>
                <div class="flex-row img-wrap">
                    <div v-for="(item, index) in imgs" style="position:relative">
                        <img :src="item">
                        </img>
                        <i class="iconfont icon-cuo btn-del" @click.stop="delImage(index)"/>
                    </div>
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

        <popup v-model="isAudioShow" position="bottom" :on-hide="AudioHide">
            <div class="popup-audio">
                <div v-show="isAudioRecord" class="fs-30" style="position:absolute;top:30px;width:100px;left:50%;margin-left:-50px;color:#26a2ff">{{audioCountMin<10?`0${audioCountMin}`:audioCountMin}}:{{audioCountSec<10?`0${audioCountSec}`:audioCountSec}}</div>
                <div v-show="!isAudioRecord" class="btn-audio" @click="start">
                    <i v-show="!isAudioRecord" class="iconfont icon-yuyin fs-40"/>
                </div>
                <img v-show="isAudioRecord" :src="window.cxt + '/jsfile/hybrid/crm/img/timg.cbee0c4.gif'/*../static/image/timg.gif*/"/>
                <div style="position:absolute;bottom:30px;width:100px;left:50%;margin-left:-50px;">{{audioTip}}</div>
                <i v-show="isAudioRecord" class="iconfont icon-sucess icon-true" @click="saveAudio"/>
                <i v-show="isAudioRecord" class="iconfont icon-fail icon-false" @click="saveAudio"/>
            </div>
        </popup>
    </div>
</template>

<script>
import Panel from '../components/Panel.vue';
import { mapActions } from 'vuex';
import { getQueryString } from '../utils/commonMethod.js';
import http from '../http/index.js';
import {
    URL_GET_PRO_SPECIFICATION,
    URL_GET_BATCH_NUMBER,
    URL_SAVE_CUSTOTHERINFO,
    URL_SAVE_CUST_RECORD,
    URL_SAVE_UPLOAD_IMAGE,
    URL_DING_JSAPI_AUTHOR
} from '../constant/url.js';
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
            window,
            custIds: getQueryString('custIds'),
            contactsIds: getQueryString('contactsIds'),
            comment: '',                            // 评论内容
            imgs: [],                               // 图片base64数组
            imagePath: [],                          // 上传后台返回的地址数组
            isAudioShow: false,
            audioTip: '点击录音',
            audioCountMin: 0,
            audioCountSec: 0,
            timer: null,
            isAudioRecord: false,
            audioIdList: []
        }
    },
    created () {
        this.getDingJsapiAuthor ();
    },
    methods: {
        ...mapActions([
        ]),
        init () {
            this.isAudioShow = false;
            this.isAudioRecord = false;
            this.audioCountMin = 0;
            this.audioCountSec = 0;
            this.audioTip = '点击录音';
            clearInterval(this.timer);
        },
        getDingJsapiAuthor () {
            http.get(URL_DING_JSAPI_AUTHOR)
            .then((res) => {
                dd.config({
                    agentId: res.agentId +'', // 必填，微应用ID
                    corpId: res.corpId,//必填，企业ID
                    timeStamp: res.timeStamp, // 必填，生成签名的时间戳
                    nonceStr: res.nonceStr, // 必填，生成签名的随机串
                    signature: res.signature, // 必填，签名
                    jsApiList: ['ui.pullToRefresh.enable','ui.pullToRefresh.stop','biz.util.openLink','biz.navigation.setLeft','biz.navigation.setTitle','biz.navigation.setRight',
                                'device.audio.startRecord', 'device.audio.stopRecord', 'dd.device.audio.onRecordEnd','device.audio.play',
                             'device.audio.download',
                             'device.audio.pause',
                             'device.audio.stop'] // 必填，需要使用的jsapi列表
                });
                dd.ready(function(){

                });
                dd.error(function(error){
                    alert('dingding error: ' + JSON.stringify(error));
                });
            })
        },
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
            this.imagePath.push(res.imagePathName);                 // 将地址保存到imagePath数组中
        },
        async save () {
            for (let i=0,len=this.imgs.length; i<len; i++) {
                await this.uploadServer(this.imgs[i]);              // 同步上传图片到后台，获取返回的图片地址
            }
            let mediaId = [];
            let mediaDuration = [];

            let query = '';
            this.imagePath.map((item) => {
                query += `&images=${item}`;
            })
            for (let i=0,len=this.audioIdList.length; i<len; i++) {
                query += `&mediaId=${this.audioIdList[i].mediaId}`;
                query += `&mediaDuration=${this.audioIdList[i].duration}`;
            }

            http.post(URL_SAVE_CUST_RECORD, {
                body: `custFollowRecord.custids=${this.custIds}&custFollowRecord.contactsids=${this.contactsIds||''}&custFollowRecord.followtype=98&` +
                `custFollowRecord.content=${this.comment}${query}`
            }).then((res) => {
                Toast({
                  message: res.message,
                  position: 'bottom',
                  duration: 1000
                });
                this.$router.back();
            })
            // http.post(URL_SAVE_CUST_RECORD, {
            //     // header: {
            //     //     'Accept': 'application/json'
            //     // },
            //     body: data
            // }).then((res) => {
            //     console.log(res);
            //     alert(JSON.stringify(res));
            // })
        },
        // 开始录音
        start () {
            this.audioTip = '正在录音';
            this.isAudioRecord = true;
            this.timer = setInterval(() => {
                this.audioCountSec++;
                if (this.audioCountSec >= 60) {
                    this.audioCountSec = 0;
                    this.audioCountMin++;
                }
            }, 1000);
            dd.device.audio.startRecord({
                onSuccess : function () {
                    console.log('start')
                    // alert('start');
                },
                onFail : function (err) {
                    alert(err);
                }
            });
        },
        saveAudio () {
            this.init();
            const me = this;
            dd.device.audio.stopRecord({
                onSuccess: function (res) {
                    // res.mediaId; // 返回音频的MediaID，可用于本地播放和音频下载
                    // res.duration; // 返回音频的时长，单位：秒
                    // alert(res.mediaId, res.duration);
                    me.audioIdList.push({
                        mediaId: res.mediaId,
                        duration: res.duration
                    })
                    // alert(JSON.stringify(this.audioIdList))
                },
                onFail: function (err) {
                }
            });
        },
        cancelAudio () {
            this.init();
            dd.device.audio.stopRecord({
                onSuccess: function (res) {
                },
                onFail: function (err) {
                }
            });
        },
        playAudio (mediaId) {
            dd.device.audio.play({
                localAudioId: mediaId,
                onSuccess: function () {
                },
                onFail: function (err) {
                }
            });
        },
        delAudio (mediaId) {
            this.audioIdList = this.audioIdList.filter((item) => {
                return item.mediaId !== mediaId;
            })
        },
        AudioHide () {
            this.init();
            dd.device.audio.stopRecord({
                onSuccess: function (res) {
                },
                onFail: function (err) {
                }
            });
        },
        delImage (index) {
            this.imgs.splice(index, 1);
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
            height: pxToRem(60px);
            width: pxToRem(60px);
            line-height: pxToRem(60px);
            border-radius: pxToRem(30px);
            background: $blue;
            margin: 0 auto;
            i {
                color: #fff;
                font-size: 24px;
            }
        }
        .audio-item {
            position: relative;
            height: pxToRem(40px);
            line-height: pxToRem(40px);
            padding: 0 pxToRem(10px);
            border-radius: pxToRem(20px);
            background: #E0E0E0;
            margin: pxToRem(10px) 0;
            > i {
                color: #8E8E8E;
                font-size: 20px;
            }
            .btn-del {
                position: absolute;
                color: red;
                top: pxToRem(-12px);
                right: pxToRem(-3px);
                font-size: 22px;
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
        img {
            position: relative;
            width: 80px;
            height: 80px;
            margin-right: pxToRem(25px);
            margin-bottom: pxToRem(20px);
        }
        .btn-del {
            position: absolute;
            color: red;
            top: pxToRem(-15px);
            right: pxToRem(12px);
            font-size: 22px;
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
    .popup-audio {
        background: #fff;
        height: pxToRem(220px);
        padding-top: pxToRem(50px);
        box-sizing: border-box;
        .btn-audio {
            height: pxToRem(100px);
            line-height: pxToRem(100px);
            margin: 0 auto;
            margin-bottom: pxToRem(20px);
            color: #fff;
            width: pxToRem(100px);
            border-radius: pxToRem(50px);
            background: $blue;
        }
        >img {
            height: pxToRem(200px);
            width: pxToRem(200px);
            margin-top: pxToRem(-40px);
        }
        .icon-true {
            position: absolute;
            right: pxToRem(40px);
            bottom: pxToRem(44px);
            font-size: 50px;
            color: 	#02C874;
        }
        .icon-false {
            position: absolute;
            left: pxToRem(40px);
            bottom: pxToRem(40px);
            font-size: 50px;
            color: red;
        }
    }
}
</style>
