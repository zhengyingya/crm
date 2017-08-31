<template>
  <div class="list-item">
      <div class="txt-name">
          <span @click="jump('/crm/salesman/hybrid/view', `?saleManIds=${itemData.userids}`)">{{itemData.names}}</span>
          <span style="color: #BEBEBE;font-size:12px">{{itemData.typename}}</span>
      </div>
      <div>{{itemData.content}}</div>
      <div v-if="images" class="flex-row pic">
        <div v-for="(image, index) in images">
            <img v-if="imageIndex <= 4" class="img" :class="'img-'+itemData.ids" :src="window.cxt + '/' + image" @click="show(index)"/>
            <img v-if="imageIndex > 4" class="img" :class="'img-'+itemData.ids" v-lazy="window.cxt + '/' + image" @click="show(index)"/>
        </div>
      </div>

      <div v-transfer-dom>
          <previewer :id="'pre'+previewerId" :list="imagesList" ref="previewer" :options="options" @on-close="preViewerClose"></previewer>
      </div>

      <div class="txt-footer flex-row">
          <div style="flex: 1">
              {{dateFormat(new Date(transdate(itemData.addtime)), "MM-dd hh:mm")}}
              <span @click="jumpLocal(`/customer/detail?custIds=${itemData.custids}`)/*jump('/crm/customer/hybrid/view', `?custIds=${itemData.custids}`)*/" style="color:#26a2ff">{{itemData.custname}}</span>
          </div>
          <div style="position:relative">
              <popover placement="left" :gutter="90">
                 <div slot="content" class="popover-demo-content">
                     <div class="flex-row" style="line-height:30px;height:30px;width:80px;justify-content:center;">
                         <i class="iconfont icon-pinglun"/>
                         <div style="text-align:center;" @click="openComment">评论</div>
                     </div>
                 </div>
                 <i class="iconfont icon-dia fs-14" style="width:30px;text-align:right;color:#A6A6D2"/>
             </popover>
          </div>
      </div>

      <div v-if="itemData.discusslist.length > 0" class="discuss-wrap">
          <div v-for="item in itemData.discusslist">
              <span style="color: #26a2ff;">{{item.names}}：</span>
              <span>{{item.content}}</span>
              <span v-if="item.userids===infoOther.cUserIds" @click="deleteDiscuss(item.ids)" class="fs-12" style="float:right;color:#A6A6D2;line-height:19px">删除</span>
          </div>
      </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import { dateFormat, transdate } from '../../utils/commonMethod.js';
import { Popover, Popup, Previewer, TransferDom } from 'vux';
import http from '../../http/index.js';
import { URL_DISCUSS_SAVE, URL_DELETE_FOLLOW } from '../../constant/url.js';
import $ from "jquery";
import { Toast } from 'mint-ui';

export default {
    name: 'listItem',
    directives: {
        TransferDom
    },
    components: {
        Popover,
        Popup,
        Previewer
    },
    props: [
        'itemData',
        'imageIndex'
    ],
    data () {
        const me = this;
        return {
            options: {
                // vux preview组件的配置函数，可以参考官网的用法，直接拷贝函数过来就可以了
                getThumbBoundsFn (index) {
                  let thumbnail = document.querySelectorAll('.img-'+me.itemData.ids)[index]
                  // get window scroll Y
                  let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                  // optionally get horizontal scroll
                  // get position of element relative to viewport
                  let rect = thumbnail.getBoundingClientRect()
                  console.log('==========', index, rect, index, pageYScroll)
                  // w = width
                  return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                }
            },
            window,
            previewerId: new Date().valueOf()           // 根据时间戳生成id，防止重复
        }
    },
    mounted () {
        // document.querySelector('.list-item .mint-field-core').setAttribute('autofocus', 'true');
    },
    computed: {
        ...mapState({
            infoFollowRecordList: (state) => {
                return state.achievement.infoFollowRecordList;
            },
            infoOther: (state) => {
                return state.achievement.infoOther;
            }
        }),
        images: function () {
            if (this.itemData.images) {
                return this.itemData.images.split(',');
            }
            return [];
        },
        imagesList: function () {
            if (this.itemData.images) {
                const _images = this.itemData.images.split(',');
                return _images.map((item) => {
                    return {src: window.cxt + '/' + item}
                })
            }
            return [];
        }
    },
    methods: {
        dateFormat,
        transdate,
        show (index) {
            this.$refs.previewer.show(index)
        },
        openComment () {
            this.$emit('openComment', this.itemData.ids);           // 通知父组件打开评论弹框，并传custid过去
        },
        // 图片预览关闭
        preViewerClose () {
            $('#pre' + this.previewerId).addClass('pre-close');     // 加上一个class，此class包含相关的关闭动画
        },
        preViewerClick (e) {
            // $('#' + this.itemData.custids).addClass('pre-close');
        },
        /*
        ** 删除评论
        **/
        deleteDiscuss (ids) {
            MessageBox.confirm('确定要删除?')
            .then((action) => {
                http.post(URL_DELETE_FOLLOW, {
                    body: `discussIds=${ids}`
                }).then((res) => {
                    Toast({
                      message: res.message,
                      position: 'bottom',
                      duration: 1000
                    });
                    this.$emit('reloadFollowData');
                })
            })
        },
        jump (url, ids) {
            location.href = window.cxt + url + ids;
        },
        jumpLocal (path) {
            this.$router.push({path: encodeURI(encodeURI(path))});
        }
    }
}

</script>
<style lang="scss">
@import '../../styles/common.scss';
.list-item {
    .vux-popover {
        top: -5px!important;
        animation: mymove .3s 1;
    }
    @keyframes mymove {
        from {left:pxToRem(-20px);width:pxToRem(10px);}
        to {left:pxToRem(-90px);width:pxToRem(80px);}
    }
    .mint-header-title {
        font-size: 16px;
    }
    .mint-field {
        margin-top: pxToRem(-50px);
        padding-top: pxToRem(50px);
        box-sizing: border-box;
    }
    .mint-field, .mint-cell-wrapper, .mint-cell-value, .mint-field-core {
        height: 100%;
    }
    .mint-field-core {
        resize: none;
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
.list-item {
    padding: pxToRem(10px) pxToRem(10px);
    text-align: left;
    .txt-name {
        color: $blue;
        margin-bottom: pxToRem(5px);
    }
    .pic {
        margin-top: pxToRem(10px);
        flex-wrap: wrap;
        .img {
            width: pxToRem(100px);
            height: pxToRem(100px);
    //         max-width: 100%;
    // max-height: 100%;
            margin-right: pxToRem(10px);
            margin-bottom: pxToRem(10px);
        }
    }
    .txt-footer {
        color: #BEBEBE;
        font-size: 12px;
        line-height: pxToRem(19px);
        margin-top: pxToRem(10px);
    }
    .mint-header {
        height: pxToRem(50px);
        z-index: 10;
    }
    .discuss-wrap {
        // width: 80%;
        // margin-left: 10%;
        margin-top: pxToRem(20px);
        background: #F0F0F0;
        border-radius: pxToRem(5px);
        padding: pxToRem(5px) pxToRem(10px);
    }
}
</style>
