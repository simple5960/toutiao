
import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem,removeItem} from '@/utils/storage'
Vue.use(Vuex)
const user_key='userToken'
export default new Vuex.Store({
  state: {
    //当前用户的登录状态(token等数据)
    //因为在本地存储中存的是字符串，需要把它转换成为对象
    user:getItem(user_key)
    
  },
  mutations: {
    setUser(state,data)
    {
      state.user=data
      //为了防止页面刷新数据丢失，我们还需要把数据放到本地数据中
      //因为对象不能存放再本地存储中，所以要把对象转换成为字符串再存
      //当然直接写data就省去了这一步
      setItem(user_key,state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
