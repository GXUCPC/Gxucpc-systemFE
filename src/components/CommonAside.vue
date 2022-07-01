<template>
    <div class="aside-admin">

        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" router="true">
            <div class="image-admin">
                <img class="image-logo" src="@/assets/images/logo.png" alt="">
            </div>
            <el-menu-item index="/admin">
                <el-icon>
                    <Grape />
                </el-icon>
                <span>仪表盘</span>
            </el-menu-item>
            <el-menu-item index="/admin/user" :disabled="disable">
                <el-icon>
                    <UserFilled />
                </el-icon>
                <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/contest">
                <el-icon>
                    <Trophy />
                </el-icon>
                <span>比赛管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/form">
                <el-icon>
                    <Tickets />
                </el-icon>
                <span>表单管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/email">
                <el-icon>
                    <Position />
                </el-icon>
                <span>邮件管理</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            defaultActive: undefined,
            disable: true
        }
    },
    methods: {

        // 更具当前的路由path榜单活跃菜单

        setCurrentRoute() {
            this.defaultActive = this.$route.path //通过他就可以监听到当前路由状态并激活当前菜单
        },
        getUserPower() {
            this.disable = (localStorage.getItem('power') === "Super Admin" ? false : true)
        }
    },
    watch: {
        $route() {
            this.setCurrentRoute()
        }
    },
    created() {
        this.setCurrentRoute()
        this.getUserPower()
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