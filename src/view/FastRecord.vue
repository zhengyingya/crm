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
                    <div v-for="item in audioIdList" class="flex-row audio-item" @click="playAudio(plantformType===1?item.mediaId:item.localId)">
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
                        <input class="img-inp" id="fileBtn" type="file" @change="imgUpload" accept="image/*" multiple="multiple"/>
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
    URL_DING_JSAPI_AUTHOR,
    URL_WEIXIN_JSAPI_AUTHOR
} from '../constant/url.js';
import { PopupPicker, Popup, Picker, Flexbox, FlexboxItem, XInput } from 'vux';
import { Toast, MessageBox } from 'mint-ui';
import { EXIF } from '../static/exif.js';

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
            isAudioRecord: false,                   // 标记是否在录制语音
            audioIdList: [],                        // 上次语音资源列表
            plantformType: 0,                        // [0, 1-钉钉， 2-微信]
            // appId: 'ww59f975d3849ee917:1000020',
            appId: 'ww745d00562e2cdbe9:1000000'
        }
    },
    created () {
        this.getDingJsapiAuthor ();
        this.getWeixinJsapiAuthor();
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
        // 钉钉jssdk初始化
        getDingJsapiAuthor () {
            const me = this;
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
                    me.plantformType = 1;
                });
                dd.error(function(error){
                    // alert('dingding error: ' + JSON.stringify(error));
                });
            })
        },
        // 微信jssdk初始化
        getWeixinJsapiAuthor () {
            const me = this;
            http.get(`${URL_WEIXIN_JSAPI_AUTHOR}?appId=${this.appId}`)
            .then((res) => {
                // console.log(res);
                wx.config({
                    beta: true,                      // 必须这么写，否则在微信插件有些jsapi会有问题
                    debug: false,                    // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.appId,				 // 注：此处appId=corpId，其他地方
                    timestamp: res.timeStamp,
                    nonceStr: res.nonceStr,
                    signature: res.signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'hideMenuItems',
                        'showMenuItems',
                        'hideAllNonBaseMenuItem',
                        'showAllNonBaseMenuItem',
                        'translateVoice',
                        'startRecord',
                        'stopRecord',
                        'onRecordEnd',
                        'playVoice',
                        'pauseVoice',
                        'stopVoice',
                        'uploadVoice',
                        'downloadVoice',
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage',
                        'getNetworkType',
                        'openLocation',
                        'getLocation',
                        'hideOptionMenu',
                        'showOptionMenu',
                        'closeWindow',
                        'scanQRCode',
                        'chooseWXPay',
                        'openProductSpecificView',
                        'addCard',
                        'chooseCard',
                        'openCard'
                    ]
                });
                wx.ready(function(){
                    me.plantformType = 2;
                });
                // wx.error(function(error){
                // });
            })
        },
        imgUpload (e) {
            const me = this;
            const files = e.target.files;
            for (let i=0,len=files.length; i<len; i++) {
                var reader = new FileReader();
                var Orientation = '';
                EXIF.getData(files[i], function() {
                    Orientation = EXIF.getTag(this, 'Orientation');
                });
                reader.onload = function(e) {                   // 获取上传图片的base64，传给后台时用
                    let baseStr = this.result;
                    if (baseStr.length > 1) {
                        var img = new Image();
						img.src = this.result;
						img.onload = function () {             // 图片压缩
                            var imgWidth = this.width,
			                    imgHeight = this.height;
			                // 控制上传图片的宽高
			                if (imgWidth > imgHeight && imgWidth > 750) {
			                    imgWidth = 750;
			                    imgHeight = Math.ceil(750 * this.height / this.width);
			                }
                            else if (imgWidth < imgHeight && imgHeight > 1334){
			                    imgWidth = Math.ceil(1334 * this.width / this.height);
			                    imgHeight = 1334;
			                }
			                var canvas = document.createElement("canvas");
			                var ctx = canvas.getContext('2d');
			                canvas.width = imgWidth;
			                canvas.height = imgHeight;
			                if (Orientation && Orientation != 1) {

			                    switch (Orientation) {
			                        case 6:     // 旋转90度
			                            canvas.width = imgHeight;
			                            canvas.height = imgWidth;
			                            ctx.rotate(Math.PI / 2);
			                            // (0,-imgHeight) 从旋转原理图那里获得的起始点
			                            ctx.drawImage(this, 0, -imgHeight, imgWidth, imgHeight);
			                            break;
			                        case 3:     // 旋转180度
			                            ctx.rotate(Math.PI);
			                            ctx.drawImage(this, -imgWidth, -imgHeight, imgWidth, imgHeight);
			                            break;
			                        case 8:     // 旋转-90度
			                            canvas.width = imgHeight;
			                            canvas.height = imgWidth;
			                            ctx.rotate(3 * Math.PI / 2);
			                            ctx.drawImage(this, -imgWidth, 0, imgWidth, imgHeight);
			                            break;
			                    }
			                }
                            else {
			                    ctx.drawImage(this, 0, 0, imgWidth, imgHeight);
			                }
			                baseStr = canvas.toDataURL("image/jpeg", 0.8);
                            img = null;
                            me.uploadImgToServer(baseStr);
                        };
                    }
                    else {
                        me.uploadImgToServer(baseStr);
                    }
                };
                reader.readAsDataURL(files[i]);
            }
            // console.log(me.imgs)
        },
        // 上传图片base64到服务器，获取返回的图片地址
        uploadImgToServer (baseStr) {
            const me = this;
            $.ajax({
                url: URL_SAVE_UPLOAD_IMAGE,
                type: 'POST',
                data: {
                    "baseStr": baseStr.split(",")[1]
                },
                success: function (res) {
                    if (res.statusCode === 200) {
                        me.imagePath.push(res.imagePathName);   // 获取返回路径
                        me.imgs = me.imgs.concat([baseStr]);
                    }
                },
                error: function (res) {
                    // alert(JSON.stringify(res))
                }
            })
        },
        async uploadServer (baseStr) {
            const res = await http.post(URL_SAVE_UPLOAD_IMAGE, {
                body: `baseStr=${baseStr}`
            });
            if (res.statusCode !== 200) {
                Toast({
                  message: '图片保存错误',
                  position: 'bottom',
                  duration: 1000
                });
                // this.$router.back();
            }
            this.imagePath.push(res.imagePathName);                 // 将地址保存到imagePath数组中
        },
        async save () {
            // for (let i=0,len=this.imgs.length; i<len; i++) {
            //     // alert(JSON.stringify(this.imgs[i]))
            //     await this.uploadServer(this.imgs[i]);              // 同步上传图片到后台，获取返回的图片地址
            // }
            let mediaId = [];
            let mediaDuration = [];

            let query = '';
            this.imagePath.map((item) => {
                query += `&images=${item}`;
            })
            for (let i=0,len=this.audioIdList.length; i<len; i++) {
                query += `&mediaId=${this.audioIdList[i].mediaId}`;
                query += `&mediaDuration=${this.audioIdList[i].duration||''}`;
            }

            if (this.plantformType === 1) {                     // 根据平台信息，添加平台属性
                query += '&platform=dingtalk'
            }
            else if (this.plantformType === 2) {
                query += `&platform=weixin&weixinAppId=${this.appId}`
            }

            http.post(URL_SAVE_CUST_RECORD, {
                body: `custFollowRecord.custids=${this.custIds}&custFollowRecord.contactsids=${this.contactsIds||''}&custFollowRecord.followtype=98&` +
                `custFollowRecord.content=${encodeURIComponent(this.comment)}&platform=weixin${query}`
            }).then((res) => {
                Toast({
                  message: res.message,
                  position: 'bottom',
                  duration: 1000
                });
                this.$router.back();
            })
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
            if (this.plantformType === 1) {
                dd.device.audio.startRecord({
                    onSuccess : function () {
                        console.log('start')
                        // alert('start');
                    },
                    onFail : function (err) {
                        // alert(err);
                    }
                });
            }
            else if (this.plantformType === 2) {
                wx.startRecord();
            }
        },
        saveAudio () {
            this.init();
            const me = this;
            if (this.plantformType === 1) {
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
            }
            else if (this.plantformType === 2) {
                wx.stopRecord({
                    success: function (res) {
                        var localId = res.localId;
                        wx.uploadVoice({
                            localId: localId,           // 需要上传的音频的本地ID，由stopRecord接口获得
                            isShowProgressTips: 1,      // 默认为1，显示进度提示
                            success: function (res) {
                                // var serverId = res.serverId; // 返回音频的服务器端ID
                                // alert('-- ' + res.serverId)
                                me.audioIdList.push({
                                    mediaId: res.serverId,
                                    localId: localId
                                })
                            }
                        });
                    }
                });
            }
        },
        // 取消录音
        cancelAudio () {
            this.init();
            if (this.plantformType === 1) {
                dd.device.audio.stopRecord({
                    onSuccess: function (res) {
                    },
                    onFail: function (err) {
                    }
                });
            }
            else if (this.plantformType === 2) {
                wx.stopRecord({
                    success: function (res) {
                    }
                })
            }
        },
        // 播放录音
        playAudio (mediaId) {
            if (this.plantformType === 1) {
                dd.device.audio.play({
                    localAudioId: mediaId,
                    onSuccess: function () {
                    },
                    onFail: function (err) {
                    }
                });
            }
            else if (this.plantformType === 2) {
                wx.playVoice({
                    localId: mediaId // 需要播放的音频的本地ID，由stopRecord接口获得
                });
            }
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
