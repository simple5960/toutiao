<template>
<div class="article-container">

    <van-nav-bar class="app-nav-bar" title="文章详情" left-arrow @click-left="$router.back()" />
    <div class="article-wrap">
        <h1 class="title">{{article.title}}</h1>
        <van-cell center class="userInfo">
            <div slot="title" class="name">{{article.aut_name}}</div>
            <van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo" />
            <div slot="label" class="pubdate">{{article.pubdate | relativeTime}}</div>
            <van-button :loading="isFollowLoading" class="followBtn" @click="onFollow" round size="small" :icon="article.is_followed ? '':'plus'" :type="article.is_followed ? 'default' :'info'">{{article.is_followed ? "已关注" :"关注"}}</van-button>
        </van-cell>
        <div class="markdown-body" v-html="article.content" ref="articleContent">
        </div>
        <commentList :source="articleId" :list="commentList" @update-total-count='totalCommentCount=$event' @reply-click="onReplyClick"></commentList>
    </div>
    <!-- 底部区域 -->
    <div class="article-bottom">
        <van-button class="comment-btn" type="default" round size="small" @click="isPostShow=true">写评论</van-button>
        <van-icon name="comment-o" color="#777" />
        <van-icon :color="article.is_collected ? 'orange' : '#777'" :name="article.is_collected ? 'star' : 'star-o'" @click="onCollect" />
        <van-icon :color="article.attitude === 1 ? 'hotpink' : '#777'" :name="article.attitude === 1 ? 'good-job' : 'good-job-o'" @click="onLike" />
        <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
        <postComment :target="articleId" @post-success='onPostSuccess' />
    </van-popup>
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom">
        <commentReply v-if="isReplyShow" :comment="replyComment" @close="isReplyShow=false" :articleId="articleId" />
    </van-popup>

</div>
</template>

<script>
import './github-markdown.css'
import {
    getArticleInfo,
    addStarArticle,
    deleteStarArticle,
    addLike,
    deleteLike
} from "@/api/article"
import {
    ImagePreview
} from 'vant'
import commentList from './components/comment-list'
import postComment from './components/post-comment'
import commentReply from './components/comment-reply'
import {
    onFollowUser,
    onUnFollowUser
} from '@/api/user'
export default {
    name: 'articleIndex',
    data() {
        return {
            article: {},
            isFollowLoading: false, //关注用户按钮的loading状态.
            isCollectLoading: false,
            isPostShow: false,
            commentList: [], //文章评论列表
            totalCommentCount: 0, //评论总数量
            isReplyShow: false,
            replyComment: {} //当前回复评论对象
        }
    },
    components: {
        commentList,
        postComment,
        commentReply
    },
    props: {
        articleId: {
            type: [String, Number, Object],
            required: true
        }

    },
    created() {
        this.loadArticle()
    },
    methods: {
        async loadArticle() {
            const {
                data
            } = await getArticleInfo(this.articleId)
            //console.log(data);
            this.article = data.data
            //获取文章DOM容器
            /**
            数据改变影响视图(DOM)不是立即的
            如果想要修改数据后(this.article = data.data)马上操作被该数据影响的DOM，需要把此代码放到
            $nextTick中
            */
            this.$nextTick(() => {
                this.handlePreviewImg()
            })
        },
        handlePreviewImg() {
            const articleContent = this.$refs['articleContent']
            //得到所有的Img标签
            const imgs = articleContent.querySelectorAll('img')
            const imgPaths = []
            imgs.forEach((img, index) => {
                imgPaths.push(img.currentSrc)
                img.onclick = function () {
                    ImagePreview({
                        images: imgPaths,
                        startPosition: index
                    });
                }
            })
        },
        async onFollow() {
            this.isFollowLoading = true
            //已经关注，就取消关注，如果没有关注就关注
            if (this.article.is_followed) {
                await onUnFollowUser(this.article.aut_id)
                this.article.is_followed = false

            } else {
                await onFollowUser(this.article.aut_id)
                this.article.is_followed = true

            }
            this.isFollowLoading = false
        },
        async onCollect() {
            this.$toast.loading({
                message: '操作中.....',
                forbidClick: true //禁止点击背景                
            })
            //已经收藏，就取消收藏，如果没有收藏就收藏
            if (this.article.is_collected) {
                await deleteStarArticle(this.articleId)

            } else {
                await addStarArticle(this.articleId)

            }
            this.article.is_collected = !this.article.is_collected

            this.$toast.success(`${this.article.is_collected?'':'取消'}收藏成功`)
        },
        async onLike() {
            this.$toast.loading({
                message: '操作中...',
                forbidClick: true // 禁止背景点击
            })
            if (this.article.attitude === 1) {
                // 已点赞，取消点赞
                await deleteLike(this.articleId)
                this.article.attitude = -1
            } else {
                // 没有点赞，添加点赞
                await addLike(this.articleId)
                this.article.attitude = 1
            }
            this.$toast.success(`${this.article.attitude === 1 ? '' : '取消'}点赞成功`)
        },
        onPostSuccess(comment) {
            this.commentList.unshift(comment)
            this.totalCommentCount++
            this.isPostShow = false
            //console.log(this.commentList);

        },
        onReplyClick(comment) {
            //console.log(comment);
            this.replyComment = comment
            //展示回复内容
            this.isReplyShow = true
        }
    }
}
</script>

<style lang="less" scoped>
.article-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
}

.title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
}

.userInfo {
    .avatar {
        width: 35px;
        height: 35px;
        margin-left: 8px;
    }

    .name {
        font-size: 12px;
        color: #333;
    }

    .pubdate {
        font-size: 11px;
        color: #b4b4b4;
    }

    .followBtn {
        width: 85px;
        height: 29px;

    }

}

ul {
    list-style: unset;
}

.markdown-body {
    padding: 14px;
    background-color: #fff;

}

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

    .van-icon {
        font-size: 20px;

        .van-info {
            font-size: 11px;
            background-color: #e22829;
        }
    }
}
</style>
