<template>
<div class="search-container">
    <form action="/">
        <van-search @focus="isResultShow=fasle" v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch(searchText)" @cancel="$router.back()" />
    </form>
    <searchResult v-if="isResultShow" :search-text='searchText'></searchResult>
    <searchSuggestion v-else-if="searchText" :search-text='searchText' @search="onSearch"></searchSuggestion>
    <searchHistory v-else :searchHistories="searchHistories" @search="onSearch" @update-histories="searchHistories=$event"></searchHistory>

</div>
</template>

<script>
import searchSuggestion from './components/search-suggestion'
import searchHistory from './components/search-history'
import searchResult from './components/search-result'
import {
    setItem,
    getItem
} from '@/utils/storage'
import {
    getSearchHistories
} from "@/api/search"
import {
    mapState
} from 'vuex'
export default {
    name: "searchIndex",
    components: {
        searchSuggestion,
        searchHistory,
        searchResult
    },
    data() {
        return {
            searchText: '',
            isResultShow: false,
            isHistoryShow: true,
            searchHistories: []
        }
    },
    computed: {
        ...mapState(['user'])
    },
    created() {
        this.loadSearchHistories()
    },
    methods: {
        onSearch(searchText) {
            this.searchText = searchText
            const index = this.searchHistories.indexOf(searchText)
            if (index !== -1) {
                //把重复项删除
                this.searchHistories.splice(index, 1)
            }
            //把最新的搜索历史记录存储到数组的顶部
            this.searchHistories.unshift(searchText)
            //如果用户已经登录，把搜索的历史记录存到线上-->否则存到本地
            //setItem('search-history', this.searchHistories)
            //展示搜索结果
            this.isResultShow = true
        },
        async loadSearchHistories() {
            //让后端返回得历史记录和本地历史记录合并
            const localHistories = getItem('search-histories') || []
            // if (this.user) {
            //     const {
            //         data
            //     } = await getSearchHistories()
            //     localHistories = [...new Set([...localHistories, ...data.data.keywords])]
            // }
            this.searchHistories = localHistories
        }
    },
    watch: {
        searchHistories() {
            setItem('search-histories', this.searchHistories)
        }
    }
}
</script>

<style>

</style>
