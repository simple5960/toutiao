
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
// 加载全局样式
import './styles/index.less';//后加载的文件覆盖前面的文件，也就是index.less的样式可以覆盖掉vant的样式
//全局注册vant中的组件
Vue.use(Vant);
//引入动态设置的rem基准值
import 'amfe-flexible' //其实是加载的node_moudles中amfe-flexible的index.js文件
Vue.config.productionTip = false
import dayjs from './utils/dayjs'

new Vue({
  router,
  store,
  render: h => h(App)//render函数是渲染一个视图，然后提供给el挂载，如果没有render，页面上什么都没有
  /**
   * render : function(createElement){
    return createElement(App)
}
   */
}).$mount('#app')
