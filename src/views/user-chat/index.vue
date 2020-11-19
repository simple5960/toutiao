<template>
  <div class="user-chat">
    <van-nav-bar
        class="app-nav-bar"
        title="聊天机器人"
        left-arrow
        @click-left="$router.back()"
    />
    <!-- 消息列表 -->
    <van-cell-group class="messageList" ref="messageList">
        <!-- <van-cell v-for="(item, index) in messages" :key="index" :title="item.msg"></van-cell> -->
        
            <van-cell title="不可使用" value="无法解决的跨域问题P187/188"/>
          
       
    </van-cell-group>
    <!-- 发送消息 -->
    <van-cell-group class="sendMsg">
        <van-field v-model="message"  placeholder="请输入消息" :border="false"/>
        <van-button size="small"  type="info" class="sendBtn">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client';
//const socket = io('http://ttapi.research.itcast.cn/')
// socket.on('connect',function(){
//     console.log("success");
// })
// socket.on('disconnect',function(){
//     console.log("failed");
// })
export default {
    name:'userChat',
    data() {
        return {
            message:""
           
        }
    }
    
}
</script>

<style scoped lang='less'>
.messageList{
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 44px;
    overflow-y: auto;
}
.sendMsg{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    padding:0 10px;
    align-items: center;
    .van-button__text{
    height: 0.61333rem;
    line-height: 0.61333rem;
    white-space: nowrap;
    }
}

</style>