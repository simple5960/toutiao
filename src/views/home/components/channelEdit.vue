<template>
<div class="channel-edit">
    <van-cell center :border="false">
        <div slot="title" class="channel-title">我的频道</div>
        <van-button type="danger" plain round size="mini" @click="isEdit=!isEdit">{{isEdit?'完成':'编辑'}}

        </van-button>
    </van-cell>
    <van-grid :gutter="10">
        <van-grid-item v-for="(channel,index) in userChannels" :key="index" :text="channel.name" :icon="(isEdit && index!==0)? 'clear':''" @click="onUserChannelClick(channel,index)" :class="{active:index===active}" class="grid-item" />
    </van-grid>
    <van-cell center :border="false">
        <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
        <van-grid-item v-for="(channel,index) in recommendChannels" :key="index" :text="channel.name" @click="onAdd(channel)" class="grid-item" />
    </van-grid>
</div>
</template>

<script>
import {
    getAllChannels,
    addUserChannels,
    deleteUserChannels
} from '@/api/channel'
import {
    mapState
} from 'vuex'
import {
    setItem
} from '@/utils/storage'
export default {
    name: "ChannelEdit",
    props: {
        userChannels: {
            type: Array,
            required: true
        },
        active: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            allChannels: [],
            isEdit: false //频道编辑是否出现关闭按钮
        }
    },
    created() {
        this.loadAllChannels()
    },
    methods: {
        async loadAllChannels() {
            const {
                data
            } = await getAllChannels()
            this.allChannels = data.data.channels
        },
        async onAdd(channel) {
            this.userChannels.push(channel)
            //数据持久化
            if (this.user) {
                //登录了,把数据存在线上
                await addUserChannels({
                    channels: {
                        id: channel.id,
                        seq: this.userChannels.length
                    }
                })
            } else {
                //没有登录，数据放在本地存储中
                setItem('user-channels', this.userChannels)
            }

        },
        onUserChannelClick(channel, index) {
            //如果是编辑状态，就删除频道，非编辑状态就切换频道
            if (this.isEdit && index !== 0) {
                this.deleteChannel(channel, index)
            } else {
                this.switchChannel(index)
            }
        },
        async deleteChannel(channel, index) {
            //如果删除的是当前激活频道之前的频道
            if (index <= this.active) {
                //更新激活频道的索引
                this.$emit('updateActive', this.active - 1)
            }
            this.userChannels.splice(index, 1)
            if (this.user) {
                await deleteUserChannels(channel.id)
            } else {
                setItem('user-channels', this.userChannels)
            }
        },
        switchChannel(index) {
            //子组件向父组件传递事件
            //关闭弹出层
            this.$emit('close')
            //切换频道
            this.$emit("updateActive", index)
        }
    },
    computed: {
        ...mapState(['user']),
        //推荐的频道列表
        recommendChannels() {
            //所有频道-我的频道=推荐频道
            return this.allChannels.filter((channel) => {
                //判断当前遍历的频道是否属于我的频道
                return !this.userChannels.find(userchannel => {
                    return userchannel.id == channel.id
                })

            })

        }
    }
}
</script>

<style lang="less" scoped>
.channel-edit {
    padding-top: 54px;

    .channel-title {
        font-size: 16px;
        color: #333;
    }

    /deep/ .grid-item {
        width: 80px;
        height: 43px;

        .van-grid-item__content {
            background: #f4f5f6;

            .van-grid-item__text {
                font-size: 14px;
                color: #222;
                margin-top: 0;
            }

            .van-grid-item__icon {
                position: absolute;
                right: -5px;
                top: -5px;
                font-size: 20px;
                color: #cccccc;
            }

        }

    }

    .active {
        /deep/ .van-grid-item__text {
            color: red !important;
        }
    }
}
</style>
