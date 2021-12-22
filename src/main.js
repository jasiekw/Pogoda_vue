import Vue from 'vue';
import App from './App.vue';
import Router from './router';

require('vue-flash-message/dist/vue-flash-message.min.css');


Vue.config.productionTip = false;

new Vue({
router: Router,
render: h => h(App),
}).$mount('#app');

