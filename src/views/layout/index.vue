<template>
<div class="layoutContainer">
    <!-- 子路由出口 -->
    <keep-alive>
            <router-view></router-view>
    </keep-alive>
    
    <!-- 底部导航栏 -->
    <!-- 给tabbar--route属性  然后给每一项to属性就可以路由跳转了 -->
    <van-tabbar v-model="active" route>
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="comment-o" to="/question">问答</van-tabbar-item>
        <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
        <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
</div>
</template>

<script>
export default {
    name: 'layoutIndex',
    data() {
        return {
            active: 0
        }
    },
    mounted() {
        this.$store.commit('addCachePage','layoutIndex')
    },
}
</script>

<style>

</style>
