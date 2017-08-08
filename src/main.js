// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import './styles/global.scss'
import {
    Navbar,
    Tabbar,
    TabItem,
    TabContainer,
    TabContainerItem,
    Cell,
    Button,
    DatetimePicker,
    Header,
    Field,
    Toast,
    Badge,
    IndexList,
    IndexSection
} from 'mint-ui'
import { DatetimePlugin } from 'vux';
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'fetch-polyfill'                             // 引入fetch兼容库，低版本webkit需要
import store from './store';
import router from './router'

Vue.use(Vuex);
Vue.use(DatetimePlugin);
Vue.config.productionTip = false
Vue.component('echart', ECharts)
Vue.component(Tabbar.name, Tabbar);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Cell.name, Cell);
Vue.component(Button.name, Button);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Header.name, Header);
Vue.component(Field.name, Field);
Vue.component(Toast.name, Toast);
Vue.component(Badge.name, Badge);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);

// Vue.directive('focus', {
//   // 当绑定元素插入到 DOM 中。
//   inserted: function (el) {
//     // 聚焦元素
//     el.focus()
//   }
// })

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
