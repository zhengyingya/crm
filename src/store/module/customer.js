import http from '../../http';
import { URL_CUSTOMER_FOLLOW_RECORD, URL_FOLLOW_RECORD, URL_DETAIL_INFO } from '../../constant/url.js';
const GET_CUSTOMER_FOLLOW_RECORD = 'customer-get_customer_follow_data';
const GET_CUSTOMER_DETAIL_INFO = 'customer-get_customer_detail_info';

const state = {
    recordList: [],
    firstRequestTime: null,
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
    /**
     *  获取跟进记录
     *  @param custIds                  客户id
     *  @param pageNumber               页码
     *  @param isPullDownRefresh        是否下拉刷新
     */
    getCustomerFollowData ({ commit, state }, { custIds, pageNumber, isPullDownRefresh = false }) {
        let query = custIds ? `custIds=${custIds}&` : '';
        query += pageNumber ? `pageNumber=${pageNumber}&` : '';
        query += `isPullDownRefresh=${isPullDownRefresh}&`;
        query += state.firstRequestTime ? `firstRequestTime=${state.firstRequestTime}` : '';
        return http.get(`${URL_CUSTOMER_FOLLOW_RECORD}?${query}`).then((res) => {
            commit(GET_CUSTOMER_FOLLOW_RECORD, { res, pageNumber });
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
    }
}

// mutations
const mutations = {
    [GET_CUSTOMER_FOLLOW_RECORD]: (state, { res, pageNumber }) => {
        if (pageNumber === 1) {
            state.firstRequestTime = res.splitPage.queryParam.firstRequestTime;
            state.totalPage = res.splitPage.totalPage;
        }
        state.recordList = state.recordList.concat(res.recordList);
    },
    [GET_CUSTOMER_DETAIL_INFO]: (state, { res }) => {
        console.log('===============', res)
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
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
