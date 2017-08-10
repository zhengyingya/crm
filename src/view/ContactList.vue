<template>
    <div class="view-contactlist">
        <div style="height:44px;">
            <search
              v-model="searchValue"
              auto-scroll-to-top
              ref="search">
            </search>
        </div>
        <mt-index-list>
            <mt-index-section v-for="item in contactsNameGroupList" :index="item.group">
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
            searchValue: ''
        }
    },
    created () {
        http.get(`${URL_CONTACTS_LIST}?custIds=${this.custIds}`).then((res) => {
            console.log(res)
            this.contactsNameGroupList = res.contactsNameGroupList;
        })
    },
    methods: {
        ...mapActions([
            'getAchievementData',
            'getFollowData'
        ])
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
