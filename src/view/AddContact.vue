<template>
    <div class="view-addcontact">
        <Panel>
            <div class="flex-row txt-type" style="border-bottom: 1px solid #E0E0E0">
                基本信息
            </div>
            <mt-field label="姓名" placeholder="请输入客户名称" v-model="name"></mt-field>
            <mt-field label="公司名称" :placeholder="custName" readonly class="readonly"></mt-field>
            <mt-field label="职务" placeholder="请输入客户名称" v-model="position"></mt-field>

            <div class="flex-row txt-type" style="border-bottom: 1px solid #E0E0E0">
                联系信息
            </div>
            <mt-field label="电话" placeholder="请输入联系人电话" v-model="telephone"></mt-field>
            <mt-field label="手机" placeholder="请输入联系人手机" v-model="mobile"></mt-field>
            <mt-field label="电子邮件" placeholder="请输入联系人电子邮件" v-model="email"></mt-field>
            <mt-field label="地址" placeholder="请输入联系人地址" v-model="address"></mt-field>

            <div class="flex-row txt-type" style="border-bottom: 1px solid #E0E0E0">
                其他信息
            </div>
            <div @click="openPicker">
                <mt-field label="生日" :class="birthday===''?'':'readonly'" :placeholder="birthdayPlaceHolder" readonly><i class="iconfont icon-xiayiyeqianjinchakangengduo"/></mt-field>
            </div>
            <mt-field label="兴趣爱好" placeholder="请输入联系人兴趣爱好" v-model="hobbies"></mt-field>
            <mt-field label="教育背景" placeholder="请输入联系人教育背景" v-model="education"></mt-field>
            <mt-field label="其他描述" placeholder="其他描述" v-model="description"></mt-field>
        </Panel>
        <Panel>
            <div class="btn-sub fs-16" @click="submit">
                保存
            </div>
        </Panel>
    </div>
</template>

<script>
import Panel from '../components/Panel.vue';
import { mapActions } from 'vuex';
import { getQueryString } from '../utils/commonMethod.js';
import http from '../http/index.js';
import { URL_CONTACTS_LIST, URL_SAVE_CONTACTS, URL_CONTACT_DETAILS, URL_CONTACT_UPDATE } from '../constant/url.js';
import { Spinner, Flexbox, FlexboxItem, Search } from 'vux';
import { Toast } from 'mint-ui';

export default {
    name: 'addContact',
    components: {
        Panel,
        Spinner,
        Flexbox,
        FlexboxItem,
        Search
    },
    data () {
        return {
            custIds: getQueryString('custIds'),
            custName: decodeURI(decodeURI(getQueryString('custName'))),
            contactsIds: getQueryString('contactsIds'),
            pickerVisible: false,
            name: '',
            position: '',
            telephone: '',
            mobile: '',
            email: '',
            address: '',
            birthday: '',
            birthdayPlaceHolder: '请选择生日',
            hobbies: '',
            education: '',
            description: ''
        }
    },
    created () {
        http.get(`${URL_CONTACTS_LIST}?custIds=${this.custIds}`).then((res) => {
            this.contactsNameGroupList = res.contactsNameGroupList;
        });
        if (this.contactsIds) {
            this.getContactInfo();
        }
    },
    methods: {
        ...mapActions([
            'getAchievementData',
            'getFollowData'
        ]),
        getContactInfo () {
            http.get(`${URL_CONTACT_DETAILS}?contactsIds=${this.contactsIds}`)
            .then((res) => {
                this.name = res.contacts.name;
                this.position = res.contacts.position;
                this.telephone = res.contacts.telephone;
                this.mobile = res.contacts.mobile;
                this.email = res.contacts.email;
                this.address = res.contacts.address;
                this.birthdayPlaceHolder = res.contacts.birthday.split(' ')[0] || '请选择生日';
                this.birthday = res.contacts.birthday.split(' ')[0] || '';
                this.hobbies = res.contacts.hobbies;
                this.education = res.contacts.education;
                this.description = res.contacts.description;
            })
        },
        // 打开时间选择器
        openPicker () {
            const me = this;
            this.$vux.datetime.show({
                cancelText: '取消',
                confirmText: '确定',
                format: 'YYYY-MM-DD',                  // 供选择的时间格式
                value: me.birthday,       // 初始时间
                onConfirm (val) {
                    me.birthdayPlaceHolder = val;
                    me.birthday = val;
                },
                onShow () {
                //   console.log('plugin show')
                },
                onHide () {
                //   console.log('plugin hide')
                }
            })
        },
        submit () {
            let param = `contacts.custids=${this.custIds}&contacts.name=${this.name}&contacts.position=${this.position}&`;
            param += `contacts.telephone=${this.telephone}&contacts.mobile=${this.mobile}&contacts.email=${this.email}&contacts.address=${this.address}&`;
            param += `contacts.birthday=${this.birthday}&contacts.hobbies=${this.hobbies}&contacts.education=${this.education}&contacts.description=${this.description}&`;
            if (this.contactsIds) {
                param += `contacts.ids=${this.contactsIds}`;
            }
            http.post(`${this.contactsIds?URL_CONTACT_UPDATE:URL_SAVE_CONTACTS}`, {
                body: param
            }).then((res) => {
                Toast({
                  message: res.message,
                  position: 'bottom',
                  duration: 1000
                });
                this.$router.back();
            })
        }
    }
}
</script>
<style lang="scss">
@import '../styles/common.scss';
.mint-indexsection-index {
    text-align: left;
}
.weui-search-bar__label {
    line-height: 26px;
}
.view-addcontact {
    .mint-cell-wrapper {
        background-image: none;
        border-bottom: 1px solid #F0F0F0;
    }
    .mint-cell-title {
        text-align: left;
        padding-left: pxToRem(10px);
    }
    .panel > .wrap {
        border-radius: 0!important;
    }
    .readonly {
        input::-webkit-input-placeholder{
            color: #000;
        }
        input:-ms-input-placeholder {
            color: #000;
        }
        input:-ms-input-placeholder {
            color: #000;
        }
    }
}
.vux-datetime-confirm {
    color: $blue!important;
}
</style>
<style scoped lang="scss">
@import '../styles/common.scss';
.view-addcontact {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    padding-top: pxToRem(20px);
    .txt-type {
        height: pxToRem(40px);
        line-height: pxToRem(40px);
        background: rgba(38,162,255,0.7);
        padding: 0 pxToRem(20px);
        color: #fff;
    }
    .btn-sub {
        height: pxToRem(40px);
        line-height: pxToRem(40px);
        background: $blue;
        color: #fff;
    }
}
</style>
