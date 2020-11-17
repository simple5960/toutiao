<template>
<div class="user-profile">
    <van-nav-bar class="app-nav-bar" title="个人信息" left-arrow @click-left="returnBack" />
    <van-cell-group>
        <input type="file" hidden ref="file" accept="image/*" @change="onFileChange">
        <van-cell title="头像" is-link center @click="$refs.file.click()">
            <van-image :src="user.photo" fit="cover" width="30" height="30" round />
        </van-cell>
        <van-cell title="昵称" is-link :value="user.name" @click="isEditNameShow=true" />
        <van-cell title="性别" is-link :value="user.gender===0?'男':'女'" @click="isEditGenderShow=true" />
        <van-cell title="生日" is-link :value="user.birthday" @click="isEditBirthdayShow=true" />
        <van-popup v-model="isEditNameShow" position="bottom" :style="{ height: '100%' }">
            <updateName v-if="isEditNameShow" @close="isEditNameShow=false" :name="user.name" @update-name="user.name=$event" />
        </van-popup>
        <van-popup v-model="isEditGenderShow" position="bottom">
            <updateGender @close="isEditGenderShow=false" v-model="user.gender" />
        </van-popup>
        <van-popup v-model="isEditBirthdayShow" position="bottom">
            <updateBirthday @close="isEditBirthdayShow=false" v-model="user.birthday" v-if="isEditBirthdayShow" />
        </van-popup>
        <van-popup v-model="isEditPhotoShow" position="bottom" style="height: 100%" class="update-photo-popup">
            <updatePhoto v-if="isEditPhotoShow" :file="previewImg" @close="isEditPhotoShow=false" @update-photo="user.photo=$event" />
        </van-popup>
    </van-cell-group>
</div>
</template>

<script>
import {
    getUserProfile
} from '@/api/user'
import updateName from './components/update-name'
import updateGender from './components/update-gender'
import updateBirthday from './components/update-birthday'
import updatePhoto from './components/update-photo'
export default {
    name: 'userProfile',
    props: {},
    components: {
        updateName,
        updateGender,
        updateBirthday,
        updatePhoto
    },
    data() {
        return {
            user: {},
            isEditNameShow: false,
            isEditGenderShow: false,
            isEditBirthdayShow: false,
            isEditPhotoShow: false,
            previewImg: null //上传预览图片
        }
    },
    created() {
        this.loadUserProfile()
    },
    methods: {
        returnBack() {
            this.$router.back()
        },
        async loadUserProfile() {
            const {
                data
            } = await getUserProfile()
            //console.log(data);
            this.user = data.data
        },
        onFileChange() {
            //console.log(641);
            //清空file的value
            const file = this.$refs.file.files[0]
            this.previewImg = file
            this.isEditPhotoShow = true
            this.$refs.file.vaule = ''
        }
    }
}
</script>

<style lang="less" scoped>
.van-popup {
    background-color: #f5f7f9;
}

.update-photo-popup {
    background-color: #000;
}
</style>
