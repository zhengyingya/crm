import http from '../../http';
import { URL_ACHIEVEMENT_DATA, URL_FOLLOW_RECORD } from '../../constant/url.js';
const GET_ACHIEVEMENT_DATA = 'archievement-get_archievement_data';
const GET_FOLLOW_RECORD = 'archievement-get_follow_data';

// 这个模块的state，定义并进行初始化
const state = {
    monthlyAssistantPlanInfo: {},
    monthlyPrincipalPlanInfo: {},
    statusInfo: {},
    yearlyAssistantPlanInfo: {},
    yearlyPrincipalPlanInfo: {},

    infoFollowRecordList: {},
    infoOther: {},
    infoFollowRecordTypeList: {},
    infoSalesmanList: {}
}

// getters
const getters = {
}

// actions，供view层调用来修改state
const actions = {
    /**
     *  获取业绩数据
     */
    getAchievementData ({ commit, state }) {
        return http.get(`${URL_ACHIEVEMENT_DATA}`).then((res) => {
            commit(GET_ACHIEVEMENT_DATA, { res });
            return res;
        });
    },
    /**
     *  获取评论列表
     *  @param filterTime 时间
     *  @param filterTime 类型
     *  @param filterTime 用户id
     */
    getFollowData ({ commit, state }, { filterTime, filterType, filterUserIds }) {
        let query = filterTime ? `filterTime=${filterTime}&` : '';
        query += filterType ? `filterType=${filterType}&` : '';
        query += filterUserIds ? `filterUserIds=${filterUserIds}` : '';
        http.get(`${URL_FOLLOW_RECORD}?${query}`).then((res) => {
            commit(GET_FOLLOW_RECORD, { res });
        });
    }
}

// mutations，根据不同的action，对state进行处理并更新
const mutations = {
    [GET_ACHIEVEMENT_DATA]: (state, { res }) => {
        state.monthlyAssistantPlanInfo = res.monthlyAssistantPlanInfo;
        state.monthlyPrincipalPlanInfo = res.monthlyPrincipalPlanInfo;
        state.statusInfo = res.statusInfo;
        state.yearlyAssistantPlanInfo = res.yearlyAssistantPlanInfo;
        state.yearlyPrincipalPlanInfo = res.yearlyPrincipalPlanInfo;
    },
    [GET_FOLLOW_RECORD]: (state, { res }) => {
        state.infoFollowRecordList = res.infoFollowRecordList;
        state.infoOther = res.infoOther;
        state.infoFollowRecordTypeList = res.infoFollowRecordTypeList;
        state.infoSalesmanList = res.infoSalesmanList;
    }
}

// 导出
export default {
    state,
    getters,
    actions,
    mutations
}
