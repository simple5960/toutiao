<template>
<div class="comment-reply">
    <!---头部信息--->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
        <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!---当前评论项--->
    <commentItem :comment="comment" />
    <!---所有评论回复--->
    <van-cell title="所有回复"></van-cell>
    <commentList :source="comment.com_id" type="c" :list="commentReplyList" />
    <div class="article-bottom">
        <van-button class="comment-btn" type="default" round size="small" @click="isPostShow=true">写评论</van-button>
    </div>
    <!---发布评论--->
    <van-popup v-model="isPostShow" position="bottom">
        <postComment :target="comment.com_id" :articleId="articleId" @post-success="onPostSuccess" />
    </van-popup>
</div>
</template>

<script>
import commentItem from './comment-item'
import commentList from './comment-list'
import postComment from './post-comment'
export default {
    name: 'commentReply',
    components: {
        commentItem,
        commentList,
        postComment
    },
    props: {
        //查看回复的评论项
        comment: {
            type: Object,
            required: true
        },
        articleId: {
            type: [String, Object, Number],
            required: true
        }
    },
    data() {
        return {
            isPostShow: false,
            commentReplyList: [] //评论回复列表
        }
    },
    methods: {
        onPostSuccess(comment) {
            //将发布成功的评论放到评论列表的顶部
            this.commentReplyList.unshift(comment)
            this.comment.reply_count++
            this.isPostShow = false
        }
    }
}
</script>

<style lang="less" scoped>
.article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;

    .comment-btn {
        width: 141px;
        height: 23px;
        border: 1px solid #eeeeee;
        font-size: 15px;
        line-height: 23px;
        color: #a7a7a7;
    }

}
</style>
