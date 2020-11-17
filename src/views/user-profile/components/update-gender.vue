<template>
<div class="update-gender">
    <van-picker show-toolbar :columns="columns" title="性别" :default-index="defaultIndex" @change="onGenderChange" @cancel="$emit('close')" @confirm="onConfirm" />
</div>
</template>

<script>
import {
    updateUserProfile
} from '@/api/user'
export default {
    name: 'updateGender',
    props: {
        value: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            columns: ['男', '女'],
            defaultIndex: this.value,
            gender: ''
        }
    },
    methods: {
        onGenderChange(picker, value, index) {
            this.defaultIndex = index

        },
        async onConfirm() {
            this.$toast({
                message: "保存中",
                forbidClick: true
            })

            await updateUserProfile({
                gender: this.defaultIndex
            })
            this.$toast.success('保存成功')
            //修改父组件的gender
            this.$emit('input', this.defaultIndex)
            //关闭弹出层
            this.$emit('close')
            this.$toast.success('保存成功')

        }
    }
}
</script>

<style>

</style>
