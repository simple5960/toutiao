/**
 * 初始化dayjs相关配置
 */
import Vue from 'vue'
import dayjs from 'dayjs'
//配置中文语言包
import 'dayjs/locale/zh-cn'
//引入相对时间模块
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
//处理相对时间的代码包装为全局过滤器
Vue.filter('relativeTime',value=>{
    return dayjs(value).from(dayjs())
})