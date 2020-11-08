// 用户相关
import request from '@/utils/request'
import store from '@/store/'
// @：等价于 /src 这个目录，遵从的是从前往后找，是为了避免麻烦又怕写错的相对路径的简写
export const login = data => {
    return request({
      method: 'POST',
      url: '/app/v1_0/authorizations',
      data
    })
  }
/**
 * 请求发送短信
 */
export const sendSms=mobile=>{
  return request({
    method:'GET',
    url:`/app/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取登录的用户信息
 */
export const getCurrentUser=()=>{
  return request({
    method:"GET",
    url:'/app/v1_0/user',
    // headers:{ 放到拦截器中去
    //   Authorization:`Bearer ${store.state.user.token}`
    // }
  })
}
/**
 * 获取用户频道列表
 */
export const getUserChannels=()=>{
  return request({
    method:"GET",
    url:'/app/v1_0/user/channels',
  })
}