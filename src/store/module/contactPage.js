import http from '../../http';
import { URL_CONTACT_FOLLOW_RECORD, URL_FOLLOW_RECORD, URL_DETAIL_INFO } from '../../constant/url.js';
const GET_CONTACT_FOLLOW_RECORD = 'contactpage-get_contact_follow_data';
const GET_CUSTOMER_DETAIL_INFO = 'customer-get_customer_detail_info';
const DELETE_ONE_CONTACT_RECORD = 'contactpage-delete_one_contact_record';
const ADD_ONE_CONTACT_DISCUSS = 'contactpage-add_one_contact_discuss';
const DELETE_ONE_CONTACT_DISCUSS = 'contactpage-delete_one_contact_discuss';
const INIT_CONTACT_FOLLOW_DATA = 'contactpage-init_contact_follow_data';

const state = {
    cUserIds: 0,
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
    initContactFollowData ({ commit, state }) {
        commit(INIT_CONTACT_FOLLOW_DATA);
    },
    /**
     *  获取跟进记录
     *  @param custIds                  客户id
     *  @param pageNumber               页码
     *  @param isPullDownRefresh        是否下拉刷新
     */
    getContactFollowData ({ commit, state }, { contactsIds, pageNumber, isPullDownRefresh = false }) {
        let query = contactsIds ? `contactsIds=${contactsIds}&` : '';
        query += pageNumber ? `pageNumber=${pageNumber}&` : '';
        query += `isPullDownRefresh=${isPullDownRefresh}&`;
        query += state.firstRequestTime && pageNumber !== 1 ? `firstRequestTime=${state.firstRequestTime}` : '';
        return http.get(`${URL_CONTACT_FOLLOW_RECORD}?${query}`).then((res) => {
            commit(GET_CONTACT_FOLLOW_RECORD, { res, pageNumber });
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
    deleteOneContactRecord ({ commit, state }, { ids }) {
        commit(DELETE_ONE_CONTACT_RECORD, { ids });
    },
    /**
     *  删除一条跟进记录评论
     *  @param ids                 记录ids
     */
    deleteOneContactDiscuss ({ commit, state }, { ids, discussIds }) {
        commit(DELETE_ONE_CONTACT_DISCUSS, { ids, discussIds });
    },
    /**
     *  添加一条跟进记录评论
     *  @param ids                 记录ids
     */
    addOneContactDiscuss ({ commit, state }, { ids, discussIds, content, names }) {
        commit(ADD_ONE_CONTACT_DISCUSS, { ids, discussIds, content, names });
    }
}

// mutations
const mutations = {
    [INIT_CONTACT_FOLLOW_DATA]: (state) => {
        state.totalPage = Number.MAX_VALUE;
        state.recordList = [];
        state.firstRequestTime = null;
    },
    [GET_CONTACT_FOLLOW_RECORD]: (state, { res, pageNumber }) => {
        console.log(res)
        if (pageNumber === 1) {
            state.cUserIds = res.cUserIds;
            state.firstRequestTime = res.splitPage.queryParam.firstRequestTime;
            state.totalPage = res.splitPage.totalPage;
            state.recordList = res.recordList;
        }
        else {
            state.recordList = state.recordList.concat(res.recordList);
        }
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
    [DELETE_ONE_CONTACT_RECORD]: (state, { ids }) => {
        state.recordList = state.recordList.filter((item) => {
            return item.ids !== ids;
        })
    },
    [ADD_ONE_CONTACT_DISCUSS]: (state, { ids, discussIds, content, names }) => {
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
    [DELETE_ONE_CONTACT_DISCUSS]: (state, { ids, discussIds }) => {
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
