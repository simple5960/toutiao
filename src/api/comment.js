/**
 * 获取文章评论
 */
import request from '@/utils/request'
/**
 * 获取文章列表i
 */
export const getComments = params => {
    return request({
      method: 'GET',
      url: '/app/v1_0/comments',
      params
    })
  }
/**
 * 对评论或者回复点赞
 */
export const addCommentLike = commentId => {
    return request({
      method: 'POST',
      url: '/app/v1_0/comment/likings',
      data:{
          target:commentId
      }
    })
  }
/**
 * 对评论或者回复取消点赞
 */
export const deleteCommentLike = commentId => {
    return request({
      method: 'DELETE',
      url: `/app/v1_0/comment/likings/${commentId}`
      
    })
  }
  /**
 * 添加评论
 */
export const addComment = data => {
  return request({
    method: 'POST',
    url: `/app/v1_0/comments`,
    data
    
  })
}