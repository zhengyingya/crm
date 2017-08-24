<template>
    <div class="view-deliverplan">
        <PlanHead :otherinfo="otherinfo" @changePlantDate="changePlantDate"/>
        <PlanContent :departmentList="departmentList" :productPlanList="productPlanList"/>
    </div>
</template>

<script>
import Panel from '../../components/Panel.vue';
import PlanHead from '../../components/Plan/PlanHead.vue';
import PlanContent from '../../components/Plan/PlanContent.vue';
import { getQueryString } from '../../utils/commonMethod.js';
import { mapActions } from 'vuex';
import { URL_DEPARTMENT_PLAN_SEARCH } from '../../constant/url.js';
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
            plantime: '',
            otherinfo: {}
        }
    },
    created () {
        this.getPlanData();
    },
    methods: {
        ...mapActions([
        ]),
        getPlanData () {
            http.get(`${URL_DEPARTMENT_PLAN_SEARCH}?plantime=${this.plantime}`)
            .then((res) => {
                console.log(res);
                this.otherinfo = res.otherinfo;
                this.departmentList = res.departmentList;
                this.productPlanList = res.productPlanList;
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
