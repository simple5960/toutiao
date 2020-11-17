/**
 * 文章请求相关模块
 */
import request from '@/utils/request'
/**
 * 获取文章列表i
 */
export const getArticle=params=>{
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params
    })
}
/**
 * 获取文章详情
 */
export const getArticleInfo=articleId=>{
    return request({
        method: 'GET',
        url: `/app/v1_0/articles/${articleId}`
        
    })
}
/**
 * 收藏文章
 */
export const addStarArticle=ArticleId=>{
    return request({
      method:"POST",
      url: `/app/v1_0/article/collections`,
      data:{
        target:ArticleId
      }
    })
  }
  /**
   * 取消收藏
   */
  export const deleteStarArticle=ArticleId=>{
    return request({
      method:"DELETE",
      url: `/app/v1_0/article/collections/${ArticleId}`
    })
  }
  /**
 * 点赞文章
 */
export const addLike=ArticleId=>{
    return request({
      method:"POST",
      url: `/app/v1_0/article/likings`,
      data:{
        target:ArticleId
      }
    })
  }
  /**
   * 取消点赞
   */
  export const deleteLike=ArticleId=>{
    return request({
      method:"DELETE",
      url: `/app/v1_0/article/likings/${ArticleId}`
    })
  }