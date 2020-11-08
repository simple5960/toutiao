<template>
<div class="articleList">
    <van-pull-refresh v-model="isPullDownLoading" @refresh="onRefresh" :success-text="pullDownSuccess" :success-duration="1500">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <articleItem v-for="(article,index) in articles" :key="index" :article="article"></articleItem>
        </van-list>
    </van-pull-refresh>

</div>
</template>

<script>
import {
    getArticle
} from '@/api/article'
import articleItem from '@/components/article-item'
export default {
    name: "ArticleList",
    components: {
        articleItem
    },
    props: {
        channel: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            articles: [],
            loading: false,
            finished: false,
            timestamp: null, //获取下一页数据的时间戳
            isPullDownLoading: false, //下拉刷新的loading状态
            pullDownSuccess: '' //下拉刷新成功提示
        }
    },
    methods: {
        async onLoad() {
            //1.请求获取数据
            const {
                data
            } = await getArticle({
                //传频道ID
                channel_id: this.channel.id,
                //时间戳。请求新的数据，传当前时间戳(新页面刷新)，请求历史推荐传指定时间戳(就是下一页)
                timestamp: this.timestamp || Date.now(),
                //是否包含置顶，进入页面第一次请求时要包含置顶文章1-包含，0-不包含
                with_top: 1
            })
            const {
                results
            } = data.data
            //console.log(`results----${results}`)
            //2.把获取到的数据放到articles数组中
            this.articles.push(...results)
            //3.设置本次加载状态结束，这样才可以加载下一页
            this.loading = false
            //4.数据全部加载完成
            //如果还有数据就继续获取下一页数据，否则就不再加载
            if (results.length) {
                // 更新获取下一页数据的页码
                this.timestamp = data.data.pre_timestamp
            } else {
                // 没有数据了，把加载状态设置结束，不再触发加载更多
                this.finished = true
            }
        },
        async onRefresh() {
            const {
                data
            } = await getArticle({
                //传频道ID
                channel_id: this.channel.id,
                //时间戳。请求新的数据，传当前时间戳(新页面刷新)，请求历史推荐传指定时间戳(就是下一页)
                timestamp: Date.now(),
                //是否包含置顶，进入页面第一次请求时要包含置顶文章1-包含，0-不包含
                with_top: 1
            })
            const {
                results
            } = data.data
            this.articles.unshift(...results)
            this.isPullDownLoading = false
            this.pullDownSuccess = `更新了${results.length}条数据`
        }
    }
}
</script>

<style lang="less" scoped>
.articleList {
    text-align: left;
    position: fixed;
    top: 90px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow-y: auto;
}
</style>
