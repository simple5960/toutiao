import request from '@/utils/request'
/**
 * 获取搜索建议
 */
export const getSearchSuggestions=(q)=>{
    return request({
        method:'GET',
        url:'/app/v1_0/suggestion',
        params:{
            q//搜索关键词
        }
    })
}
/**
 * 获取搜索结果
 */
export const getSearchResults=params=>{
    return request({
        method:'GET',
        url:'/app/v1_0/search',
        params
    })
}
/**
 * 获取搜索历史
 */
export const getSearchHistories=()=>{
    return request({
        method:'GET',
        url:'/app/v1_0/search/histories'
        
    })
}