import http from '../../http';
import { URL_CUSTOMER_FOLLOW_RECORD, URL_FOLLOW_RECORD, URL_DETAIL_INFO } from '../../constant/url.js';
const GET_CUSTOMER_FOLLOW_RECORD = 'customer-get_customer_follow_data';
const SET_FILTER = 'customerFilter-set_filter';

const state = {
    filterActive: '1',
    filterDepartment: 'ALL',
    filterDeptcode: 'ALL',
    filterUserIds: 'ALL',
    filterUserName: 'ALL',
    filterMonthRecent: 'ALL',
    filterRelation: 'ALL',
    filterStatus: 'ALL'
}

// getters
const getters = {
}

// actions
const actions = {
    /**
     *  获取跟进记录
     *  @param custIds                  客户id
     *  @param pageNumber               页码
     *  @param isPullDownRefresh        是否下拉刷新
     */
    setFilter ({ commit, state }, { filterType, filterValue }) {
        commit(SET_FILTER, { filterType, filterValue });
    }
}

// mutations
const mutations = {
    [SET_FILTER]: (state,  { filterType, filterValue }) => {
        state[filterType] = filterValue;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
