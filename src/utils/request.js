//封装axios请求
import axios from 'axios'
import store from '@/store/'
const request=axios.create({
    baseURL: "http://ttapi.research.itcast.cn/"// 基础路径
})
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    const {user}=store.state
    if(user)
    {
        //如果用户已经登录
        config.headers.Authorization=`Bearer ${user.token}`
          
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })
//导出
// export default request
export default request