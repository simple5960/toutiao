<template>
<div class="loginContainer">
    <van-nav-bar class="app-nav-bar" title="注册/登录" left-arrow @click-left="returnBack()" />
    <!-- 
    基于vant的表单验证
    1.将所有的表单项van-filed包裹在 van-form中
    2.给表单绑定submit事件--当表单提交的时候触发
    3.使用Field的rules定义校验规则
     -->

    <!-- 登录表单 -->
    <van-form @submit="onLogin" ref="login-form" :show-error="false" :show-error-message="false" @failed="onFailed">
        <van-field v-model="user.mobile" center icon-prefix="toutiao" left-icon="shouji" placeholder="请输入手机号码" name="mobile" :rules='fromRules.mobile'>
            <template #left-icon>
                <div class="toutiao toutiaoshouji"></div>
            </template>
        </van-field>
        <van-field v-model="user.code" center icon-prefix="toutiao" left-icon="yanzhengma2" placeholder="请输入验证码" name="code" :rules="fromRules.code">
            <template #left-icon>
                <div class="toutiao toutiaoyanzhengma2"></div>
            </template>
            <template #button>
                <!-- 倒计时组件 -->
                <van-count-down v-if="isCountDownShow" :time="1000*60" format="ss s" @finish="finishCount">
                    <!-- 
                    time是倒计时时长，单位毫秒
                    format事件格式 默认HH:MM:SS
                    finish:倒计时结束时触发

                 -->
                </van-count-down>
                <!-- 发送验证码组件 -->
                <van-button v-else size="small" round type="primary" native-type="button" @click.prevent="onSendSms" :loading="isSendSmsLoading">发送验证码</van-button>
            </template>
        </van-field>
        <div class="loginBtnWrap">
            <!--在表单中，除了提交按钮外，可能还有一些其他的功能性按钮，如发送验证码按钮。
            在使用这些按钮时，要注意将native-type设置为button，否则会触发表单提交。-->
            <van-button class="loginBtn" type="info" block>登录</van-button>
        </div>
    </van-form>

</div>
</template>

<script>
import {
    login,
    sendSms
} from '@/api/user'
import {
    Toast
} from 'vant'
export default {
    name: 'loginIndex',
    components: {

    },
    data() {
        return {
            user: {
                mobile: "",
                code: ""
            },
            fromRules: {
                mobile: [{
                        required: true,
                        message: '请输入手机号'
                    },
                    {
                        pattern: /^1[3|5,7|8|9]\d{9}$/,
                        message: "请输入11位数字的手机号码"
                    }
                ],
                code: [{
                        required: true,
                        message: '验证码不能为空'
                    },
                    {
                        pattern: /^\d{6}$/,
                        message: "请输入6位数字的验证码"
                    }
                ]
            },
            isSendSmsLoading: false,
            isCountDownShow: false
        }
    },
    methods: {
        returnBack() {
            this.$router.back()

        },
        async onLogin() {
            Toast.loading({
                message: '登录中...',
                forbidClick: true, //是否禁止背景点击
                duration: 0 //为0时一直展示
            });
            //1.找到数据接口
            //2.封装请求方法
            //3.请求调用登录
            try {
                const {
                    data
                } = await login(this.user)
                //等同于const data=res.data
                //console.log(res)
                Toast.success("登录成功")
                //将后端返回的用户登录状态token数据放到vuex中
                this.$store.commit('setUser', data.data)
                //返回的token为访问令牌，有效期两个小时---设置短时间是为了安全，防止token被盗用
                //refresh_token为刷新令牌，有效期14天。用于访问令牌过期后获取新的访问令牌
            } catch (err) {
                Toast.fail("登录失败")
                console.log("登陆失败", err)
            }
            //4.处理响应结果
        },
        onFailed(error) {
            if (error.errors[0]) {
                this.$toast({
                    message: error.errors[0].message, // 提示消息
                    position: 'top' // 防止手机键盘太高看不见提示消息
                })
            }
        },
        async onSendSms() {
            //发送验证码
            //1.校验手机号码
            //获取表单元素，再使用其validate的方法
            try {
                await this.$refs['login-form'].validate('mobile')
                //验证通过请求发送验证码
                this.isSendSmsLoading = true //展示按钮的loading状态，防止用户多次点击

                await sendSms(this.user.mobile)
                //短信发出去了，隐藏发送按钮，显示倒计时(用vant中CountDown实现)
                this.isCountDownShow = true
                //倒计时结束，隐藏倒计时，显示发送按钮(finish事件处理)
            } catch (error) {
                //不同的错误有不同的提示
                let message = ""
                if (error && error.response && error.response.status === 429) {
                    message = "发送太频繁了,请稍后再试"
                } else if (error.name === "mobile") {
                    //表单验证失败的错误提示
                    message = error.message
                } else {
                    //未知错误
                    message = "发送失败,请重试"
                }
                //提示用户
                this.$toast({
                    message,
                    position: 'top'
                })
                //无论发送的验证码是否验证成功，最后都要关闭发送按钮的loading状态
                this.isSendSmsLoading = false
                this.isCountDownShow = false
            }

        },
        finishCount() {
            this.isCountDownShow = false
            this.isSendSmsLoading = false
        }
    }
}
</script>

<style lang="less" scoped>
.loginContainer {
    .loginBtnWrap {
        padding: 26px 16px;

        .loginBtn {
            background: #6db4fb;
            border: none;

            .van-button__text {
                font-size: 15px;
            }
        }
    }
}
</style>
