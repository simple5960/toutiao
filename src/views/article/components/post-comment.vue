<template>
<div class="post-comment">
    <van-field v-model.trim="message" rows="2" autosize type="textarea" placeholder="请输入留言" show-word-limit maxlength="50" />
    <van-button type="primary" size="mini" @click="onPost" :disabled="!message">发布</van-button>
</div>
</template>

<script>
import {
    addComment
} from '@/api/comment'
export default {
    name: 'postComment',
    props: {
        target: {
            type: [Number, String, Object],
            required: true
        },
        articleId: {
            type: [Number, String, Object],
            default: null
        }
    },
    data() {
        return {
            message: ''
        }
    },
    methods: {
        async onPost() {
            this.$toast({
                message: '发布中',
                forbidClick: true
            })
            //请求提交评论的内容
            const {
                data
            } = await addComment({
                target: this.target.toString(), //评论的目标ID(评论文章则为文章ID，评论回复则为评论ID))
                art_id: this.articleId === null ? null : this.articleId.toString(),
                content: this.message //评论的内容
            })
            //console.log(data);
            this.$emit('post-success', data.data.new_obj)
            this.$toast.success("发布成功")
            //发布成功清空文本框内容
            this.message = ''
        }
    }
}
</script>

<style lang="less" scoped>
.post-comment {
    padding: 14px;
    display: flex;
    align-items: center;

    .van-button--primary {
        white-space: nowrap;
    }
}
</style>
