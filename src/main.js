import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-default/index.css"; // 默认主题
import "babel-polyfill";
import store from "./store";

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
    router,
    store,   //创建的Vuex实例挂载到这个vue实例中
    render: (h) => h(App),
}).$mount("#app");
