<template>
    <el-menu default-active="/" class="el-menu-demo" mode="horizontal" :router="true" :ellipsis="false" @select="handleSelect">
        <div class="flex-grow" />
        <div class="logo-container">
            <img class="image-logo" src="@/assets/images/logo(small).png" alt="">
        </div>
        <el-menu-item index="/">东信杯</el-menu-item>
        <el-sub-menu index="2">
            <template #title>关于竞赛</template>
            <el-menu-item index="/list/notice">竞赛通知</el-menu-item>
            <el-menu-item index="2-2">奖项设置</el-menu-item>
            <el-menu-item index="/list/winners">获奖名单</el-menu-item>
            <el-menu-item index="/list/news">赛事新闻</el-menu-item>
            <el-menu-item index="/list/board">历届榜单</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/download">证书下载</el-menu-item>
        <el-menu-item index="/contactus">联系我们</el-menu-item>
    </el-menu>
</template>

<script>
export default {
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath)
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