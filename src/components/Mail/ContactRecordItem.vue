<template>
  <div class="contact-recorditem">
   <flexbox :gutter="0" class="head">
       <flexbox-item :span="1/6" style="color:#26a2ff;">
           <div @click="jump(`/mail/personal?userIds=${item.userids}`)">{{ item.names }}</div>
       </flexbox-item>
       <flexbox-item :span="2/6" style="color:#ADADAD;">
           {{ item.typename }}
       </flexbox-item>
       <!-- <flexbox-item :span="1/4" style="text-align:right">
           <i class="iconfont icon-xiangxiazhankai"/>
       </flexbox-item> -->
   </flexbox>
   <div class="divider"/>
   <div v-html="item.content" class="content"></div>
   <div v-if="item.images" class="flex-row pic">
       <img v-for="(image, index) in item.images.split(',')"  class="img" :class="'img-'+item.ids" :src="window.cxt + '/' + image" @click="show(index, item.custids)"/>
   </div>
   <div v-for="media in item.medialist" class="flex-row audio-item" @click="playAudio(media.mediaid)">
       <i class="iconfont icon-yuyin1"/>
       <audio :src="window.cxt + '/' + media.mediapath" controls="controls" preload :id="media.mediaid" hidden/>
       <span class="fs-14" style="color:#8E8E8E;margin-left:20px;">{{media.mediaduration}}''</span>
   </div>

   <div v-transfer-dom>
       <previewer :id="'pre'+previewerId" :list="imagesList" ref="previewer" :options="options" @on-close="preViewerClose"></previewer>
   </div>

   <flexbox :gutter="0">
       <flexbox-item :span="3/4" class="fs-12">
           <span style="color:#ADADAD;">{{ item.addtime }}</span>
           <!-- <span style="color:#26a2ff;">{{ item.custname}}</span> -->
           <span v-if="item.userids===cUserIds" style="color:#26a2ff;margin-left:10px;" @click="deleteRecord(item.ids)">删除</span>
       </flexbox-item>
       <flexbox-item :span="1/4">
           <div style="position:relative;text-align:right;">
               <popover placement="left" :gutter="10">
                  <div slot="content" class="popover-demo-content">
                      <div class="flex-row" style="line-height:30px;height:30px;width:80px;justify-content:center;">
                          <i class="iconfont icon-pinglun"/>
                          <div style="text-align:center;" @click="openComment">评论</div>
                      </div>
                  </div>
                  <i class="iconfont icon-dia fs-14" style="width:30px;text-align:right;color:#A6A6D2"/>
              </popover>
           </div>
       </flexbox-item>
   </flexbox>
   <flexbox :gutter="0">
       <div v-if="item.discusslist.length > 0" class="discuss-wrap">
           <div v-for="one in item.discusslist">
               <span style="color: #26a2ff;">{{one.names}}：</span>
               <span>{{one.content}}</span>
               <span v-if="one.userids===cUserIds" @click="deleteDiscuss(item.ids, one.ids)" class="fs-12" style="float:right;color:#A6A6D2;line-height:19px">删除</span>
           </div>
       </div>
   </flexbox>
  </div>
</template>

<script>
import Panel from '../Panel.vue';
import { Spinner, Flexbox, FlexboxItem, Popover, Popup, Previewer, TransferDom } from 'vux';
import { mapState, mapActions } from 'vuex';
import { getQueryString } from '../../utils/commonMethod.js';
import http from '../../http/index.js';
import { URL_DELETE_CUSTOMER_FOLLOW_RECORD, URL_SAVE_CUSTFRDISCUSS, URL_DELETE_CUSTFRDISCUSS } from '../../constant/url.js';
import { Toast, MessageBox } from 'mint-ui';

