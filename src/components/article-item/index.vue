<template>
<div>
    <van-cell class="articleItem" :to="{
        name:'article',
        params:{
            articleId:article.art_id
        }
    }">
        <template #title>
            <div class="title van-multi-ellipsis--l3">
                {{article.title}}
            </div>
        </template>
        <template #label>
            <div>
                <div class="cover-wrap" v-if="article.cover.type===3">
                    <div v-for="(img,index) in article.cover.images" :key="index" class="cover-wrap-item">
                        <van-image class="cover-item" height="73" :src="img" fit="cover" />
                    </div>
                </div>
                <div class="label-wrap">
                    <span>{{article.aut_name}}</span>
                    <span>{{article.comm_count}}评论</span>
                    <span>{{article.pubdate|relativeTime}}</span>
                </div>
            </div>
        </template>
        <van-image v-if="article.cover.type===1" width="116" height="73" :src="article.cover.images[0]" fit="cover" />
    </van-cell>
</div>
</template>

<script>
export default {
    name: "articleItem",
    props: {
        article: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="less" scoped>
.articleItem {
    .title {
        font-size: 16px;
        color: #3a3a3a;
    }

    /deep/ .van-cell__value {
        flex: unset;
        width: 116px;
        height: 73px;
        margin-left: 12px;
    }

    .cover-wrap {
        padding: 15px 0;
        display: flex;

        .cover-wrap-item {
            flex: 1;
            height: 73px;

            &:not(:last-child) {
                padding-right: 4px;
            }

            .cover-item {
                width: 100%;
                height: 73px;
            }
        }
    }

    .label-wrap {
        font-size: 13px;
        color: #b4b4b4;
    }

    .label-wrap span {
        margin-right: 12px;
    }
}
</style>
