<template>
<div class="comment-list">
    <van-cell title="全部评论"></van-cell>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">

        <commentItem v-for="(comment,index) in list" :key="index" :title="comment.content" :comment="comment" @reply-click='$emit("reply-click",$event)'></commentItem>
    </van-list>
</div>
</template>

<script>
import {
    getComments
} from '@/api/comment'
import commentItem from './comment-item'
export default {
    name: 'commentList',
    components: {
        commentItem
    },
    props: {
        source: {
            type: [String, Number, Object],
            required: true
        },
        type: {
            type: String,
            default: 'a'
        },
        list: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data() {
        return {
            //list: [],
            loading: false,
            finished: false,
            offset: null, //获取下页数据的页码
            limit: 10
        }
    },
    methods: {
        async onLoad() {
            const {
                data
            } = await getComments({
                type: this.type, //评论类型  a对文章的评论  c对评论的回复
                source: this.source.toString(), //文章id或者评论id
                offset: this.offset,
                limit: this.limit
            })
            this.$emit('update-total-count', data.data.total_count)
            const {
                results
            } = data.data
            this.list.push(...results)
            this.loading = false
            //判断是否还有数据
            if (results.length) {
                this.offset = data.data.last_id
            } else {
                this.finished = true
            }
        }
    }
}
</script>

<style>

</style>
