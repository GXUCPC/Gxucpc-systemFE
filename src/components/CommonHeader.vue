<template>
    <div class="header-admin">
        <div class="signOut">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    {{ userName }}<el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="signOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userName: 'root'
        }
    },
    methods: {
        // @prame obj 下拉菜单对应的command

        handleCommand(obj) {
            if (obj === 'signOut') {
                localStorage.setItem("token", null)
                this.$router.push('/')
                this.$message.success("退出成功")
            }
        }
    }
}
</script>
<style>
.el-header {
    padding: 0 0;
}

.header-admin {
    background-color: #f9fafc;
    width: 100%;
    height: 100%;
}
.signOut {
    float: right;
    margin: 15px 2%;
    font-size: 16px;
    display: inline-block;
}
</style>