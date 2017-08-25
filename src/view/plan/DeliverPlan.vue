<template>
    <div class="view-deliverplan flex-cloumn">
        <PlanHead v-if="isDataGet" :otherinfo="otherinfo" @changePlantDate="changePlantDate" :type="type"/>
        <PlanContent v-if="isDataGet"
                     :salesmanList="salesmanList"
                     :productPlanList="productPlanList"
                     :gradeNameList="gradeNameList"
                     :type="type"/>
        <div v-if="!isDataGet" style="margin-top:280px;left:50%;margin-left:-20px;position:absolute"><spinner slot="value" type="lines" size="40px"/></div>
    </div>
</template>

<script>
import Panel from '../../components/Panel.vue';
import PlanHead from '../../components/Plan/PlanHead.vue';
import PlanContent from '../../components/Plan/PlanContent.vue';
import { getQueryString } from '../../utils/commonMethod.js';
import { mapActions } from 'vuex';
import { URL_DEPARTMENT_PLAN_SEARCH, URL_SALESMAN_PLAN_SEARCH, URL_CUST_PLAN_SEARCH } from '../../constant/url.js';
import http from '../../http/index.js';
import { Spinner, Flexbox, FlexboxItem } from 'vux';

export default {
    name: 'plan',
    components: {
        Panel,
        PlanHead,
        PlanContent,
        Spinner,
        Flexbox,
        FlexboxItem
    },
    data () {
        return {
            type: getQueryString('type'),
            isDataGet: false,
            plantime: '',
            otherinfo: {},
            salesmanList: [],
            productPlanList: [],
            gradeNameList: {}
        }
    },
    created () {
        this.getPlanData();
    },
    methods: {
        ...mapActions([
        ]),
        getPlanData () {
            this.isDataGet = false;
            const url = this.type === '1' ? URL_DEPARTMENT_PLAN_SEARCH
                        : this.type === '2' ? URL_SALESMAN_PLAN_SEARCH
                        : URL_CUST_PLAN_SEARCH;

            http.get(`${URL_SALESMAN_PLAN_SEARCH}?plantime=${this.plantime}`)
            .then((res) => {
                console.log(res);
                this.isDataGet = true;
                this.otherinfo = res.otherinfo;
                this.salesmanList = res.salesmanList
                this.productPlanList = res.productPlanList;
                let _gradeNameList = {};
                res.gradeList.map((item) => {
                    _gradeNameList[item.childcode] = item.childname;
                });
                this.gradeNameList = _gradeNameList;
            })
        },
        jump (path) {
            this.$router.push({path: path});
        },
        changePlantDate (val) {

        }
    }
}
</script>
<style lang="scss">
</style>
<style scoped lang="scss">
@import '../../styles/common.scss';
.view-deliverplan {
    height: 100%;
    overflow: auto;
    // padding-top: pxToRem(20px);
    box-sizing: border-box;
}
</style>
