// 用户相关
import request from '@/utils/request'
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