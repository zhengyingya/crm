import Vue from 'vue'
import Vuex from 'vuex'
import achievement from './module/achievement.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        achievement
    }
})
