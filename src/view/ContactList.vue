<template>
    <div class="view-contactlist">
        <div style="height:44px;">
            <search
              v-model="searchValue"
              auto-scroll-to-top
              @on-submit="search"
              @on-cancel="onCancel"
              ref="search">
            </search>
        </div>
        <mt-index-list>
            <mt-index-section v-for="item in contactsNameGroupList" :index="item.group" :key="item.group">
                <div v-for="child in item.groupChild" @click="itemClick(child.custids)">
                    <mt-cell :title="child.datatext" style="text-align:left;"></mt-cell>
                </div>
            </mt-index-section>
        </mt-index-list>
    </div>
</template>

<script>
import Panel from '../components/Panel.vue';
import { mapActions } from 'vuex';
import { getQueryString } from '../utils/commonMethod.js';
import http from '../http/index.js';
import { URL_CONTACTS_LIST } from '../constant/url.js';
import { Spinner, Flexbox, FlexboxItem, Search } from 'vux';
import { Toast } from 'mint-ui';

export default {
    name: 'contactList',
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
            contactsNameGroupList: [],
            contactsNameGroupListCopy: [],
            searchValue: ''
        }
    },
    created () {
        http.get(`${URL_CONTACTS_LIST}?custIds=${this.custIds}`).then((res) => {
            console.log(res)
            this.contactsNameGroupList = res.contactsNameGroupList;
            this.contactsNameGroupListCopy = res.contactsNameGroupList;
        })
    },
    methods: {
        ...mapActions([
            'getAchievementData',
            'getFollowData'
        ]),
        // 列表本地搜索
        search () {
            let _contactsNameGroupList = [];
            if (this.searchValue === '') {
                this.contactsNameGroupList = this.contactsNameGroupListCopy;
            }
            else {
                for (let i=0,len=this.contactsNameGroupListCopy.length; i<len; i++) {
                    const groupChild = this.contactsNameGroupListCopy[i].groupChild.filter((data) => {
                        return data.datatext.indexOf(this.searchValue) > -1;
                    });
                    if (groupChild.length > 0) {
                        _contactsNameGroupList.push({
                            group: this.contactsNameGroupListCopy[i].group,
                            groupChild: groupChild
                        })
                    }
                }
                this.contactsNameGroupList = _contactsNameGroupList;
            }
        },
        onCancel () {
            this.contactsNameGroupList = this.contactsNameGroupListCopy;
        }
    }
}
</script>
<style lang="scss">
.mint-indexsection-index {
    text-align: left;
}
.weui-search-bar__label {
    line-height: 26px;
}
</style>
<style scoped lang="scss">
@import '../styles/common.scss';
.view-contactlist {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
}
</style>
