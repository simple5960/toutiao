<template>
<div class="search-suggestion">

    <van-cell icon="search" v-for="(str,index) in suggestions" :key="index" @click="$emit('search',str)">
        <div slot="title" v-html="heightLight(str)"></div>
    </van-cell>

</div>
</template>

<script>
import {
    getSearchSuggestions
} from '@/api/search'
//import _ from "loadsh" //这个_就跟jQuery的$一样
/**
函数调用
const fn = _.debounce(function () {
    console.log("debounce");
}, 1000)
fn()
fn()
fn()
fn()
fn()
fn()
fn()
*/
import {
    debounce
} from 'loadsh'
export default {
    name: "searchSuggestionIndex",
    props: {
        searchText: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            suggestions: [] //联想建议的数组
        }
    },
    methods: {
        heightLight(str) {
            var regexp = new RegExp(this.searchText, 'gi')
            return str.replace(regexp, `<span style='color:red;'>${this.searchText}</span>`)

        }
    },
    watch: {
        searchText: {
            handler: debounce(async function () {
                const {
                    data
                } = await getSearchSuggestions(this.searchText)
                this.suggestions = data.data.options
            }, 1000),
            //此调会在侦听开始后立即被调用
            immediate: true
        }
    }
}
</script>

<style lang="less" scoped>

</style>
