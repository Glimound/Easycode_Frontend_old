import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import myComps from './components/index';

Vue.config.productionTip=false
Vue.use(myComps)
new Vue({
    render:h=>h(App),
    store
}).$mount('#app')