export default {
    name: 'contactRecord',
    directives: {
        TransferDom
    },
    components: {
        Flexbox,
        FlexboxItem,
        Panel,
        Popover,
        Popup,
        Previewer
    },
    props: [
        'custIds',
        'custName',
        'item'
    ],
    created () {
        // // this.getCustomerFollowData({custIds: this.custIds, pageNumber: this.pageNumber});
        // if (getQueryString('reload')) {
        //     this.pageNumber = 0;
        //     this.getCustomerFollowData({custIds: this.custIds, pageNumber: ++this.pageNumber})
        // }
    },
    data () {
        const me = this;
        return {
            options: {
                // vux preview组件的配置函数，可以参考官网的用法，直接拷贝函数过来就可以了
                getThumbBoundsFn (index) {
                  let thumbnail = document.querySelectorAll('.img-'+me.item.ids)[index]
                  // get window scroll Y
                  let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                  // optionally get horizontal scroll
                  // get position of element relative to viewport
                  let rect = thumbnail.getBoundingClientRect()
                  // w = width
                  return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                }
            },
            window,
            loading: false,
            isEnd: false,
            pageNumber: 0,
            isCommentShow: false,                       // 评论弹框是否显示
            comment: '',                                // 评论内容
            custfrids: '',                              // 当前打开的跟进记录id
            previewerId: new Date().valueOf()           // 根据时间戳生成id，防止重复
        }
    },
    computed: {
        ...mapState({
            cUserIds: (state) => {
                return state.contactPage.cUserIds;
            }
        }),
        imagesList () {
            if (this.item.images) {
                const _images = this.item.images.split(',');
                return _images.map((item) => {
                    return {src: window.cxt + '/' + item}
                })
            }
            return [];
        },
    },
    methods: {
        ...mapActions([
            'getContactFollowData',
            'deleteOneContactRecord',
            'addOneContactDiscuss',
            'deleteOneContactDiscuss'
        ]),
        jump (path) {
            this.$router.push({path: encodeURI(encodeURI(path))});
        },
        // 删除跟进记录
        deleteRecord (ids) {
            MessageBox.confirm('确定要删除?')
            .then(action => {
                http.post(URL_DELETE_CUSTOMER_FOLLOW_RECORD, {
                    body: `custFrIds=${ids}`
                }).then((res) => {
                    Toast({
                      message: res.message,
                      position: 'bottom',
                      duration: 1000
                    });
                    this.deleteOneContactRecord({ids});
                })
            })
        },
        show (index) {
            this.$refs['previewer'].show(index)
        },
        openComment () {
            this.$emit('openComment', this.item.ids);               // 通知父组件打开评论弹框，并传custid过去
        },
        // 图片预览关闭
        preViewerClose () {
            $('#pre' + this.previewerId).addClass('pre-close');     // 加上一个class，此class包含相关的关闭动画
        },
        publish () {
            this.isCommentShow = false;
            http.post(URL_SAVE_CUSTFRDISCUSS, {
                body: `custFrDiscuss.custfrids=${this.custfrids}&custFrDiscuss.content=${this.comment}`
            }).then((res) => {
                // Toast({
                //   message: res.message,
                //   position: 'bottom',
                //   duration: 1000
                // });
                this.addOneContactDiscuss({
                    ids: this.custfrids,
                    content: this.comment,
                    discussIds: res.discussIds,
                    names: res.cUserName
                });
                this.custfrids = '';
            })
        },
        deleteDiscuss (custfrids, ids) {
            MessageBox.confirm('确定要删除?').then(action => {
                http.post(URL_DELETE_CUSTFRDISCUSS, {
                    body: `discussIds=${ids}`
                }).then((res) => {
                    // Toast({
                    //   message: res.message,
                    //   position: 'bottom',
                    //   duration: 1000
                    // });
                    this.deleteOneContactDiscuss({
                        ids: custfrids,
                        discussIds: ids
                    })
                })
            })
        },
        playAudio (mediaid) {
            let audio = document.getElementById(mediaid);
            if (audio.paused) {
                audio.currentTime = 0;
                audio.play();
            }
            else {
                audio.pause();
            }
            // alert(mediaid)
            // dd.device.audio.play({
            //     localAudioId: mediaid,
            //     onSuccess: function () {
            //     },
            //     onFail: function (err) {
            //         // alert('错误' + JSON.stringify(err))
            //         dd.device.audio.download({
            //             mediaId : mediaid,
            //             onSuccess : function(res) {
            //                 dd.device.audio.play({
            //                     localAudioId: res.localAudioId,
            //                     onFail: function (err) {
            //                         alert('错误' + JSON.stringify(err))
            //                     }
            //                 });
            //             },
            //             onFail : function (err) {
            //             }
            //         });
            //     }
            // });
        },
        openLink (link) {
            location.href = window.cxt + link;
        }
    }
}
</script>
<style lang="scss">
@import '../../styles/common.scss';
.contact-recorditem {
    .mint-cell-title {
        text-align: left;
        color: #7B7B7B
    }
    .vux-popover {
        top: -5px!important;
        left: -30px!important;
        animation: mymove .3s 1;
    }
    @keyframes mymove {
        from {left:pxToRem(30px);width:pxToRem(10px);}
        to {left:pxToRem(-30px)!important;width:pxToRem(80px);}
    }
    .pop-comment {
        .mint-header-title {
            font-size: 16px;
        }
        .mint-field, .mint-field-core {
            margin-top: pxToRem(-30px);
            padding-top: pxToRem(30px);
            box-sizing: border-box;
        }
        .mint-cell:last-child {
            background-image: none;
        }
        .mint-field, .mint-cell-wrapper, .mint-cell-value, .mint-field-core {
            height: pxToRem(180px);
            // padding-top: pxToRem(10px);
        }
        .mint-field-core {
            resize: none;
        }
        .mint-header {
            height: pxToRem(50px);
            z-index: 10;
        }
    }
}
.vux-previewer {
    opacity: 0;
}
.pswp--open {
    opacity: 1!important;
    animation: pswpOpacity 1s 1;
}
.pre-close {
    animation: pswpOpacityOut .5s 1;
}
@keyframes pswpOpacityOut {
    from {opacity: 1;}
    to {opacity: 0;}
}
@keyframes pswpOpacity {
    from {opacity: 0;}
    to {opacity: 1;}
}
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.contact-recorditem {
    height: 100%;
    box-sizing: border-box;
    .wrap {
        height: 100%;
        overflow: auto;
    }
    .head {
        height: pxToRem(20px);
        line-height: pxToRem(20px);
        margin-bottom: pxToRem(10px);
    }
    .pic {
        margin-top: pxToRem(10px);
        flex-wrap: wrap;
        .img {
            width: pxToRem(100px);
            height: pxToRem(100px);
            margin-right: pxToRem(10px);
            margin-bottom: pxToRem(10px);
        }
    }
    .audio-item {
        position: relative;
        width: 40%;
        height: pxToRem(25px);
        line-height: pxToRem(25px);
        padding: 0 pxToRem(10px);
        border-radius: pxToRem(20px);
        background: #E0E0E0;
        margin-bottom: pxToRem(10px);
        > i {
            color: #8E8E8E;
            font-size: 14px;
        }
    }
    .divider {
        height: 1px;
        background: #F0F0F0;
    }
    .content {
        text-align: left;
        padding: pxToRem(10px) 0;
        word-break: break-all;
    }
    .discuss-wrap {
        width: 100%;
        // margin-left: 10%;
        margin-top: pxToRem(20px);
        background: #F0F0F0;
        border-radius: pxToRem(5px);
        padding: pxToRem(5px) pxToRem(10px);
    }
}
</style>
