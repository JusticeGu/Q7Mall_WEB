import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI, { Message, MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from 'axios'
Vue.prototype.$axios=axios;

import api from './config/apiUrl';

import TreeTable from 'vue-table-with-tree-grid';
Vue.component("tree-table",TreeTable);

Vue.prototype.$message=Message;

Vue.prototype.$confirm= MessageBox.confirm;

Vue.config.productionTip = false




new Vue({
  router,
  store,
  render: h => h(App),
  data:{
    api:api
  }
}).$mount('#app')
