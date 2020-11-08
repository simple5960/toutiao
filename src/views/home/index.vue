<template>
<div class="homeContainer">
    <van-nav-bar class="app-nav-bar">
        <template #title>
            <van-button icon="search" type="info" round class="searchBtn">搜索</van-button>
        </template>
    </van-nav-bar>
    <van-tabs class="channel-tabs" v-model="active">
        <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
            <articleList :channel="channel"></articleList>
        </van-tab>
        <div slot="nav-right">
            <div class="blank-ele"></div>
        </div>
        <!--- 下面这个会把最后的元素挡住，为了防止挡住，需要在导航栏
        添加一个跟这个一样大小的元素
         --->

        <div slot="nav-right">
            <van-icon name="wap-nav" @click="isChannelEditShow=true" class="wap-nav-wrap"></van-icon>
        </div>
    </van-tabs>
    <van-popup v-model="isChannelEditShow" position="bottom" class="channel-edit-popup" closeable close-icon-position="top-left" get-container="body">
        <channelEdit :active="active" :user-channels="channels" @close="isChannelEditShow=false" @updateActive="onUpdateActive"></channelEdit>
    </van-popup>
</div>
</template>

<script>
import {
    getUserChannels
} from '@/api/user'
import articleList from "./components/articleList"
import channelEdit from './components/channelEdit'
export default {
    name: 'home',
    components: {
        articleList,
        channelEdit
    },
    data() {
        return {
            active: 0,
            channels: [], //频道列表
            isChannelEditShow: true
        }
    },
    created() {
        this.loadChannels()
    },
    methods: {
        showPopup() {
            this.show = true;
        },
        async loadChannels() {
            //请求获取频道数据
            const {
                data
            } = await getUserChannels()
            this.channels = data.data.channels
            //console.log(data)
        },
        onUpdateActive(index) {
            this.active = index
        }
    }
}
</script>

<style lang="less" scoped>
body {

    .channel-edit-popup {
        height: 100%;
    }
}

.homeContainer {

    /deep/.van-nav-bar__title {
        max-width: none;
    }

    /deep/.searchBtn {
        width: 277px;
        height: 32px;
        background: #5babfb;
        border: none;
    }

    .channel-tabs {
        /deep/ .van-tab {
            border-right: 1px solid #ccc;
            border-bottom: 1px solid #deeff3;
        }

        /deep/ .van-tabs__line {
            width: 15px !important;
            height: 3px;
            background: #3296fa;
            margin-bottom: 4px;
        }
    }

    .blank-ele {
        width: 33px;
        flex-shrink: 0;
    }

    .wap-nav-wrap {
        position: fixed;
        right: 0;
        width: 33px;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 44px;
        background-color: #ffffff;
        opacity: 0.9;

        .van-icon {
            font-size: 25px;
        }
    }
}
</style>
