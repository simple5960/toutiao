<template>
<div class="update-name">
    <van-nav-bar title="修改昵称" left-text="取消" right-text="完成" @click-left="$emit('close')" @click-right="onConfirm" />
    <div class="name-filed-wrap">
        <van-field v-model="localName" rows="2" autosize type="textarea" maxlength="10" placeholder="请输入昵称" show-word-limit />
    </div>
</div>
</template>

<script>
import {
    updateUserProfile
} from '@/api/user'
export default {
    name: 'updateName',
    props: {
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            localName: this.name //v-model不允许双向修改String类型的数据
        }
    },
    methods: {
        async onConfirm() {
            //请求提交更新用户昵称
            this.$toast({
                message: "保存中",
                forbidClick: true
            })
            try {
                await updateUserProfile({
                    name: this.localName
                })
                this.$toast.success('保存成功')
                //修改父组件的name
                this.$emit('update-name', this.localName)
                //关闭弹出层
                this.$emit('close')

            } catch (error) {
                if (error && error.response && error.response.status === 409) {
                    this.$toast.fail('昵称已经存在')
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.name-filed-wrap {
    padding: 10px;
}
</style>
