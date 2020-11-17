<template>
<div class="update-photo">
    <img :src="image" class="image" ref="image">
    <van-nav-bar class="toolbar" left-text="取消" right-text="确认" @click-left="$emit('close')" @click-right="onConfirm" />
</div>
</template>

<script>
import {
    updateUserPhoto
} from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
    name: "updatePhoto",
    props: {
        file: {
            required: true
        }
    },
    data() {
        return {
            image: window.URL.createObjectURL(this.file),
            cropper: null // 裁切器实例
        }
    },
    mounted() {
        //获取需要裁切的图片的DOM
        const image = this.$refs.image
        this.cropper = new Cropper(image, {
            viewMode: 1,
            dragMode: 'move',
            aspectRatio: 1,
            cropBoxMovable: false,
            cropBoxResizable: false,
            background: false,
            movable: true
        })

    },
    methods: {
        getCroppedCanvas() {
            return new Promise(resolve => {
                this.cropper.getCroppedCanvas().toBlob((file) => {
                    resolve(file)
                })
            })
        },
        async onConfirm() {
            this.$toast({
                message: "保存中",
                forbidClick: true,
                duration: 0
            })
            const file = await this.getCroppedCanvas()
            const fd = new FormData()
            fd.append('photo', file)
            // const fd = new FormData()
            // fd.append("photo", this.file)
            await updateUserPhoto(fd)
            //更新父组件的头像
            this.$emit('update-photo', window.URL.createObjectURL(file))
            this.$emit('close')
            this.$toast.success('保存成功')
        }
    }
}
</script>

<style lang="less" scoped>
.toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
}

.image {
    display: block;
    max-width: 100%;
}
</style>
