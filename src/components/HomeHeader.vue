<template>
    <el-menu default-active="/" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <div class="flex-grow" />
        <div class="logo-container">
            <img class="image-logo" src="@/assets/images/logo(small).png" alt="">
        </div>
        <el-menu-item index="home">东信杯</el-menu-item>
        <el-sub-menu index="2">
            <template #title>关于竞赛</template>
            <el-menu-item index="notice">竞赛通知</el-menu-item>
            <el-menu-item index="prize">奖项设置</el-menu-item>
            <el-menu-item index="winners">获奖名单</el-menu-item>
            <el-menu-item index="news">赛事新闻</el-menu-item>
            <el-menu-item index="board">历届榜单</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="signup">赛事报名</el-menu-item>
        <el-menu-item index="download">证书下载</el-menu-item>
    </el-menu>
</template>

<script>
export default {
    methods: {
        handleSelect(key, keyPath) {
            if(key === 'home') {
                this.$router.push({path: "/"})
            } else if(key === 'notice') {
                this.$router.push({path: "/list/notice"})
            } else if(key === 'prize') {
                this.$router.push({path: "/list/prize"})
            } else if(key === 'winners') {
                this.$router.push({path: "/list/winners"})
            } else if(key === 'news') {
                this.$router.push({path: "/list/news"})
            } else if(key === 'board') {
                this.$router.push({path: "/list/board"})
            } else if(key === "download") {
                this.$router.push({path: "/download"})
            } else if(key === 'signup') {
                this.$router.push({path: "/list/signup"})
            }
        }
    }
}
</script>

<style>
.flex-grow {
    flex-grow: 0.5;
}

.image-logo {
    height: 100%;
    position: relative;
}

.logo-container {
    display: flex;
    align-items: center;
    height: 60px;
    margin-right: 60px;
}

.el-header {
    padding: 0;
}
</style>