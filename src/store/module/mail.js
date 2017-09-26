import http from '../../http';
import { URL_SALESMAN_FOLLOW_RECORD, URL_FOLLOW_RECORD, URL_DETAIL_INFO } from '../../constant/url.js';
const GET_SALESMAN_FOLLOW_RECORD = 'mail-get_salesman_follow_data';
const ADD_SALESMAN_FOLLOW_RECORD_FRONT = 'mail-add_salesman_follow_data_front';
const GET_CUSTOMER_DETAIL_INFO = 'customer-get_customer_detail_info';
const DELETE_ONE_SALESMAN_RECORD = 'mail-delete_one_salesman_record';
const ADD_ONE_SALESMAN_DISCUSS = 'mail-add_one_salesman_discuss';
const DELETE_ONE_SALESMAN_DISCUSS = 'mail-delete_one_salesman_discuss';
const INIT_SALESMAN_FOLLOW_DATA = 'mail-init_salesman_follow_data';

const state = {
    cUserIds: 0,
    recordList: [],
    firstRequestTime: null,
    latestRecordRequestTime: null,
    totalPage: Number.MAX_VALUE,            // 跟进记录的页码，初始设为最大值
    cust: {},
    custLevelList: {},
    custStatusList: {},
    currencyList: {}
}

// getters
const getters = {
}

// actions
const actions = {
    initSalesmanFollowData ({ commit, state }) {
        commit(INIT_SALESMAN_FOLLOW_DATA);
    },
    /**
     *  获取跟进记录
     *  @param custIds                  客户id
     *  @param pageNumber               页码
     *  @param isPullDownRefresh        是否下拉刷新
     */
    getSalesmanFollowData ({ commit, state }, { userIds, pageNumber, isPullDownRefresh = false }) {
        let query = userIds ? `userIds=${userIds}&` : '';
        query += pageNumber ? `pageNumber=${pageNumber}&` : '';
        query += `isPullDownRefresh=${isPullDownRefresh}&`;
        if (isPullDownRefresh) {
            query += state.latestRecordRequestTime && pageNumber !== 1 ? `latestRecordRequestTime=${state.latestRecordRequestTime}` : '';
        }
        else {
            query += state.firstRequestTime && pageNumber !== 1 ? `firstRequestTime=${state.firstRequestTime}` : '';
        }
        return http.get(`${URL_SALESMAN_FOLLOW_RECORD}?${query}`).then((res) => {
            if (isPullDownRefresh) {
                commit(ADD_SALESMAN_FOLLOW_RECORD_FRONT, { res, pageNumber });
            }
            else {
                commit(GET_SALESMAN_FOLLOW_RECORD, { res, pageNumber });
            }
            return res;
        });
    },
    /**
     *  获取详细信息
     *  @param custIds                  客户id
     */
    getCustomerDetailInfo ({ commit, state }, { custIds }) {
        let query = custIds ? `custIds=${custIds}` : '';
        return http.get(`${URL_DETAIL_INFO}?${query}`).then((res) => {
            commit(GET_CUSTOMER_DETAIL_INFO, { res });
            return res;
        });
    },
    /**
     *  删除一条跟进记录
     *  @param ids                 记录ids
     */
    deleteOneSalesmanRecord ({ commit, state }, { ids }) {
        commit(DELETE_ONE_RECORD, { ids });
    },
    /**
     *  删除一条跟进记录评论
     *  @param ids                 记录ids
     */
    deleteOneSalesmanDiscuss ({ commit, state }, { ids, discussIds }) {
        commit(DELETE_ONE_SALESMAN_DISCUSS, { ids, discussIds });
    },
    /**
     *  添加一条跟进记录评论
     *  @param ids                 记录ids
     */
    addOneSalesmanDiscuss ({ commit, state }, { ids, discussIds, content, names }) {
        commit(ADD_ONE_SALESMAN_DISCUSS, { ids, discussIds, content, names });
    }
}

// mutations
const mutations = {
    [INIT_SALESMAN_FOLLOW_DATA]: (state) => {
        state.totalPage = Number.MAX_VALUE;
        state.recordList = [];
        state.firstRequestTime = null;
    },
    [GET_SALESMAN_FOLLOW_RECORD]: (state, { res, pageNumber }) => {
        if (pageNumber === 1) {
            state.cUserIds = res.cUserIds;
            state.firstRequestTime = res.splitPage.queryParam.firstRequestTime;
            state.latestRecordRequestTime = res.splitPage.queryParam.latestRecordRequestTime;
            state.totalPage = res.splitPage.totalPage;
            state.recordList = res.recordList;
        }
        else {
            state.recordList = state.recordList.concat(res.recordList);
        }
    },
    [ADD_SALESMAN_FOLLOW_RECORD_FRONT]: (state, { res, pageNumber }) => {
        state.recordList = res.recordList.concat(state.recordList);
    },
    [GET_CUSTOMER_DETAIL_INFO]: (state, { res }) => {
        state.cust = res.cust;
        const custLevelList = {};
        const custStatusList = {};
        const currencyList = {};
        for (let i=0,len=res.custLevelList.length; i<len; i++) {
            custLevelList[res.custLevelList[i].childcode] = res.custLevelList[i].childname;
        }
        for (let i=0,len=res.custStatusList.length; i<len; i++) {
            custStatusList[res.custStatusList[i].childcode] = res.custStatusList[i].childname;
        }
        for (let i=0,len=res.currencyList.length; i<len; i++) {
            currencyList[res.currencyList[i].childcode] = res.currencyList[i].childname;
        }
        state.custLevelList = custLevelList;
        state.custStatusList = custStatusList;
        state.currencyList = currencyList;
    },
    [DELETE_ONE_SALESMAN_RECORD]: (state, { ids }) => {
        state.recordList = state.recordList.filter((item) => {
            return item.ids !== ids;
        })
    },
    [ADD_ONE_SALESMAN_DISCUSS]: (state, { ids, discussIds, content, names }) => {
        state.recordList = state.recordList.map((item) => {
            if (item.ids === ids) {
                item.discusslist.push({
                    custfrids: ids,
                    ids: discussIds,
                    userids: state.cUserIds,
                    content: content,
                    names
                })
            }
            return item;
        })
    },
    [DELETE_ONE_SALESMAN_DISCUSS]: (state, { ids, discussIds }) => {
        state.recordList = state.recordList.map((item) => {
            if (item.ids === ids) {
                item.discusslist = item.discusslist.filter((one) => {
                    return one.ids !== discussIds;
                });
                console.log(item.discusslist)
            }
            return item;
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
