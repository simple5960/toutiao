<template>
<van-cell class="comment-item">
    <van-image class="avatar" slot="icon" round fit="cover" :src="comment.aut_photo" />
    <div slot="title">
        <div class="title-wrap">
            <div class="name">{{comment.aut_name}}</div>
            <div class="like-wrap" @click="onCommentLike">
                <van-icon class="like-icon" :class="{liked:comment.is_liking}" :name="comment.is_liking? 'good-job': 'good-job-o'" />
                <span class="like-count">{{comment.like_count}}</span>
            </div>
        </div>
        <div class="content">{{comment.content}}</div>
        <div>
            <span class="pubdate">{{comment.pubdate | dateTime}}</span>
            <van-button class="reply-btn" round size="small" @click="$emit('reply-click',comment)">{{comment.reply_count}}回复</van-button>
        </div>

    </div>

</van-cell>
</template>

<script>
import {
    addCommentLike,
    deleteCommentLike
} from '@/api/comment'
export default {
    name: 'commentItem',
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    methods: {
        async onCommentLike() {
            const commentId = this.comment.com_id.toString()
            if (this.comment.is_liking) {
                await deleteCommentLike(commentId)
                this.comment.like_count--
            } else {
                await addCommentLike(commentId)
                this.comment.like_count++
            }
            //更新视图
            this.comment.is_liking = !this.comment.is_liking
        }
    }
}
</script>

<style lang="less" scoped>
.comment-item {
    .title-wrap {
        display: flex;
        justify-content: space-between;
    }

    .avatar {
        width: 36px;
        height: 36px;
        margin-right: 13px;
    }

    .name {
        font-size: 14px;
        color: #406599;
    }

    .content {
        font-size: 16px;
        color: #222;
    }

    .pubdate {
        font-size: 10px;
    }

    .like-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .like-icon .liked {
        color: #ff69b4;
    }
}
</style>
