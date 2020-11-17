<template>
<div class="update-birthday">
    <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @cancel="$emit('close')" @confirm="onConfirm" />
</div>
</template>

<script>
import {
    updateUserProfile
} from '@/api/user'
import dayjs from 'dayjs'
export default {
    name: 'updateBirthday',
    props: {
        value: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            minDate: new Date(1900, 0, 1),
            maxDate: new Date(2025, 10, 1),
            currentDate: new Date(this.value)
        }
    },
    methods: {
        async onConfirm() {
            //请求提交更新用户生日
            this.$toast({
                message: "保存中",
                forbidClick: true
            })
            //const date = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth()+1}-${this.currentDate.getDate()}`
            const date = dayjs(this.currentDate).format('YYYY-MM-DD')
            await updateUserProfile({
                birthday: date
            })
            this.$toast.success('保存成功')
            //修改父组件的gender
            this.$emit('input', date)
            //关闭弹出层
            this.$emit('close')
            this.$toast.success('保存成功')
        }
    }
}
</script>

<style>

</style>
