import http from '../../http';
import { URL_CUSTOMER_FOLLOW_RECORD, URL_FOLLOW_RECORD } from '../../constant/url.js';
const GET_CUSTOMER_FOLLOW_RECORD = 'customer-get_customer_follow_data';

const state = {
    recordList: [],
    firstRequestTime: null
}

// getters
const getters = {
}

// actions
const actions = {
    /**
     *  获取评论列表
     *  @param custIds                  客户id
     *  @param latestRecordRequestTime  上次请求最后一条记录时间
     *  @param isPullDownRefresh        是否下拉刷新
     */
    getCustomerFollowData ({ commit, state }, { custIds, pageNumber, isPullDownRefresh = false }) {
        let query = custIds ? `custIds=${custIds}&` : '';
        query += pageNumber ? `pageNumber=${pageNumber}&` : '';
        query += `isPullDownRefresh=${isPullDownRefresh}&`;
        query += state.firstRequestTime ? `firstRequestTime=${state.firstRequestTime}` : '';
        http.get(`${URL_CUSTOMER_FOLLOW_RECORD}?${query}`).then((res) => {
            commit(GET_CUSTOMER_FOLLOW_RECORD, { res, pageNumber });
        });
    }
}

// mutations
const mutations = {
    [GET_CUSTOMER_FOLLOW_RECORD]: (state, { res, pageNumber }) => {
        console.log('===============', res)
        if (pageNumber === 1) {
            state.firstRequestTime = res.splitPage.queryParam.firstRequestTime
        }
        state.recordList = state.recordList.concat(res.recordList);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
