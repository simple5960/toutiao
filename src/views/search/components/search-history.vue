<template>
<div class="search-history">
    <van-cell title="搜索历史">
        <div v-if="isDeleteShow">
            <span @click="$emit('update-histories',[])">全部删除</span>
            &nbsp; &nbsp; &nbsp;
            <span @click="isDeleteShow=false">完成</span>
        </div>
        <van-icon name="delete" v-else @click="isDeleteShow=true" />
    </van-cell>
    <van-cell v-for="(item,index) in searchHistories" :title="item" :key="index" @click="onDelete(item,index)">
        <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
</div>
</template>

<script>
import {
    setItem
} from '@/utils/storage'
export default {
    name: "searchHistory",
    props: {
        searchHistories: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            isDeleteShow: false
        }
    },
    methods: {
        onDelete(history, index) {
            if (this.isDeleteShow) {
                this.searchHistories.splice(index, 1)
                setItem('search-histories', this.searchHistories)
                return
            }
            //非删除状态，展示搜索结果
            this.$emit('search', history)
        }
    }

}
</script>

<style>

</style>
