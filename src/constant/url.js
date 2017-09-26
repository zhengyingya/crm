/**
 * 首页
 */
export const URL_ACHIEVEMENT_DATA = cxt + '/crm/index/hybrid/achievementApi';        // 首页数据
export const URL_FOLLOW_RECORD = cxt + '/crm/index/hybrid/followRecordApi';          // 活动记录列表
export const URL_DISCUSS_SAVE = cxt + '/crm/custFrDiscuss/hybrid/save';              // 保存评论
export const URL_FOLLOW_RECORD_COUNT = cxt + '/crm/index/hybrid/achievement_followRecordCount';     // 未读评论数

export const URL_DELETE_FOLLOW = cxt + '/crm/custFrDiscuss/hybrid/delete';           // 删除评论
export const URL_UNREAD_RECORD = cxt + '/crm/index/hybrid/haveUnReadDiscussFollowRecordListApi'; // 未读消息
export const URL_SET_RECORD_READ = cxt + '/crm/index/hybrid/setDiscussReadByFollowRecordIds';    // 设置成已读
/**
 * 钉钉sdk 相关配置数据获取
 */
export const URL_DING_JSAPI_AUTHOR = cxt + '/crm/index/hybrid/dingtalkJsapiAuthor';     // 钉钉端
export const URL_WEIXIN_JSAPI_AUTHOR = cxt + '/weixinqy/jssdk/generateSign';             // 微信端
/**
 * 客户
 */
export const URL_LIST_HEAD = cxt + '/crm/customer/hybrid/listHeaderApi';                // 筛选条件
export const URL_CUSTOMER_LIST = cxt + '/crm/customer/hybrid/dataListApi';              // 客户列表
export const URL_CUSTOMER_DETAIL_VIEW = cxt + '/crm/customer/hybrid/viewApi';           // 客户详情页
export const URL_CUSTOMER_FOCUS = cxt + '/crm/customer/hybrid/focus';                   // 关注与取消
export const URL_CUSTOMER_DELETE = cxt + '/crm/customer/hybrid/delete';                 // 删除客户

export const URL_CUSTOMER_FOLLOW_RECORD = cxt + '/crm/customer/hybrid/followRecordApi';  // 客户跟进记录
export const URL_DELETE_CUSTOMER_FOLLOW_RECORD = cxt + '/crm/custFollowRecord/hybrid/delete'; // 跟进记录删除

export const URL_SAVE_CUSTFRDISCUSS = cxt + '/crm/custFrDiscuss/hybrid/save';           // 跟进记录评论保存
export const URL_DELETE_CUSTFRDISCUSS = cxt + '/crm/custFrDiscuss/hybrid/delete';       // 跟进记录评论删除

export const URL_GET_PRO_SPECIFICATION = cxt + '/crm/custOtherInfo/hybrid/productSpecificationListApi';       // 客户_格式化信息记录_规格列表
export const URL_GET_BATCH_NUMBER = cxt + '/crm/product/hybrid/getBatchNumberBySpecification';              // 客户_格式化信息记录_批号列表
export const URL_SAVE_CUSTOTHERINFO = cxt + '/crm/custOtherInfo/hybrid/save';           // 格式化数据保存
export const URL_SAVE_CUST_RECORD = cxt + '/crm/custFollowRecord/hybrid/save';          // 快速记录保存
export const URL_SAVE_UPLOAD_IMAGE = cxt + '/crm/index/hybrid/uploadImage';             // 快速记录图片上传

export const URL_DETAIL_INFO = cxt + '/crm/customer/hybrid/detailApi';                  // 详细信息
export const URL_UPDATE_DETAIL_INFO = cxt + '/crm/customer/hybrid/update';              // 更新客户信息

export const URL_ASSISTANT_LIST = cxt + '/crm/customer/hybrid/assistantListApi';        // 协助人列表
export const URL_ADD_ASSISTANT_VIEW = cxt + '/crm/customer/hybrid/addAssistantApi';     // 添加协助人页面数据
export const URL_SAVE_ASSISTANT = cxt + '/crm/customer/hybrid/saveAssistant';           // 保存添加的协助人
export const URL_CONTACTS_LIST = cxt + '/crm/customer/hybrid/contactsListApi';          // 客户-联系人列表
export const URL_SAVE_CONTACTS = cxt + '/crm/contacts/hybrid/save';                     // 客户联系人保存
export const URL_CUST_CREDIT = cxt + '/crm/custCredit/hybrid/viewApi';                  // 授信评价
export const URL_SALES_TRENDS_API = cxt + '/crm/customer/hybrid/salesTrendsApi';        // 客户_经营动态

export const URL_CUSTPOOL_LIST = cxt + '/crm/custpool/hybrid/dataListApi';               // 公海池客户
export const URL_CUSTPOLL_DETAIL_VIEW = cxt + '/crm/custpool/hybrid/viewApi';            // 公海池客户详情页
export const URL_CUSTPOLL_ASSIGNTOSELFT = cxt + '/crm/custpool/hybrid/assignToSelf';

/**
 * 通讯录
 */
