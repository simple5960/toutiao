//封装axios请求
import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store/'
const request=axios.create({
    baseURL: "http://ttapi.research.itcast.cn/",// 基础路径
    transformResponse: [function (data) {
      // 后端返回的数据可能不是 JSON 格式字符串
      // 如果不是的话，那么 JSONbig.parse 调用就会报错
      // 所以我们使用 try-catch 来捕获异常，处理异常的发生
      try {
        // 如果转换成功，则直接把结果返回
        return JSONbig.parse(data)
      } catch (err) {
        // console.log('转换失败', err)
        // 如果转换失败了，则进入这里
        // 我们在这里把数据原封不动的直接返回给请求使用
        return data
      }
  
      // axios 默认在内部使用 JSON.parse 来转换处理原始数据
      // return JSON.parse(data)
    }]
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