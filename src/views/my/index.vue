<template>
<div class="myContainer">
    <van-cell-group class="myInfo" v-if="user">
        <van-cell center class="baseInfo" :border="false">
            <van-image :src="currentUser.photo" class="avatar" fit="cover" slot="icon" round />
            <div class="nickName" style="margin-left: 10px">{{currentUser.name}}</div>
            <van-button class="editProfile" slot="right-icon" size="small" round to="/user/profile">编辑资料</van-button>
        </van-cell>
        <van-grid class="dataInfo" :border="false">
            <van-grid-item class="dataInfoItem">
                <div slot="text" class="textWrap">
                    <div class="span count">{{currentUser.art_count}}</div>
                    <div class="text">头条</div>
                </div>
            </van-grid-item>
            <van-grid-item class="dataInfoItem">
                <div slot="text" class="textWrap">
                    <div class="span">{{currentUser.follow_count}}</div>
                    <div class="text">关注</div>
                </div>
            </van-grid-item>
            <van-grid-item class="dataInfoItem">
                <div slot="text" class="textWrap">
                    <div class="span">{{currentUser.fans_count}}</div>
                    <div class="text">粉丝</div>
                </div>
            </van-grid-item>
            <van-grid-item class="dataInfoItem">
                <div slot="text" class="textWrap">
                    <div class="span">{{currentUser.like_count}}</div>
                    <div class="text">获赞</div>
                </div>
            </van-grid-item>
        </van-grid>
    </van-cell-group>
    <div class="notLogin" v-else>
        <div @click="$router.push('./login')">
            <img src="./shouji.png" class="mobile" />
        </div>
        <div class="text">
            登录/注册
        </div>
    </div>
    <van-grid column-num="2" class="navGrid">
        <van-grid-item class="navGridItem" icon="star-o" text="收藏" />
        <van-grid-item class="navGridItem" icon="browsing-history-o" text="历史" />
    </van-grid>
    <van-cell value="消息通知" is-link url="" />
    <van-cell value="聊天机器人" is-link to="/user/chat" />
    <!---  v-if="user"如果有登录信息就显示下面这个，如果没有就不显示 --->
    <van-cell class="exitLogin" v-if="user" title="退出登录" @click="onLogout" />
</div>
</template>

<script>
import {
    Dialog
} from 'vant';
import {
    mapState
} from "vuex";
import {
    getCurrentUser
} from '@/api/user'
export default {
    name: "my",
    data() {
        return {
            currentUser: {} //当前用户的登录信息
        };
    },
    created() {
        this.loadCurrentUser()
    },
    computed: {
        ...mapState(["user"]),
    },
    methods: {
        async loadCurrentUser() {
            //加载当前用户
            const {
                data
            } = await getCurrentUser()
            this.currentUser = data.data
            //console.log(data);
        },
        onLogout() {
            //退出登陆状态，提示用户确认退出
            this.$dialog.confirm({
                    title: '退出提示',
                    message: '确认退出吗'
                })
                .then(() => {
                    // on confirm
                    //清除用户的登录状态
                    this.$store.commit('setUser', null)
                })
                .catch(() => {
                    // on cancel

                });

        }
    }
};
</script>

<style lang="less" scoped>
.myContainer {
    .myInfo {
        // 由于van-cell-group的一些子节点有背景色会遮住图片所以要去掉那些节点的背景色

        background: url("./banner.png") no-repeat !important;
        background-size: cover;

        .baseInfo {
            background: unset;
            height: 115px;
            box-sizing: border-box;
            padding-top: 38px;
            padding-bottom: 11px;

            .avatar {
                width: 66px;
                height: 66px;
                border: 2px solid #ffffff;
                box-sizing: border-box;
            }

            .nickName {
                color: #ffffff;
                font-size: 15px;
            }

            .editProfile {
                font-size: 10px;
                color: #666;
            }
        }

        .dataInfo {
            .dataInfoItem {
                height: 65px;
                color: #ffffff;

                .textWrap {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    .span {
                        font-size: 18px;
                    }

                    .text {
                        font-size: 11px;
                    }
                }
            }
        }

        /deep/ .van-grid-item__content {
            background: unset;
        }
    }

    .notLogin {
        height: 180px;
        background: url('./banner.png') no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        .mobile {
            width: 66px;
            height: 66px;
        }

        .text {
            color: #ffffff;
            font-size: 14px;
        }
    }

    /deep/ .navGrid {
        .navGridItem {
            height: 70px;

            .van-icon-star-o::before {
                content: "\F0C3";
                color: #eb5253;
            }

            .van-icon-browsing-history-o::before {
                content: "\F01D";
                color: #ff7d1d;
            }

            .van-grid-item__text {
                font-size: 14px;
                color: #333;
            }
        }

        margin-bottom: 15px;
    }

    .exitLogin {
        text-align: center;
        color: #d86262;
    }
}
</style>
