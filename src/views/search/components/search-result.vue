<template>
<div class="search-result">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
</div>
</template>

<script>
import {
    getSearchResults
} from '@/api/search'
export default {
    name: "searchResult",
    props: {
        searchText: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            page: 1,
            perPage: 20 //每页请求多少条数据

        }
    },
    methods: {
        async onLoad() {
            /***
             * 请求获取数据
             * 将数据放到数据列表中
             * 关闭本次的loading
             * 判断是否还有数据，如果有就过更新获取下一页数据的页码
             * 如果没有不再加载更多
             * 
             */
            const {
                data
            } = await getSearchResults({
                page: this.page, //页码
                per_page: this.perPage, //每页的大小
                q: this.searchText ///搜索的关键字
            })
            const {
                results
            } = data.data
            this.list.push(...results)
            this.loading = false
            //判断是否还有数据
            if (results.length) {
                this.page++
            } else {
                //如果没有就把finished设置为true
                //关闭加载更多
                this.finished = true
            }
        }
    }
}
</script>

<style lang="less" scoped>
.search-result {
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
}
</style>
