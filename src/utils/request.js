//封装axios请求
import axios from 'axios'
const request=axios.create({
    baseURL: "http://ttapi.research.itcast.cn/"// 基础路径
})

//导出
// export default request
export default request