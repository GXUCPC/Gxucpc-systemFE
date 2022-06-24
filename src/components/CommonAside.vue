<template>
    <div class="aside-admin">

        <el-menu default-active="/admin" class="el-menu-vertical-demo" router="true" @open="handleOpen" @close="handleClose">
            <div class="image-admin">
                <img class="image-logo" src="@/assets/images/logo.png" alt="">
            </div>
            <el-menu-item index="/admin">
                <el-icon><Grape /></el-icon>
                <span>仪表盘</span>
            </el-menu-item>
            <el-menu-item index="/admin/user">
                <el-icon><UserFilled /></el-icon>
                <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/contest">
                <el-icon><Trophy /></el-icon>
                <span>比赛管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/form">
                <el-icon><Tickets /></el-icon>
                <span>表单管理</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        handleOpen(key, keyPath) {

        },
        handleClose(key, keyPath) {

        }
    }
}
</script>

<style>
.aside-admin {
    background-color: #ffffff;
    height: 100%;
}

.image-admin {
    text-align: center;
    width: 100%;
    height: 200px;
}

.image-logo {
    width: 80%;
    height: 80%;
    object-fit: contain;
}
</style>