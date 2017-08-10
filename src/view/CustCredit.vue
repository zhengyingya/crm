<template>
    <div class="view-custcredit">
        sssssssssssss
    </div>
</template>

<script>
import Panel from '../components/Panel.vue';
import { mapActions } from 'vuex';
import { getQueryString } from '../utils/commonMethod.js';
import http from '../http/index.js';
import { URL_CUST_CREDIT } from '../constant/url.js';
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
            custIds: '6631B5B27DD44910BF7BDAC2E02F1AD3',//getQueryString('custIds'),
            custName: decodeURI(decodeURI(getQueryString('custName'))),
        }
    },
    created () {
        http.get(`${URL_CUST_CREDIT}?custIds=${this.custIds}&monthTime=201707`).then((res) => {
            console.log(res)
            // this.contactsNameGroupList = res.contactsNameGroupList;
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
@import '../styles/common.scss';
</style>
<style scoped lang="scss">
@import '../styles/common.scss';
.view-custcredit {
    height: 100%;
    overflow: auto;
    background-color: #ECF5FF;
    padding-top: pxToRem(20px);
}
</style>
