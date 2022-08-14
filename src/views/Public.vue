<template>
  <div class="common-layout">
    <el-container style="height:100%;" direction="vertical">
      <el-header>
        <HomeHeader></HomeHeader>
      </el-header>
      <el-main style="overflow:visible"><router-view></router-view></el-main>
      <el-footer><HomeFooter></HomeFooter></el-footer>
    </el-container>
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader.vue'
import HomeFooter from '@/components/HomeFooter.vue'
export default {
    components: {
    HomeHeader,
    HomeFooter
}
}
</script>

<style>
.el-main {
  padding: 0;
}

html, body, #app, .common-layout, .el-container {
  /* 铺屏 */
  padding: 0px;
  margin: 0px;
  height: 100%;
}
</style>