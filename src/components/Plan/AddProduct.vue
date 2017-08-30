<template>
  <popup v-model="isShow" position="bottom" @on-hide="hide" height="100%">
      <div class="flex-cloumn add-product">
          <div class="filter flex-row">
            <flexbox :gutter="0">
                <flexbox-item :span="1/4">
                    <div class="btn-filter" @click="isSpecificationsShow=true;"><i class="iconfont icon-shaixuanguolv fs-24"/></div>
                </flexbox-item>
                <flexbox-item :span="3/4">
                    <div class="btn-search">
                        <search
                          v-model="searchValue"
                          auto-scroll-to-top
                          @on-submit="search"
                          @on-cancel="onCancel"
                          ref="search">
                        </search>
                    </div>
                </flexbox-item>
            </flexbox>
          </div>
          <div class="wrap">
              <mt-index-list>
                  <mt-index-section v-for="(item, index) in productGrouplist1" :index="item.group" :key="index">
                      <mt-checklist
                        title=""
                        v-model="checkListValue[index]"
                        :options="item.groupChild.map((item) => {return `${item.batchnumber} | ${item.originname}`})"
                        style="text-align:left;">
                      </mt-checklist>
                  </mt-index-section>
              </mt-index-list>

              <!-- 规格选择弹框 -->
              <popup v-model="isSpecificationsShow">
                  <div class="head flex-row">
                      <div class="flex-1 text-l" style="color:#828282" @click="isSpecificationsShow=false">取消</div>
                      <div class="flex-1 text-r" style="color:#26a2ff" @click="chooseSpecifications">完成</div>
                  </div>
                  <div class="popup0">
                      <picker :data="specificationList" v-model="specificationsValue"></picker>
                  </div>
              </popup>
          </div>

          <flexbox :gutter="0" class="footer">
              <flexbox-item :span="1/2" class="btn-add">
                  <div @click="hide">取消</div>
              </flexbox-item>
              <flexbox-item :span="1/2" class="btn-save">
                  <div @click="save">确认</div>
              </flexbox-item>
          </flexbox>
      </div>
  </popup>
</template>

<script>
import Panel from '../Panel.vue';
import { Spinner, Flexbox, FlexboxItem, Popup, Search, Picker } from 'vux';
import http from '../../http/index.js';
import { getQueryString } from '../../utils/commonMethod.js';
import { URL_ASSISTANT_LIST } from '../../constant/url.js';

export default {
    name: 'addProduct',
    components: {
        Flexbox,
        FlexboxItem,
        Panel,
        Popup,
        Search,
        Picker
    },
    props: [
        'isPopupShow',
        'productGrouplist',
        'specificationList',
        'onHide'
    ],
    data () {
        return {
            custIds: getQueryString('custIds'),
            custPoolIds: getQueryString('custPoolIds'),
            isShow: false,
            value: [],
            searchValue: '',
            isSpecificationsShow: false,
            specificationsValue: [],
            productGrouplist1: {},
            checkListValue: []
        }
    },
    created () {
    },
    watch: {
        isPopupShow (newVal) {
            this.isShow = newVal;
        },
        productGrouplist (newVal) {
            this.productGrouplist1 = newVal;
            this.checkListValue = newVal.map((item) => {
                return new Array;
            })
        }
    },
    computed: {
        // checkListValue: function () {
        //     return this.productGrouplist.map((item) => {
        //         return new Array;
        //     })
        // },
        productGrouplistCopy: function () {
            return this.productGrouplist;
        }
    },
    methods: {
        makeColor (color) {
            return `rgba(${color})`
        },
        add () {
            this.$router.push({path: `/customer/addassistant?custIds=${this.custIds}`});
        },
        hide () {
            this.$emit('onHide');
        },
        save () {
            console.log(this.checkListValue)
            let data = [];
            for (let i=0,len=this.checkListValue.length; i<len; i++) {
                if (this.checkListValue[i].length > 0) {
                    this.checkListValue[i].map((item) => {
                        console.log(item.split(' | '))
                        data.push({
                            specification: this.productGrouplist1[i].group,
                            province: item.split(' | ')[1],
                            batchnumber: item.split(' | ')[0],
                            weightunit: 'KG'
                        })
                    })
                }
            }
            this.checkListValue = this.productGrouplist.map((item) => {
                return new Array;
            })
            this.$emit('addProduct', data);
            this.hide();
        },
        filter (val) {
            val = val.toUpperCase();
            let _cusNameGrouplist = [];
            for (let i=0,len=this.productGrouplistCopy.length; i<len; i++) {
                const groupChild = this.productGrouplistCopy[i].groupChild.filter((data) => {
                    return `${data.batchnumber} | ${data.originname}`.indexOf(val) > -1;
                });
                if (groupChild.length > 0) {
                    _cusNameGrouplist.push({
                        group: this.productGrouplistCopy[i].group,
                        groupChild: groupChild
                    })
                }
            }
            return _cusNameGrouplist;
        },
        // 列表本地搜索
        search () {
            if (this.searchValue === '') {
                this.productGrouplist1 = this.productGrouplistCopy;
            }
            else {
                this.productGrouplist1 = this.filter(this.searchValue);
            }
        },
        onCancel () {
            this.productGrouplist1 = this.productGrouplistCopy;
        },
        chooseSpecifications () {
            this.isSpecificationsShow = false;
            if (this.specificationsValue.join('') === 'all') {
                this.productGrouplist1 = this.productGrouplistCopy;
            }
            else {
                this.productGrouplist1 = this.productGrouplistCopy.filter((item) => {
                    return item.group === this.specificationsValue.join('');
                });
            }
        }
    }
}
</script>
<style lang="scss">
.add-product {
    .mint-checklist-title {
        display: none;
    }
    .weui-search-bar__label {
        line-height: 26px;
    }
}
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.add-product {
    height: 100%;
    background: #fff;
    padding-top: pxToRem(44px);
    padding-bottom: pxToRem(50px);
    box-sizing: border-box;
    overflow: hidden;
    .filter {
        position: absolute;
        width: 100%;
        z-index: 1002;
        // margin-top: pxToRem(-44px);
        top: pxToRem(0px);
        .btn-filter {
            height: pxToRem(44px);
            line-height: pxToRem(44px);
            text-align: center;
            color: #fff;
            background: $blue;
        }
    }
    .wrap {
        height: 100%;
        overflow: auto;
    }
    .footer {
        position: fixed;
        bottom: 0;
        height: pxToRem(45px);
        line-height: pxToRem(45px);
        border-top: 1px solid #BEBEBE;
        text-align: center;
        .btn-add {
            background: #fff;
        }
        .btn-save {
            height: 100%;
            background: $blue;
            color: #fff;
        }
    }
    .mint-indexlist {
        height: 100%;
        // padding-top: pxToRem(44px);
        // padding-bottom: pxToRem(45px);
        box-sizing: border-box;
        position: static;
        overflow: auto;
        // overflow: auto;
    }
    .head {
        height: pxToRem(40px);
        line-height: pxToRem(40px);
        padding: 0 pxToRem(20px);
        border-top: 1px solid #d0d0d0;
        background: #fbf9fe;
        font-size: 16px;
        z-index: 1000;
    }
}
</style>