export const URL_ORGUSER_LIST = cxt + '/crm/salesman/hybrid/orguserListApi';                // 通讯录列表
export const URL_SALESMAN_HEAD = cxt + '/crm/salesman/hybrid/viewApi';                      // 销售人员主页头部数据
export const URL_SALESMAN_DETAILS = cxt + '/crm/salesman/hybrid/detailsApi';                // 销售人员信息详情
export const URL_SALESMAN_FOLLOW_RECORD = cxt + '/crm/salesman/hybrid/followRecordApi';     // 工作圈记录跟进
export const URL_BUSINESS_DETAIL = cxt + '/crm/salesman/hybrid/businessDetails';            // 业绩

export const URL_CONTACT_LIST = cxt + '/crm/salesman/hybrid/customerListApi';               // 联系人列表
export const URL_CONTACT_HEAD = cxt + '/crm/contacts/hybrid/viewApi';                       // 联系人员主页头部数据
export const URL_CONTACT_FOLLOW_RECORD = cxt + '/crm/contacts/hybrid/followRecordApi';      // 联系人跟进记录
export const URL_CONTACT_DETAILS = cxt + '/crm/contacts/hybrid/detailApi';                  // 联系人信息详情
export const URL_CONTACT_UPDATE = cxt + '/crm/contacts/hybrid/update';                      // 客户联系人更新
/**
 * 计划
 */
export const URL_ADD_CUST_PLAN = cxt + '/crm/plan/hybrid/addCustPlanApi';                   // 添加计划基础数据获取
export const URL_PRODUCT_LIST = cxt + '/crm/plan/hybrid/productListApi';
export const URL_SAVE_CUST_PLAN = cxt + '/crm/plan/hybrid/saveCustPlan';                    // 保存计划
export const URL_DELETE_CUST_PLAN = cxt + '/crm/plan/hybrid/deleteCustPlanApi';             // 删除客户计划
export const URL_ADD_CUST_RECEIPT_PLAN = cxt + '/crm/plan/hybrid/addCustReceiptPlanApi';    // 添加收款计划基础数据获取
export const URL_CUST_RECEIPT_PLAN_SAVE = cxt + '/crm/custReceiptPlan/hybrid/save';         // 保存收款计划
export const URL_CUST_RECEIPT_PLAN_DELETE = cxt + '/crm/custReceiptPlan/hybrid/delete';     // 删除收款计划

export const URL_DEPARTMENT_PLAN_SEARCH = cxt + '/crm/plan/hybrid/viewDepartmentPlanApi';   // 办事处发货计划查询
export const URL_SALESMAN_PLAN_SEARCH = cxt + '/crm/plan/hybrid/viewSalesmanPlanApi';       // 业务员发货计划查询
export const URL_CUST_PLAN_SEARCH = cxt + '/crm/plan/hybrid/viewCustPlanApi';               // 客户发货计划查询

export const URL_DEPARTMENT_RECEIPT_SEARCH = cxt + '/crm/plan/hybrid/viewDepartmentReceiptPlanApi'; // 办事处收款计划查询
export const URL_SALESMAN_RECEIPT_SEARCH = cxt + '/crm/plan/hybrid/viewSalesmanReceiptPlanApi';     // 业务员收款计划查询
export const URL_CUST_RECEIPT_SEARCH = cxt + '/crm/plan/hybrid/viewCustReceiptPlanApi';             // 客户收款计划查询

export const URL_GET_PLAN_POWER = cxt + '/crm/plan/hybrid/indexApi';                        // 获取权限
export const URL_PLAN_CUSTLIST = cxt + '/crm/plan/hybrid/custListApi';                      // 创建计划 客户列表
export const URL_CUST_RECEIPT_PLAN = cxt + '/crm/plan/hybrid/viewCustReceiptPlanApi';       // 客户计划查询

/**
 * 图表
 */
export const URL_REPORT_INDEX_API = cxt + '/crm/report/hybrid/indexApi';                     // 图表首页api
export const URL_REPORT_ACHIEVE_CUST = cxt + '/crm/report/hybrid/achievementCustomerApi';    // 月计划完成 客户
export const URL_REPORT_ACHIEVE_PRODUCT = cxt + '/crm/report/hybrid/achievementProductApi';  // 月计划完成 产品
export const URL_REPORT_ACHIEVE_CREDIT = cxt + '/crm/report/hybrid/achievementCreditNoApi';  // 月计划完成 信贷号
export const URL_REPORT_ACHIEVE_DEPARTMENT = cxt + '/crm/report/hybrid/achievementDepartmentApi';     // 月计划完成 办事处
export const URL_REPORT_ACHIEVE_MAN = cxt + '/crm/report/hybrid/achievementSalesmanApi';     // 月计划完成 人员

export const URL_FT_DEPARTMENT = cxt + '/crm/report/hybrid/frDepartmentApi'                  // 活动记录 办事处
export const URL_FT_SALESMAN = cxt + '/crm/report/hybrid/frSalesmanApi'                      // 活动记录 人员
export const URL_RECEIPT_COUNT = cxt + '/crm/report/hybrid/receiptApi';                      // 发货收款统计

export const URL_SHIPMENTS_HEAD = cxt + '/crm/report/hybrid/shipmentsHeaderApi';             // 未发货跟踪头部信息
export const URL_SHIPMENT_DATA = cxt + '/crm/report/hybrid/shipmentsApi';                    // 未发货跟踪数据
export const URL_ORDERS_LIST = cxt + '/crm/report/hybrid/ordersApi';                         // 订单数据列表
export const URL_ORDERS_DETAILS = cxt + '/crm/report/hybrid/orderDetailsApi';                // 订单详情数据
